import axios from "axios";

const url = import.meta.env.VITE_API_URL;
console.log(url);

// const API = "http://localhost:5000/api/auth";
const API = `${import.meta.env.VITE_API_URL}/auth`;

//check user is auth or not
export const checkAuth = async () => {
    const res = await axios.get(`${API}/check`, { withCredentials: true });
    return res;
}

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

//logout user
export const logoutUser = async () => {
    await axios.post(
      `${API}/logout`,
      {},
      { withCredentials: true }
    );

}

// Forgot Password (send reset email)
export const forgotPassword = async (emailData) => {
    const response = await axios.post(
        `${API}/forgot-password`,
        emailData
    );
    return response.data;
};

// Reset Password (update password using token)
export const resetPassword = async (token, passwordData) => {
    const response = await axios.post(
        `${API}/reset-password/${token}`,
        passwordData
    );
    return response.data;
};