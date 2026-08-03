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





module.exports = {

    criar

};