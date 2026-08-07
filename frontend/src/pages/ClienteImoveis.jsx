import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";


function ClienteImoveis() {


    const navigate = useNavigate();


    const [imoveis, setImoveis] = useState([]);



    async function carregarImoveis() {


        try {


            const resposta = await api.get(
                "/clientes/meus-imoveis"
            );


            setImoveis(resposta.data);



        } catch (error) {


            console.log(error);


            alert(
                "Erro ao carregar imóveis"
            );


        }


    }







    useEffect(() => {


        carregarImoveis();


    }, []);







    return (


        <div className="container mt-5 mb-5">


            <button

                className="btn btn-secondary mb-4"

                onClick={() => navigate("/cliente/dashboard")}

            >

                Voltar

            </button>


            <h2 className="fw-bold mb-4">

                Meus imóveis

            </h2>







            {

                imoveis.length === 0 ? (


                    <div className="alert alert-info">

                        Você ainda não possui imóveis contratados.

                    </div>


                ) : (


                    <div className="row g-4">



                        {imoveis.map(item => (



                            <div

                                className="col-md-6"

                                key={item.contratoId}

                            >



                                <div className="card shadow-sm border-0 h-100">



                                    {

                                        item.imovel.imagens &&
                                        item.imovel.imagens.length > 0 && (


                                            <img

                                                src={
                                                    item.imovel.imagens.find(
                                                        img => img.principal
                                                    )?.caminho ||
                                                    item.imovel.imagens[0].caminho
                                                }

                                                className="card-img-top"

                                                alt={item.imovel.titulo}

                                                style={{

                                                    height: "220px",

                                                    objectFit: "cover"

                                                }}

                                            />


                                        )

                                    }





                                    <div className="card-body">



                                        <h4 className="fw-bold">

                                            {item.imovel.titulo}

                                        </h4>




                                        <p>

                                            <strong>Negócio:</strong>{" "}

                                            {item.tipo}

                                        </p>




                                        <p>

                                            <strong>Valor:</strong>{" "}

                                            R$ {Number(item.valor).toLocaleString("pt-BR")}

                                        </p>





                                        <p>

                                            <strong>Status contrato:</strong>{" "}

                                            {item.statusContrato}

                                        </p>





                                        <p>

                                            <strong>Início:</strong>{" "}

                                            {
                                                new Date(
                                                    item.dataInicio
                                                )
                                                    .toLocaleDateString("pt-BR")
                                            }

                                        </p>





                                        {

                                            item.dataFim && (


                                                <p>

                                                    <strong>Fim:</strong>{" "}

                                                    {
                                                        new Date(
                                                            item.dataFim
                                                        )
                                                            .toLocaleDateString("pt-BR")
                                                    }

                                                </p>


                                            )

                                        }







                                        {

                                            item.imovel.corretor && (


                                                <div className="mt-3">


                                                    <strong>Corretor:</strong>


                                                    <br />


                                                    {item.imovel.corretor.nome}


                                                    <br />


                                                    {item.imovel.corretor.telefone}



                                                </div>


                                            )

                                        }





                                    </div>



                                </div>



                            </div>



                        ))}



                    </div>


                )


            }





        </div>


    );


}


export default ClienteImoveis;