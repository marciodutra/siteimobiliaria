import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../api/api";
import { useAuth } from "../auth/AuthContext";

import logo from "../assets/logo.png";


function Login() {


    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const { login } = useAuth();

    const navigate = useNavigate();



    async function handleSubmit(e) {

        e.preventDefault();

        setErro("");

        try {


            const response = await api.post("/auth/login", {

                email,
                senha

            });



            const { token, user } = response.data;


            login(token, user);


            navigate("/dashboard");


        } catch (error) {


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
                minHeight: "80vh"
            }}
        >


            <div 
                className="card shadow-sm p-4"
                style={{
                    width: "400px",
                    borderRadius: "15px"
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

                        Área administrativa

                    </h3>


                </div>




                {erro && (

                    <div className="alert alert-danger">

                        {erro}

                    </div>

                )}






                <form onSubmit={handleSubmit}>


                    <div className="mb-3">


                        <label className="form-label">

                            Email

                        </label>


                        <input

                            type="email"

                            className="form-control"

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

                            type="password"

                            className="form-control"

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


export default Login;