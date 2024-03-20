import {api} from "./configs/axiosConfig.js";

const Register = async(user) => {
    const response = await api.post("/auth/register", user);

    return response.data;
}

const Me = async()=>{
    const response = await api.get("/auth/me");

    return response.data;
}

const Logout = async () => {
    const refreshToken = localStorage.getItem("refresh-token");

    const response = await api.post("/auth/logout", {
        refresh_token: refreshToken,
    })

    return response.data;
}

export default {
    Register,
    Me,
    Logout,
}