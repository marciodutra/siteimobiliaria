import { Link } from "react-router-dom";

function MenuSite() {

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold"
                    to="/"
                >
                    Imobiliária
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

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/contato"
                            >
                                Contato
                            </Link>

                        </li>

                    </ul>

                    <Link
                        className="btn btn-primary ms-3"
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