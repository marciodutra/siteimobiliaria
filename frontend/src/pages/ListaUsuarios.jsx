import { useEffect, useState } from "react";
import api from "../api/api";


function ListaUsuarios() {


    const [usuarios, setUsuarios] = useState([]);

    const [editando, setEditando] = useState(null);

    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);



    async function carregarUsuarios() {


        try {

            const resposta = await api.get("/usuarios");

            setUsuarios(resposta.data);


        } catch (error) {

            console.log(error);

        }

    }




    useEffect(() => {

        carregarUsuarios();

    }, []);







    async function excluir(id) {


        if (!confirm("Deseja excluir este usuário?")) {

            return;

        }


        try {


            await api.delete(`/usuarios/${id}`);


            carregarUsuarios();



        } catch (error) {


            alert(
                error.response?.data?.error ||
                "Erro ao excluir usuário"
            );


        }


    }









    async function salvarEdicao(usuario) {


        try {


            await api.put(

                `/usuarios/${usuario.id}`,

                {

                    nome: usuario.nome,

                    email: usuario.email,

                    tipo: usuario.tipo

                }

            );


            setEditando(null);

            carregarUsuarios();



        } catch (error) {


            alert(
                error.response?.data?.error ||
                "Erro ao editar usuário"
            );


        }


    }








    function alterarEdicao(e) {


        setEditando({

            ...editando,

            [e.target.name]: e.target.value

        });


    }








    return (


        <div className="container mt-5">


            <h2>
                Gerenciar usuários
            </h2>



            <div className="d-none d-md-block">


                <table className="table table-bordered table-sm mt-4">


                    <thead>

                        <tr>

                            <th>
                                Nome
                            </th>

                            <th>
                                Email
                            </th>

                            <th>
                                Tipo
                            </th>

                            <th>
                                Ações
                            </th>


                        </tr>

                    </thead>



                    <tbody>


                        {
                            usuarios.map(usuario => (


                                <tr key={usuario.id}>


                                    <td>


                                        {
                                            editando?.id === usuario.id ? (


                                                <input

                                                    className="form-control"

                                                    name="nome"

                                                    value={editando.nome}

                                                    onChange={alterarEdicao}

                                                />


                                            ) : (

                                                usuario.nome

                                            )

                                        }


                                    </td>





                                    <td>


                                        {
                                            editando?.id === usuario.id ? (


                                                <input

                                                    className="form-control"

                                                    name="email"

                                                    value={editando.email}

                                                    onChange={alterarEdicao}

                                                />


                                            ) : (

                                                usuario.email

                                            )

                                        }


                                    </td>






                                    <td>


                                        {
                                            editando?.id === usuario.id ? (


                                                <select

                                                    className="form-control"

                                                    name="tipo"

                                                    value={editando.tipo}

                                                    onChange={alterarEdicao}

                                                >


                                                    <option value="ADMIN">
                                                        ADMIN
                                                    </option>


                                                    <option value="CORRETOR">
                                                        CORRETOR
                                                    </option>


                                                    <option value="CLIENTE">
                                                        CLIENTE
                                                    </option>


                                                </select>


                                            ) : (

                                                usuario.tipo

                                            )

                                        }


                                    </td>






                                    <td>


                                        <div className="d-flex flex-column flex-md-row gap-2">


                                            {
                                                editando?.id === usuario.id ? (


                                                    <button

                                                        className="btn btn-success"

                                                        onClick={() => salvarEdicao(editando)}

                                                    >

                                                        Salvar

                                                    </button>


                                                ) : (


                                                    <button

                                                        className="btn btn-primary"

                                                        onClick={() => setEditando(usuario)}

                                                    >

                                                        Editar

                                                    </button>


                                                )

                                            }




                                            <button

                                                className="btn btn-danger"

                                                onClick={() => excluir(usuario.id)}

                                            >

                                                Excluir

                                            </button>


                                        </div>


                                    </td>


                                </tr>


                            ))

                        }


                    </tbody>



                </table>


            </div>

            <div className="d-block d-md-none mt-4">


                {
                    usuarios.map(usuario => (


                        <div
                            className="card mb-3 shadow-sm"
                            key={usuario.id}
                        >

                            <div className="card-body">


                                <h5>
                                    {usuario.nome}
                                </h5>


                                <p>
                                    <strong>Email:</strong>
                                    <br />
                                    {usuario.email}
                                </p>


                                <p>
                                    <strong>Tipo:</strong>
                                    <br />
                                    {usuario.tipo}
                                </p>



                                <div className="d-flex gap-2">


                                    <button

                                        className="btn btn-primary"

                                        onClick={() => setEditando(usuario)}

                                    >

                                        Editar

                                    </button>



                                    <button

                                        className="btn btn-danger"

                                        onClick={() => excluir(usuario.id)}

                                    >

                                        Excluir

                                    </button>


                                </div>


                            </div>

                        </div>


                    ))
                }


            </div>



        </div>


    );


}


export default ListaUsuarios;