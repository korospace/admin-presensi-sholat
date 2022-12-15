export default {
    namespaced: true,
    state: {
        privilege: "guru"
    },
    getters: {
    },
    actions: {
    },
    mutations: {
        SET_PRIVILEGE(state, privilege) {
            state.privilege = privilege;
        },
    }
}