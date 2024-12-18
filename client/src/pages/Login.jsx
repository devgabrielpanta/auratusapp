//React imports
import {
    useContext,
    useState
} from "react";
import { useNavigate } from 'react-router-dom';
//Form imports
import {
    useForm,
    Controller
} from "react-hook-form";
//Material elements and icons
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
//Auth imports
import { authLogin } from "../services/auth";
import { AuthContext } from "../auth/AuthProvider";

export default function Login() {
    //form states
    const {handleSubmit, setValue, reset, control} = useForm();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    //AuthProvider
    const {setSignedIn} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleShowPass = () => {
        setShowPass((show) => !show);
    };

    const handleLogin = async (data) => {

        authLogin(data.email, data.pass)
            .then((response) => {
                localStorage.setItem("access_token", response.token);
                setSignedIn(true);
                reset(
                    setValue("email", ""),
                    setValue("pass", ""),
                );
                navigate("/app");
            })
            .catch((error) => {
                setLoginError(true);
                setErrorMessage("Email/Senha inválidos")
                return;
            })
    };

    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
                height: "100vh",
                width: "100%",
            }}
            >   
                <Typography sx={{
                    fontWeight: 700,
                    fontSize: 25,
                }}
                >
                    Gestão de Reservas
                </Typography>
                
                <Controller
                    name="email"
                    defaultValue={email}
                    control={control}
                    onChange={(value) => {setEmail(value)}}
                    render={ ( { field: {value, onChange} } ) =>
                        <TextField
                            sx={{
                                width: 350,
                            }}
                            label="Email:"
                            value={value}
                            type="email"
                            onChange={onChange}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            placeholder="Digie o seu email de acesso"
                            required
                        />
                    }
                />

                <Controller
                    name="pass"
                    defaultValue={pass}
                    control={control}
                    onChange={(value) => {setPass(value)}}
                    render={ ( { field: {value, onChange} } ) =>
                        <TextField
                            sx={{
                                width: 350,
                            }}
                            label="Senha:"
                            type={showPass ? "text" : "password"}
                            value={value}
                            onChange={onChange}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                                input: {
                                    endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleShowPass}
                                        >
                                            {showPass ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            }}
                            placeholder="Digie a sua senha de acesso"
                            required
                        />    
                    }
                />

                <Button sx={{
                    width: 180,
                    height: 40,
                }}
                type="submit"
                variant="contained"
                >
                LOGIN
                </Button>

                {loginError ?
                <Alert severity="error" onClose={() => {setLoginError(false)}}>
                    {errorMessage}, tente novamente ou entre em contato com o suporte.
                </Alert>
                
                : ""
                }
            </Box>
        </form>      
    );
};