import axios from "axios";
import { BASE_URL } from "../configs";

const URL = BASE_URL + "/note";

export const addNote = (data) => {
    return axios.post(`${URL}`, data);
};

export const getAllNotes = () => {
    return axios.get(`${URL}`);
};

export const getNote = (id) => {
    return axios.get(`${URL}/${id}`);
};

export const updateNote = (id, data) => {
    return axios.put(`${URL}/${id}`, data);
};

export const deleteNote = (id) => {
    return axios.delete(`${URL}/${id}`);
};
