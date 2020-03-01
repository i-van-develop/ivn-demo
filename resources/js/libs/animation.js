export const TimingFunctions = {
    // no easing, no acceleration
    linear: t => t,
    // accelerating from zero velocity
    easeInQuad: t => t * t,
    // decelerating to zero velocity
    easeOutQuad: t => t * (2 - t),
    // acceleration until halfway, then deceleration
    easeInOutQuad: t => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    // accelerating from zero velocity
    easeInCubic: t => t * t * t,
    // decelerating to zero velocity
    easeOutCubic: t => (--t) * t * t + 1,
    // acceleration until halfway, then deceleration
    easeInOutCubic: t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    // accelerating from zero velocity
    easeInQuart: t => t * t * t * t,
    // decelerating to zero velocity
    easeOutQuart: t => 1 - (--t) * t * t * t,
    // acceleration until halfway, then deceleration
    easeInOutQuart: t => t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
    // accelerating from zero velocity
    easeInQuint: t => t * t * t * t * t,
    // decelerating to zero velocity
    easeOutQuint: t => 1 + (--t) * t * t * t * t,
    // acceleration until halfway, then deceleration
    easeInOutQuint: t => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
};

export const createOne = (prop, from, to, duration, {maskFunction, timingFunction, delay} = {}) => {
    return [{prop, from, to, duration, maskFunction, timingFunction, delay}];
};
export const createMultiple = (transitions, {duration, delay, maskFunction, timingFunction} = {}) => {
    return transitions.map((transition) => {
        return {
            ...transition,
            duration: duration ? duration : transition.duration,
            delay: delay ? delay : transition.delay,
            maskFunction: maskFunction ? maskFunction : transition.maskFunction,
            timingFunction: timingFunction ? timingFunction : transition.timingFunction
        };
    });
};

export class Animation {
    constructor(el, transitions, {delay, speed, beforeHooks, afterHooks} = {}) {
        this.el = el;
        this.transitions = transitions;
        this.isPlaying = false;
        this.reversePlaying = false;
        this.promiseCallbacks = null;
        this.startTime = null;
        this.globalDelay = delay ? delay : 0;
        this.globalSpeed = speed ? speed : 1;
        this.globalBeforeHooks = beforeHooks ? beforeHooks : {};
        this.globalAfterHooks = afterHooks ? afterHooks : {};
        this.beforeHooksApplied = null;
    }

    setEl(_e) {
        this.el = _e;
    }

    setTransitions(transitions) {
        this.transitions = transitions;
        this.stop();
    }

    set delay(delay) {
        this.globalDelay = delay;
    }

    get delay() {
        return this.globalDelay;
    }

    set speed(speed) {
        this.globalSpeed = speed;
    }

    get speed() {
        return this.globalSpeed;
    }

    set beforeHooks(beforeHooks) {
        this.globalBeforeHooks = beforeHooks;
    }

    get beforeHooks() {
        return this.globalBeforeHooks;
    }

    set afterHooks(afterHooks) {
        this.globalAfterHooks = afterHooks;
    }

    get afterHooks() {
        return this.globalAfterHooks;
    }

    stop() {
        this.beforeHooksApplied = null;
        this.isPlaying = false;
    }

    _promiseCallback(callback) {
        callback();
        this.promiseCallbacks = null;
    }

    _setStyle(prop, value, maskFunction) {
        this.el.style[prop] = maskFunction ? maskFunction(value) : value;
    }

    _applyHooks(hooks) {
        for (const prop in hooks) {
            this._setStyle(prop, hooks[prop]);
        }
    }

    _step() {
        if (!this.isPlaying) {
            this._promiseCallback(this.promiseCallbacks.reject);
            return;
        }

        const diffTime = ((Date.now() - this.startTime) * this.globalSpeed) - this.globalDelay;
        if (this.beforeHooksApplied === false && diffTime < 0) {
            this.beforeHooksApplied = true;
            this._applyHooks(this.beforeHooks);
        }

        let finishedTransitions = 0;
        for (const transition of this.transitions) {
            const {prop, from: _from, to: _to, maskFunction, timingFunction, duration = 0, delay = 0} = transition;
            const from = this.reversePlaying ? _to : _from;
            const to = this.reversePlaying ? _from : _to;
            const realDiffTime = diffTime - delay;
            if (realDiffTime < 0) {
                this._setStyle(prop, from, maskFunction);
            } else if (realDiffTime >= duration) {
                this._setStyle(prop, to, maskFunction);

                finishedTransitions += 1;
            } else {
                const t = realDiffTime / duration;
                const dt = timingFunction ? timingFunction(t) : t;
                const val = from + ((dt) * (to - from));
                this._setStyle(prop, val, maskFunction);
            }
        }

        if (finishedTransitions === this.transitions.length) {
            this.stop();
            this._applyHooks(this.afterHooks);
            this._promiseCallback(this.promiseCallbacks.resolve);
        } else {
            this._nextStep();
        }
    }

    _nextStep() {
        requestAnimationFrame(this._step.bind(this));
    }

    play(reversePlay = false) {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.reversePlaying = reversePlay;
            this.startTime = Date.now();

            if (this.globalDelay <= 0) {
                this._applyHooks(this.beforeHooks);
            } else {
                this.beforeHooksApplied = false;
            }

            return new Promise((resolve, reject) => {
                this.promiseCallbacks = {resolve, reject};
                this._nextStep();
            });
        }
    }
}

// TODO: add pause function for pausing started animation
// TODO: add reverse for reversing animation when it started or paused
// TODO: create helpers for transitions data generating, ex: one object, multiple, multiple with fixed duration
