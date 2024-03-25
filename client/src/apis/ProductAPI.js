import {api} from "./configs/axiosConfig.js";

const getProducts = async (pageParam= 1) => {
    const {data} = await api.get(`/product?page=${pageParam}`);
    return data;
}

const getProductById = async(productId) => {
    const {data} = await api.get(`/product/${productId}`);
    return data;
}

const deleteProduct = async(productId) => {
    const {data} = await api.delete(`/product/${productId}`);
    return data;
}

export default {
    getProducts,
    getProductById,
    deleteProduct,
}