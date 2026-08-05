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


    const [foto, setFoto] = useState(null);



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


        try {



            const formData = new FormData();



            formData.append("nome", form.nome);

            formData.append("email", form.email);

            formData.append("senha", form.senha);

            formData.append("tipo", form.tipo);

            formData.append("telefone", form.telefone);

            formData.append("creci", form.creci);



            if (foto) {

                formData.append("foto", foto);

            }




            await api.post(

                "/usuarios",

                formData,

                {

                    headers: {

                        "Content-Type": "multipart/form-data"

                    }

                }

            );





            alert("Usuário cadastrado com sucesso");




            setForm({

                nome: "",

                email: "",

                senha: "",

                tipo: "CORRETOR",

                telefone: "",

                creci: ""

            });



            setFoto(null);




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





                        <div className="mb-3">


                            <label>
                                Foto do corretor
                            </label>


                            <input

                                className="form-control"

                                type="file"

                                accept="image/*"

                                onChange={selecionarFoto}

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