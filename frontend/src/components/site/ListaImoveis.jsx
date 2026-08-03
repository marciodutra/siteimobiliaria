import { useEffect, useState } from "react";
import api from "../../api/api";
import CardImovel from "./CardImovel";


function ListaImoveis() {


    const [imoveis, setImoveis] = useState([]);


    useEffect(() => {

        async function carregarImoveis(){

            try {

                const resposta = await api.get("/imoveis");

                setImoveis(resposta.data);


            } catch(error){

                console.error(
                    "Erro ao carregar imóveis:",
                    error
                );

            }

        }


        carregarImoveis();


    }, []);



    return (

        <section 
            id="imoveis"
            className="container py-5"
        >

            <h2 className="text-center mb-5">
                Imóveis em destaque
            </h2>


            <div className="row g-4">


                {
                    imoveis.map((imovel)=>(

                        <div 
                            className="col-md-4"
                            key={imovel.id}
                        >

                            <CardImovel 
                                imovel={imovel}
                            />

                        </div>

                    ))
                }


            </div>


        </section>

    );

}


export default ListaImoveis;