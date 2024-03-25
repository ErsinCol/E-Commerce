import {api} from "./configs/axiosConfig.js";

const Create = async (order) => {
    const {data} = await api.post("/order", order);
    return data;
}

const getOrders = async () => {
    const {data} = await api.get("/order");
    return data;
}

const getMyOrders = async () => {
    const {data} = await api.get("/order/my-orders");
    return data;
}

export default {
    Create,
    getOrders,
    getMyOrders,
}