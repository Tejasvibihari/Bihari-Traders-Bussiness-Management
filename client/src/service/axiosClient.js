import client from '../service/axiosClient';

const client = client.create({
    baseURL: 'https://bihari-traders-api.vercel.app',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export default client;