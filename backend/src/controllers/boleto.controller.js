const prisma = require("../lib/prisma");



function gerarVencimentos(dataInicio, dataFim, diaPagamento) {

    const vencimentos = [];

    let data = new Date(dataInicio);


    while (data <= dataFim) {


        let vencimento = new Date(
            data.getFullYear(),
            data.getMonth(),
            diaPagamento
        );


        if (vencimento < dataInicio) {

            data.setMonth(data.getMonth() + 1);

            continue;

        }


        if (vencimento > dataFim) {

            break;

        }


        vencimentos.push(vencimento);


        data.setMonth(data.getMonth() + 1);

    }


    return vencimentos;

}








async function buscarClienteLogado(req) {


    return await prisma.cliente.findUnique({

        where: {

            userId: req.user.id

        }

    });


}








async function gerar(req, res) {


    try {


        const { contratoId } = req.params;



        const contrato = await prisma.contrato.findUnique({

            where: {

                id: Number(contratoId)

            }

        });



        if (!contrato) {


            return res.status(404).json({

                error: "Contrato não encontrado"

            });


        }




        if (!contrato.dataFim) {


            return res.status(400).json({

                error: "Contrato sem data final"

            });


        }





        const existentes = await prisma.boleto.findMany({

            where: {

                contratoId: contrato.id

            }

        });





        if (existentes.length > 0) {


            return res.json({

                message: "Boletos já gerados",

                boletos: existentes

            });


        }






        const vencimentos = gerarVencimentos(

            contrato.dataInicio,

            contrato.dataFim,

            contrato.dataPagamento

        );





        const boletos = [];



        for (let i = 0; i < vencimentos.length; i++) {


            const boleto = await prisma.boleto.create({

                data: {


                    numero: i + 1,


                    vencimento: vencimentos[i],


                    valor: contrato.valor,


                    contratoId: contrato.id


                }


            });



            boletos.push(boleto);


        }





        res.json({

            message: "Boletos gerados com sucesso",

            boletos

        });




    } catch (error) {


        res.status(500).json({

            error: error.message

        });


    }


}









async function listarCliente(req, res) {


    try {


        const cliente = await buscarClienteLogado(req);



        if (!cliente) {


            return res.status(404).json({

                error: "Cliente não encontrado"

            });


        }





        const boletos = await prisma.boleto.findMany({


            where: {


                contrato: {


                    clienteId: cliente.id

                }


            },



            include: {


                contrato: {


                    include: {


                        imovel: true

                    }


                }


            },



            orderBy: {


                vencimento: "asc"

            }


        });





        res.json(boletos);



    } catch(error) {


        res.status(500).json({

            error:error.message

        });


    }


}









async function listarCorretor(req,res){


    try{


        const corretor = await prisma.corretor.findUnique({


            where:{


                userId:req.user.id


            }


        });




        if(!corretor){


            return res.status(404).json({

                error:"Corretor não encontrado"

            });


        }





        const boletos = await prisma.boleto.findMany({


            where:{


                contrato:{


                    corretorId:corretor.id


                }


            },



            include:{


                contrato:{


                    include:{


                        cliente:{


                            include:{


                                user:true

                            }


                        },


                        imovel:true


                    }


                }


            }



        });





        res.json(boletos);



    }catch(error){


        res.status(500).json({

            error:error.message

        });


    }


}









async function pagar(req,res){


    try{


        const {id}=req.params;



        const boleto = await prisma.boleto.update({


            where:{


                id:Number(id)

            },


            data:{


                status:"PAGO",


                dataPagamento:new Date()

            }


        });





        res.json({

            message:"Boleto pago com sucesso",

            boleto

        });



    }catch(error){


        res.status(500).json({

            error:error.message

        });


    }


}


module.exports = {


    gerar,

    listarCliente,

    listarCorretor,

    pagar


};