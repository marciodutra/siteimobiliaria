const prisma = require("../lib/prisma");


async function buscarCorretorDoUsuario(userId) {

    const corretor = await prisma.corretor.findUnique({
        where: {
            userId: Number(userId)
        }
    });


    if (!corretor) {
        throw new Error("Usuário não possui perfil de corretor");
    }


    return corretor;
}



async function listar(req, res) {

    try {

        const imoveis = await prisma.imovel.findMany({
            include: {
                imagens: true,
                corretor: true
            }
        });


        res.json(imoveis);


    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

}




async function buscarPorId(req, res) {

    try {

        const { id } = req.params;


        const imovel = await prisma.imovel.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                imagens: true,
                corretor: true
            }
        });


        if (!imovel) {
            return res.status(404).json({
                error: "Imóvel não encontrado"
            });
        }


        res.json(imovel);


    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

}




async function criar(req, res) {

    try {

        const dados = req.body;


        let corretorId;


        if (req.user.tipo === "ADMIN") {

            corretorId = Number(dados.corretorId);


            if (!corretorId) {
                return res.status(400).json({
                    error: "ADMIN deve informar o corretorId"
                });
            }

        } else {

            const corretor = await buscarCorretorDoUsuario(req.user.id);

            corretorId = corretor.id;

        }



        const imovel = await prisma.imovel.create({
            data: {
                ...dados,
                valor: Number(dados.valor),
                corretorId
            }
        });


        res.status(201).json(imovel);


    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

}





async function atualizar(req, res) {

    try {

        const { id } = req.params;


        let imovel;


        if (req.user.tipo === "ADMIN") {

            imovel = await prisma.imovel.findUnique({
                where: {
                    id: Number(id)
                }
            });


        } else {


            const corretor = await buscarCorretorDoUsuario(req.user.id);


            imovel = await prisma.imovel.findFirst({
                where: {
                    id: Number(id),
                    corretorId: corretor.id
                }
            });

        }



        if (!imovel) {
            return res.status(404).json({
                error: "Imóvel não encontrado ou sem permissão"
            });
        }



        const dados = req.body;


        const atualizado = await prisma.imovel.update({

            where: {
                id: Number(id)
            },

            data: {
                ...dados,
                valor: dados.valor ? Number(dados.valor) : undefined
            }

        });


        res.json(atualizado);


    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

}





async function remover(req, res) {

    try {

        const { id } = req.params;


        let imovel;


        if (req.user.tipo === "ADMIN") {


            imovel = await prisma.imovel.findUnique({
                where: {
                    id: Number(id)
                }
            });


        } else {


            const corretor = await buscarCorretorDoUsuario(req.user.id);


            imovel = await prisma.imovel.findFirst({
                where: {
                    id: Number(id),
                    corretorId: corretor.id
                }
            });

        }



        if (!imovel) {
            return res.status(404).json({
                error: "Imóvel não encontrado ou sem permissão"
            });
        }



        await prisma.imovel.delete({
            where: {
                id: Number(id)
            }
        });



        res.json({
            message: "Imóvel removido com sucesso"
        });


    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

}




module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    remover
};