import { useAuth } from "../auth/AuthContext";


function Dashboard() {


    const { user, logout } = useAuth();



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

                                        alt="Foto do usuário"

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


                                {user?.nome}


                            </h2>




                            <span className="badge bg-primary mb-4">


                                {user?.tipo}


                            </span>





                            {
                                user?.corretor && (


                                    <div className="text-start mt-4">


                                        <hr />


                                        <p>

                                            📞 <strong>Telefone:</strong>

                                            <br />

                                            {user.corretor.telefone}

                                        </p>



                                        <p>

                                            🪪 <strong>CRECI:</strong>

                                            <br />

                                            {user.corretor.creci}

                                        </p>


                                    </div>


                                )
                            }





                            <button

                                className="btn btn-outline-danger mt-4"

                                onClick={logout}

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


export default Dashboard;