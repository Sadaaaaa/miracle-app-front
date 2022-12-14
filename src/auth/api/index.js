import axios from 'axios';

export const API_URL = `http://178.20.41.50:8090`;

const api = axios.create({
    // withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

api.interceptors.response.use((config) => {
    return config;
},
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            const refreshToken = { 'refreshToken': localStorage.getItem('refresh') };
            try {
                const response = await axios.get(`${API_URL}/token`, refreshToken)
                localStorage.setItem('token', response.data.accessToken);
                return api.request(originalRequest);
            } catch (e) {
                console.log('НЕ АВТОРИЗОВАН')
            }
        }
        throw error;
    })

export default api;