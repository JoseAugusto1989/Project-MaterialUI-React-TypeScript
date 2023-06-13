import axios from 'axios';

const baseURL = 'http://localhost:8090';

export const Api = axios.create({ baseURL });