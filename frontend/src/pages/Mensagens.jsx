import { useEffect, useState } from "react";
import api from "../api/api";


function Mensagens() {


    const [mensagens, setMensagens] = useState([]);



    async function carregarMensagens() {


        try {


            const response = await api.get("/mensagens");


            setMensagens(response.data);



        } catch (error) {


            console.log(error);


            alert(
                error.response?.data?.error ||
                "Erro ao carregar mensagens"
            );


        }


    }

    async function excluir(id) {


        if (!confirm("Deseja excluir esta mensagem?")) {

            return;

        }


        try {


            await api.delete(`/mensagens/${id}`);


            carregarMensagens();



        } catch (error) {


            alert(
                error.response?.data?.error ||
                "Erro ao excluir mensagem"
            );


        }

    }




    useEffect(() => {


        carregarMensagens();


    }, []);





    return (


        <div className="container mt-5">


            <h2>

                Mensagens recebidas

            </h2>



            <div className="row mt-4">



                {
                    mensagens.map(mensagem => (


                        <div

                            className="col-md-6 mb-3"

                            key={mensagem.id}

                        >



                            <div className="card shadow-sm">



                                <div className="card-body">



                                    <h5>

                                        {mensagem.nome}

                                    </h5>



                                    <p>

                                        <strong>Email:</strong>
                                        <br />

                                        {mensagem.email}

                                    </p>



                                    <p>

                                        <strong>Telefone:</strong>
                                        <br />

                                        {mensagem.telefone || "Não informado"}

                                    </p>



                                    <hr />



                                    <h6>

                                        Imóvel de interesse

                                    </h6>



                                    <p>

                                        {mensagem.imovel?.titulo}

                                        <br />

                                        {mensagem.imovel?.cidade}
                                        -
                                        {mensagem.imovel?.bairro}

                                    </p>



                                    <p>

                                        <strong>Mensagem:</strong>

                                        <br />

                                        {mensagem.mensagem}

                                    </p>



                                    <small className="text-muted">

                                        {new Date(
                                            mensagem.createdAt
                                        ).toLocaleString("pt-BR")}

                                    </small>

                                    <hr />

                                    <button

                                        className="btn btn-danger"

                                        onClick={() => excluir(mensagem.id)}

                                    >

                                        Excluir

                                    </button>



                                </div>


                            </div>


                        </div>


                    ))
                }



            </div>




            {
                mensagens.length === 0 && (


                    <div className="alert alert-info">


                        Nenhuma mensagem recebida.


                    </div>


                )
            }




        </div>


    );


}

export default Mensagens;