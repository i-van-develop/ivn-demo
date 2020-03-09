<template>
    <div class="register">
        <Loader v-if="isLoad"/>
        <div class="title">Enter follow data to register</div>
        <CoolInput v-model="name" placeholder-position="left-top" class="input" placeholder="name"/>
        <CoolInput v-model="login" placeholder-position="left-top" class="input" placeholder="login"/>
        <CoolInput type="password" v-model="password" placeholder-position="left-top" class="input"
                   placeholder="password"/>
        <CoolInput type="password" v-model="repeatPassword" placeholder-position="left-top" class="input"
                   placeholder="repeat password"/>
        <div class="error-info">{{error}}</div>
        <div class="actions">
            <CoolButton @click="$emit('to-login-page')" :stroke="true">Login</CoolButton>
            <CoolButton @click="registerAction">Register</CoolButton>
        </div>
    </div>
</template>

<script>
    import Loader from '~/components/form/Loader';
    import CoolInput from '~/components/form/CoolInput';
    import CoolButton from '~/components/form/CoolButton';
    import store from '~/store';
    import api from '~/api';
    import { handle } from '~/api/statusHandler';

    export default {
        name: "Register",
        components: { CoolButton, CoolInput, Loader },
        data() {
            return {
                isLoad: false,
                name: '',
                login: '',
                password: '',
                repeatPassword: '',
                error: ''
            };
        },
        async mounted() {
            await store.dispatch('guest/loadFromLocalStorage');
            const guestName = store.state.guest.name;
            if (guestName) {
                this.name = guestName;
            }
        },
        computed: {
            nameValid() {
                const name = this.name.trim();
                return name.length >= 2 && name.length <= 100;
            },
            loginValid() {
                const login = this.login.trim();
                return /^[a-z0-9_]{5,100}$/.test(login);
            },
            passwordValid() {
                return this.password.length >= 8;
            },
            validError() {
                if (!this.nameValid) {
                    return 'Name must be between 2 and 100 characters';
                }
                if (!this.loginValid) {
                    return 'Login must be between 5 and 100 characters and contain only letters, digits and "_" symbol';
                }
                if (!this.passwordValid) {
                    return 'Password must be at least 8 characters';
                }
                if (this.password !== this.repeatPassword) {
                    return 'Repeated password does not match';
                }
                return null;
            }
        },
        methods: {
            async registerAction() {
                if (!this.isLoad) {
                    this.isLoad = true;
                    this.error = '';
                    if (this.validError != null) {
                        this.error = this.validError;
                    } else {
                        const response = await api.register(this.name, this.login, this.password);
                        handle(response,async (data) => {
                            await store.dispatch('profile/setAuthData', data)
                        }, (error) => {
                            this.error = error;
                        })
                    }

                    this.isLoad = false;
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "~sass/_variables.scss";

    .register {
        padding: 30px 40px;
        width: 300px;
        position: relative;
    }

    .title {
        margin-bottom: 30px;
    }

    .input {
        width: 100%;
        margin-top: 20px;
        padding: 5px;
        border: 1px solid #ccc;
    }

    .error-info {
        min-height: 60px;
        width: 100%;
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
