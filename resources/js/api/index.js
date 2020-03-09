import axios from './axios';

import {
    TO_MANY_REQUESTS,
    INTERNAL_SERVER_ERROR,
    LOGIN_ERROR,
    LOGIN_UNIQUE_ERROR,
    errorResponse,
    successResponse
} from './statusHandler';

const assertLaravelError = (response, field, errorText) => {
    if (response.data &&
        response.data.errors &&
        response.data.errors[field] &&
        response.data.errors[field].includes(errorText)){
        return true;
    }
    return false;
};

export default {
    async getUser() {
        try {
            const response = await axios.get('profile');
            return response.data;
        } catch (e) {
            return null;
        }
    },
    async login(login, password) {
        try {
            const response = await axios.post('login', { login, password });
            return successResponse(response.data);
        } catch (e) {
            if (e.response.status === 422) {
                return errorResponse(LOGIN_ERROR);
            } else if (e.response.status === 429) {
                return errorResponse(TO_MANY_REQUESTS);
            }
            return errorResponse(INTERNAL_SERVER_ERROR);
        }
    },
    async register(name, login, password) {
        try {
            const response = await axios.post('register', { name, login, password, password_confirmation: password });
            return successResponse(response.data);
        } catch (e) {
            if (e.response.status === 422) {
                if (assertLaravelError(e.response, 'login', 'unique')){
                    return errorResponse(LOGIN_UNIQUE_ERROR);
                }
            } else if (e.response.status === 429) {
                return errorResponse(TO_MANY_REQUESTS);
            }
            return errorResponse(INTERNAL_SERVER_ERROR);
        }
    },
    async logout() {
        try {
            await axios.post('logout');
        } catch (e) {
        }
    }
};
