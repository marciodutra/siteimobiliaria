import "../../styles/Banner.css";
import banner from "../../assets/images/1785703913126-4.jpg";
import { Link } from "react-router-dom";

function Banner() {

    return (

        <section
            className="banner"
            style={{
                backgroundImage: `url(${banner})`
            }}
        >

            <div className="banner-overlay">

                <div className="container text-center text-white">

                    <h1 className="display-3 fw-bold">
                        Encontre o imóvel ideal
                    </h1>

                    <p className="lead mt-4">
                        Casas, apartamentos, terrenos e imóveis comerciais para venda e aluguel.
                    </p>

                    <Link

                        to="/buscar-imoveis"

                        className="btn btn-primary btn-lg mt-3"

                    >
                        Ver imóveis
                    </Link>

                </div>

            </div>

        </section>

    );

}

export default Banner;