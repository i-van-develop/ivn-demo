import Home from '~/layouts/Main/pages/Home'
import Portfolio from '~/layouts/Main/pages/Portfolio';
import Contacts from '~/layouts/Main/pages/Contacts';
import Blog from '~/layouts/Main/pages/Blog';

export default [
    {
        path: 'home',
        component: Home
    },
    {
        path: 'portfolio',
        component: Portfolio
    },
    {
        path: 'contacts',
        component: Contacts
    },
    {
        path: 'blog',
        component: Blog
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
