const prisma = require("../lib/prisma");


async function meusImoveis(req, res) {

    try {


        const cliente = await prisma.cliente.findUnique({

            where: {

                userId: req.user.id

            }

        });



        if (!cliente) {

            return res.status(404).json({

                error: "Cliente não encontrado"

            });

        }




        const contratos = await prisma.contrato.findMany({

            where: {

                clienteId: cliente.id

            },


            include: {

                imovel: {

                    include: {

                        imagens: true,

                        corretor: {

                            select: {

                                id: true,
                                nome: true,
                                telefone: true

                            }

                        }

                    }

                }

            }

        });





        const imoveis = contratos.map(contrato => ({


            contratoId: contrato.id,

            tipo: contrato.tipo,

            valor: contrato.valor,

            dataInicio: contrato.dataInicio,

            dataFim: contrato.dataFim,

            statusContrato: contrato.status,

            imovel: contrato.imovel


        }));




        res.json(imoveis);



    } catch (error) {


        res.status(500).json({

            error: error.message

        });


    }

}

module.exports = {

    meusImoveis

};