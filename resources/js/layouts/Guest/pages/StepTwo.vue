<template>
    <div class="step-two">
        <div class="background-driver" ref="background-driver"/>
        <div class="left-panel">
            <CoolInput v-model="name" class="name-input" ref="name-input" placeholder="Your name"/>
        </div>
        <div class="right-panel">
            <div class="welcome">
                <div class="welcome-one" ref="welcome-one">How can I call you?</div>
                <div class="welcome-two" ref="welcome-two">Feel free to enter any name, for example <span
                    class="color-special">Darth Vader</span></div>
            </div>
        </div>
        <div @click="nextStep" class="next-step" :class="{'next-step-visible': ready && nameValid}">
            <span class="next-step-label">next step</span>
            <font-awesome-icon class="next-step-icon" icon="arrow-right"/>
        </div>
    </div>
</template>

<script>
    import {
        Animation,
        TimingFunctions,
        createOne,
        createMultiple,
        AnimationSupervisor
    } from '~/libs/animation';
    import CoolInput from '~/components/form/CoolInput';

    const opacityAnimation = createOne('opacity', 0, 1, 800, {
        timingFunction: TimingFunctions.easeIn
    });
    const sideExistAnimation = (side) => createMultiple([
        { prop: 'opacity', from: 0, to: 1, duration: 500 },
        { prop: side, from: -30, to: 0, duration: 800, maskFunction: (v) => `${ v }px` }
    ], {
        timingFunction: TimingFunctions.easeInOut
    });

    export default {
        name: "StepTwo",
        components: { CoolInput },
        data() {
            return {
                animationSupervisor: new AnimationSupervisor(),
                name: '',
                ready: false
            };
        },
        beforeDestroy() {
            this.animationSupervisor.stopAll();
        },
        async mounted() {
            const mountedAS = this.animationSupervisor.addSupervisor(new AnimationSupervisor());
            await this.$store.dispatch('guest/loadFromLocalStorage');
            const name = this.$store.state.guest.name;
            if (name) {
                const backgroundAnimation = mountedAS.add(
                    new Animation(this.$refs['background-driver'],
                        createMultiple([
                            { prop: 'width', from: 100, to: 0 },
                            { prop: 'left', from: 0, to: 100 }
                        ], {
                            duration: 1000,
                            maskFunction: (v) => `${ v }%`,
                            timingFunction: TimingFunctions.easeInOut
                        })
                    ));

                try {
                    await backgroundAnimation.play();
                    this.animationSupervisor.removeSupervisor(mountedAS);
                    await this.$router.push('/guest/step-three');
                } catch (e) {
                }
            } else {
                const backgroundAnimation = mountedAS.add(
                    new Animation(this.$refs['background-driver'],
                        createMultiple([
                            { prop: 'width', from: 100, to: 65 },
                            { prop: 'left', from: 0, to: 35 }
                        ], {
                            duration: 1000,
                            maskFunction: (v) => `${ v }%`,
                            timingFunction: TimingFunctions.easeInOut
                        }),
                        { delay: 500 }
                    ));

                const welcomeOneAnimation = mountedAS.add(
                    new Animation(this.$refs['welcome-one'], sideExistAnimation('left'), { delay: 200 }));
                const welcomeTwoAnimation = mountedAS.add(
                    new Animation(this.$refs['welcome-two'], sideExistAnimation('right'), { delay: 400 }));
                const inputNameAnimation = mountedAS.add(
                    new Animation(this.$refs['name-input'].$el, opacityAnimation, {
                        beforeHooks: { visibility: 'visible' }
                    }));

                try {
                    await backgroundAnimation.play();
                    await Promise.all([
                        welcomeOneAnimation.play(),
                        welcomeTwoAnimation.play()
                    ]);
                    await inputNameAnimation.play();
                    this.animationSupervisor.removeSupervisor(mountedAS);
                    this.ready = true;
                } catch (e) {
                }
            }
        },
        computed: {
            nameValid() {
                return this.name.trim().length > 0;
            }
        },
        methods: {
            async nextStep() {
                if (this.nameValid && this.ready) {
                    const nextStepAS = this.animationSupervisor.addSupervisor(new AnimationSupervisor());
                    this.ready = false;
                    await this.$store.dispatch('guest/setName', this.name);

                    const backgroundAnimation = nextStepAS.add(
                        new Animation(this.$refs['background-driver'],
                            createMultiple([
                                { prop: 'width', from: 65, to: 0 },
                                { prop: 'left', from: 35, to: 100 }
                            ], {
                                duration: 1500,
                                maskFunction: (v) => `${ v }%`,
                                timingFunction: TimingFunctions.easeInOut
                            })
                        ));

                    const welcomeTwoAnimation = nextStepAS.add(
                        new Animation(this.$refs['welcome-two'], opacityAnimation, { speed: 2 }));
                    const inputNameAnimation = nextStepAS.add(
                        new Animation(this.$refs['name-input'].$el, opacityAnimation, { speed: 2 }));

                    try {
                        await Promise.all([
                            backgroundAnimation.play(),
                            welcomeTwoAnimation.play(true),
                            inputNameAnimation.play(true)
                        ]);
                        this.animationSupervisor.removeSupervisor(nextStepAS);
                        await this.$router.push('/guest/step-three');
                    } catch (e) {
                    }
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "~sass/variables.scss";

    .step-two {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .background-driver {
        z-index: 1;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: $background-primary;
    }

    .left-panel, .right-panel {
        z-index: 2;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
    }

    .left-panel {
        width: 35%;

        .name-input {
            visibility: hidden;
            border: none;
            background-color: transparent;
            border-bottom: 1px solid $background-primary;
            color: $background-primary;
            padding: 10px;
            width: 300px;
            text-align: center;
            font-size: 20px;
            outline: none;
            opacity: 0;
        }
    }

    .right-panel {
        width: 65%;

        .welcome-one {
            position: relative;
            color: white;
            margin-bottom: 20px;
            font-size: 30px;
            opacity: 0;
        }

        .welcome-two {
            position: relative;
            color: $primary-dark-contrast;
            font-size: 15px;
            opacity: 0;
        }
    }

    .next-step {
        z-index: 2;
        display: flex;
        align-items: center;
        position: absolute;
        top: 40px;
        right: 50px;
        color: white;
        opacity: 0;
        transition: opacity 0.5s;

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

        &.next-step-visible {
            opacity: 1;

            &:hover {
                cursor: pointer;

                .next-step-icon {
                    left: 5px;
                }
            }
        }

    }

    .color-special {
        color: $special;
    }
</style>
