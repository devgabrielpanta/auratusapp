import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

export default function Protected({children}) {
    const {signIn} = useContext(AuthContext);

    if(!signIn) {
        return <Navigate to="/" replace/>
    } else {
        return children;
    }
};