import { BASE_URL } from "../utils/constants";
import { getUserAddressById, getUserById } from "./user";
import { size } from 'lodash';

export const sendEmailShop = async (idPedido, productsData, user, direccion, fechaCompra) => {
    try {
        const url = `${BASE_URL}/send`;
        const params = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idPedido,
                productsData,
                user,
                direccion,
                fechaCompra,
            }),
        }

        const result = await fetch(url, params);
        const response = await result.json();
        return response;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const sendEmailShopDeposit = async (idPedido, productsData, iduser, idDireccion, fechaCompra, logout) => {
    try {
        const user = await getUserById(iduser, logout);
        const direccion = await getUserAddressById(idDireccion, logout)
        if (size(user) > 0 || size(direccion) > 0) {
            const url = `${BASE_URL}/sendDeposit`;
            const params = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    idPedido,
                    productsData,
                    user: user[0],
                    direccion: direccion[0],
                    fechaCompra,
                }),
            }

            const result = await fetch(url, params);
            const response = await result.json();
            return response;
        } else {
            return 'Hubo algun error';
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}