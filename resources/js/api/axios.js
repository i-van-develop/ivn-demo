import axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/api/',
    headers: {
        'Accept': 'application/json'
    }
});

export default {
    request(method, action, data) {
        return axiosInstance({
            url: action,
            method,
            data
        });
    },

    get(action, data) {
        return this.request('get', action, data);
    },
    post(action, data) {
        return this.request('post', action, data);
    },
    put(action, data) {
        return this.request('put', action, data);
    },
    delete(action, data) {
        return this.request('delete', action, data);
    }
};
