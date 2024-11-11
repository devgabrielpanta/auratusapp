import {
    createContext,
    useState
} from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [signedIn, setSignedIn] = useState(localStorage.getItem("access_token") ? true : false);
    
    const values = {
        signedIn: signedIn,
        setSignedIn: setSignedIn,
    };
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
};