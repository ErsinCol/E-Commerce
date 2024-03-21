import {api} from "./configs/axiosConfig.js";

const Create = async (data) => {
    const response = await api.post("/order", data);

    return response.data;
}

const MyOrders = async () => {
    const response = await api.get("/order/my-orders");

    return response.data;
}

export default {
    Create,
    MyOrders,
}