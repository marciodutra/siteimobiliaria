import { Link } from "react-router-dom";

function CardImovel({ id, titulo, cidade, valor, imagens }) {


    let imagem = "https://placehold.co/600x400";


    if (imagens && imagens.length > 0) {

        const principal = imagens.find(
            img => img.principal
        );


        if (principal) {

            imagem = `http://localhost:3000${principal.caminho}`;

        } else {

            imagem = `http://localhost:3000${imagens[0].caminho}`;

        }

    }



    return (

        <div className="card shadow-sm h-100">


            <img
                key={imagem}
                src={imagem}
                className="card-img-top"
                alt={titulo}
                style={{
                    height: "250px",
                    objectFit: "cover"
                }}
            />


            <div className="card-body">


                <h5>
                    {titulo}
                </h5>


                <p className="text-muted">

                    {cidade}

                </p>


                <h4 className="text-primary">

                    R$ {valor}

                </h4>


                <Link

                    to={`/imovel/${id}`}

                    className="btn btn-outline-primary w-100"

                >

                    Ver imóvel

                </Link>


            </div>


        </div>

    );

}


export default CardImovel;