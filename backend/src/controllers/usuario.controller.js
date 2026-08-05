const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");


async function criarUsuario(req, res) {

    try {

        const {
            nome,
            email,
            senha,
            tipo,
            telefone,
            creci
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



        const user = await prisma.user.create({

            data: {
                nome,
                email,
                senha: senhaHash,
                tipo
            }

        });



        if (tipo === "CORRETOR") {


            await prisma.corretor.create({

                data: {

                    nome,
                    telefone,
                    creci,
                    userId: user.id

                }

            });


        }



        res.status(201).json({

            message: "Usuário criado com sucesso",

            user: {

                id: user.id,
                nome: user.nome,
                email: user.email,
                tipo: user.tipo

            }

        });



    } catch (error) {


        res.status(500).json({

            error: error.message

        });


    }

}

async function listarUsuarios(req, res) {

    try {

        const usuarios = await prisma.user.findMany({

            select: {

                id: true,
                nome: true,
                email: true,
                tipo: true,
                createdAt: true,

                corretor: {

                    select: {

                        telefone: true,
                        creci: true

                    }

                }

            }

        });


        res.json(usuarios);


    } catch (error) {


        res.status(500).json({

            error: error.message

        });


    }

}




async function editarUsuario(req, res) {

    try {

        const { id } = req.params;

        const {
            nome,
            email,
            tipo
        } = req.body;



        const usuario = await prisma.user.update({

            where: {
                id: Number(id)
            },

            data: {

                nome,
                email,
                tipo

            }

        });



        res.json(usuario);



    } catch (error) {


        res.status(500).json({

            error: error.message

        });


    }

}






async function excluirUsuario(req, res) {

    try {


        const { id } = req.params;



        const usuario = await prisma.user.findUnique({

            where: {
                id: Number(id)
            },

            include: {

                corretor: true

            }

        });



        if (!usuario) {

            return res.status(404).json({

                error: "Usuário não encontrado"

            });

        }



        if (usuario.corretor) {


            await prisma.corretor.delete({

                where: {

                    userId: Number(id)

                }

            });


        }



        await prisma.user.delete({

            where: {

                id: Number(id)

            }

        });



        res.json({

            message: "Usuário excluído"

        });



    } catch (error) {


        res.status(500).json({

            error: error.message

        });


    }

}


module.exports = {
    criarUsuario,
    listarUsuarios,
    editarUsuario,
    excluirUsuario
};