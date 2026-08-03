import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../api/api";


function DetalhesImovel() {


    const { id } = useParams();


    const [imovel, setImovel] = useState(null);
    const [imagemAtual, setImagemAtual] = useState(null);



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




    return (

        <div className="container mt-5 mb-5">


            <div className="row">


                <div className="col-md-7">


                    <img

                        src={
                            imagemAtual
                                ? `http://localhost:3000${imagemAtual.caminho}`
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

                                    src={`http://localhost:3000${img.caminho}`}

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