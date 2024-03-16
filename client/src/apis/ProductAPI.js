import {api} from "./configs/axiosConfig.js";

export const fetchProductList = async (pageParam) => {
    const response = await api.get(`/product?page=${pageParam}`);
    return response.data;
}

export const fetchProductDetail = async(id) => {
    const response = await api.get(`/product/${id}`);
    return response.data;
}