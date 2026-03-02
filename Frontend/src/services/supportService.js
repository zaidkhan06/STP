import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/payment`;

export const fetchQr = async (amount = 100) => {
  try {
    const { data } = await axios.post(`${API}/create-qr`, { amount });
    return data; 
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createOrder = async (amount = 100) => {
  try {
    const { data } = await axios.post(`${API}/create-order`, { amount });
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const verifyPayment = async (response) => {
  try {
    const { data } = await axios.post(`${API}/verify-payment`, response);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};