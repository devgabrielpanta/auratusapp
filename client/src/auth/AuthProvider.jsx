import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [signedIn, setSignedIn] = useState();

    //armazenar o usuário no localstorage para controlar o state entre os childrens

    const values = {
        user: user,
        setUser: setUser,
        signedIn: signedIn,
        setSignedIn: setSignedIn,
    };
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
};