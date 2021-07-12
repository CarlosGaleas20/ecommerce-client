import { BASE_URL } from "../utils/constants";


export const getCategories = async() =>{
    try {
        const url = `${BASE_URL}/categories?_sort=position:asc`;

        const response = await fetch(url);
        const result = await response.json();
        return result;
        
    } catch (error) {
        return error;
    }
}

export const getTotalProdcutsByCategory = async(category) =>{
    try {
        const url = `${BASE_URL}/productos/count?category.url=${category}`;

        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
}

export const getCarrusel = async() =>{
    try {
        const url = `${BASE_URL}/carrusels`;

        const response = await fetch(url);
        const result = await response.json();
        return result;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getMarcas = async() =>{
    try {
        const url = `${BASE_URL}/marcas`;

        const response = await fetch(url);
        const result = await response.json();
        return result;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getDatosEmpresa = async() =>{
    try {
        const url = `${BASE_URL}/datos-empresa`;

        const response = await fetch(url);
        const result = await response.json();
        return result;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}