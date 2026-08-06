import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";


function ClienteDashboard() {


    const { user, logout } = useAuth();

    const navigate = useNavigate();



    function sair() {

        logout();

        navigate("/");

    }



    return (

        <div className="container mt-5 mb-5">


            <h2 className="mb-4 fw-bold">

                Área do Cliente

            </h2>



            <div className="row g-4">



                <div className="col-md-4">


                    <div className="card shadow-sm border-0 text-center">


                        <div className="card-body p-4">



                            {
                                user?.foto ? (


                                    <img

                                        src={user.foto}

                                        alt="Foto do cliente"

                                        className="rounded-circle mb-3"

                                        style={{

                                            width:"130px",

                                            height:"130px",

                                            objectFit:"cover"

                                        }}

                                    />


                                ) : (


                                    <div

                                        className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3"

                                        style={{

                                            width:"130px",

                                            height:"130px",

                                            fontSize:"55px"

                                        }}

                                    >

                                        👤

                                    </div>


                                )
                            }



                            <h4 className="fw-bold">

                                {user?.nome}

                            </h4>



                            <span className="badge bg-primary">

                                Cliente

                            </span>



                            <p className="text-muted mt-3 mb-0">

                                {user?.email}

                            </p>



                            <button

                                className="btn btn-outline-danger w-100 mt-4"

                                onClick={sair}

                            >

                                Sair

                            </button>



                        </div>


                    </div>


                </div>





                <div className="col-md-8">


                    <div className="card shadow-sm border-0">


                        <div className="card-body p-4">



                            <h4 className="fw-bold mb-4">

                                Meus dados

                            </h4>



                            <div className="row">



                                <div className="col-md-6 mb-3">

                                    <strong>
                                        Telefone
                                    </strong>

                                    <br />

                                    {user?.cliente?.telefone}


                                </div>




                                <div className="col-md-6 mb-3">


                                    <strong>
                                        CPF
                                    </strong>

                                    <br />

                                    {user?.cliente?.cpf}


                                </div>




                                <div className="col-md-6 mb-3">


                                    <strong>
                                        RG
                                    </strong>

                                    <br />

                                    {user?.cliente?.rg}


                                </div>




                                <div className="col-md-6 mb-3">


                                    <strong>
                                        Data nascimento
                                    </strong>

                                    <br />


                                    {
                                        user?.cliente?.dataNascimento
                                        &&
                                        new Date(
                                            user.cliente.dataNascimento
                                        ).toLocaleDateString("pt-BR")
                                    }


                                </div>




                                <div className="col-md-12 mb-3">


                                    <strong>
                                        Endereço
                                    </strong>

                                    <br />

                                    {user?.cliente?.endereco}

                                    {
                                        user?.cliente?.numero &&
                                        `, ${user.cliente.numero}`
                                    }


                                </div>




                                <div className="col-md-6 mb-3">


                                    <strong>
                                        Bairro
                                    </strong>

                                    <br />

                                    {user?.cliente?.bairro}


                                </div>




                                <div className="col-md-6 mb-3">


                                    <strong>
                                        Cidade / Estado
                                    </strong>

                                    <br />

                                    {user?.cliente?.cidade}

                                    {" - "}

                                    {user?.cliente?.estado}


                                </div>




                                <div className="col-md-6 mb-3">


                                    <strong>
                                        CEP
                                    </strong>

                                    <br />

                                    {user?.cliente?.cep}


                                </div>



                            </div>



                        </div>


                    </div>



                    <div className="row mt-4 g-3">



                        <div className="col-md-4">


                            <div className="card shadow-sm border-0 text-center">


                                <div className="card-body">


                                    🏠

                                    <h6 className="mt-2">

                                        Meus imóveis

                                    </h6>


                                </div>


                            </div>


                        </div>




                        <div className="col-md-4">


                            <div className="card shadow-sm border-0 text-center">


                                <div className="card-body">


                                    📄

                                    <h6 className="mt-2">

                                        Contratos

                                    </h6>


                                </div>


                            </div>


                        </div>




                        <div className="col-md-4">


                            <div className="card shadow-sm border-0 text-center">


                                <div className="card-body">


                                    💳

                                    <h6 className="mt-2">

                                        Boletos

                                    </h6>


                                </div>


                            </div>


                        </div>



                    </div>



                </div>



            </div>


        </div>

    );


}


export default ClienteDashboard;