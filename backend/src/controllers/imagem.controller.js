const prisma = require("../lib/prisma");
const supabase = require("../lib/supabase");


async function adicionarImagem(req, res) {

    console.log("IMOVEL:", req.params.imovelId);
    console.log("FILES:", req.files);

    try {

        const { imovelId } = req.params;

        if (!req.files || req.files.length === 0) {

            return res.status(400).json({
                erro: "Nenhuma imagem enviada"
            });

        }


        const imagens = await Promise.all(

            req.files.map(async (arquivo, index) => {


                const nomeArquivo =
                    `imoveis/${Date.now()}-${arquivo.originalname}`;


                const upload = await supabase.storage
                    .from(process.env.SUPABASE_BUCKET)
                    .upload(
                        nomeArquivo,
                        arquivo.buffer,
                        {
                            contentType: arquivo.mimetype
                        }
                    );


                if (upload.error) {

                    throw upload.error;

                }


                const { data } = supabase.storage
                    .from(process.env.SUPABASE_BUCKET)
                    .getPublicUrl(nomeArquivo);



                return prisma.imagem.create({

                    data: {

                        caminho: data.publicUrl,

                        principal: index === 0,

                        imovelId: Number(imovelId)

                    }

                });


            })

        );


        res.json(imagens);


    } catch(error) {


        console.log(error);


        res.status(500).json({

            erro:"Erro ao salvar imagens"

        });


    }

}






async function removerImagem(req,res){

    try {


        const { id } = req.params;


        const imagem = await prisma.imagem.findUnique({

            where:{
                id:Number(id)
            }

        });



        if(!imagem){

            return res.status(404).json({

                erro:"Imagem não encontrada"

            });

        }



        await prisma.imagem.delete({

            where:{
                id:Number(id)
            }

        });



        res.json({

            mensagem:"Imagem removida com sucesso"

        });



    } catch(error){


        console.log(error);


        res.status(500).json({

            erro:"Erro ao remover imagem"

        });


    }

}





module.exports = {

    adicionarImagem,
    removerImagem

};