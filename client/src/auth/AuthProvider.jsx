import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [signedIn, setSignedIn] = useState();

    const values = {
        user: user,
        setUser: setUser,
        signedIn: signedIn,
        setSignedIn: setSignedIn,
    };

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
};