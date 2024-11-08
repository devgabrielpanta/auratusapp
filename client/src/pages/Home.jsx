import { useContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { AuthContext } from "../auth/AuthProvider";
import LoadingOverlay from "../components/LoadingOverlay";
import { authSession } from "../services/auth";
import dayjs from "dayjs";

export default function Home() {
    const { signedIn, setSignedIn, setUser } = useContext(AuthContext);
    const [redirectPath, setRedirectPath] = useState(null);

    const navigate = useNavigate()

    const auth = async () => {
        try {
            const response = await authSession();
            if (response.status === 200) {
                localStorage.setItem("user", response.data.user);
                localStorage.setItem("auth_time", dayjs().format("YYYY-MM-DD HH:mm:ss"));
                setUser(response.data.user);
                setSignedIn(true);
                navigate("/app");
            } else {
                navigate("/login");
                console.log("redirecionando para o login");
            }
        } catch (error) {
            console.log(error);
            navigate("/login");
        }
    };

    useEffect(() => {
        auth();
    }, []);

    return <LoadingOverlay />
};