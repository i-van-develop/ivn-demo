const createTransitionEndListener = (el, value) => {
    if (value){
        el._transitionEnd = function(event){
            for(const propName in value){
                if (event.propertyName === propName){
                    setTimeout(()=>{value[propName]()},0)
                    break
                }
            }
        }.bind(el)
        el.addEventListener('transitionend', el._transitionEnd)
    }
}

export const transitionEnd = {
    bind: function (el,{value}) {
        createTransitionEndListener(el, value)
    },
    update: function (el,{value, oldValue}) {
        if (value !== oldValue){
            el.removeEventListener('transitionend', el._transitionEnd)
            createTransitionEndListener(el, value)
        }
    },
    unbind: function (el) {
        el.removeEventListener('transitionend', el._transitionEnd)
    }
}
