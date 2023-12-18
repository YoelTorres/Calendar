import axios from 'axios';
import { getEnvVariable } from '../helpers';

const { VITE_API_URL } = getEnvVariable();

const calendarApi = axios.create({
    baseURL: VITE_API_URL
});

// TODO: Configuración de interceptores
calendarApi.interceptors.request.use( config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }
    return config;
});

export default calendarApi;