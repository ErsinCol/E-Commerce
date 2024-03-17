import {api} from "./configs/axiosConfig.js";

const Register = async(user) => {
    try{
        const response = await api.post("/auth/register", user);

        return response;
    }catch(error){
        throw error;
    }
}

export default {
    Register,
}