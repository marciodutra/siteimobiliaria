import Menu from "./Menu";


function LayoutSistema({ children }) {


    return (

        <>

            <Menu />


            <main>

                {children}

            </main>


        </>

    );

}


export default LayoutSistema;