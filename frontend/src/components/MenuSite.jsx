import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function MenuSite() {

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-2">

            <div className="container">

                <Link
                    className="navbar-brand d-flex align-items-center"
                    to="/"
                >

                    <img
                        src={logo}
                        alt="Dutra Imóveis"
                        style={{
                            height: "55px",
                            width: "auto"
                        }}
                    />

                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menuSite"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="menuSite"
                >

                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/"
                            >
                                Home
                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/comprar"
                            >
                                Comprar
                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/alugar"
                            >
                                Alugar
                            </Link>

                        </li>


                    </ul>

                    <Link
                        className="btn btn-primary rounded-pill px-4 ms-3"
                        to="/login"
                    >
                        Entrar
                    </Link>

                </div>

            </div>

        </nav>

    );

}

export default MenuSite;