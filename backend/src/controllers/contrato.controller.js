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

                imovel: true,

                boletos: true

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

                        user: true

                    }

                },

                imovel: true,

                boletos: true

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
            imovelId,

            formaPagamento,
            quantidadeParcelas,
            dataPrimeiroVencimento

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



        const cliente = await prisma.cliente.findUnique({

            where: {
                id: Number(clienteId)
            }

        });



        if (!cliente) {

            return res.status(404).json({
                error: "Cliente não encontrado"
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

                status: status || "ATIVO",

                clienteId: Number(clienteId),

                imovelId: Number(imovelId),

                corretorId: corretor.id

            }

        });



        /*
         * =========================================================
         * ALUGUEL
         * =========================================================
         *
         * Mantém a lógica que já estava funcionando.
         */

        if (

            tipo === "ALUGUEL" &&

            dataInicio &&

            dataFim &&

            dataPagamento

        ) {

            const boletos = [];

            let numero = 1;

            let data = new Date(dataInicio);



            while (data <= new Date(dataFim)) {

                const vencimento = new Date(

                    data.getFullYear(),

                    data.getMonth(),

                    Number(dataPagamento)

                );



                if (

                    vencimento >= new Date(dataInicio) &&

                    vencimento <= new Date(dataFim)

                ) {

                    boletos.push({

                        numero,

                        vencimento,

                        valor,

                        contratoId: contrato.id

                    });

                    numero++;

                }



                data.setMonth(data.getMonth() + 1);

            }



            if (boletos.length > 0) {

                await prisma.boleto.createMany({

                    data: boletos

                });

            }

        }



        /*
         * =========================================================
         * VENDA PARCELADA
         * =========================================================
         */

        if (

            tipo === "VENDA" &&

            formaPagamento === "PARCELADO"

        ) {

            const quantidade = Number(quantidadeParcelas);



            if (

                !quantidade ||

                quantidade < 2

            ) {

                return res.status(400).json({

                    error: "Informe uma quantidade válida de parcelas"

                });

            }



            if (!dataPrimeiroVencimento) {

                return res.status(400).json({

                    error: "Informe a data do primeiro vencimento"

                });

            }



            const valorTotal = Number(valor);

            const valorParcela = valorTotal / quantidade;

            const boletos = [];



            const primeiraData = new Date(

                `${dataPrimeiroVencimento}T12:00:00`

            );



            for (let i = 0; i < quantidade; i++) {

                const vencimento = new Date(primeiraData);

                vencimento.setMonth(

                    vencimento.getMonth() + i

                );



                let valorAtual = valorParcela;



                /*
                 * Ajusta a última parcela para evitar
                 * diferença de centavos.
                 */

                if (i === quantidade - 1) {

                    valorAtual =

                        valorTotal -

                        valorParcela * (quantidade - 1);

                }



                boletos.push({

                    numero: i + 1,

                    vencimento,

                    valor: valorAtual,

                    contratoId: contrato.id

                });

            }



            await prisma.boleto.createMany({

                data: boletos

            });

        }



        /*
         * =========================================================
         * ATUALIZA STATUS DO IMÓVEL
         * =========================================================
         */

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



        const contratoCompleto = await prisma.contrato.findUnique({

            where: {

                id: contrato.id

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

                imovel: true,

                boletos: true

            }

        });



        res.status(201).json({

            message: "Contrato criado com sucesso",

            contrato: contratoCompleto

        });



    } catch (error) {

        console.log(error);

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



        await prisma.contrato.delete({

            where: {

                id: Number(id)

            }

        });



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