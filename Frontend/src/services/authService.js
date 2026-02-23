import axios from "axios";

const API = "http://localhost:5000/api/auth";

//signup 
export const registerUser = async (userData) => {
    const response = await axios.post(`${API}/register`, userData);
    return response.data;
};

//verify email
export const verifyEmail = async (token) => {
    const response = await axios.get(
        `${API}/verify-email/${token}`
    );
    return response.data;
};

//login user
export const loginUser = async (userData) => {
    const response = await axios.post(
        `${API}/login`,
        userData,
        { withCredentials: true }
    );
    return response.data;
};