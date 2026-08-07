import { useEffect, useState } from "react";

import CardImovel from "../components/site/CardImovel";

import api from "../api/api";



function Alugar() {


    const [imoveis, setImoveis] = useState([]);




    useEffect(() => {


        async function carregarImoveis() {


            try {


                const resposta = await api.get("/imoveis?negocio=ALUGUEL");


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

                Imóveis para alugar

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




            {
                imoveis.length === 0 && (


                    <div className="alert alert-info mt-4">

                        Nenhum imóvel disponível para aluguel.

                    </div>


                )
            }



        </div>


    );


}


export default Alugar;