import api from "../api";

export const authLogin = async (email, pass) => {
    return api.post(
        "/auth/login",
        {
            email: email,
            pass: pass
        }).then((response) => {
        return response.data
        })
        .catch((error) => {
            throw new Error("Email/Senha inválidos");
        })
};

export const authSession = async () => {
    return api.post(
        "/auth",
        {},
        {
            withCredentials: true,
    })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw new Error(error);
        })
};