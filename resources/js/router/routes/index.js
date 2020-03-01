import guestRoutes from './guest'
import Guest from '~/layouts/Guest/Guest'

export default [
    {
        path: '/guest',
        component: Guest,
        children: guestRoutes
    },
    {
        path: '*',
        redirect: '/guest/step-one'
    }
]
