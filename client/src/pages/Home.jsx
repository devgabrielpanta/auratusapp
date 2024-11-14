import {
    useContext, 
    useEffect
} from "react";
import {useNavigate} from 'react-router-dom'
import { AuthContext } from "../auth/AuthProvider";
import LoadingOverlay from "../components/LoadingOverlay";

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