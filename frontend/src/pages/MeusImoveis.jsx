import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";


function MeusImoveis() {


    const [imoveis, setImoveis] = useState([]);

    const { user } = useAuth();



    async function carregarImoveis() {


        try {


            const response = await api.get("/imoveis");


            const meus = response.data.filter(
                imovel =>
                    imovel.corretor?.userId === user.id
            );


            setImoveis(meus);



        } catch (error) {


            console.log(error);


        }


    }



    async function remover(id) {


        if (!confirm("Deseja excluir este imóvel?")) {

            return;

        }


        try {


            await api.delete(
                `/imoveis/${id}`
            );


            carregarImoveis();


        } catch (error) {


            alert(
                error.response?.data?.error ||
                "Erro ao excluir"
            );


        }


    }




    useEffect(() => {

        if (user) {

            carregarImoveis();

        }

    }, [user]);


    return (

        <div className="container mt-5">


            <h2>
                Meus Imóveis
            </h2>



            <div className="row">


                {imoveis.map(imovel => (


                    <div
                        className="col-md-4 mb-3"
                        key={imovel.id}
                    >


                        <div className="card">


                            {
                                imovel.imagens &&
                                imovel.imagens.length > 0 && (

                                    <img

                                        src={
                                            `http://localhost:3000${imovel.imagens[0].caminho}`
                                        }

                                        className="card-img-top"

                                        style={{
                                            height: "220px",
                                            objectFit: "cover"
                                        }}

                                        alt={imovel.titulo}

                                    />

                                )
                            }



                            <div className="card-body">


                                <h5>
                                    {imovel.titulo}
                                </h5>


                                <p>
                                    Código: {imovel.codigo}
                                </p>


                                <p>
                                    Cidade: {imovel.cidade}
                                </p>


                                <p>
                                    Valor:
                                    R$ {imovel.valor}
                                </p>


                                <div className="mt-3">


                                    <Link

                                        className="btn btn-primary me-2"

                                        to={`/editar-imovel/${imovel.id}`}

                                    >

                                        Editar

                                    </Link>




                                    <button

                                        className="btn btn-danger"

                                        onClick={() => remover(imovel.id)}

                                    >

                                        Excluir

                                    </button>



                                </div>


                            </div>


                        </div>


                    </div>


                ))}



            </div>



            {imoveis.length === 0 && (

                <div className="alert alert-info">

                    Nenhum imóvel cadastrado.

                </div>

            )}



        </div>

    );

}


export default MeusImoveis;