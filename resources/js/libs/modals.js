import Vue from 'vue';

Vue.prototype.$modals = {
    open(Component, props = {}, events = {close: null, out: null}) {
        const componentModal = Vue.extend(Component);
        const modal = new componentModal({
            propsData: props,
            created() {
                this.$on('modal-close', () => {
                    this.$destroy();
                    document.body.removeChild(modalWrap);
                    if (events.close) {
                        events.close();
                    }
                });

                this.$on('modal-out', (data) => {
                    if (events.out){
                        events.out(data);
                    }
                })
            }
        });
        modal.$mount();
        const modalWrap = document.createElement('div');
        modalWrap.style.cssText = "width:100%; " +
            "height:100vh; " +
            "position: fixed; " +
            "left:0; top:0; " +
            "display:flex; " +
            "justify-content:center; " +
            "align-items:center; " +
            "background-color: rgba(0,0,0,0.3)";
        document.body.appendChild(modalWrap);
        modalWrap.appendChild(modal.$el);
    }
};
