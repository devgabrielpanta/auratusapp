import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

export default function Protected({children}) {
    const {signedIn} = useContext(AuthContext);

    if(!signedIn) {
        return <Navigate to="/login" replace/>
    } else {
        return children;
    }
};