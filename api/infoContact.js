/* eslint-disable prettier/prettier */
import authFetch from "../utils/authFetch";
import { BASE_URL } from "../utils/constants";

export const getInfoDeposit = async(logout) =>{
  try {
      const url = `${BASE_URL}/datos-deposito`;

      const response = await authFetch(url, logout);
      return response;
      
  } catch (error) {
      console.log(error);
      return null;
  }
}

export const updateInfoDeposit = async (formData, logout) => {

const numeroCuenta = (formData.numeroCuenta).toString();

try {
  const url = `${BASE_URL}/datos-deposito`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...formData,
      numeroCuenta,
    }),
  };

  const result = await authFetch(url, params, logout);
  return result;
} catch (error) {
  console.log(error);
  return null;
}
};