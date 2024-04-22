import axios from 'axios'

const client = axios.create({
    baseURL: 'https://bihari-traders-api.vercel.app',
    timeout: 5000
});

export default client;