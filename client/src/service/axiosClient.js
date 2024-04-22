import axios from 'axios'

const client = axios.create({
    baseURL: 'https://bihari-traders-api.onrender.com',
    timeout: 10000
});

export default client;