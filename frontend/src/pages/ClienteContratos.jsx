import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function ClienteContratos() {

    const navigate = useNavigate();


    const [contratos, setContratos] = useState([]);



    async function carregarContratos() {


        try {


            const resposta = await api.get(
                "/clientes/meus-contratos"
            );


            setContratos(resposta.data);

            console.log(resposta.data);



        } catch (error) {


            console.log(error);


            alert(
                "Erro ao carregar contratos"
            );


        }


    }





    useEffect(() => {


        carregarContratos();


    }, []);





    return (


        <div className="container mt-5 mb-5">


            <div className="d-flex justify-content-between align-items-center mb-4">


                <h2 className="fw-bold">

                    Meus Contratos

                </h2>



                <button

                    className="btn btn-secondary"

                    onClick={() => navigate("/cliente/dashboard")}

                >

                    Voltar

                </button>


            </div>





            {

                contratos.length === 0 ? (


                    <div className="alert alert-info">

                        Nenhum contrato encontrado.

                    </div>


                ) : (


                    <div className="row g-4">



                        {
                            contratos.map(contrato => (


                                <div

                                    className="col-md-6"

                                    key={contrato.id}

                                >


                                    <div className="card shadow-sm border-0">


                                        <div className="card-body">



                                            <h5 className="fw-bold">

                                                {contrato.imovel?.titulo}

                                            </h5>





                                            <p>

                                                <strong>

                                                    Cliente:

                                                </strong>

                                                {" "}

                                                {contrato.cliente?.nome}

                                            </p>




                                            <p>

                                                <strong>

                                                    Email:

                                                </strong>

                                                {" "}

                                                {contrato.cliente?.email}

                                            </p>





                                            <p>

                                                <strong>

                                                    Tipo:

                                                </strong>

                                                {" "}

                                                {contrato.tipo}

                                            </p>




                                            <p>

                                                <strong>

                                                    Valor:

                                                </strong>

                                                {" "}

                                                R$ {Number(contrato.valor).toLocaleString("pt-BR")}

                                            </p>




                                            <p>

                                                <strong>

                                                    Status:

                                                </strong>

                                                {" "}

                                                <span className="badge bg-success">

                                                    {contrato.status}

                                                </span>

                                            </p>




                                            <p>

                                                <strong>

                                                    Início:

                                                </strong>

                                                {" "}

                                                {
                                                    new Date(
                                                        contrato.dataInicio
                                                    )
                                                        .toLocaleDateString("pt-BR")
                                                }

                                            </p>





                                            {
                                                contrato.dataPagamento && (

                                                    <p>

                                                        <strong>
                                                            Dia pagamento aluguel:
                                                        </strong>

                                                        {" "}

                                                        Todo dia {contrato.dataPagamento}

                                                    </p>

                                                )
                                            }





                                            {

                                                contrato.dataFim && (


                                                    <p>

                                                        <strong>

                                                            Fim:

                                                        </strong>

                                                        {" "}

                                                        {
                                                            new Date(
                                                                contrato.dataFim
                                                            )
                                                                .toLocaleDateString("pt-BR")
                                                        }

                                                    </p>


                                                )

                                            }





                                            <hr />




                                            <p className="mb-1">

                                                <strong>

                                                    Corretor:

                                                </strong>

                                                {" "}

                                                {contrato.corretor?.nome}

                                            </p>





                                            <p>

                                                <strong>

                                                    Telefone:

                                                </strong>

                                                {" "}

                                                {contrato.corretor?.telefone}

                                            </p>




                                        </div>


                                    </div>


                                </div>


                            ))

                        }



                    </div>


                )


            }



        </div>


    );


}

export default ClienteContratos;