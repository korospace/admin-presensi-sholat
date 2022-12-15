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
        SET_SHOW_SETTING: function(state, show) {
            state.show = show;
        },
    }
}