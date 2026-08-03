import { useState } from "react";
import api from "../api/api";


function Usuarios() {


    const [form, setForm] = useState({

        nome: "",
        email: "",
        senha: "",
        tipo: "CORRETOR",
        telefone: "",
        creci: ""

    });



    function alterar(e) {

        setForm({

            ...form,
            [e.target.name]: e.target.value

        });

    }



    async function cadastrar(e) {

        e.preventDefault();


        try {


            await api.post("/usuarios", form);


            alert("Usuário cadastrado com sucesso");


            setForm({

                nome: "",
                email: "",
                senha: "",
                tipo: "CORRETOR",
                telefone: "",
                creci: ""

            });


        } catch(error) {


            console.log(error);


            alert(
                error.response?.data?.error ||
                "Erro ao cadastrar usuário"
            );


        }


    }



    return (


        <div className="container mt-5">


            <h1>
                Cadastro de usuários
            </h1>



            <form onSubmit={cadastrar}>


                <div className="mb-3">

                    <label>
                        Nome
                    </label>

                    <input
                        className="form-control"
                        name="nome"
                        value={form.nome}
                        onChange={alterar}
                    />

                </div>



                <div className="mb-3">

                    <label>
                        Email
                    </label>

                    <input
                        className="form-control"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={alterar}
                    />

                </div>



                <div className="mb-3">

                    <label>
                        Senha
                    </label>

                    <input
                        className="form-control"
                        name="senha"
                        type="password"
                        value={form.senha}
                        onChange={alterar}
                    />

                </div>



                <div className="mb-3">

                    <label>
                        Tipo de usuário
                    </label>


                    <select
                        className="form-control"
                        name="tipo"
                        value={form.tipo}
                        onChange={alterar}
                    >

                        <option value="CORRETOR">
                            Corretor
                        </option>


                        <option value="ADMIN">
                            Administrador
                        </option>


                    </select>


                </div>



                {form.tipo === "CORRETOR" && (

                    <>


                        <div className="mb-3">

                            <label>
                                Telefone
                            </label>


                            <input

                                className="form-control"
                                name="telefone"
                                value={form.telefone}
                                onChange={alterar}

                            />

                        </div>



                        <div className="mb-3">

                            <label>
                                CRECI
                            </label>


                            <input

                                className="form-control"
                                name="creci"
                                value={form.creci}
                                onChange={alterar}

                            />

                        </div>


                    </>

                )}



                <button className="btn btn-success">

                    Cadastrar

                </button>


            </form>


        </div>


    );


}


export default Usuarios;