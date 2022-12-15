import { getLocalStorage } from "@/services/localstorage.service";
import router    from "@/router";
import axios     from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    namespaced: true,
    state: {
        monthYear:"",
        query:null,
        profile:null,
        historySholat:null,
    },
    getters: {
        // userDataGetter: state => state.userData
    },
    actions: {
        GET_PROFILE: function ({ commit,rootState },nis) {
            commit("SET_PROFILE",null);
            
            axios
                .get(`${rootState.apiurl}/api/v1/student/detail/${nis}`,{
                    headers: {
                      token: getLocalStorage("userdata").token,
                    }
                })
                .then(( res ) => {

                    commit("SET_PROFILE",res.data);

                })
                .catch(( error ) => {
                    commit("SET_PROFILE",null);
                    
                    if (error.response.status == 404) {
                        toast.warning("siswa tidak ditemukan", {
                            position: toast.POSITION.TOP_LEFT,
                        });

                        router.push("/siswa");
                    }
                    else if (error.response.status >= 500) {
                        toast.error("terjadi kesalahan pada server, refresh halaman !", {
                            position: toast.POSITION.TOP_LEFT,
                        });
                    }
                
                })

        },
        GET_HISTORY: function ({ commit,rootState },query) {
            commit("SET_QUERY",query);
            commit("SET_HISTORY_SHOLAT",null);
            
            axios
                .get(`${rootState.apiurl}/api/v1/presensi/history?nis=${query.nis}&datestart=${query.datestart}&dateend=${query.dateend}`,{
                    headers: {
                      token: getLocalStorage("userdata").token,
                    }
                })
                .then(( res ) => {

                    commit("SET_HISTORY_SHOLAT",res.data);

                })
                .catch(( error ) => {
                    commit("SET_HISTORY_SHOLAT",null);
                    
                    if (error.response.status >= 500) {
                        toast.error("terjadi kesalahan pada server, refresh halaman !", {
                            position: toast.POSITION.TOP_LEFT,
                        });
                    }
                
                })

        },
    },
    mutations: {
        SET_MONTH_YEAR: function(state, data) {
            state.monthYear = data;
        },
        SET_QUERY: function(state, data) {
            state.query = data;
        },
        SET_PROFILE: function(state, data) {
            state.profile = data;
        },
        SET_HISTORY_SHOLAT: function(state, data) {
            state.historySholat = data;
        },
    }
}