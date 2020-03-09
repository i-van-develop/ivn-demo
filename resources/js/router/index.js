import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '~/store';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
});

router.beforeEach(async (to, from, next) => {
    await store.dispatch('profile/init');
    if (to.matched.some(rec => rec.meta.guest)){
        if (store.state.profile.isAuth){
            next('/');
        } else {
            next();
        }
    }
    next();
});

export default router;
