import { useEffect, useState } from "react";

import CardImovel from "../components/site/CardImovel";

import api from "../api/api";


function Comprar() {


    const [imoveis, setImoveis] = useState([]);


    useEffect(() => {


        async function carregarImoveis() {


            try {


                const resposta = await api.get("/imoveis?negocio=VENDA");


                setImoveis(resposta.data);


            } catch (error) {


                console.error(
                    "Erro ao carregar imóveis:",
                    error
                );


            }


        }


        carregarImoveis();


    }, []);



    return (

        <div className="container my-5">


            <h2 className="mb-4">

                Imóveis à venda

            </h2>



            <div className="row g-4">


                {
                    imoveis.map((imovel) => (

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


export default Comprar;