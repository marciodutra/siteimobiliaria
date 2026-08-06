import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api/api";

import logo from "../assets/logo.png";



function ClienteCadastro() {


    const navigate = useNavigate();


    const [form, setForm] = useState({

        nome: "",
        email: "",
        senha: ""

    });


    const [foto, setFoto] = useState(null);



    const [erro, setErro] = useState("");





    function alterar(e) {


        setForm({

            ...form,

            [e.target.name]: e.target.value

        });


    }

    function selecionarFoto(e) {

        setFoto(e.target.files[0]);

    }


    async function cadastrar(e) {


        e.preventDefault();


        setErro("");



        try {


            const formData = new FormData();


            formData.append(
                "nome",
                form.nome
            );


            formData.append(
                "email",
                form.email
            );


            formData.append(
                "senha",
                form.senha
            );


            if (foto) {

                formData.append(
                    "foto",
                    foto
                );

            }



            await api.post(

                "/auth/register",

                formData,

                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }

            );



            alert(
                "Cadastro realizado com sucesso. Faça seu login."
            );


            navigate("/cliente/login");



        } catch (error) {


            setErro(

                error.response?.data?.error ||

                "Erro ao cadastrar"

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
                            width: "180px"
                        }}

                    />


                    <h3 className="mt-3">

                        Cadastro de Cliente

                    </h3>


                </div>





                {
                    erro && (

                        <div className="alert alert-danger">

                            {erro}

                        </div>

                    )
                }





                <form onSubmit={cadastrar}>


                    <input

                        className="form-control mb-3"

                        placeholder="Nome"

                        name="nome"

                        value={form.nome}

                        onChange={alterar}

                        required

                    />





                    <input

                        className="form-control mb-3"

                        placeholder="Email"

                        type="email"

                        name="email"

                        value={form.email}

                        onChange={alterar}

                        required

                    />





                    <input

                        className="form-control mb-3"

                        placeholder="Senha"

                        type="password"

                        name="senha"

                        value={form.senha}

                        onChange={alterar}

                        required

                    />

                    <input

                        className="form-control mb-3"

                        type="file"

                        accept="image/*"

                        onChange={selecionarFoto}

                    />

                    <button

                        className="btn btn-primary w-100"

                    >

                        Criar conta

                    </button>



                </form>





                <div className="text-center mt-3">


                    <Link

                        to="/cliente/login"

                        className="text-decoration-none"

                    >

                        Já tenho cadastro

                    </Link>



                </div>



            </div>


        </div>


    );


}


export default ClienteCadastro;