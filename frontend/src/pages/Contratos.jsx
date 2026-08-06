import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";


function Contratos() {


    const [contratos, setContratos] = useState([]);

    const { user } = useAuth();



    async function carregarContratos() {


        try {


            const response = await api.get("/contratos");


            setContratos(response.data);



        } catch (error) {


            console.log(error);


        }


    }





    useEffect(() => {


        if (user) {

            carregarContratos();

        }


    }, [user]);





    return (


        <div className="container mt-5">


            <div className="d-flex justify-content-between align-items-center mb-4">


                <h2>
                    Meus Contratos
                </h2>



                <Link
                    className="btn btn-success"
                    to="/novo-contrato"
                >

                    Novo contrato

                </Link>


            </div>




            <div className="row">


                {contratos.map(contrato => (


                    <div
                        className="col-md-6 mb-3"
                        key={contrato.id}
                    >


                        <div className="card shadow-sm">


                            <div className="card-body">


                                <h5>

                                    {contrato.imovel?.titulo}

                                </h5>



                                <p>

                                    Cliente:
                                    <br />

                                    <strong>
                                        {contrato.cliente?.user?.nome}
                                    </strong>

                                </p>




                                <p>

                                    Tipo:
                                    <strong>
                                        {" "}
                                        {contrato.tipo}
                                    </strong>

                                </p>



                                <p>

                                    Valor:

                                    <strong>
                                        {" "}
                                        R$ {contrato.valor}
                                    </strong>


                                </p>



                                <p>

                                    Status:

                                    <span className="badge bg-primary ms-2">

                                        {contrato.status}

                                    </span>

                                </p>



                            </div>


                        </div>


                    </div>


                ))}



            </div>




            {contratos.length === 0 && (

                <div className="alert alert-info">

                    Nenhum contrato encontrado.

                </div>

            )}



        </div>


    );


}


export default Contratos;