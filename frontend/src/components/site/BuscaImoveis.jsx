import { useState } from "react";
import { useNavigate } from "react-router-dom";


function BuscaImoveis() {


    const navigate = useNavigate();


    const [cidade, setCidade] = useState("");

    const [negocio, setNegocio] = useState("");

    const [tipo, setTipo] = useState("");

    const [bairro, setBairro] = useState("");

    const [quartos, setQuartos] = useState("");

    const [banheiros, setBanheiros] = useState("");

    const [vagas, setVagas] = useState("");

    const [valorMin, setValorMin] = useState("");

    const [valorMax, setValorMax] = useState("");




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

        if (bairro) {

            parametros.append(
                "bairro",
                bairro
            );

        }

        if (quartos) {

            parametros.append(
                "quartos",
                quartos
            );

        }

        if (banheiros) {

            parametros.append(
                "banheiros",
                banheiros
            );

        }

        if (vagas) {

            parametros.append(
                "vagas",
                vagas
            );

        }

        if (valorMin) {

            parametros.append(
                "valorMin",
                valorMin
            );

        }

        if (valorMax) {

            parametros.append(
                "valorMax",
                valorMax
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


                    <div className="card-body">

                        <div className="row g-3">

                            <div className="col-md-3">
                                <input
                                    className="form-control"
                                    placeholder="Cidade"
                                    value={cidade}
                                    onChange={e => setCidade(e.target.value)}
                                />
                            </div>

                            <div className="col-md-3">
                                <input
                                    className="form-control"
                                    placeholder="Bairro"
                                    value={bairro}
                                    onChange={e => setBairro(e.target.value)}
                                />
                            </div>

                            <div className="col-md-3">
                                <select
                                    className="form-select"
                                    value={negocio}
                                    onChange={e => setNegocio(e.target.value)}
                                >
                                    <option value="">Comprar ou Alugar</option>
                                    <option value="VENDA">Comprar</option>
                                    <option value="ALUGUEL">Alugar</option>
                                </select>
                            </div>

                            <div className="col-md-3">
                                <select
                                    className="form-select"
                                    value={tipo}
                                    onChange={e => setTipo(e.target.value)}
                                >
                                    <option value="">Tipo do imóvel</option>
                                    <option value="Casa">Casa</option>
                                    <option value="Apartamento">Apartamento</option>
                                    <option value="Terreno">Terreno</option>
                                </select>
                            </div>

                            <div className="col-md-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Quartos"
                                    value={quartos}
                                    onChange={e => setQuartos(e.target.value)}
                                />
                            </div>

                            <div className="col-md-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Banheiros"
                                    value={banheiros}
                                    onChange={e => setBanheiros(e.target.value)}
                                />
                            </div>

                            <div className="col-md-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Garagens"
                                    value={vagas}
                                    onChange={e => setVagas(e.target.value)}
                                />
                            </div>

                            <div className="col-md-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Valor mín."
                                    value={valorMin}
                                    onChange={e => setValorMin(e.target.value)}
                                />
                            </div>

                            <div className="col-md-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Valor máx."
                                    value={valorMax}
                                    onChange={e => setValorMax(e.target.value)}
                                />
                            </div>

                            <div className="col-md-2 d-grid">
                                <button
                                    className="btn btn-primary"
                                    onClick={buscar}
                                >
                                    Buscar
                                </button>
                            </div>

                        </div>

                    </div>


                </div>


            </div>


        </div>

    );

}


export default BuscaImoveis;