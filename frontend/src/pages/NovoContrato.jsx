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
        imovelId: ""

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
                    : ""

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



            await api.post(

                "/contratos",

                form

            );



            alert("Contrato criado com sucesso");



            navigate("/contratos");



        } catch (error) {



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



        <div className="container mt-5">


            <h2>

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

                        name="valor"

                        value={form.valor}

                        onChange={alterarCampo}

                        required

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









                <button

                    className="btn btn-success"

                    type="submit"

                >

                    Salvar contrato

                </button>





            </form>


        </div>


    );


}


export default NovoContrato;