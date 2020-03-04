import Vue from 'vue';
import App from './layouts/App';
import router from './router';
import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);

Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
    render: h => h(App),
    router,
    store,
    el: '#app'
});
