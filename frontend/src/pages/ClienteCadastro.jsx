import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api/api";

import logo from "../assets/logo.png";



function ClienteCadastro() {


    const navigate = useNavigate();


    const [form, setForm] = useState({

        nome: "",
        email: "",
        senha: "",
        telefone: "",
        cpf: "",
        rg: "",
        dataNascimento: "",
        endereco: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: ""

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

            formData.append(
                "telefone",
                form.telefone
            );


            formData.append(
                "cpf",
                form.cpf
            );


            formData.append(
                "rg",
                form.rg
            );


            formData.append(
                "dataNascimento",
                form.dataNascimento
            );


            formData.append(
                "endereco",
                form.endereco
            );


            formData.append(
                "numero",
                form.numero
            );


            formData.append(
                "complemento",
                form.complemento
            );


            formData.append(
                "bairro",
                form.bairro
            );


            formData.append(
                "cidade",
                form.cidade
            );


            formData.append(
                "estado",
                form.estado
            );


            formData.append(
                "cep",
                form.cep
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
                        placeholder="Telefone"
                        name="telefone"
                        value={form.telefone}
                        onChange={alterar}
                    />


                    <input
                        className="form-control mb-3"
                        placeholder="CPF"
                        name="cpf"
                        value={form.cpf}
                        onChange={alterar}
                    />


                    <input
                        className="form-control mb-3"
                        placeholder="RG"
                        name="rg"
                        value={form.rg}
                        onChange={alterar}
                    />


                    <label>
                        Data de nascimento
                    </label>

                    <input
                        className="form-control mb-3"
                        type="date"
                        name="dataNascimento"
                        value={form.dataNascimento}
                        onChange={alterar}
                    />


                    <input
                        className="form-control mb-3"
                        placeholder="Endereço"
                        name="endereco"
                        value={form.endereco}
                        onChange={alterar}
                    />


                    <input
                        className="form-control mb-3"
                        placeholder="Número"
                        name="numero"
                        value={form.numero}
                        onChange={alterar}
                    />


                    <input
                        className="form-control mb-3"
                        placeholder="Complemento"
                        name="complemento"
                        value={form.complemento}
                        onChange={alterar}
                    />


                    <input
                        className="form-control mb-3"
                        placeholder="Bairro"
                        name="bairro"
                        value={form.bairro}
                        onChange={alterar
                        }
                    />


                    <input
                        className="form-control mb-3"
                        placeholder="Cidade"
                        name="cidade"
                        value={form.cidade}
                        onChange={alterar}
                    />


                    <input
                        className="form-control mb-3"
                        placeholder="Estado"
                        name="estado"
                        value={form.estado}
                        onChange={alterar}
                    />


                    <input
                        className="form-control mb-3"
                        placeholder="CEP"
                        name="cep"
                        value={form.cep}
                        onChange={alterar}
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