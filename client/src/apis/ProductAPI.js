import {api} from "./configs/axiosConfig.js";

export const fetchProductList = async (pageParam= 1) => {
    const response = await api.get(`/product?page=${pageParam}`);
    return response.data;
}

export const fetchProductDetail = async(id) => {
    const response = await api.get(`/product/${id}`);
    return response.data;
}

export const deleteProduct = async(id) => {
    const response = await api.delete(`/product/${id}`);
    return response.data;
}