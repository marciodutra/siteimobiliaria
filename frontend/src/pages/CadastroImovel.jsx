import { useState } from "react";
import api from "../api/api";


function CadastroImovel() {


    const [form, setForm] = useState({

        codigo: "",
        titulo: "",
        descricao: "",
        tipo: "",
        negocio: "VENDA",
        valor: "",
        cidade: "",
        bairro: "",
        endereco: "",
        quartos: 0,
        banheiros: 0,
        suites: 0,
        vagas: 0,
        area: 0

    });

    const [imagens, setImagens] = useState(null);

    function selecionarImagens(e) {

        setImagens(e.target.files);

    }



    function handleChange(e) {


        setForm({

            ...form,

            [e.target.name]: e.target.value

        });


    }



    async function salvar(e) {


        e.preventDefault();


        try {


            const response = await api.post(
                "/imoveis",
                {
                    ...form,
                    valor: Number(form.valor),
                    quartos: Number(form.quartos),
                    banheiros: Number(form.banheiros),
                    suites: Number(form.suites),
                    vagas: Number(form.vagas),
                    area: Number(form.area)
                }
            );


            const imovelId = response.data.id;



            if (imagens) {

                const formData = new FormData();


                for (let i = 0; i < imagens.length; i++) {

                    formData.append(
                        "imagens",
                        imagens[i]
                    );

                }


                await api.post(
                    `/imagens/${imovelId}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );

            }


            alert("Imóvel cadastrado com sucesso");


            console.log(response.data);



        } catch (error) {


            console.log(error);


            alert(
                error.response?.data?.error ||
                "Erro ao cadastrar imóvel"
            );


        }


    }



    return (

        <div className="container mt-5">


            <h2>
                Cadastro de Imóvel
            </h2>



            <form onSubmit={salvar}>


                {Object.keys(form).map((campo) => (


                    <div
                        className="mb-3"
                        key={campo}
                    >

                        <label className="form-label">
                            {campo}
                        </label>


                        <input

                            className="form-control"

                            name={campo}

                            type={
                                [
                                    "valor",
                                    "quartos",
                                    "banheiros",
                                    "suites",
                                    "vagas",
                                    "area"
                                ].includes(campo)
                                    ? "number"
                                    : "text"
                            }

                            value={form[campo]}

                            onChange={handleChange}

                        />


                    </div>


                ))}

                <div className="mb-3">

                    <label className="form-label">
                        Fotos do imóvel
                    </label>

                    <input
                        className="form-control"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={selecionarImagens}
                    />

                </div>



                <button className="btn btn-success">

                    Salvar

                </button>


            </form>


        </div>

    );

}


export default CadastroImovel;