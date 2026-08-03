import { useEffect, useState } from "react";

import api from "../api/api";

import CardImovel from "../components/site/CardImovel";

import { useSearchParams } from "react-router-dom";


function BuscarImoveis() {


    const [imoveis, setImoveis] = useState([]);

    const [searchParams] = useSearchParams();



    useEffect(() => {


        async function carregarImoveis() {


            try {


                const query = searchParams.toString();


                const resposta = await api.get(
                    `/imoveis?${query}`
                );


                setImoveis(resposta.data);


            } catch (error) {


                console.error(
                    "Erro ao buscar imóveis",
                    error
                );


            }


        }


        carregarImoveis();


    }, [searchParams]);




    return (

        <div className="container mt-5 mb-5">


            <h1 className="mb-4">

                Imóveis disponíveis

            </h1>



            <div className="row g-4">


                {
                    imoveis.map(imovel => (

                        <div
                            className="col-md-4"
                            key={imovel.id}
                        >

                            <CardImovel

                                id={imovel.id}

                                titulo={imovel.titulo}

                                cidade={imovel.cidade}

                                valor={
                                    Number(imovel.valor)
                                        .toLocaleString("pt-BR")
                                }

                                imagens={imovel.imagens}

                            />


                        </div>

                    ))
                }


            </div>


        </div>

    );

}


export default BuscarImoveis;