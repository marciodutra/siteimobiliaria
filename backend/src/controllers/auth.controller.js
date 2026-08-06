const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const supabase = require("../lib/supabase");


async function register(req, res) {

    try {

        const {
            nome,
            email,
            senha,
            telefone,
            cpf,
            rg,
            dataNascimento,
            endereco,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            cep
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

        let fotoUrl = null;

        if (req.file) {

            const nomeArquivo =
                `clientes/${Date.now()}-${req.file.originalname}`;

            const upload = await supabase.storage

                .from(process.env.SUPABASE_BUCKET)

                .upload(

                    nomeArquivo,

                    req.file.buffer,

                    {

                        contentType: req.file.mimetype

                    }

                );

            if (upload.error) {

                throw upload.error;

            }

            const { data } = supabase.storage

                .from(process.env.SUPABASE_BUCKET)

                .getPublicUrl(nomeArquivo);

            fotoUrl = data.publicUrl;

        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const user = await prisma.user.create({

            data: {

                nome,

                email,

                senha: senhaHash,

                tipo: "CLIENTE",

                foto: fotoUrl

            }

        });

        await prisma.cliente.create({

            data: {

                telefone,
                cpf,
                rg,
                dataNascimento: dataNascimento
                    ? new Date(dataNascimento)
                    : null,
                endereco,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                cep,
                userId: user.id

            }

        });

        res.status(201).json({

            message: "Usuário criado com sucesso",

            user: {

                id: user.id,

                nome: user.nome,

                email: user.email,

                tipo: user.tipo,

                foto: user.foto

            }

        });

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

}





async function login(req, res) {


    try {


        const { email, senha } = req.body;



        const user = await prisma.user.findUnique({

            where: {

                email

            },

            include: {

                corretor: true,

                cliente: true

            }

        });




        if (!user) {


            return res.status(404).json({

                error: "Usuário não encontrado"

            });


        }




        const senhaValida = await bcrypt.compare(

            senha,

            user.senha

        );




        if (!senhaValida) {


            return res.status(401).json({

                error: "Senha inválida"

            });


        }




        const token = jwt.sign(

            {

                id: user.id,

                email: user.email,

                tipo: user.tipo

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "7d"

            }

        );




        console.log("TOKEN LOGIN:", token);




        res.json({

            token,

            user: {

                id: user.id,

                nome: user.nome,

                email: user.email,

                tipo: user.tipo,

                foto: user.foto,

                corretor: user.corretor,

                cliente: user.cliente

            }

        });




    } catch (error) {


        res.status(500).json({

            error: error.message

        });


    }

}





module.exports = {

    register,

    login

};