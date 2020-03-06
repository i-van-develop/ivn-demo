import api from '~/api';

const SET_DATA = 'SET_DATA';
const SET_INIT = 'SET_INIT';

export default {
    namespaced: true,
    state: {
        isAuth: false,
        isInit: false,
        data: null
    },
    mutations: {
        [SET_DATA](state, {isAuth, data}){
            state.isAuth = isAuth;
            state.data = data;
        },
        [SET_INIT](state){
            state.isInit = true;
        }
    },
    actions: {
        async init({state, commit}){
            if (!state.isInit){
                const userData = await api.getUser();
                if (userData){
                    commit(SET_DATA,{isAuth:true, data:userData});
                }
                commit(SET_INIT);
            }
        }
    }
}
