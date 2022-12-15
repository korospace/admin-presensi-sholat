export default {
    namespaced: true,
    state: {
      show: false,
    },
    getters: {
    },
    actions: {
    },
    mutations: {
        SET_SHOW_FORM: function(state, show) {
            state.show = show;
        },
    }
}