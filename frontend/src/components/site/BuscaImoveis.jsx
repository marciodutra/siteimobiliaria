import { useState } from "react";
import { useNavigate } from "react-router-dom";


function BuscaImoveis() {


    const navigate = useNavigate();


    const [cidade, setCidade] = useState("");

    const [negocio, setNegocio] = useState("");

    const [tipo, setTipo] = useState("");




    function buscar() {


        const parametros = new URLSearchParams();



        if (cidade) {

            parametros.append(
                "cidade",
                cidade
            );

        }



        if (negocio) {

            parametros.append(
                "negocio",
                negocio
            );

        }



        if (tipo) {

            parametros.append(
                "tipo",
                tipo
            );

        }



        navigate(
            `/buscar-imoveis?${parametros.toString()}`
        );


    }





    return (

        <div className="container mt-4">


            <div className="card shadow">


                <div className="card-body">


                    <div className="row g-3">



                        <div className="col-md-3">

                            <input

                                className="form-control"

                                placeholder="Cidade"

                                value={cidade}

                                onChange={
                                    e => setCidade(e.target.value)
                                }

                            />

                        </div>




                        <div className="col-md-3">


                            <select

                                className="form-select"

                                value={negocio}

                                onChange={
                                    e => setNegocio(e.target.value)
                                }

                            >

                                <option value="">
                                    Todos
                                </option>


                                <option value="VENDA">
                                    Comprar
                                </option>


                                <option value="ALUGUEL">
                                    Alugar
                                </option>


                            </select>


                        </div>




                        <div className="col-md-3">


                            <select

                                className="form-select"

                                value={tipo}

                                onChange={
                                    e => setTipo(e.target.value)
                                }

                            >


                                <option value="">
                                    Todos
                                </option>


                                <option value="Casa">
                                    Casa
                                </option>


                                <option value="Apartamento">
                                    Apartamento
                                </option>


                                <option value="Terreno">
                                    Terreno
                                </option>


                            </select>


                        </div>




                        <div className="col-md-3">


                            <button

                                className="btn btn-primary w-100"

                                onClick={buscar}

                            >

                                Buscar

                            </button>


                        </div>




                    </div>


                </div>


            </div>


        </div>

    );

}


export default BuscaImoveis;