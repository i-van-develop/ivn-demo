<template>
    <SimpleModal title="Profile" @modal-close="$emit('modal-close')">
        <Login v-if="page === PAGE_TYPES.PAGE_LOGIN"
               @to-profile-page="page = PAGE_TYPES.PAGE_PROFILE"
               @to-register-page="page = PAGE_TYPES.PAGE_REGISTER"
        />
        <Register v-else-if="page === PAGE_TYPES.PAGE_REGISTER"
                  @to-profile-page="page = PAGE_TYPES.PAGE_PROFILE"
                  @to-login-page="page = PAGE_TYPES.PAGE_LOGIN"
        />
        <Profile v-else-if="page === PAGE_TYPES.PAGE_PROFILE"/>
    </SimpleModal>
</template>

<script>
    import SimpleModal from '~/modals/SimpleModal';
    import store from '~/store';
    import Login from '~/partials/Profile/Login';
    import Register from '~/partials/Profile/Register';
    import Profile from '~/partials/Profile/Profile';

    const PAGE_PROFILE = 'PAGE_PROFILE';
    const PAGE_LOGIN = 'PAGE_LOGIN';
    const PAGE_REGISTER = 'PAGE_REGISTER';
    const PAGE_TYPES = { PAGE_LOGIN, PAGE_PROFILE, PAGE_REGISTER };

    export default {
        name: "ProfilePopup",
        components: { Profile, Register, Login, SimpleModal },
        data() {
            return {
                page: '',
                PAGE_TYPES
            };
        },
        async mounted() {
            const isAuth = store.state.profile.isAuth;
            if (isAuth) {
                this.page = PAGE_PROFILE;
            } else {
                this.page = PAGE_LOGIN;
            }
        }
    };
</script>

<style scoped>

</style>
