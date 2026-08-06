import { useAuth } from "../auth/AuthContext";


function ClienteDashboard() {


    const { user, logout } = useAuth();


    return (

        <div className="container mt-5">


            <div className="card shadow-sm p-5 text-center">


                <h2>
                    Área do Cliente
                </h2>


                <hr />


                <h4>
                    Olá, {user?.nome}
                </h4>


                <p>
                    Email: {user?.email}
                </p>



                <button
                    className="btn btn-outline-danger"
                    onClick={logout}
                >
                    Sair
                </button>


            </div>


        </div>

    );

}


export default ClienteDashboard;