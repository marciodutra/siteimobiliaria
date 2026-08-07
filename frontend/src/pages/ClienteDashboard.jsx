import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/api";


function ClienteDashboard() {


    const { user, logout } = useAuth();

    const navigate = useNavigate();


    const [editando, setEditando] = useState(false);

    const [foto, setFoto] = useState(null);


    const [dados, setDados] = useState({

        nome: user?.nome || "",

        email: user?.email || "",

        telefone: user?.cliente?.telefone || "",

        cpf: user?.cliente?.cpf || "",

        rg: user?.cliente?.rg || "",

        dataNascimento: user?.cliente?.dataNascimento
            ?
            user.cliente.dataNascimento.substring(0, 10)
            :
            "",

        endereco: user?.cliente?.endereco || "",

        numero: user?.cliente?.numero || "",

        complemento: user?.cliente?.complemento || "",

        bairro: user?.cliente?.bairro || "",

        cidade: user?.cliente?.cidade || "",

        estado: user?.cliente?.estado || "",

        cep: user?.cliente?.cep || ""

    });



    function sair() {

        logout();

        navigate("/");

    }



    function alterar(e) {

        setDados({

            ...dados,

            [e.target.name]: e.target.value

        });

    }



    function selecionarFoto(e) {

        setFoto(e.target.files[0]);

    }




    async function salvar() {


        try {


            const formData = new FormData();



            Object.keys(dados).forEach(campo => {

                formData.append(

                    campo,

                    dados[campo]

                );

            });



            formData.append(

                "tipo",

                "CLIENTE"

            );




            if (foto) {

                formData.append(

                    "foto",

                    foto

                );

            }




            await api.put(

                `/usuarios/${user.id}`,

                formData,

                {

                    headers: {

                        "Content-Type":
                            "multipart/form-data"

                    }

                }

            );



            alert(
                "Dados atualizados"
            );


            setEditando(false);


            window.location.reload();



        } catch (error) {


            console.log(error);

            alert(
                "Erro ao atualizar dados"
            );


        }


    }




    return (

        <div className="container mt-5 mb-5">


            <h2 className="mb-4 fw-bold">

                Área do Cliente

            </h2>


            <div className="row g-4">



                <div className="col-md-4">


                    <div className="card shadow-sm border-0 text-center">


                        <div className="card-body p-4">



                            {
                                user?.foto ? (

                                    <img

                                        src={user.foto}

                                        alt="Foto do cliente"

                                        className="rounded-circle mb-3"

                                        style={{

                                            width: "130px",

                                            height: "130px",

                                            objectFit: "cover"

                                        }}

                                    />

                                ) : (

                                    <div

                                        className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3"

                                        style={{

                                            width: "130px",

                                            height: "130px",

                                            fontSize: "55px"

                                        }}

                                    >

                                        👤

                                    </div>

                                )
                            }



                            <h4 className="fw-bold">

                                {user?.nome}

                            </h4>



                            <span className="badge bg-primary">

                                Cliente

                            </span>



                            <p className="text-muted mt-3 mb-0">

                                {user?.email}

                            </p>



                            <button

                                className="btn btn-outline-danger w-100 mt-4"

                                onClick={sair}

                            >

                                Sair

                            </button>


                        </div>


                    </div>


                </div>
                <div className="col-md-8">


                    <div className="card shadow-sm border-0">


                        <div className="card-body p-4">



                            <div className="d-flex justify-content-between align-items-center mb-4">


                                <h4 className="fw-bold mb-0">

                                    Meus dados

                                </h4>



                                <button

                                    className="btn btn-primary"

                                    onClick={() => setEditando(true)}

                                >

                                    Editar dados

                                </button>


                            </div>





                            {
                                editando && (

                                    <div className="card bg-light p-3 mb-4">


                                        <div className="row">



                                            <div className="col-md-6 mb-3">

                                                <label className="fw-bold">

                                                    Nome

                                                </label>


                                                <input

                                                    className="form-control"

                                                    name="nome"

                                                    value={dados.nome}

                                                    onChange={alterar}

                                                />

                                            </div>




                                            <div className="col-md-6 mb-3">

                                                <label className="fw-bold">

                                                    Email

                                                </label>


                                                <input

                                                    className="form-control"

                                                    name="email"

                                                    value={dados.email}

                                                    onChange={alterar}

                                                />

                                            </div>




                                            {
                                                Object.keys(dados)
                                                    .filter(
                                                        campo =>
                                                            campo !== "nome" &&
                                                            campo !== "email"
                                                    )
                                                    .map((campo) => (


                                                        <div

                                                            className="col-md-6 mb-3"

                                                            key={campo}

                                                        >


                                                            <label className="fw-bold">

                                                                {
                                                                    campo
                                                                        .replace(
                                                                            /([A-Z])/g,
                                                                            " $1"
                                                                        )
                                                                        .replace(
                                                                            /^./,
                                                                            letra =>
                                                                                letra.toUpperCase()
                                                                        )
                                                                }

                                                            </label>


                                                            <input

                                                                className="form-control"

                                                                type={
                                                                    campo === "dataNascimento"
                                                                        ?
                                                                        "date"
                                                                        :
                                                                        "text"
                                                                }

                                                                name={campo}

                                                                value={dados[campo]}

                                                                onChange={alterar}

                                                            />


                                                        </div>


                                                    ))
                                            }




                                            <div className="col-md-12 mb-3">


                                                <label className="fw-bold">

                                                    Nova foto

                                                </label>


                                                <input

                                                    type="file"

                                                    className="form-control"

                                                    accept="image/*"

                                                    onChange={selecionarFoto}

                                                />


                                            </div>



                                        </div>




                                        <button

                                            className="btn btn-success me-2"

                                            onClick={salvar}

                                        >

                                            Salvar alterações

                                        </button>



                                        <button

                                            className="btn btn-secondary"

                                            onClick={() => setEditando(false)}

                                        >

                                            Cancelar

                                        </button>



                                    </div>


                                )
                            }






                            <div className="row">


                                <div className="col-md-6 mb-3">

                                    <strong>
                                        Telefone
                                    </strong>

                                    <br />

                                    {user?.cliente?.telefone || "-"}

                                </div>



                                <div className="col-md-6 mb-3">

                                    <strong>
                                        CPF
                                    </strong>

                                    <br />

                                    {user?.cliente?.cpf || "-"}

                                </div>



                                <div className="col-md-6 mb-3">

                                    <strong>
                                        RG
                                    </strong>

                                    <br />

                                    {user?.cliente?.rg || "-"}

                                </div>



                                <div className="col-md-6 mb-3">

                                    <strong>
                                        Data nascimento
                                    </strong>

                                    <br />

                                    {
                                        user?.cliente?.dataNascimento
                                            ?
                                            new Date(
                                                user.cliente.dataNascimento
                                            )
                                                .toLocaleDateString("pt-BR")
                                            :
                                            "-"
                                    }

                                </div>



                                <div className="col-md-12 mb-3">

                                    <strong>
                                        Endereço
                                    </strong>

                                    <br />

                                    {user?.cliente?.endereco || "-"}

                                    {
                                        user?.cliente?.numero &&
                                        `, ${user.cliente.numero}`
                                    }

                                </div>




                                <div className="col-md-6 mb-3">

                                    <strong>
                                        Bairro
                                    </strong>

                                    <br />

                                    {user?.cliente?.bairro || "-"}

                                </div>




                                <div className="col-md-6 mb-3">

                                    <strong>
                                        Cidade / Estado
                                    </strong>

                                    <br />

                                    {user?.cliente?.cidade || "-"}

                                    {" - "}

                                    {user?.cliente?.estado || "-"}

                                </div>




                                <div className="col-md-6 mb-3">

                                    <strong>
                                        CEP
                                    </strong>

                                    <br />

                                    {user?.cliente?.cep || "-"}

                                </div>


                            </div>



                        </div>


                    </div>





                    <div className="row mt-4 g-3">


                        <div className="col-md-4">

                            <div

                                className="card shadow-sm border-0 text-center"

                                style={{ cursor: "pointer" }}

                                onClick={() => navigate("/cliente/imoveis")}

                            >

                                <div className="card-body">

                                    🏠

                                    <h6 className="mt-2">

                                        Meus imóveis

                                    </h6>

                                </div>

                            </div>

                        </div>




                        <div className="col-md-4">

                            <div className="card shadow-sm border-0 text-center">

                                <div className="card-body">

                                    📄

                                    <h6 className="mt-2">

                                        Contratos

                                    </h6>

                                </div>

                            </div>

                        </div>




                        <div className="col-md-4">

                            <div className="card shadow-sm border-0 text-center">

                                <div className="card-body">

                                    💳

                                    <h6 className="mt-2">

                                        Boletos

                                    </h6>

                                </div>

                            </div>

                        </div>



                    </div>




                </div>



            </div>


        </div>


    );


}


export default ClienteDashboard;