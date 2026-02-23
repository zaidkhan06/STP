import axios from "axios";

const API = "http://localhost:5000/api/coding";

export const getCodingQuestions = async () => {
  const res = await axios.get(API, { withCredentials: true });
  return res.data;
};

export const toggleSolved = async (id) => {
  const res = await axios.post(
    `${API}/${id}/toggle`,
    {},
    { withCredentials: true }
  );
  return res.data;
};