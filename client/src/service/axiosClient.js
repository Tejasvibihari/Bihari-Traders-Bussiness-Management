import axios from 'axios'

const client = axios.create({
    baseURL: 'https://bihari-traders-api.vercel.app',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export default client;