import {api} from "./configs/axiosConfig.js";

export const fetchProductList = async () => {
    try{
        const response = await api.get("/product");

        return response.data;
    }catch (error){
        throw error;
    }
}