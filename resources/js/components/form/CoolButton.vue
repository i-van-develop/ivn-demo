<template>
    <button @click="$emit('click')" :class="{'button-stroke' : stroke}" class="button">
        <slot>{{label}}</slot>
    </button>
</template>

<script>
    export default {
        name: "CoolButton",
        props:{
            label: String,
            stroke: {
                type: Boolean,
                default: false
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "~sass/_variables.scss";

    .button {
        background-color: $primary-dark-contrast;
        border: 1px solid transparent;
        color: white;
        padding: 5px 20px;
        cursor: pointer;

        transition: background-color 300ms, color 300ms, border 300ms;
    }

    .button-stroke {
        border: 1px solid $primary-dark-contrast;
        background-color: white;
        color: $primary-dark-contrast;
    }

    .button:hover:not(.button-stroke) {
        background-color: $primary-dark-contrast-dark;
    }

    .button-stroke:hover {
        border: 1px solid transparent;
        background-color: $primary-dark-contrast-dark;
        color: white;
    }
</style>
