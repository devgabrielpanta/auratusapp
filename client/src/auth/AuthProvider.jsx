import {
    createContext,
    useState
} from "react";
import { decode } from "jsonwebtoken";
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [signedIn, setSignedIn] = useState(localStorage.getItem("access_token") ? true : false);
    
    const navigate = useNavigate()

    //função checkTokenValidity será chamada em um useEffect() em outro PR
    const checkTokenValidity = () => {
        const token = localStorage.getItem("access_token");
        if (token) {
            const decodedToken = decode(token);
            const authDay = dayjs.unix(decodedToken.auth_time).get("date");
            //redirect if token was not generated today
            if(authDay !== dayjs().get("date")) {
                setSignedIn(false);
                navigate("/login");
                return;
            }
            //redirect if token was generate today, but is expired
            const expiration = decodedToken.exp * 1000 - Date.now();
            if(expiration < 60000) {
                setSignedIn(false);
                navigate("/login");
                return;
            }
            //define the remaining time to avoid expiration
            setTimeout(() => {
                handleRefreshToken(); //função será desenvolvida em outro PR
            }, expiration - 120000);
        }
    };

    const values = {
        signedIn: signedIn,
        setSignedIn: setSignedIn,
    };
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
};