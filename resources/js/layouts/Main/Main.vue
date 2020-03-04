<template>
    <div class="main">
        <Navigation/>
        <div class="main-wrap">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import Navigation from '~/partials/Navigation/Navigation';
    export default {
        name: "Main",
        components: { Navigation }
    }
</script>

<style scoped lang="scss">
    @import "~sass/_variables.scss";

    .main{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100vh;
        background: $background-primary;
    }

    .main-wrap{
        width:100%;
        flex-grow: 1;
    }
</style>
