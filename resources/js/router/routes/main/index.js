import Home from '~/layouts/Main/pages/Home'

export default [
    {
        path: 'home',
        component: Home
    },
    {
        path: '',
        redirect: 'home'
    },
    {
        path: '*',
        redirect: 'home'
    }
]
