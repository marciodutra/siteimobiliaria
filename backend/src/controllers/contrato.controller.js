const prisma = require("../lib/prisma");



async function buscarCorretorLogado(req) {

    const corretor = await prisma.corretor.findUnique({

        where: {
            userId: req.user.id
        }

    });


    return corretor;

}





async function listar(req, res) {

    try {


        const corretor = await buscarCorretorLogado(req);


        if (!corretor) {

            return res.status(404).json({
                error: "Corretor não encontrado"
            });

        }



        const contratos = await prisma.contrato.findMany({

            where: {

                corretorId: corretor.id

            },


            include: {

                cliente: {

                    include: {

                        user: {

                            select: {

                                id: true,
                                nome: true,
                                email: true

                            }

                        }

                    }

                },


                imovel: true

            }

        });



        res.json(contratos);



    } catch (error) {


        res.status(500).json({

            error: error.message

        });


    }

}







async function buscarPorId(req, res) {

    try {


        const { id } = req.params;


        const corretor = await buscarCorretorLogado(req);


        if (!corretor) {

            return res.status(404).json({
                error: "Corretor não encontrado"
            });

        }



        const contrato = await prisma.contrato.findFirst({

            where: {

                id: Number(id),

                corretorId: corretor.id

            },


            include: {

                cliente: {

                    include: {

                        user: {

                            select: {

                                id: true,
                                nome: true,
                                email: true

                            }

                        }

                    }

                },


                imovel: true

            }

        });



        if (!contrato) {

            return res.status(404).json({

                error: "Contrato não encontrado"

            });

        }



        res.json(contrato);



    } catch (error) {


        res.status(500).json({

            error: error.message

        });


    }

}







async function criar(req, res) {

    try {


        const corretor = await buscarCorretorLogado(req);


        if (!corretor) {

            return res.status(404).json({

                error: "Corretor não encontrado"

            });

        }



        const {
            tipo,
            valor,
            dataInicio,
            dataFim,
            dataPagamento,
            status,
            clienteId,
            imovelId
        } = req.body;


        const imovel = await prisma.imovel.findFirst({

            where: {

                id: Number(imovelId),

                corretorId: corretor.id

            }

        });



        if (!imovel) {

            return res.status(403).json({

                error: "Este imóvel não pertence ao corretor"

            });

        }






        const contrato = await prisma.contrato.create({

            data: {

                tipo,

                valor,

                dataInicio: dataInicio
                    ? new Date(dataInicio)
                    : undefined,


                dataFim: dataFim
                    ? new Date(dataFim)
                    : null,

                dataPagamento: dataPagamento
                    ? Number(dataPagamento)
                    : null,


                status,


                clienteId: Number(clienteId),

                imovelId: Number(imovelId),

                corretorId: corretor.id

            }

        });




        await prisma.imovel.update({

            where: {

                id: Number(imovelId)

            },

            data: {

                status:
                    tipo === "VENDA"
                        ? "VENDIDO"
                        : "ALUGADO"

            }

        });




        res.status(201).json({

            message: "Contrato criado com sucesso",

            contrato

        });



    } catch (error) {


        res.status(500).json({

            error: error.message

        });


    }

}







async function atualizar(req, res) {

    try {


        const { id } = req.params;


        const corretor = await buscarCorretorLogado(req);



        if (!corretor) {

            return res.status(404).json({

                error: "Corretor não encontrado"

            });

        }





        const contrato = await prisma.contrato.findFirst({

            where: {

                id: Number(id),

                corretorId: corretor.id

            }

        });



        if (!contrato) {

            return res.status(404).json({

                error: "Contrato não encontrado"

            });

        }



        const {

            tipo,

            valor,

            dataInicio,

            dataFim,

            dataPagamento,

            status,

            clienteId,

            imovelId

        } = req.body;





        const atualizado = await prisma.contrato.update({

            where: {

                id: Number(id)

            },


            data: {

                tipo,

                valor,


                dataInicio: dataInicio
                    ? new Date(dataInicio)
                    : undefined,


                dataFim: dataFim
                    ? new Date(dataFim)
                    : null,

                dataPagamento: dataPagamento
                    ? Number(dataPagamento)
                    : null,


                status,


                clienteId: clienteId
                    ? Number(clienteId)
                    : undefined,


                imovelId: imovelId
                    ? Number(imovelId)
                    : undefined

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


        const corretor = await buscarCorretorLogado(req);



        if (!corretor) {

            return res.status(404).json({

                error: "Corretor não encontrado"

            });

        }




        const contrato = await prisma.contrato.findFirst({

            where: {

                id: Number(id),

                corretorId: corretor.id

            }

        });



        if (!contrato) {

            return res.status(404).json({

                error: "Contrato não encontrado"

            });

        }





        // Exclui o contrato

        await prisma.contrato.delete({

            where: {

                id: Number(id)

            }

        });





        // Libera novamente o imóvel

        await prisma.imovel.update({

            where: {

                id: contrato.imovelId

            },

            data: {

                status: "DISPONIVEL"

            }

        });






        res.json({

            message: "Contrato removido e imóvel liberado com sucesso"

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