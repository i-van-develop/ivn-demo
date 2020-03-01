<template>
    <div class="input-wrap">
        <div v-if="placeholder" :class="{'placeholder-up' : focused || value}" class="placeholder">{{ placeholder }}
        </div>
        <input @focus="focused = true" @blur="focused = false" class="input" :type="type" :value="value"
               @input="$emit('input', $event.target.value)"/>
    </div>
</template>

<script>
    export default {
        name: "CoolInput",
        props: {
            type: {
                type: String,
                default: 'text'
            },
            placeholder: {
                type: String
            },
            value: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                focused: false
            };
        }
    };
</script>

<style scoped>
    .input-wrap {
        min-width: 20px;
        min-height: 10px;
        position: relative;
    }

    .input {
        position: relative;
        z-index: 2;
        border: none;
        width: 100%;
        height: 100%;
        background-color: transparent;
        box-sizing: border-box;
        font-size: 1em;
        outline: none;
        /*text-align: center;*/
    }

    .placeholder {
        z-index: 1;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        font-size: 1em;

        transition: opacity 300ms ease-in-out, transform 300ms ease-in-out, font-size 300ms ease-in-out, left 300ms ease-in-out, top 300ms ease-in-out;
    }

    .placeholder-up {
        opacity: 0.7;
        font-size: 0.7em;
        /*top: 0;*/
        /*transform: translateX(-50%) translateY(-100%);*/

        left: -10px;
        transform: translateX(-100%) translateY(-50%);
    }

</style>
