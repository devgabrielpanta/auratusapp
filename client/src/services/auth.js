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

export const authRefresh = async () => {
    return api.post("/auth/refresh-token").then((response) => {
        return response.data
        })
        .catch((error) => {
            throw new Error("Token inválido");
        })
};