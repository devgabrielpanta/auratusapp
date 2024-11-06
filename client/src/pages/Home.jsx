import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import LoadingOverlay from "../components/LoadingOverlay";
import { authSession } from "../services/auth";

export default function Home() {
    const {signIn, setSignIn, setUser} = useContext(AuthContext);
    const [redirectPath, setRedirectPath] = useState(null);

    useEffect(() => {
        if(!signIn || signIn === false) {
            authSession()
                .then((response) => {
                    if (response.status === 200) {
                        setUser(response.data.user);
                        setSignIn(true);
                        setRedirectPath("/app")
                    } else {
                        setRedirectPath("/login");
                    }
                })
                .catch(() => {
                    setRedirectPath("/login");
                })
        } else if (signIn === true) {
            console.log("signIn === true");
            setRedirectPath("/app");
        }
    }, [signIn]);
        
    if (redirectPath) {
        return <Navigate to={redirectPath} replace/>
    }

    return <LoadingOverlay />
};