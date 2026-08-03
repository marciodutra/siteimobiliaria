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


module.exports = {
    criarUsuario
};