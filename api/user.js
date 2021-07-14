import jwtDecode from 'jwt-decode';
import authFetch from '../utils/authFetch';
import { BASE_URL } from "../utils/constants";
import { getOrdersByDepositByDirection, getOrdersByDirection } from './order';
import { size } from 'lodash';


export const registerUser = async (formData) => {
    try {
        const url = `${BASE_URL}/auth/local/register`;
        const params = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...formData,
                type: 'User',
                active: true,
            }),
        }

        const response = await fetch(url, params);
        const result = await response.json();
        return result;

    } catch (error) {
        return error;
    }
}

export const loginUser = async (formData) => {
    try {
        const url = `${BASE_URL}/auth/local`;
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
        return error;
    }
}

export const resetPasswordUser = async ({ email }) => {
    try {
        const url = `${BASE_URL}/auth/forgot-password`;
        const params = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email })
        }

        const response = await fetch(url, params);
        const result = await response.json();
        return result;

    } catch (error) {
        return error;
    }
}

export const updateNameUser = async (idUser, formData, logout) => {
    try {
        const url = `${BASE_URL}/users/${idUser}`;
        const params = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }

        const result = await fetch(url, params, logout);
        return result ? result : null;

    } catch (error) {
        return error;
    }
}

export const updateEmailUser = async (idUser, email, logout) => {
    try {
        const url = `${BASE_URL}/users/${idUser}`;
        const params = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        }

        const result = await fetch(url, params, logout);
        return result ? result : null;

    } catch (error) {
        return error;
    }
}

export const updatePassUser = async (idUser, password, logout) => {
    try {
        const url = `${BASE_URL}/users/${idUser}`;
        const params = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password })
        }

        const result = await fetch(url, params, logout);
        return result ? result : null;

    } catch (error) {
        return error;
    }
}

export const createUserAddress = async (idUser, data, logout) => {
    try {
        const url = `${BASE_URL}/direcciones?users_permissions_user=${idUser}`;
        const params = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const result = await fetch(url, params, logout);
        return result ? result : null;

    } catch (error) {
        return error;
    }
}

export const getUserAddress = async (idUser, logout) => {
    try {
        const url = `${BASE_URL}/direcciones?users_permissions_user=${idUser}`;

        const result = await authFetch(url, null, logout);
        return result;

    } catch (error) {
        return error;
    }
}

export const updateUserAddress = async (idAddress, data, logout) => {
    try {
        const url = `${BASE_URL}/direcciones/${idAddress}`;
        const params = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const result = await fetch(url, params, logout);
        return result;

    } catch (error) {
        return error;
    }
}

export const deleteUserAddress = async (idAddress, logout) => {
    try {
        const validate1 = await getOrdersByDepositByDirection(idAddress, logout);
        const validate2 = await getOrdersByDirection(idAddress, logout);
        if(size(validate1) === 0 && size(validate2) === 0)
        {
            const url = `${BASE_URL}/direcciones/${idAddress}`;
        const params = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        }

        const result = await authFetch(url, params, logout);
        return result;
        }else{
            return 'found';
        }
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getMeUser = async (logout) => {
    try {
        const url = `${BASE_URL}/users/me`;
        const result = await authFetch(url, null, logout);
        return result ? result : null;
    } catch (error) {
        return error;
    }


}

export const setToken = (token) => {
    localStorage.setItem('token', token);
}

export const getToken = () => {
    const ISSERVER = typeof window === "undefined";

    if (!ISSERVER) {
        const token = localStorage.getItem('token');

        if (!token) {
            return null;
        } else {
            return token;
        }
    }
}

export const deleteToken = () => {
    localStorage.removeItem('token');
}

export const checkToken = (token) => {
    const tokenDecode = jwtDecode(token);
    const expireDataToken = tokenDecode.exp * 1000;
    const currentDate = new Date().getTime();
    if (currentDate > expireDataToken) {
        return true;
    }
    return false;
}

export const getUserById = async (idUser, logout) => {
    try {
        const url = `${BASE_URL}/users?_id=${idUser}`;
        const result = await authFetch(url, null, logout);
        return result ? result : null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getUserAddressById = async (idAddress, logout) => {
    try {
        const url = `${BASE_URL}/direcciones?_id=${idAddress}`;

        const result = await authFetch(url, null, logout);
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}