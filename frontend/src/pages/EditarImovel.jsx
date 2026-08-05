import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

const API_URL = import.meta.env.VITE_API_URL.replace("/api", "");


function EditarImovel() {


    const { id } = useParams();

    const navigate = useNavigate();


    const [form, setForm] = useState(null);

    const [novasImagens, setNovasImagens] = useState([]);





    async function carregar() {


        try {


            const response = await api.get(
                `/imoveis/${id}`
            );


            setForm(response.data);



        } catch (error) {


            console.log(error);


        }


    }





    useEffect(() => {

        carregar();

    }, []);







    function alterar(e) {


        setForm({

            ...form,

            [e.target.name]: e.target.value

        });


    }






    function selecionarImagens(e) {


        setNovasImagens(e.target.files);


    }







    async function removerImagem(imagemId) {


        if (!confirm("Deseja excluir esta foto?")) {

            return;

        }



        try {


            await api.delete(
                `/imagens/${imagemId}`
            );



            carregar();



        } catch (error) {


            alert(

                error.response?.data?.erro ||

                "Erro ao remover imagem"

            );


        }


    }








    async function salvar(e) {


        e.preventDefault();


        try {


            const { id, corretor, imagens, createdAt, updatedAt, ...dados } = form;





            await api.put(

                `/imoveis/${id}`,

                {

                    ...dados,

                    valor: Number(dados.valor),

                    quartos: Number(dados.quartos),

                    banheiros: Number(dados.banheiros),

                    suites: Number(dados.suites),

                    vagas: Number(dados.vagas),

                    area: Number(dados.area)

                }

            );







            if (novasImagens.length > 0) {


                const formData = new FormData();



                for (let i = 0; i < novasImagens.length; i++) {


                    formData.append(

                        "imagens",

                        novasImagens[i]

                    );


                }




                await api.post(

                    `/imagens/${id}`,

                    formData,

                    {

                        headers: {

                            "Content-Type": "multipart/form-data"

                        }

                    }

                );


            }






            alert("Imóvel atualizado");



            navigate("/meus-imoveis");





        } catch (error) {


            alert(

                error.response?.data?.error ||

                "Erro ao atualizar"

            );


        }


    }







    if (!form) {

        return <p>Carregando...</p>;

    }







    return (


        <div className="container mt-5">



            <h2>
                Editar imóvel
            </h2>







            <form onSubmit={salvar}>


                {
                    form.imagens &&
                    form.imagens.length > 0 && (



                        <div className="mb-4">


                            <h5>
                                Fotos atuais
                            </h5>



                            <div className="d-flex flex-wrap">



                                {
                                    form.imagens.map(imagem => (



                                        <div

                                            key={imagem.id}

                                            className="me-3 mb-3"

                                        >



                                            <img
                                                src={`${API_URL}${imagem.caminho}`}
                                                alt="Imóvel"
                                                style={{
                                                    width: "130px",
                                                    height: "100px",
                                                    objectFit: "cover"
                                                }}
                                            />



                                            <br />



                                            <button

                                                type="button"

                                                className="btn btn-danger btn-sm mt-2"

                                                onClick={() => removerImagem(imagem.id)}

                                            >

                                                Excluir

                                            </button>



                                        </div>



                                    ))

                                }



                            </div>



                        </div>



                    )

                }








                {[
                    "codigo",
                    "titulo",
                    "descricao",
                    "tipo",
                    "valor",
                    "cidade",
                    "bairro",
                    "endereco",
                    "quartos",
                    "banheiros",
                    "suites",
                    "vagas",
                    "area"
                ].map(campo => (



                    <div

                        className="mb-3"

                        key={campo}

                    >



                        <label>

                            {campo}

                        </label>




                        <input


                            className="form-control"


                            name={campo}


                            value={form[campo] || ""}


                            onChange={alterar}


                        />



                    </div>



                ))}







                <div className="mb-3">


                    <label>

                        Adicionar novas fotos

                    </label>



                    <input


                        className="form-control"


                        type="file"


                        multiple


                        accept="image/*"


                        onChange={selecionarImagens}


                    />



                </div>







                <button className="btn btn-primary">


                    Salvar alterações


                </button>




            </form>



        </div>


    );


}


export default EditarImovel;