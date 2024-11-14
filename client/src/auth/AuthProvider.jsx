import {
    createContext,
    useState
} from "react";
import { authRefresh } from "../services/auth.js"

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [signedIn, setSignedIn] = useState(localStorage.getItem("access_token") ? true : false);

    const handleRefreshToken = async () => {
        authRefresh()
            .then((response) => {
                localStorage.setItem("access_token", response.token);
                checkTokenValidity();
                setSignedIn(true);
            })
            .catch((error) => {
                setSignedIn(false);
                navigate("/login");
            })
    };
    
    const values = {
        signedIn: signedIn,
        setSignedIn: setSignedIn,
    };
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
};