<template>
    <div class="step-one">
        <div class="background-driver" ref="background-driver"/>
        <div class="welcome" ref="welcome">Welcome to my demo project called</div>
        <div class="name" ref="name">IVN</div>
    </div>
</template>

<script>
    import {Animation, TimingFunctions, createOne} from '~/libs/animation';

    const opacityAnimation = createOne('opacity', 0, 1, 800, {
        timingFunction: TimingFunctions.easeInQuad
    });

    export default {
        name: "StepOne",
        data() {
            return {
                nextStepAvailable: false
            };
        },
        async mounted() {
            const nameAnimation = new Animation(this.$refs['name'], opacityAnimation, {
                beforeHooks: {visibility: 'visible'},
                delay: 300
            });

            const backgroundAnimation = new Animation(this.$refs['background-driver'],
                createOne('width', 0, 65, 3000, {
                    maskFunction: (v) => `${v}%`,
                    timingFunction: TimingFunctions.easeInOutQuad
                })
            );

            await nameAnimation.play();
            await backgroundAnimation.play();
            await this.nextStep();
        },
        methods: {
            async nextStep() {
                const welcomeAnimation = new Animation(this.$refs['welcome'], opacityAnimation, {
                    speed: 2, delay: 2000
                });
                const backgroundAnimation = new Animation(this.$refs['background-driver'],
                    createOne('width', 65, 100, 1000, {
                        maskFunction: (v) => `${v}%`,
                        timingFunction: TimingFunctions.easeInOutQuad
                    })
                );

                await welcomeAnimation.play(true);
                await backgroundAnimation.play();
                await this.$router.push('/guest/step-two');
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "~sass/_variables.scss";
    @import "~sass/app.scss";

    .step-one {
        display: flex;
        align-items: center;
        justify-content: space-between;

    }

    .welcome, .name {
        z-index: 2;
        box-sizing: border-box;
        flex-shrink: 0;
    }

    .welcome {
        width: 65%;
        color: white;
        text-align: right;
        padding-right: 10px;
        font-size: 20px;
    }

    .name {
        visibility: hidden;
        width: 35%;
        color: $background-primary;
        font-weight: bold;
        padding-left: 10px;
        font-size: 30px;
    }

    .background-driver {
        z-index: 1;
        position: absolute;
        width: 0;
        height: 100%;
        left: 0;
        top: 0;
        background-color: $background-primary;
    }

</style>
