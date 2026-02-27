import axios from "axios";

// const API = "http://localhost:5000/api/coding";
const API = `${import.meta.env.VITE_API_URL}/coding`



export const getCodingQuestions = async (page = 1, limit = 10) => {
  const res = await axios.get(
    `${API}/?page=${page}&limit=${limit}`,
    { withCredentials: true }
  );
  return res.data;
};

export const toggleSolved = async (id) => {
  const res = await axios.post(
    `${API}/${id}/toggle`,
    {},
    { withCredentials: true }
  );
  console.log(res.data);
  return res.data;

};


export const getSolvedQues = async () => {
  const res = await axios.get(`${API}/solve-question`, {withCredentials: true});
  console.log(res);
  return res.data.solvedCoding;
}