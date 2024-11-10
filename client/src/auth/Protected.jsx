import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import dayjs from "dayjs";

export default function Protected({children}) {
    const {signedIn} = useContext(AuthContext);

    const ProtectedPage = () => {
        const authTime = dayjs(localStorage.getItem("auth_time"));
        const remainingTime = dayjs(authTime - dayjs()).get("second");

        if(!authTime || remainingTime < 10) {
            return <Navigate to="/" replace/>
        } else if (localStorage.getItem("user").length < 10) {
            return <Navigate to="/" replace/>
        } else {
            return children;
        }
    };
    
    return <ProtectedPage />
};