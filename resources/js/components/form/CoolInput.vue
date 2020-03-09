<template>
    <div class="input-wrap">
        <div v-if="placeholder"
             :class="{
                'placeholder-active' : focused || value,
                'left' : placeholderPosition === 'left',
                'left-top' : placeholderPosition === 'left-top',
                'center' : placeholderPosition === 'center',
                'right-top' : placeholderPosition === 'right-top',
                'right' : placeholderPosition === 'right'
                }"
             class="placeholder"
             :style="styles"
        >
            {{ placeholder }}
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
            },
            placeholderPosition: {
                type: String,
                default: 'left' // other variants: left-top, center, right-top, right,
            },
            spacing: {
                type: Number,
                default: 5
            }
        },
        data() {
            return {
                focused: false
            };
        },
        computed: {
            styles(){
                if (this.focused || this.value){
                    const spacing = this.spacing;
                    const position = this.placeholderPosition;
                    switch (position) {
                        case 'left': return `left: -${spacing}px;`;
                        case 'left-top': return `top: -${spacing}px;`;
                        case 'center': return `top: -${spacing}px;`;
                        case 'right-top': return `top: -${spacing}px;`;
                        case 'right': return `calc(100% + ${spacing}px);`;
                    }
                }
                return '';
            }
        }
    };
</script>

<style scoped lang="scss">
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
    }

    .placeholder {
        z-index: 1;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        font-size: 1em;
        line-height: 1em;

        transition: opacity 300ms ease-in-out, transform 300ms ease-in-out, font-size 300ms ease-in-out, left 300ms ease-in-out, top 300ms ease-in-out;
    }

    .placeholder-active {
        opacity: 0.7;
        font-size: 0.7em;

        &.left {
            transform: translateX(-100%) translateY(-50%);
        }

        &.left-top {
            left: 0;
            transform: translateX(0) translateY(-100%);
        }

        &.center {
            transform: translateX(-50%) translateY(-50%);
        }

        &.right-top {
            left: 100%;
            transform: translateX(-100%) translateY(-50%);
        }

        &.right {
            transform: translateX(0) translateY(-50%);
        }

    }

</style>
