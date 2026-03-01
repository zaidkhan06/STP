import axios from "axios"

const API = `${import.meta.env.VITE_API_URL}/interview`

export const createExperience = async (form) => {
    try {
        await axios.post(`${API}/post`, form, { withCredentials: true });
    } catch (error) {
        console.log(error); 
    }
}