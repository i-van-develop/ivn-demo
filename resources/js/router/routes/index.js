import guestRoutes from './guest'
import mainRoutes from './main'
import Guest from '~/layouts/Guest/Guest'
import Main from '~/layouts/Main/Main'

export default [
    {
        path: '/guest',
        component: Guest,
        children: guestRoutes
    },
    {
        path: '/',
        component: Main,
        children: mainRoutes
    }
]
