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
        async init({state, commit, dispatch}){
            if (!state.isInit){
                const userData = await api.getUser();
                if (userData){
                    await dispatch('setAuthData',userData);
                }
                commit(SET_INIT);
            }
        },
        setAuthData({commit}, payload){
            commit(SET_DATA, {isAuth:true, data:payload});
        },
        logout({commit}){
            commit(SET_DATA, {isAuth: false, data: null});
        }
    }
}
