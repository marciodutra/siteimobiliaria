import { useAuth } from "../auth/AuthContext";


function Dashboard() {


    const { user, logout } = useAuth();


    return (

        <>            


            <div className="container mt-5">


                <h1>
                    Dashboard
                </h1>


                <h3>
                    Bem-vindo, {user?.nome}
                </h3>


                <p>
                    Perfil:
                    <strong> {user?.tipo}</strong>
                </p>


            </div>

        </>

    );

}


export default Dashboard;