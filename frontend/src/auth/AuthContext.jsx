import { createContext, useContext, useState } from "react";


const AuthContext = createContext();



export function AuthProvider({ children }) {


    const [user, setUser] = useState(() => {

        const usuario = localStorage.getItem("user");

        return usuario ? JSON.parse(usuario) : null;

    });



    const [token, setToken] = useState(() => {

        return localStorage.getItem("token");

    });



    function login(token, user) {


        localStorage.setItem("token", token);

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );


        setToken(token);

        setUser(user);

    }



    function logout() {


        localStorage.removeItem("token");

        localStorage.removeItem("user");


        setToken(null);

        setUser(null);

    }



    return (

        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}



export function useAuth() {


    const context = useContext(AuthContext);



    if (!context) {

        throw new Error(
            "useAuth deve estar dentro de AuthProvider"
        );

    }



    return context;

}