<template>
    <div class="guest-steps-container">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "Guest"
    }
</script>

<style scoped lang="scss">
    @import "~sass/_variables.scss";

    .guest-steps-container{
        user-select: none;
        width:100%;
        height: 100vh;
        position: fixed;
        left:0;
        top:0;
    }
    .guest-steps-container > *{
        width: 100%;
        height: 100%;
    }
</style>
