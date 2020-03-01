<template>
    <div class="step-one">
        <div class="background-driver" ref="background-driver"/>
        <div class="welcome" ref="welcome">Welcome to my demo project called</div>
        <div class="name" ref="name">IVN</div>
        <div @click="nextStep" class="next-step" ref="next-step">
            <span class="next-step-label">next step</span>
            <font-awesome-icon class="next-step-icon" icon="arrow-right"/>
        </div>
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
                createOne('width', 0, 65, 2000, {
                    maskFunction: (v) => `${v}%`,
                    timingFunction: TimingFunctions.easeInOutQuad
                })
            );
            const nextStepAnimation = new Animation(this.$refs['next-step'], opacityAnimation, {
                beforeHooks: {visibility: 'visible'},
                delay: 300
            });

            await nameAnimation.play();
            await backgroundAnimation.play();
            await nextStepAnimation.play();
            this.nextStepAvailable = true;
        },
        methods: {
            async nextStep() {
                if (this.nextStepAvailable) {
                    this.nextStepAvailable = false;

                    const welcomeAnimation = new Animation(this.$refs['welcome'], opacityAnimation, {
                        speed: 2
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

    .next-step {
        visibility: hidden;
        display: flex;
        align-items: center;
        position: absolute;
        top: 40px;
        right: 50px;
        color: $background-primary;
        opacity: 0;
        cursor: pointer;

        .next-step-label {
            margin-right: 10px;
            font-size: 20px;
        }

        .next-step-icon {
            font-size: 15px;
            position: relative;
            top: 2px;
            left: 0;
            transition: left 0.2s;
        }

        &:hover .next-step-icon {
            left: 5px;
        }
    }

</style>
