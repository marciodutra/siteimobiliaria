import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../api/api";
import { useAuth } from "../auth/AuthContext";

import logo from "../assets/logo.png";


function ClienteLogin() {


    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const { login } = useAuth();

    const navigate = useNavigate();





    async function entrar(e) {


        e.preventDefault();

        setErro("");



        try {


            const resposta = await api.post("/auth/login", {

                email,

                senha

            });



            const { token, user } = resposta.data;



            if (user.tipo !== "CLIENTE") {


                setErro(
                    "Este acesso é exclusivo para clientes."
                );


                return;

            }



            login(token, user);



            navigate("/cliente/dashboard");



        } catch(error) {


            setErro(

                error.response?.data?.error ||

                "Erro ao realizar login"

            );


        }


    }





    return (


        <div

            className="container d-flex justify-content-center align-items-center"

            style={{
                minHeight:"80vh"
            }}

        >



            <div

                className="card shadow-sm p-4"

                style={{
                    width:"400px",
                    borderRadius:"15px"
                }}

            >



                <div className="text-center mb-4">


                    <img

                        src={logo}

                        alt="Dutra Imóveis"

                        style={{
                            width:"180px"
                        }}

                    />


                    <h3 className="mt-3">

                        Área do Cliente

                    </h3>


                </div>





                {
                    erro && (

                        <div className="alert alert-danger">

                            {erro}

                        </div>

                    )
                }





                <form onSubmit={entrar}>


                    <div className="mb-3">


                        <label className="form-label">

                            Email

                        </label>


                        <input

                            className="form-control"

                            type="email"

                            value={email}

                            onChange={
                                e => setEmail(e.target.value)
                            }

                            required

                        />


                    </div>





                    <div className="mb-3">


                        <label className="form-label">

                            Senha

                        </label>


                        <input

                            className="form-control"

                            type="password"

                            value={senha}

                            onChange={
                                e => setSenha(e.target.value)
                            }

                            required

                        />


                    </div>





                    <button

                        className="btn btn-primary w-100"

                    >

                        Entrar

                    </button>



                </form>





                <div className="text-center mt-3">


                    <Link

                        to="/cliente/cadastro"

                        className="text-decoration-none"

                    >

                        Primeiro acesso

                    </Link>


                    <br />


                    <Link

                        to="/"

                        className="text-decoration-none"

                    >

                        ← Voltar para o site

                    </Link>


                </div>




            </div>


        </div>


    );


}


export default ClienteLogin;