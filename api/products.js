import { map, size } from "lodash";
import authFetch from "../utils/authFetch";
import { BASE_URL } from "../utils/constants";


export const getProducts = async(limit) =>{
    try {
        const limitItems = `_limit=${limit}`;
        const url = `${BASE_URL}/productos?${limitItems}&estado=Activo`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
        
    } catch (error) {
        return error;
    }
}

export const getProductsByCategory = async(category, limit, start) =>{
    try {
        const limitItems = `_limit=${limit}`;
        const sortItem = `_sort=createdAt:desc`;
        const startItem = `_start=${start}`;
        const url = `${BASE_URL}/productos?category.url=${category}&${limitItems}&${sortItem}&${startItem}&estado=Activo`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
}

export const getProductsByUrl = async(path) =>{
    try {
        const url = `${BASE_URL}/productos?url=${path}&estado=Activo`;
        const response = await fetch(url);
        const result = await response.json();
        return result[0];
    } catch (error) {
        return error;
    }
}

export const getProductsById = async(idProduct, logout) =>{
    try {
        const url = `${BASE_URL}/productos?id=${idProduct}`;
        const response = await authFetch(url, null, logout);
        return response;
    } catch (error) {
        return error;
    }
}

export const searchProducts = async(title) =>{
    try {
        const url = `${BASE_URL}/productos?_q=${title}&estado=Activo`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
}

export const updateAmountProductBySell = async( products, logout ) =>{
    try {
        map(products, async(product) =>{
            const dataFound = await getProductsById(product.producto.id, logout);
            console.log(dataFound);
            if (size(dataFound) > 0 || !dataFound) {
                const url = `${BASE_URL}/productos/${dataFound[0]?._id}`;
                const newAmount= dataFound[0].amount - product.cantidad;
                const params = {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        amount: newAmount
                    })
                }
    
                const response = await authFetch(url, params, logout);
                return response;
            }
        })
    } catch (error) {
        console.log(error);
        return null;
    }
}

