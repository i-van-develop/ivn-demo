const SET_NAME = 'SET_NAME';
const INIT_STATE = 'INIT_STATE';

export default {
    namespaced: true,
    state: {
        isInit: false,
        name: ''
    },
    mutations: {
        [SET_NAME](state, payload) {
            state.name = payload;
        },
        [INIT_STATE](state, payload) {
            state.name = payload.name;
            state.isInit = true;
        }
    },
    actions: {
        setName({ state, commit }, payload) {
            commit(SET_NAME, payload);
            window.localStorage.setItem('guest', JSON.stringify(state));
        },
        loadFromLocalStorage({ commit, state }){
            if (!state.isInit){
                const guestData = window.localStorage.getItem('guest');
                if (guestData) {
                    commit(INIT_STATE, JSON.parse(guestData));
                }
            }
        }
    }
};
