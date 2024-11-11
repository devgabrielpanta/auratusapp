import { useContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { AuthContext } from "../auth/AuthProvider";
import LoadingOverlay from "../components/LoadingOverlay";
import { authSession } from "../services/auth";
import dayjs from "dayjs";

export default function Home() {
    const { signedIn } = useContext(AuthContext);

    const navigate = useNavigate()

    const auth = () => {
        if(!signedIn) {
            navigate("/login");
        } else {
            navigate("/app");
        }
    };

    useEffect(() => {
        auth();
    }, []);

    return <LoadingOverlay />
};