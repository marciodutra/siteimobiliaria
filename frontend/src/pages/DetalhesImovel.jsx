import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../config";

import api from "../api/api";


function DetalhesImovel() {


    const { id } = useParams();


    const [imovel, setImovel] = useState(null);
    const [imagemAtual, setImagemAtual] = useState(null);
    const [formulario, setFormulario] = useState({

        nome: "",
        email: "",
        telefone: "",
        mensagem: ""

    });


    const [enviando, setEnviando] = useState(false);

    async function enviarMensagem(e) {

        e.preventDefault();


        try {

            setEnviando(true);


            await api.post("/mensagens", {

                ...formulario,

                imovelId: imovel.id

            });


            alert("Mensagem enviada com sucesso!");


            setFormulario({

                nome: "",
                email: "",
                telefone: "",
                mensagem: ""

            });


        } catch (error) {


            console.error(error);


            alert(
                error.response?.data?.error ||
                "Erro ao enviar mensagem"
            );


        } finally {

            setEnviando(false);

        }

    }


    useEffect(() => {


        async function carregarImovel() {


            try {


                const resposta = await api.get(
                    `/imoveis/${id}`
                );


                setImovel(resposta.data);

                if (resposta.data.imagens?.length > 0) {

                    const principal = resposta.data.imagens.find(
                        img => img.principal
                    );


                    setImagemAtual(
                        principal || resposta.data.imagens[0]
                    );

                }


            } catch (error) {


                console.error(
                    "Erro ao buscar imóvel:",
                    error
                );


            }


        }


        carregarImovel();


    }, [id]);




    if (!imovel) {


        return (

            <div className="container mt-5">

                Carregando imóvel...

            </div>

        );

    }

    function alterarCampo(e) {

        setFormulario({

            ...formulario,

            [e.target.name]: e.target.value

        });

    }


    return (

        <div className="container mt-5 mb-5">


            <div className="row">


                <div className="col-md-7">


                    <img

                        src={
                            imagemAtual
                                ? `${API_URL}${imagemAtual.caminho}`
                                : "https://placehold.co/800x500"
                        }

                        className="img-fluid rounded shadow"

                        style={{
                            width: "100%",
                            height: "450px",
                            objectFit: "cover"
                        }}

                        alt={imovel.titulo}

                    />

                    <div className="d-flex gap-2 mt-3">


                        {
                            imovel.imagens?.map((img) => (


                                <img

                                    key={img.id}

                                    src={`${API_URL}${img.caminho}`}

                                    onClick={() => setImagemAtual(img)}

                                    style={{

                                        width: "100px",

                                        height: "70px",

                                        objectFit: "cover",

                                        cursor: "pointer"

                                    }}

                                    className="rounded border"

                                    alt="Imagem imóvel"

                                />


                            ))
                        }


                    </div>


                </div>




                <div className="col-md-5">


                    <h1>

                        {imovel.titulo}

                    </h1>


                    <h3 className="text-primary">

                        R$ {
                            Number(imovel.valor)
                                .toLocaleString("pt-BR")
                        }

                    </h3>


                    <p>

                        {imovel.tipo} - {imovel.negocio}

                    </p>


                    <hr />


                    <p>

                        📍 {imovel.cidade} - {imovel.bairro}

                    </p>


                    <p>

                        Endereço:
                        <br />

                        {imovel.endereco}

                    </p>


                </div>


            </div>




            <div className="card mt-4 shadow-sm">


                <div className="card-body">


                    <h3>

                        Detalhes do imóvel

                    </h3>



                    <div className="row mt-3">


                        <div className="col-md-3">

                            🛏 {imovel.quartos}
                            <br />
                            Quartos

                        </div>


                        <div className="col-md-3">

                            🚿 {imovel.banheiros}
                            <br />
                            Banheiros

                        </div>


                        <div className="col-md-3">

                            🏠 {imovel.suites}
                            <br />
                            Suítes

                        </div>


                        <div className="col-md-3">

                            🚗 {imovel.vagas}
                            <br />
                            Vagas

                        </div>


                    </div>



                    <div className="mt-3">

                        📐 Área:
                        {imovel.area} m²

                    </div>


                </div>


            </div>





            <div className="card mt-4 shadow-sm">


                <div className="card-body">


                    <h3>

                        Descrição

                    </h3>


                    <p>

                        {imovel.descricao}

                    </p>


                </div>


            </div>

            <div className="card mt-4 shadow-sm">

                <div className="card-body">

                    <h3>
                        Tenho interesse neste imóvel
                    </h3>


                    <form onSubmit={enviarMensagem}>


                        <input

                            className="form-control mb-2"

                            name="nome"

                            placeholder="Seu nome"

                            value={formulario.nome}

                            onChange={alterarCampo}

                            required

                        />


                        <input

                            className="form-control mb-2"

                            name="email"

                            type="email"

                            placeholder="Seu email"

                            value={formulario.email}

                            onChange={alterarCampo}

                            required

                        />


                        <input

                            className="form-control mb-2"

                            name="telefone"

                            placeholder="Seu telefone"

                            value={formulario.telefone}

                            onChange={alterarCampo}

                        />


                        <textarea

                            className="form-control mb-3"

                            name="mensagem"

                            rows="4"

                            placeholder="Digite sua mensagem"

                            value={formulario.mensagem}

                            onChange={alterarCampo}

                            required

                        />


                        <button

                            className="btn btn-success"

                            disabled={enviando}

                        >

                            {enviando
                                ? "Enviando..."
                                : "Enviar mensagem"
                            }

                        </button>


                    </form>


                </div>

            </div>


            <div className="card mt-4 shadow-sm">


                <div className="card-body">


                    <h3>

                        Corretor

                    </h3>


                    <p>

                        {imovel.corretor?.nome}

                    </p>


                    <p>

                        Telefone:
                        {imovel.corretor?.telefone}

                    </p>


                </div>


            </div>



        </div>

    );

}


export default DetalhesImovel;