import axios from 'axios';
export const characterApi = axios.create({
    baseURL: 'https://rickandmortyapi.com/api'
})