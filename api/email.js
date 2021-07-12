import { BASE_URL } from "../utils/constants";

export const sendEmailShop = async (data) => {
    try {
        const url = `${BASE_URL}/send`;
        const params = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        }

        const result = await fetch(url, params);
        return result;

    } catch (error) {
        return error;
    }
}