<template>
    <div class="profile" @click="openProfile">
        <span class="welcome">Guest</span>
        <font-awesome-icon icon="user"/>
    </div>
</template>

<script>
    import SimpleModal from '~/modals/SimpleModal';
    import '~/libs/modals';

    export default {
        name: "Profile",
        methods: {
            openProfile(){
                this.$modals.open(SimpleModal);
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
    }

    .welcome{
        font-size: 14px;
        margin-right: 5px;
    }
</style>
