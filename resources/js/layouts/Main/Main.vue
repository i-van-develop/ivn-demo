<template>
    <div class="main">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "Main"
    }
</script>

<style scoped>
    .main{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
    }
</style>
