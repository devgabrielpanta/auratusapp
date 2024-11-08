import { createContext, useEffect, useState } from "react";
import dayjs from "dayjs";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [signedIn, setSignedIn] = useState();

    useEffect(() => {
        setUser(localStorage.getItem("user"));
    }, [])

    //armazenar o usuário no localstorage para controlar o state entre os childrens

    const values = {
        user: user,
        setUser: setUser,
        signedIn: signedIn,
        setSignedIn: setSignedIn,
    };
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
};