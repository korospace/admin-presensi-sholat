let currentUnixTime = new Date(new Date().getTime());
let currentDay   = currentUnixTime.toLocaleString("en-US",{day: "2-digit"});
let currentMonth = currentUnixTime.toLocaleString("en-US",{month: "2-digit"});
let currentYear  = currentUnixTime.toLocaleString("en-US",{year: "numeric"});

export default {
    namespaced: true,
    state: {
      show: false,
      dateStart:`${currentYear}-${currentMonth}-01`,
      dateEnd:`${currentYear}-${currentMonth}-${currentDay}`,
    },
    getters: {
    },
    actions: {
    },
    mutations: {
        SET_SHOW_FORM: function(state, show) {
            state.show = show;
        },
        SET_DATESTART: function(state, msg) {
            state.dateStart = msg;
        },
        SET_DATEEND: function(state, msg) {
            state.dateEnd = msg;
        },
    }
}