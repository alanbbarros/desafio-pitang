import axios from 'axios';

const myAxios = axios.create({
  baseURL: 'http://localhost:4500/',
});

export default myAxios;