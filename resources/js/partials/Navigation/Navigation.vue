<template>
    <div class="navigation">
        <div class="left-part">
            <div class="app-name">IVN</div>
            <router-link to="/home" class="link" active-class="active">Home</router-link>
            <router-link to="/portfolio" class="link" active-class="active">Portfolio</router-link>
            <router-link to="/contacts" class="link" active-class="active">Contacts</router-link>
            <router-link to="/blog" class="link" active-class="active">Blog</router-link>
        </div>
        <div class="right-part">
            <Profile/>
        </div>
    </div>
</template>

<script>
    import Profile from '~/partials/Navigation/Profile';
    export default {
        name: "Navigation",
        components: { Profile }
    };
</script>

<style scoped lang="scss">
    @import "~sass/_variables.scss";

    .navigation{
        user-select: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
        height: 35px;
        box-sizing: border-box;
        width: 100%;
        background-color: $background-primary-dark;
    }

    .left-part, .right-part{
        display: flex;
        align-items: center;
        height: 100%;
    }

    .app-name{
        background-color: white;
        height: 100%;
        padding: 0 10px;
        display: flex;
        align-items: center;
        margin-right: 10px;
        color: $background-primary-dark;
        font-size: 16px;
    }

    .link{
        text-decoration: none;
        color: $primary-dark-contrast;
        margin-right: 10px;
        box-sizing: border-box;
        height: 100%;
        padding: 0 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        border-bottom: 2px solid $primary-dark-contrast;

        transition: border 300ms, color 300ms;
        &.active{
            color: white;
            border-bottom: 2px solid white;
        }
    }
</style>
