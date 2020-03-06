import Vue from 'vue';
import Vuex from 'vuex';
import guest from './guest';
import profile from './profile';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        guest,
        profile
    }
});
