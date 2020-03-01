export default {
    namespaced: true,
    state: {
        name: '',
        login: '',
        password: ''
    },
    mutations: {
        setName(state, payload){
            state.name = payload
        },
        setLogin(state, payload){
            state.login = payload
        },
        setPassword(state, payload){
            state.password = payload
        }
    },
    actions: {
    }
}
