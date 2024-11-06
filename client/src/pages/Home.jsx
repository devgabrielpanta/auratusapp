import { useContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { AuthContext } from "../auth/AuthProvider";
import LoadingOverlay from "../components/LoadingOverlay";
import { authSession } from "../services/auth";

export default function Home() {
    const { signedIn, setSignedIn, setUser } = useContext(AuthContext);
    const [redirectPath, setRedirectPath] = useState(null);

    const navigate = useNavigate()

    const auth = async () => {
        try {
            const response = await authSession();
            if (response.status === 200) {
                setUser(response.data.user);
                setSignedIn(true);
                setRedirectPath("/app");
                //navigate("/app");
            } else {
                setRedirectPath("/login");
                console.log("redirecionando para o login");
            }
        } catch (error) {
            console.log(error);
            setRedirectPath("/login");
        }
    };

    useEffect(() => {
        auth();
    }, [signedIn]);

    return <LoadingOverlay />
};