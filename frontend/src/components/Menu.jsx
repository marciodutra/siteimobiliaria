import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import api from "../api/api";


function Menu() {


    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [totalMensagens, setTotalMensagens] = useState(0);



    async function carregarContador() {


        try {


            const resposta = await api.get(
                "/mensagens/contador"
            );


            setTotalMensagens(
                resposta.data.total
            );


        } catch (error) {


            console.log(
                "Erro contador mensagens",
                error
            );


        }


    }




    useEffect(() => {


        if (user?.tipo === "CORRETOR") {

            carregarContador();

        }


    }, [user]);





    function sair() {

        logout();

        navigate("/");

    }



    return (


        <nav className="navbar navbar-dark bg-dark">


            <div className="container">



                <Link

                    className="navbar-brand"

                    to="/dashboard"

                >

                    Imobiliária

                </Link>




                <div>



                    <Link

                        className="btn btn-outline-light me-2"

                        to="/dashboard"

                    >

                        Dashboard

                    </Link>





                    {user?.tipo === "CORRETOR" && (

                        <>


                            <Link

                                className="btn btn-outline-light me-2"

                                to="/meus-imoveis"

                            >

                                Meus imóveis

                            </Link>





                            <Link

                                className="btn btn-outline-light me-2"

                                to="/mensagens"

                            >

                                Mensagens

                                {totalMensagens > 0 && (

                                    ` (${totalMensagens})`

                                )}

                            </Link>





                            <Link

                                className="btn btn-success me-2"

                                to="/cadastro-imovel"

                            >

                                Novo imóvel

                            </Link>


                        </>

                    )}






                    {user?.tipo === "ADMIN" && (


                        <Link

                            className="btn btn-warning me-2"

                            to="/usuarios"

                        >

                            Usuários

                        </Link>


                    )}






                    <button

                        className="btn btn-danger"

                        onClick={sair}

                    >

                        Sair

                    </button>



                </div>



            </div>



        </nav>


    );

}


export default Menu;