import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../auth/AuthContext";


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

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-4">


                    <h2 className="mb-4">
                        Login
                    </h2>



                    {erro && (

                        <div className="alert alert-danger">

                            {erro}

                        </div>

                    )}



                    <form onSubmit={handleSubmit}>


                        <div className="mb-3">

                            <label>
                                Email
                            </label>

                            <input

                                type="email"

                                className="form-control"

                                value={email}

                                onChange={
                                    e => setEmail(e.target.value)
                                }

                            />

                        </div>



                        <div className="mb-3">

                            <label>
                                Senha
                            </label>

                            <input

                                type="password"

                                className="form-control"

                                value={senha}

                                onChange={
                                    e => setSenha(e.target.value)
                                }

                            />

                        </div>



                        <button className="btn btn-primary">

                            Entrar

                        </button>


                    </form>


                </div>

            </div>

        </div>

    );

}


export default Login;