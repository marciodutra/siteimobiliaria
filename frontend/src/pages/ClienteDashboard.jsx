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


            <div className="row justify-content-center">


                <div className="col-md-6">


                    <div className="card shadow-sm border-0">


                        <div className="card-body text-center p-5">



                            {
                                user?.foto ? (


                                    <img

                                        src={user.foto}

                                        alt="Foto do cliente"

                                        className="rounded-circle mb-4"

                                        style={{

                                            width: "140px",

                                            height: "140px",

                                            objectFit: "cover"

                                        }}

                                    />


                                ) : (


                                    <div

                                        className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-4"

                                        style={{

                                            width: "140px",

                                            height: "140px",

                                            fontSize: "60px"

                                        }}

                                    >

                                        👤

                                    </div>


                                )
                            }




                            <h2 className="fw-bold">

                                Área do Cliente

                            </h2>


                            <hr />



                            <h4>

                                Olá, {user?.nome}

                            </h4>




                            <p>

                                Email: {user?.email}

                            </p>





                            <button

                                className="btn btn-outline-danger mt-3"

                                onClick={sair}

                            >

                                Sair

                            </button>



                        </div>


                    </div>


                </div>


            </div>


        </div>


    );

}


export default ClienteDashboard;