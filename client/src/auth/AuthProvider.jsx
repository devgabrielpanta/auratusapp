import {
    createContext,
    useState,
    useEffect,
    useRef
} from "react";
import { authRefresh } from "../services/auth.js";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [signedIn, setSignedIn] = useState(localStorage.getItem("access_token") ? true : false);
    const timerRef = useRef(null);
    

    const checkTokenValidity = () => {
        
        const token = localStorage.getItem("access_token");
        if (token) {
            const decodedToken = jwtDecode(token);
            const authDay = dayjs.unix(decodedToken.auth_time).get("date");
            //redirect if token was not generated today
            if(authDay !== dayjs().get("date")) {
                localStorage.removeItem("access_token");
                setSignedIn(false);
                window.location.assign("/login");
                return;
            }
            //redirect if token was generate today, but is expired
            const expiration = decodedToken.exp * 1000 - Date.now();
            if(expiration < 60000) {
                localStorage.removeItem("access_token");
                setSignedIn(false);
                window.location.assign("/login");
                return;
            }
            //clear previous timeout
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            //define the new remaining time to avoid expiration
            timerRef.current = setTimeout(() => {
                handleRefreshToken();
            }, expiration - 120000);
            console.log(`tempo restante de sessão: ${(expiration - 120000)/1000/60}`)
        }
    };

    const handleRefreshToken = async () => {
        authRefresh()
            .then((response) => {
                localStorage.setItem("access_token", response.token);
                checkTokenValidity();
                setSignedIn(true);
            })
            .catch((error) => {
                setSignedIn(false);
                window.location.assign("/login");
            })
    };

    useEffect(() => {
        if (window.location.pathname === "/app") {
        checkTokenValidity();
        };
    }, [signedIn]);
    
    const values = {
        signedIn: signedIn,
        setSignedIn: setSignedIn,
    };
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
};