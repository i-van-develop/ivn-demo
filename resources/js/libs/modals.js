import Vue from 'vue';

Vue.prototype.$modals = {
    open(component, props = null, events = { onClose: null, onOut: null }) {
        const modal = new Vue({
            render: h => h(component),
            propsData: props
        });
        modal.$mount();
        const modalWrap = document.createElement('div');
        modalWrap.style.cssText = "width:100%; height:100vh; position: fixed; left:0; top:0; display:flex; justify-content:center; align-items:center;";
        document.body.appendChild(modalWrap);
        modalWrap.appendChild(modal.$el);

        modal.$on('modal-close', function () {
            modal.$destroy();
            document.body.removeChild(modalWrap);
            if (events.onClose) {
                events.onClose();
            }
        });
        modal.$on('modal-out', function (data) {
            if (events.onOut) {
                events.onOut(data);
            }
        });
    }
};
