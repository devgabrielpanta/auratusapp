import api from "../api";

export const authLogin = async (email, pass) => {
    const credentials = {
        email: email,
        pass: pass
    };

    return api.post("/auth/login", credentials, { withCredentials: true }).then((response) => {
        return response.data
      });
};