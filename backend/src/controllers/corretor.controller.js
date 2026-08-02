const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");



async function listar(req, res) {

    try {

        const corretores = await prisma.corretor.findMany({

            include: {
                user: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                        tipo: true
                    }
                }
            }

        });


        res.json(corretores);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

}




async function buscarPorId(req, res) {

    try {

        const { id } = req.params;


        const corretor = await prisma.corretor.findUnique({

            where: {
                id: Number(id)
            },

            include: {
                user: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                        tipo: true
                    }
                }
            }

        });


        if (!corretor) {

            return res.status(404).json({
                error: "Corretor não encontrado"
            });

        }


        res.json(corretor);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

}




async function criar(req, res) {

    try {

        const {
            nome,
            email,
            senha,
            telefone,
            creci,
            foto
        } = req.body;


        const existe = await prisma.user.findUnique({
            where: {
                email
            }
        });


        if (existe) {

            return res.status(400).json({
                error: "Email já cadastrado"
            });

        }


        const senhaHash = await bcrypt.hash(senha, 10);


        const resultado = await prisma.$transaction(async (tx) => {

            const user = await tx.user.create({

                data: {
                    nome,
                    email,
                    senha: senhaHash,
                    tipo: "CORRETOR"
                }

            });


            const corretor = await tx.corretor.create({

                data: {
                    nome,
                    telefone,
                    creci,
                    foto,
                    userId: user.id
                }

            });


            return {
                user,
                corretor
            };

        });


        res.status(201).json({
            message: "Corretor criado com sucesso",
            corretor: resultado.corretor,
            user: {
                id: resultado.user.id,
                nome: resultado.user.nome,
                email: resultado.user.email,
                tipo: resultado.user.tipo
            }
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


        const corretor = await prisma.corretor.findUnique({

            where: {
                id: Number(id)
            }

        });


        if (!corretor) {

            return res.status(404).json({
                error: "Corretor não encontrado"
            });

        }


        const {
            nome,
            telefone,
            creci,
            foto
        } = req.body;


        const atualizado = await prisma.corretor.update({

            where: {
                id: Number(id)
            },

            data: {
                nome,
                telefone,
                creci,
                foto
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


        const corretor = await prisma.corretor.findUnique({

            where: {
                id: Number(id)
            }

        });


        if (!corretor) {

            return res.status(404).json({
                error: "Corretor não encontrado"
            });

        }


        await prisma.$transaction(async (tx) => {

            await tx.corretor.delete({

                where: {
                    id: Number(id)
                }

            });


            await tx.user.delete({

                where: {
                    id: corretor.userId
                }

            });

        });


        res.json({
            message: "Corretor removido com sucesso"
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