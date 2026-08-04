const prisma = require("../lib/prisma");



async function criar(req, res) {

    try {

        const {
            nome,
            email,
            telefone,
            mensagem,
            imovelId
        } = req.body;



        if (!nome || !email || !mensagem || !imovelId) {

            return res.status(400).json({
                error: "Preencha os campos obrigatórios"
            });

        }



        const imovel = await prisma.imovel.findUnique({

            where: {
                id: Number(imovelId)
            }

        });



        if (!imovel) {

            return res.status(404).json({
                error: "Imóvel não encontrado"
            });

        }



        const novaMensagem = await prisma.mensagem.create({

            data: {

                nome,

                email,

                telefone,

                mensagem,

                imovelId: Number(imovelId)

            }

        });



        res.status(201).json(novaMensagem);



    } catch (error) {


        res.status(500).json({

            error: error.message

        });


    }

}







async function listar(req, res) {


    try {


        let where = {};



        /*
            ADMIN:
            vê todas as mensagens


            CORRETOR:
            vê somente mensagens dos seus imóveis
        */


        if (req.user.tipo === "CORRETOR") {



            const corretor = await prisma.corretor.findUnique({

                where: {

                    userId: Number(req.user.id)

                }

            });



            if (!corretor) {

                return res.status(404).json({

                    error: "Corretor não encontrado"

                });

            }



            where = {

                imovel: {

                    corretorId: corretor.id

                }

            };


        }




        const mensagens = await prisma.mensagem.findMany({


            where,


            include: {


                imovel: {

                    select: {

                        id: true,

                        titulo: true,

                        cidade: true,

                        bairro: true,

                        valor: true

                    }

                }


            },


            orderBy: {

                createdAt: "desc"

            }


        });



        res.json(mensagens);



    } catch (error) {


        res.status(500).json({

            error: error.message

        });


    }


}

async function remover(req, res) {

    try {

        const { id } = req.params;


        const mensagem = await prisma.mensagem.findUnique({

            where: {
                id: Number(id)
            }

        });



        if (!mensagem) {

            return res.status(404).json({

                error: "Mensagem não encontrada"

            });

        }



        await prisma.mensagem.delete({

            where: {
                id: Number(id)
            }

        });



        res.json({

            message: "Mensagem removida com sucesso"

        });



    } catch (error) {


        res.status(500).json({

            error: error.message

        });


    }

}





async function contador(req, res) {


    try {


        let where = {};



        if (req.user.tipo === "CORRETOR") {


            const corretor = await prisma.corretor.findUnique({

                where: {

                    userId: Number(req.user.id)

                }

            });



            if (!corretor) {

                return res.status(404).json({

                    error: "Corretor não encontrado"

                });

            }



            where = {

                imovel: {

                    corretorId: corretor.id

                }

            };


        }



        const total = await prisma.mensagem.count({

            where

        });



        res.json({

            total

        });



    } catch (error) {


        res.status(500).json({

            error: error.message

        });


    }


}

module.exports = {

    criar,

    listar,

    remover,

    contador

};