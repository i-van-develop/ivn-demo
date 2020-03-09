<template>
    <div class="simple-modal">
        <slot name="header">
            <div class="header">
                <div class="header-title">{{title}}</div>
                <div class="modal-close-button" @click="$emit('modal-close')">
                    <font-awesome-icon icon="times"/>
                </div>
            </div>
        </slot>
        <div class="modal-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SimpleModal",
        props: {
            title: {
                type: String,
                default: ''
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "~sass/_variables.scss";

    .simple-modal{
        min-width:300px;
        background: white;
    }

    .header{
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: $primary-dark-contrast;
        color:white;
        padding: 0 10px;
    }
    .modal-close-button{
        display: flex;
        border-radius: 50%;
        width:20px;
        height: 20px;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        background: white;
        color:$primary-dark-contrast;
    }
    .modal-close-button:hover{
        cursor: pointer;
        color:$danger;
    }
</style>
