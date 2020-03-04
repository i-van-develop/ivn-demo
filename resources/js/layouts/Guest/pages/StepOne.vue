<template>
    <div class="step-one">
        <div class="background-driver" ref="background-driver"/>
        <div class="welcome" ref="welcome">Welcome to my demo project called</div>
        <div class="name" ref="name">IVN</div>
    </div>
</template>

<script>
    import {Animation, TimingFunctions, createOne, AnimationSupervisor} from '~/libs/animation';

    const opacityAnimation = createOne('opacity', 0, 1, 800, {
        timingFunction: TimingFunctions.easeIn
    });

    export default {
        name: "StepOne",
        data() {
            return {
                nextStepAvailable: false,
                animationSupervisor: new AnimationSupervisor()
            };
        },
        beforeDestroy() {
            this.animationSupervisor.stopAll();
        },
        async mounted() {
            const mountedAS = this.animationSupervisor.addSupervisor(new AnimationSupervisor());
            const nameAnimation = mountedAS.add(new Animation(this.$refs['name'], opacityAnimation, {
                beforeHooks: {visibility: 'visible'},
                delay: 300
            }));

            const backgroundAnimation = mountedAS.add(new Animation(this.$refs['background-driver'],
                createOne('width', 0, 65, 3000, {
                    maskFunction: (v) => `${v}%`,
                    timingFunction: TimingFunctions.easeInOut
                })
            ));

            try {
                await nameAnimation.play();
                await backgroundAnimation.play();
                this.animationSupervisor.removeSupervisor(mountedAS);
                await this.nextStep();
            } catch (e) {
                console.log('force break')
            }
        },
        methods: {
            async nextStep() {
                const nextStepAS = this.animationSupervisor.addSupervisor(new AnimationSupervisor());
                const welcomeAnimation = nextStepAS.add(
                    new Animation(this.$refs['welcome'], opacityAnimation, {
                        speed: 2, delay: 2000
                    }));
                const backgroundAnimation = nextStepAS.add(
                    new Animation(this.$refs['background-driver'],
                        createOne('width', 65, 100, 1000, {
                            maskFunction: (v) => `${v}%`,
                            timingFunction: TimingFunctions.easeInOut
                        })
                    ));

                try {
                    await welcomeAnimation.play(true);
                    await backgroundAnimation.play();
                    this.animationSupervisor.removeSupervisor(nextStepAS);
                    await this.$router.push('/guest/step-two');
                } catch (e) {
                    console.log('force break')
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

</style>
