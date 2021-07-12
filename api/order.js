import authFetch from "../utils/authFetch";
import { BASE_URL } from "../utils/constants";
import { size, map } from 'lodash';
import { toast } from 'react-toastify';


export const getOrders = async(idUser, logout) =>{
    try {
        const url = `${BASE_URL}/pedidos?_sort=createdAt:desc&users_permissions_user=${idUser}`;
        const response = await authFetch(url, null, logout);
        return response;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getOrdersByDeposit = async(idUser, logout) =>{
    try {
        const url = `${BASE_URL}/pedido-depositos?_sort=createdAt:desc&users_permissions_user=${idUser}`;
        const response = await authFetch(url, null, logout);
        return response;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getOrdersByIdPedido = async(idUser, idPedido, logout) =>{
    try {
        const url = `${BASE_URL}/pedidos?_sort=createdAt:desc&users_permissions_user=${idUser}&idPedido=${idPedido}`;
        const response = await authFetch(url, null, logout);
        return response;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getOrdersByDepositByIdPedido = async(idUser, idPedido, logout) =>{
    try {
        const url = `${BASE_URL}/pedido-depositos?_sort=createdAt:desc&users_permissions_user=${idUser}&idPedido=${idPedido}`;
        const response = await authFetch(url, null, logout);
        return response;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const addVaucher = async (idUser, idPedido, vaucher, logout) => {
    try {
        const orders = await getOrdersByDepositByIdPedido(idUser, idPedido, logout);
        if (size(orders) > 0) {
            map(orders, async (order) => {
                const url = `${BASE_URL}/pedido-depositos/${order.id}`;
                const params = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        estadoEntrega: 'Validado',
                        vaucher,
                    }),
                };

                await authFetch(url, params, logout);
            })
            return true;
        } else {
            toast.error('Error al cambiar de estado');
            return false;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getInfoContact = async() =>{
    try {
        const url = `${BASE_URL}/info-contacto`;

        const response = await fetch(url);
        const result = await response.json();
        return result;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}


export const registerMesages = async(formData) =>{
    try {
        const url = `${BASE_URL}/mensajes`;
        const params = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }

        const response = await fetch(url, params);
        const result = await response.json();
        return result;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getTerms = async() =>{
    try {
        const url = `${BASE_URL}/terminos-y-condiciones`;

        const response = await fetch(url);
        const result = await response.json();
        return result;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getOrdersByDirection = async(idDirection, logout) =>{
    try {
        const url = `${BASE_URL}/pedidos?_sort=createdAt:desc&direccion=${idDirection}`;
        const response = await authFetch(url, null, logout);
        return response;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getOrdersByDepositByDirection = async(idDirection, logout) =>{
    try {
        const url = `${BASE_URL}/pedido-depositos?_sort=createdAt:desc&direccion=${idDirection}`;
        const response = await authFetch(url, null, logout);
        return response;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}