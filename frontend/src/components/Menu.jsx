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


                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menuSistema"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>



                <div
                    className="collapse navbar-collapse"
                    id="menuSistema"
                >

                    <div className="ms-auto d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">


                        <Link
                            className="btn btn-outline-light"
                            to="/dashboard"
                        >
                            Dashboard
                        </Link>



                        {user?.tipo === "CORRETOR" && (

                            <>

                                <Link
                                    className="btn btn-outline-light"
                                    to="/meus-imoveis"
                                >
                                    Meus imóveis
                                </Link>


                                <Link
                                    className="btn btn-outline-light"
                                    to="/contratos"
                                >
                                    Contratos
                                </Link>



                                <Link
                                    className="btn btn-outline-light"
                                    to="/mensagens"
                                >
                                    Mensagens
                                    {totalMensagens > 0 && (
                                        ` (${totalMensagens})`
                                    )}
                                </Link>



                                <Link
                                    className="btn btn-success"
                                    to="/cadastro-imovel"
                                >
                                    Novo imóvel
                                </Link>

                            </>

                        )}




                        {user?.tipo === "ADMIN" && (

                            <>

                                <Link
                                    className="btn btn-warning"
                                    to="/usuarios"
                                >
                                    Cadastrar usuário
                                </Link>



                                <Link
                                    className="btn btn-info"
                                    to="/lista-usuarios"
                                >
                                    Gerenciar usuários
                                </Link>

                            </>

                        )}




                        <button
                            className="btn btn-danger"
                            onClick={sair}
                        >
                            Sair
                        </button>


                    </div>


                </div>


            </div>


        </nav>

    );

}


export default Menu;