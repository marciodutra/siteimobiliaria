import { Link } from "react-router-dom";


function Cliente() {


    return (

        <div className="container mt-5 mb-5">


            <div className="row justify-content-center">


                <div className="col-md-6">


                    <div className="card shadow-sm border-0">


                        <div className="card-body text-center p-5">


                            <h2 className="fw-bold mb-3">
                                Área do Cliente
                            </h2>


                            <p className="text-muted mb-4">

                                Consulte seus contratos,
                                pagamentos e documentos.

                            </p>



                            <Link

                                className="btn btn-primary w-100 mb-3"

                                to="/cliente/login"

                            >

                                Já sou cliente

                            </Link>




                            <Link

                                className="btn btn-outline-primary w-100"

                                to="/cliente/cadastro"

                            >

                                Primeiro acesso

                            </Link>


                        </div>


                    </div>


                </div>


            </div>


        </div>

    );


}


export default Cliente;