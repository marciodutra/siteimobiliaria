import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function NovoContrato() {

    const navigate = useNavigate();

    const { user } = useAuth();

    const [clientes, setClientes] = useState([]);

    const [imoveis, setImoveis] = useState([]);

    const [form, setForm] = useState({

        tipo: "",
        valor: "",
        dataInicio: "",
        dataFim: "",
        dataPagamento: "",
        status: "ATIVO",
        clienteId: "",
        imovelId: "",

        formaPagamento: "A_VISTA",
        quantidadeParcelas: "",
        dataPrimeiroVencimento: ""

    });



    async function carregarDados() {

        try {

            const usuarios = await api.get("/usuarios");

            const listaClientes = usuarios.data.filter(

                usuario =>
                    usuario.tipo === "CLIENTE" &&
                    usuario.cliente

            );

            setClientes(listaClientes);



            const respostaImoveis = await api.get("/imoveis");

            const disponiveis = respostaImoveis.data.filter(

                imovel =>
                    imovel.status === "DISPONIVEL" &&
                    imovel.corretor?.userId === user.id

            );

            setImoveis(disponiveis);

        } catch (error) {

            console.log(error);

        }

    }



    function alterarCampo(e) {

        const { name, value } = e.target;



        if (name === "imovelId") {

            const imovelSelecionado = imoveis.find(

                imovel =>
                    imovel.id === Number(value)

            );



            setForm({

                ...form,

                imovelId: value,

                valor: imovelSelecionado
                    ? imovelSelecionado.valor
                    : "",

                tipo: imovelSelecionado
                    ? imovelSelecionado.negocio
                    : "",

                formaPagamento:
                    imovelSelecionado?.negocio === "VENDA"
                        ? "A_VISTA"
                        : "A_VISTA"

            });

            return;

        }



        setForm({

            ...form,

            [name]: value

        });

    }



    async function salvar(e) {

        e.preventDefault();



        try {

            const dados = {

                tipo: form.tipo,

                valor: form.valor,

                dataInicio: form.dataInicio || null,

                dataFim: form.dataFim || null,

                dataPagamento:
                    form.tipo === "ALUGUEL"
                        ? form.dataPagamento || null
                        : null,

                status: form.status,

                clienteId: form.clienteId,

                imovelId: form.imovelId,

                formaPagamento:
                    form.tipo === "VENDA"
                        ? form.formaPagamento
                        : null,

                quantidadeParcelas:
                    form.tipo === "VENDA" &&
                    form.formaPagamento === "PARCELADO"
                        ? Number(form.quantidadeParcelas)
                        : null,

                dataPrimeiroVencimento:
                    form.tipo === "VENDA" &&
                    form.formaPagamento === "PARCELADO"
                        ? form.dataPrimeiroVencimento
                        : null

            };



            await api.post(

                "/contratos",

                dados

            );



            alert("Contrato criado com sucesso");

            navigate("/contratos");



        } catch (error) {

            console.log(error);

            alert(

                error.response?.data?.error ||

                "Erro ao criar contrato"

            );

        }

    }



    useEffect(() => {

        if (user) {

            carregarDados();

        }

    }, [user]);



    return (

        <div className="container mt-5 mb-5">

            <h2 className="mb-4">

                Novo Contrato

            </h2>



            <form onSubmit={salvar}>



                <div className="mb-3">

                    <label className="form-label">

                        Cliente

                    </label>



                    <select

                        className="form-select"

                        name="clienteId"

                        value={form.clienteId}

                        onChange={alterarCampo}

                        required

                    >

                        <option value="">

                            Selecione

                        </option>



                        {clientes.map(cliente => (

                            <option

                                key={cliente.id}

                                value={cliente.cliente.id}

                            >

                                {cliente.nome}

                            </option>

                        ))}

                    </select>

                </div>



                <div className="mb-3">

                    <label className="form-label">

                        Imóvel

                    </label>



                    <select

                        className="form-select"

                        name="imovelId"

                        value={form.imovelId}

                        onChange={alterarCampo}

                        required

                    >

                        <option value="">

                            Selecione

                        </option>



                        {imoveis.map(imovel => (

                            <option

                                key={imovel.id}

                                value={imovel.id}

                            >

                                {imovel.titulo}

                                {" - "}

                                {imovel.negocio}

                            </option>

                        ))}

                    </select>

                </div>



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

                        step="0.01"

                        name="valor"

                        value={form.valor}

                        onChange={alterarCampo}

                        required

                    />

                </div>



                {form.tipo === "VENDA" && (

                    <>

                        <div className="mb-3">

                            <label className="form-label">

                                Forma de pagamento

                            </label>



                            <select

                                className="form-select"

                                name="formaPagamento"

                                value={form.formaPagamento}

                                onChange={alterarCampo}

                                required

                            >

                                <option value="A_VISTA">

                                    À vista

                                </option>



                                <option value="PARCELADO">

                                    Parcelado

                                </option>

                            </select>

                        </div>



                        {form.formaPagamento === "PARCELADO" && (

                            <>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Quantidade de parcelas

                                    </label>



                                    <input

                                        className="form-control"

                                        type="number"

                                        min="2"

                                        name="quantidadeParcelas"

                                        value={form.quantidadeParcelas}

                                        onChange={alterarCampo}

                                        required

                                    />

                                </div>



                                <div className="mb-3">

                                    <label className="form-label">

                                        Primeiro vencimento

                                    </label>



                                    <input

                                        className="form-control"

                                        type="date"

                                        name="dataPrimeiroVencimento"

                                        value={form.dataPrimeiroVencimento}

                                        onChange={alterarCampo}

                                        required

                                    />

                                </div>

                            </>

                        )}

                    </>

                )}



                {form.tipo === "ALUGUEL" && (

                    <>

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

                                Dia pagamento aluguel

                            </label>



                            <input

                                className="form-control"

                                type="number"

                                min="1"

                                max="31"

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

                    </>

                )}



                <button

                    className="btn btn-success"

                    type="submit"

                >

                    Salvar contrato

                </button>



                <button

                    type="button"

                    className="btn btn-secondary ms-2"

                    onClick={() => navigate("/contratos")}

                >

                    Cancelar

                </button>



            </form>

        </div>

    );

}

export default NovoContrato;