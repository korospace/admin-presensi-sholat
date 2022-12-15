export default {
    namespaced: true,
    state: {
      show: false,
      userDropdownShow: false,
    },
    getters: {
    },
    actions: {
    },
    mutations: {
        SET_SHOW_ASIDE: function(state, show) {
            state.show = show;
        },
        SET_SHOW_USERDROPDOWN: function(state, show) {
            state.userDropdownShow = show;
        },
    }
}