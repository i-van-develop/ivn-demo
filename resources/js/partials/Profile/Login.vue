<template>
    <div class="login">
        <Loader v-if="isLoad"/>
        <div class="title">Enter credential to enter</div>
        <CoolInput v-model="login" placeholder-position="left-top" class="input" placeholder="login"/>
        <CoolInput type="password" v-model="password" placeholder-position="left-top" class="input"
                   placeholder="password"/>
        <div class="error-info">{{error}}</div>
        <div class="actions">
            <CoolButton @click="$emit('to-register-page')" :stroke="true">Register</CoolButton>
            <CoolButton @click="loginAction">Login</CoolButton>
        </div>
    </div>
</template>

<script>
    import api from '~/api';
    import store from '~/store';
    import { handle } from '~/api/statusHandler';
    import CoolInput from '~/components/form/CoolInput';
    import CoolButton from '~/components/form/CoolButton';
    import Loader from '~/components/form/Loader';

    export default {
        name: "Login",
        components: { Loader, CoolButton, CoolInput },
        data() {
            return {
                login: '',
                password: '',
                isLoad: false,
                error: ''
            };
        },
        methods: {
            async loginAction() {
                if (!this.isLoad) {
                    this.isLoad = true;
                    this.error = '';
                    const response = await api.login(this.login, this.password);
                    handle(response,
                        async (data) => {
                            await store.dispatch('profile/setAuthData', data);
                            this.$emit('to-profile-page');
                        },
                        (errorText) => {
                            this.error = errorText;
                        }
                    );
                    this.isLoad = false;
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "~sass/_variables.scss";

    .login {
        padding: 30px 40px;
        position: relative;
    }

    .title {
        margin-bottom: 30px;
    }

    .input {
        width: 300px;
        margin-top: 20px;
        padding: 5px;
        border: 1px solid #ccc;
    }

    .error-info {
        height: 40px;
        font-size: 14px;
        color: $danger;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .actions {
        display: flex;
        justify-content: space-between;
    }
</style>
