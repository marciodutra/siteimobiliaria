import MenuSite from "./MenuSite";
import FooterSite from "./FooterSite";

function LayoutSite({ children }) {

    return (

        <>

            <MenuSite />

            <main>

                {children}

            </main>

            <FooterSite />

        </>

    );

}

export default LayoutSite;