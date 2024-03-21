import {api} from "./configs/axiosConfig.js";

const Create = async (data) => {
    const response = await api.post("/order", data);

    return response.data;
}

export default {
    Create,
}