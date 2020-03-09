<template>
    <div class="profile" @click="openProfile">
        <span class="welcome">{{realName}}</span>
        <font-awesome-icon icon="user"/>
    </div>
</template>

<script>
    import ProfilePopup from './../Profile/ProfilePopup';
    import '~/libs/modals';

    export default {
        name: "Profile",
        data(){
            return{
                name:'Guest'
            };
        },
        computed:{
            realName(){
                if (this.$store.state.profile.isAuth) {
                    return this.$store.state.profile.data.name;
                }
                return this.name;
            }
        },
        async mounted() {
            await this.$store.dispatch('guest/loadFromLocalStorage');
            const guestName = this.$store.state.guest.name;
            if (guestName){
                this.name = guestName;
            }
        },
        methods: {
            openProfile(){
                this.$modals.open(ProfilePopup);
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "~sass/_variables.scss";

    .profile{
        display: flex;
        align-items: center;
        height: 100%;
        color: $background-primary;
        background-color: white;
        font-size: 16px;
        padding: 0 10px;
        cursor: pointer;
    }

    .welcome{
        font-size: 14px;
        margin-right: 5px;
    }
</style>
