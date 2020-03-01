import axios from './axios'

export const LOGIN_ERROR = 'LOGIN_ERROR'
export const TO_MANY_REQUESTS = 'TO_MANY_REQUESTS'
export const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'

export const errorResponse = (error) => ({
    status: 'error',
    error
})

export const successResponse = (data) => ({
    status: 'success',
    data
})

export default {
    async getUser(){
        try{
            const response = await axios.get('user')
            return response.data
        } catch (e) {
            return null
        }
    },
    async login(email, password){
        try {
            const response = await axios.post('login',{email, password})
            return successResponse(response.data)
        } catch (e) {
            if (e.response.status === 422){
                return errorResponse(LOGIN_ERROR)
            } else if (e.response.status === 429){
                return errorResponse(TO_MANY_REQUESTS)
            }
            return errorResponse(INTERNAL_SERVER_ERROR)
        }
    },
    async logout(){
        try {
            await axios.post('logout')
        } catch (e) {}
    }
}
