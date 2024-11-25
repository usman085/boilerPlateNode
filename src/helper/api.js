const axios = require('axios');

const instance = () => {
    const api = axios.create({
        baseURL: `${process.env.NODE_API_URL}`
    });

    // Request Interceptor
    api.interceptors.request.use(
        config => {
            // content-type application/json
            config.headers['Content-Type'] = 'application/json';
            // Here you should replace localStorage with your method of retrieving the token
            // Node.js applications might use environment variables or server-side storage
            // const token = process.env.AUTH_TOKEN;  // Example: Getting token from an environment variable
            // if (token) {
            //     config.headers.Authorization = `Bearer ${token}`;
            // }
            // console.log(`Sending ${config.method.toUpperCase()} request to ${config.url}`);
            return config;
        },
        error => Promise.reject(error)
    );

    // Response Interceptor
    api.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized! Token may be expired or invalid.');
                // Add your error handling logic here, e.g., redirecting to login or refreshing the token
            }
            return Promise.reject(error);
        }
    );

    return api;
};

module.exports = instance;
