import StepOne from '~/layouts/Guest/pages/StepOne'
import StepTwo from '~/layouts/Guest/pages/StepTwo'
import StepThree from '~/layouts/Guest/pages/StepThree'

export default [
    {
        path: 'step-one',
        component: StepOne
    },
    {
        path: 'step-two',
        component: StepTwo
    },
    {
        path: 'step-three',
        component: StepThree
    },
    {
        path: '*',
        redirect: 'step-one'
    },
    {
        path: '',
        redirect: 'step-one'
    }
]
