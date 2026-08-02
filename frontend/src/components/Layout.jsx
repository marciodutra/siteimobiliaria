import Menu from "./Menu";


function Layout({ children }) {


    return (

        <>

            <Menu />


            <main>

                {children}

            </main>


        </>

    );

}


export default Layout;