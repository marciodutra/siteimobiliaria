import { useEffect, useState } from "react";
import api from "../api/api";


function Imoveis() {


    const [imoveis, setImoveis] = useState([]);



    async function carregarImoveis() {


        const response = await api.get("/imoveis");


        setImoveis(response.data);


    }



    useEffect(() => {

        carregarImoveis();

    }, []);



    return (

        <div className="container mt-5">


            <h1>
                Imóveis
            </h1>


            <div className="row">


                {imoveis.map(imovel => (


                    <div
                        className="col-md-4 mb-3"
                        key={imovel.id}
                    >

                        <div className="card">


                            <div className="card-body">


                                <h5>
                                    {imovel.titulo}
                                </h5>


                                <p>
                                    {imovel.cidade}
                                </p>


                                <p>
                                    R$ {imovel.valor}
                                </p>


                            </div>


                        </div>


                    </div>


                ))}


            </div>


        </div>

    );

}


export default Imoveis;