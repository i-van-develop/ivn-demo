<template>
    <div class="loader-wrap">
        <div class="loader"/>
    </div>
</template>

<script>
    export default {
        name: "Loader"
    };
</script>

<style scoped lang="scss">
    @import "~sass/_variables.scss";

    @keyframes loader {
        from{
            transform: rotate(0);
        }
        to{
            transform: rotate(360deg);
        }
    }

    .loader-wrap{
        z-index: 5;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: rgba(0,0,0,0.3);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .loader{
        width:50px;
        height: 50px;
        border-radius: 50%;
        border: 2px solid $special;
        border-top:none;
        border-left:none;

        animation-name: loader;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }
</style>
