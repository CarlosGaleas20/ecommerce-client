import authFetch from "../utils/authFetch";
import { BASE_URL } from "../utils/constants";
import { size, map } from 'lodash';


export const getEncuestaByDeposit = async(idUser, idPedido, logout) =>{
    try {
        const url = `${BASE_URL}/encuestas-pedidos?_sort=createdAt:desc&users_permissions_user=${idUser}&pedido_deposito=${idPedido}`;
        const response = await authFetch(url, null, logout);
        return response;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const registerEncuestaByDeposit = async(idUser, idPedido, formData, logout) =>{
    try {
        const url = `${BASE_URL}/encuestas-pedidos`;
        const params = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...formData,
                users_permissions_user: idUser,
                pedido_deposito: idPedido,
            })
        }

        const response = await authFetch(url, params, logout);
        return response;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getEncuestaByCard = async(idUser, idPedido, logout) =>{
    try {
        const url = `${BASE_URL}/encuestas?_sort=createdAt:desc&users_permissions_user=${idUser}&pedido=${idPedido}`;
        const response = await authFetch(url, null, logout);
        return response;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const registerEncuestaByCard = async(idUser, idPedido, formData, logout) =>{
    try {
        const url = `${BASE_URL}/encuestas`;
        const params = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...formData,
                users_permissions_user: idUser,
                pedido: idPedido,
            })
        }

        const response = await authFetch(url, params, logout);
        return response;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}