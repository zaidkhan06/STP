import axios from "axios"


const API = `${import.meta.env.VITE_API_URL}/aptitude`
console.log(API);

export const getQuestions = async (category) =>{
    const res = await axios.get(`${API}/category/${category}`, {withCredentials: true});
    return res.data;
}


export const getMock = async () => {
    const res = await axios.get(`${API}/mock/start?limit=20`, {withCredentials: true});
    console.log(res.data);
    return res.data;
}


export const submitMock = async (formatted, timeLeft) => {
    const res = await axios.post(`${API}/mock/submit`, {answers: formatted, duration: 600 - timeLeft}, {withCredentials: true});
    console.log(res);
    return res.data;
}

export const checkPractice = async (questionId, selected) =>{
    const res = await axios.post(`${API}/check`, {questionId, selectedAnswer: selected}, {withCredentials: true});
    return res.data;
}

export const practiceSubmit = async (formattedAnswers, category) => {
    const res = await axios.post(`${API}/practice/submit`, {answers: formattedAnswers, category, duration: 0}, {withCredentials: true});
    return res.data;
}

export const getPracticeTopic = async (category) =>{
    const res = await axios.get(`${API}/${category}`, {withCredentials: true});
    console.log(res);
    return res.data;
}

export const questionChecked = async (id,selected) => {
    const res = await axios.post(`${API}/check`, {questionId: id, selectedAnswer:selected}, { withCredentials: true })
}

