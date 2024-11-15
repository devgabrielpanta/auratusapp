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
    

    //função checkTokenValidity será chamada em um useEffect() em outro PR
    const checkTokenValidity = () => {
        
        const token = localStorage.getItem("access_token");
        if (token) {
            const decodedToken = jwtDecode(token);
            const authDay = dayjs.unix(decodedToken.auth_time).get("date");
            //redirect if token was not generated today
            if(authDay !== dayjs().get("date")) {
                setSignedIn(false);
                window.location.assign("/login");
                return;
            }
            //redirect if token was generate today, but is expired
            const expiration = decodedToken.exp * 1000 - Date.now();
            if(expiration < 60000) {
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
                handleRefreshToken(); //função será desenvolvida em outro PR
            }, expiration - 120000);
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
                navigate("/login");
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