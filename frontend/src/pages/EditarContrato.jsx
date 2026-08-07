import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

function EditarContrato() {

    const { id } = useParams();

    const navigate = useNavigate();


    const [form, setForm] = useState({

        tipo: "",
        valor: "",
        dataInicio: "",
        dataFim: "",
        dataPagamento: "",
        status: ""

    });



    async function carregarContrato() {

        try {

            const resposta = await api.get(
                `/contratos/${id}`
            );


            const contrato = resposta.data;


            setForm({

                tipo: contrato.tipo || "",

                valor: contrato.valor || "",

                dataInicio: contrato.dataInicio
                    ? contrato.dataInicio.substring(0,10)
                    : "",

                dataFim: contrato.dataFim
                    ? contrato.dataFim.substring(0,10)
                    : "",

                dataPagamento: contrato.dataPagamento
                    ? contrato.dataPagamento.substring(0,10)
                    : "",

                status: contrato.status || ""

            });



        } catch(error) {

            console.log(error);

            alert(
                "Erro ao carregar contrato"
            );

        }

    }





    function alterarCampo(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }






    async function salvar(e) {

        e.preventDefault();


        try {


            await api.put(

                `/contratos/${id}`,

                form

            );


            alert(
                "Contrato atualizado com sucesso"
            );


            navigate("/contratos");



        } catch(error) {


            console.log(error);


            alert(
                "Erro ao atualizar contrato"
            );


        }


    }






    useEffect(() => {

        carregarContrato();

    }, []);







    return (


        <div className="container mt-5">


            <h2 className="mb-4">

                Editar Contrato

            </h2>




            <form onSubmit={salvar}>


                <div className="mb-3">

                    <label className="form-label">

                        Tipo

                    </label>


                    <input

                        className="form-control"

                        value={form.tipo}

                        readOnly

                    />


                </div>





                <div className="mb-3">

                    <label className="form-label">

                        Valor

                    </label>


                    <input

                        className="form-control"

                        type="number"

                        name="valor"

                        value={form.valor}

                        onChange={alterarCampo}

                    />

                </div>





                <div className="mb-3">

                    <label className="form-label">

                        Data início

                    </label>


                    <input

                        className="form-control"

                        type="date"

                        name="dataInicio"

                        value={form.dataInicio}

                        onChange={alterarCampo}

                    />

                </div>





                <div className="mb-3">

                    <label className="form-label">

                        Data pagamento aluguel

                    </label>


                    <input

                        className="form-control"

                        type="date"

                        name="dataPagamento"

                        value={form.dataPagamento}

                        onChange={alterarCampo}

                    />

                </div>





                <div className="mb-3">

                    <label className="form-label">

                        Data fim

                    </label>


                    <input

                        className="form-control"

                        type="date"

                        name="dataFim"

                        value={form.dataFim}

                        onChange={alterarCampo}

                    />

                </div>





                <div className="mb-3">

                    <label className="form-label">

                        Status

                    </label>


                    <select

                        className="form-select"

                        name="status"

                        value={form.status}

                        onChange={alterarCampo}

                    >

                        <option value="ATIVO">

                            ATIVO

                        </option>


                        <option value="FINALIZADO">

                            FINALIZADO

                        </option>


                        <option value="CANCELADO">

                            CANCELADO

                        </option>


                    </select>


                </div>





                <button

                    className="btn btn-success me-2"

                    type="submit"

                >

                    Salvar alterações

                </button>





                <button

                    type="button"

                    className="btn btn-secondary"

                    onClick={() => navigate("/contratos")}

                >

                    Voltar

                </button>



            </form>


        </div>


    );

}

export default EditarContrato;