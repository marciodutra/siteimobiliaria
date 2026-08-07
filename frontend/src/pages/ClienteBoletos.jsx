import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function ClienteBoletos() {

    const [boletos, setBoletos] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {

        carregarBoletos();

    }, []);



    async function carregarBoletos() {

        try {

            const resposta = await api.get("/boletos/cliente");

            setBoletos(resposta.data);

        } catch (error) {

            console.log(error);

        }

    }



    return (

        <div className="container mt-5 mb-5">


            <div className="d-flex justify-content-between align-items-center mb-4">


                <h2 className="fw-bold mb-0">
                    Meus Boletos
                </h2>


                <button

                    className="btn btn-secondary"

                    onClick={() => navigate("/cliente/dashboard")}

                >

                    ← Voltar ao Dashboard

                </button>


            </div>





            {
                boletos.length === 0 ?

                (

                    <div className="alert alert-info">

                        Nenhum boleto encontrado.

                    </div>

                )

                :

                (

                    <div className="row g-3">


                        {
                            boletos.map((boleto) => (

                                <div

                                    className="col-md-6"

                                    key={boleto.id}

                                >


                                    <div className="card shadow-sm">


                                        <div className="card-body">


                                            <h5 className="fw-bold">

                                                Boleto #{boleto.numero}

                                            </h5>



                                            <p>

                                                Valor:

                                                {" "}

                                                R$ {Number(boleto.valor).toFixed(2)}

                                            </p>



                                            <p>

                                                Vencimento:

                                                {" "}

                                                {
                                                    new Date(
                                                        boleto.vencimento
                                                    )
                                                    .toLocaleDateString("pt-BR")
                                                }

                                            </p>



                                            <p>

                                                Status:

                                                {" "}


                                                <span className="badge bg-primary">

                                                    {boleto.status}

                                                </span>


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


export default ClienteBoletos;