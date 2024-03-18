import {api} from "./configs/axiosConfig.js";

const Register = async(user) => {
    const response = await api.post("/auth/register", user);

    return response.data;
}

export default {
    Register,
}