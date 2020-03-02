<template>
    <div class="lines">
        <div class="welcome-wrap">
            <div ref="background-driver" class="background-driver"/>
            <div class="welcome">
                <div class="centered">
                    <div ref="welcome-one" class="welcome-one">Hello <span class="color-special">{{name}}</span>!
                    </div>
                    <div ref="welcome-two" class="welcome-two">My name is <span class="color-special">Ivan</span>, I'm
                        <span class="color-special developer">Developer</span></div>
                    <div ref="welcome-three" class="welcome-three">Now we will be familiar!</div>
                </div>
            </div>
            <div class="iam-wrap">
                <div class="iam-image-wrap">
                    <div ref="iam-image-label" class="iam-image-label">And this is me</div>
                    <img draggable="false" ref="iam-image" class="iam-image" src="/images/iam.png" alt="">
                </div>
            </div>
        </div>
        <div class="inputs-wrap">
        </div>
        <div class="actions-wrap">
            <div ref="down-background-driver" class="down-background-driver">
                <div class="stack" :class="{'can-hover': canClick}">
                    <div class="technologies" ref="technologies">
                        <img draggable="false" @click="stackItemClick" v-for="(path, index) in technologies" :key="index" alt="" :src="path" />
                    </div>
                    <div ref="stack-label" class="stack-label">My Stack</div>
                    <div class="tech-lang" ref="tech-lang">
                        <img draggable="false" @click="stackItemClick" v-for="(path, index) in techLang" :key="index" alt="" :src="path" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {createMultiple, createOne, TimingFunctions, Animation, parallel, serial} from '~/libs/animation';
    import {mapState} from 'vuex';
    import store from '~/store';

    const opacityAnimation = createOne('opacity', 0, 1, 1000, {
        timingFunction: TimingFunctions.easeIn
    });
    const sideExistAnimation = (side) => createMultiple([
        { prop: 'opacity', from: 0, to: 1, duration: 500 },
        { prop: side, from: -30, to: 0, duration: 800, maskFunction: (v) => `${ v }px` }
    ], {
        timingFunction: TimingFunctions.easeInOut
    });

    const stackItemAnimation = (elem, yFrom, yTo, duration, delay = 0) => new Animation(elem,
        createOne('transform', yFrom, yTo, duration, {
            delay,
            maskFunction: (v) => `translateY(${ v }px)`
        })
    );

    export default {
        name: "StepThree",
        data() {
            return {
                canClick: false,
                technologies: [
                    '/images/logos/laravel.png',
                    '/images/logos/vue.png',
                    '/images/logos/react.png',
                    '/images/logos/mysql.png',
                    '/images/logos/git.png'
                ],
                techLang: [
                    '/images/logos/php.png',
                    '/images/logos/html.png',
                    '/images/logos/css.png',
                    '/images/logos/js.png'
                ]
            };
        },
        computed: mapState('guest', ['name']),
        async beforeRouteEnter(to, from, next){
            await store.dispatch('guest/loadFromLocalStorage');
            const {name} = store.state.guest;
            if (!name){
                next('/guest/step-two');
            } else {
                next();
            }
        },
        async mounted() {
            const backgroundAnimation = new Animation(this.$refs['background-driver'],
                createOne('height', 0, 100, 1000, {
                    timingFunction: TimingFunctions.easeInOut,
                    maskFunction: (v) => `${ v }%`,
                    delay: 300
                }));
            const downBackgroundAnimation = new Animation(this.$refs['down-background-driver'],
                createOne('height', 0, 100, 1000, {
                    timingFunction: TimingFunctions.easeInOut,
                    maskFunction: (v) => `${ v }%`,
                    delay: 300
                }));

            const welcomeOneAnimation = new Animation(this.$refs['welcome-one'], sideExistAnimation('left'));
            const welcomeTwoAnimation = new Animation(this.$refs['welcome-two'], sideExistAnimation('right'), {
                delay: 150
            });
            const welcomeThreeAnimation = new Animation(this.$refs['welcome-three'], sideExistAnimation('left'), {
                delay: 300
            });

            const iamImageAnimation = new Animation(this.$refs['iam-image'], opacityAnimation);
            const iamImageLabelAnimation = new Animation(this.$refs['iam-image-label'], opacityAnimation);

            const stackLabelAnimation = new Animation(this.$refs['stack-label'], opacityAnimation, { speed: 2 });

            const stackAnimation = (rootElem) => {
                const children = (rootElem && rootElem.children) ? [...rootElem.children] : [];
                return Promise.all(children.map((child, index) => {
                    const stackItemDelay = 200;
                    const stackItemOpacityAnimation = new Animation(child, opacityAnimation, {
                        speed: 2,
                        delay: index * stackItemDelay
                    });
                    return parallel([
                        serial([
                            stackItemAnimation(child, 0, -10, 100, index * stackItemDelay).play(),
                            stackItemAnimation(child, -10, 10, 200, 0).play(),
                            stackItemAnimation(child, 10, 0, 100, 0).play()
                        ]),
                        stackItemOpacityAnimation.play()
                    ]);
                }));
            };

            await parallel([
                backgroundAnimation.play(),
                downBackgroundAnimation.play()
            ])
            await parallel([
                welcomeOneAnimation.play(),
                welcomeTwoAnimation.play(),
                welcomeThreeAnimation.play()
            ])
            await parallel([
                iamImageAnimation.play(),
                iamImageLabelAnimation.play()
            ])


            await stackLabelAnimation.play();
            await stackAnimation(this.$refs['technologies']);
            await stackAnimation(this.$refs['tech-lang']);

            this.canClick = true;
        },
        methods: {
            async stackItemClick(event){
                if (this.canClick){
                    const elem = event.target;
                    if (!elem._isAnimate){
                        elem._isAnimate = true;

                        await stackItemAnimation(elem, 0, -10, 150).play();
                        await stackItemAnimation(elem, -10, 10, 300).play();
                        await stackItemAnimation(elem, 10, 0, 150).play();

                        elem._isAnimate = false;
                    }
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "~sass/variables.scss";

    .lines {
        display: flex;
        flex-direction: column;
    }

    .welcome-wrap {
        position: relative;
        height: 33.33%;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .iam-wrap {
        position: relative;
        z-index: 2;
        display: flex;
        width: 33.33%;
        justify-content: center;
        align-items: center;
        color: white;
        height: 100%;

        .iam-image-wrap {
            height: 75%;
            position: relative;

            .iam-image-label {
                opacity: 0;
                color: $primary-dark-contrast;
                position: absolute;
                right: 110%;
                top: 65%;
                white-space: nowrap;

                transform: rotate(-20deg);

                &:after {
                    content: ' ⇨';
                    position: relative;
                    color: white;
                    left: 0;
                    transition: left 200ms ease-in-out;
                }

                &:hover {
                    &:after {
                        left: 10px;
                    }
                }
            }

            .iam-image {
                height: 100%;
                opacity: 0;
            }
        }
    }

    .inputs-wrap {
        display: flex;
        align-items: center;
        width: 100%;
        flex-grow: 1;
    }

    .actions-wrap {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        height: 10%;
        flex-shrink: 0;
    }

    .background-driver, .down-background-driver {
        background-color: $background-primary;
        position: absolute;
        left: 0;
        width: 100%;
        z-index: 1;
    }

    .background-driver {
        top: 0;
    }

    .down-background-driver {
        height: 0;
        bottom: 0;
        display: flex;
        align-items: center;
    }

    .welcome {
        position: relative;
        z-index: 2;
        display: flex;
        width: 33.33%;
        justify-content: center;
        color: white;

        .centered > * {
            position: relative;
            opacity: 0;
        }

        .welcome-one {
            font-size: 22px;
        }

        .welcome-two {
            margin: 30px 0 10px;
            font-size: 18px;
        }

        .welcome-three {
            font-size: 18px;
        }
    }


    .stack {
        position: relative;
        z-index: 2;
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: space-between;
        padding: 0 20px;
        align-items: center;
    }

    .stack > * {
        height: 50%;
    }

    .technologies > * {
        margin-right: 10px;
        height: 100%;
        opacity: 0;
    }

    .tech-lang > * {
        margin-left: 10px;
        height: 100%;
        opacity: 0;
    }

    .can-hover{
        .technologies > *:hover {
            cursor: pointer;
        }
        .tech-lang > *:hover {
            cursor: pointer;
        }
    }

    .stack-label {
        height: auto;
        color: $primary-dark-contrast;
        opacity: 0;

        &:after {
            content: ' ⇨';
            color: white;
            transition: margin-left 200ms ease-in-out;
        }

        &:before {
            content: '⇦ ';
            color: white;
            transition: margin-right 200ms ease-in-out;
        }

        &:hover {
            &:after {
                margin-left: 10px;
            }

            &:before {
                margin-right: 10px;
            }
        }
    }

    .developer {
        margin: 0 0.8em;
        position: relative;

        &:after {
            left: 100%;
            content: '>';
            transition: left 150ms ease-in-out;
        }

        &:before {
            right: 100%;
            content: '<';
            transition: right 150ms ease-in-out;
        }

        &:after, &:before {
            height: 100%;
            position: absolute;
        }

        &:hover:after {
            left: calc(100% + 0.3em)
        }

        &:hover:before {
            right: calc(100% + 0.3em)
        }
    }

    .color-special {
        color: $special;
    }
</style>
