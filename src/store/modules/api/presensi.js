import axios     from 'axios';
import router    from "@/router";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { getLocalStorage, removeLocalStorage } from "@/services/localstorage.service";

export default {
    namespaced: true,
    state: {
        query: null,
        presensi: null,
    },
    getters: {
        queryGetter: state => state.query
    },
    actions: {
        CREATE_TODAY_PRESENSI: function ({ commit,rootState,dispatch,getters }) {
            // show loading
            commit("loadingux/SET_DATA_LOADING",{show:true,text:'membuat'},{ root: true });

            axios
                .get(`${rootState.apiurl}/api/v1/presensi/today`,{
                    headers: {
                      token: getLocalStorage("userdata").token
                    }
                })
                .then(( ) => {

                    toast.success(`presensi hari ini berhasil dibuat`, {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                    dispatch("GET_PRESENSI",getters.queryGetter);

                })
                .catch(( error ) => {
                    
                    if (error.response.status >= 500) {
                        toast.error("terjadi kesalahan pada server, refresh halaman !", {
                            position: toast.POSITION.TOP_LEFT,
                        });
                    }
                    else if (error.response.status == 401) {
                        
                        toast.warn(error.response.data.message, {
                            position: toast.POSITION.TOP_RIGHT,
                        });

                        removeLocalStorage("userdata");
                        router.push('/login');

                    }

                    commit("SET_PRESENSI",[]);

                })
                .finally(() => {

                    commit("loadingux/SET_DATA_LOADING",{show:false,text:''},{ root: true });

                })

        },
        GET_PRESENSI: function ({ commit,rootState },query) {
            commit("SET_QUERY",query);
            commit("SET_PRESENSI",null);

            axios
                .get(`${rootState.apiurl}/api/v1/presensi?limit=${query.limit == "" ? 0 : query.limit}&kelas=${query.kelas}&subkelas=${query.subkelas}&key=${query.key}&date=${query.date}`,{
                    headers: {
                      token: getLocalStorage("userdata").token
                    }
                })
                .then(( res ) => {

                    commit("SET_PRESENSI",res.data);

                })
                .catch(( error ) => {
                    
                    if (error.response.status >= 500) {
                        toast.error("terjadi kesalahan pada server, refresh halaman !", {
                            position: toast.POSITION.TOP_LEFT,
                        });
                    }
                    // else if (error.response.status == 401) {
                        
                    //     toast.warn(error.response.data.message, {
                    //         position: toast.POSITION.TOP_RIGHT,
                    //     });

                    //     removeLocalStorage("userdata");
                    //     router.push('/login');

                    // }

                    commit("SET_PRESENSI",[]);

                })

        },
        DO_CONFIRM: function ({ commit,rootState,dispatch,getters },form) {
            commit("loadingux/SET_DATA_LOADING",{show:true,text:'konfirmasi'},{ root: true });

            axios
                .put(`${rootState.apiurl}/api/v1/presensi/confirm`,form,{
                    headers: {
                      token: getLocalStorage("userdata").token
                    }
                })
                .then(( ) => {

                    toast.success(`sholat ${form.get('sholat')} berhasil dikonfirmasi`, {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                    if (form.get('history')==1) {
                        let query = rootState.studentdetailapi.query;
                        dispatch("studentdetailapi/GET_HISTORY",query,{root : true});
                    } else {
                        dispatch("GET_PRESENSI",getters.queryGetter);
                    }

                })
                .catch(( error ) => {
                    
                    if (error.response.status >= 500) {
                        toast.error("terjadi kesalahan pada server, refresh halaman !", {
                            position: toast.POSITION.TOP_LEFT,
                        });
                    }
                    else if (error.response.status == 401) {
                        
                        toast.warn(error.response.data.message, {
                            position: toast.POSITION.TOP_RIGHT,
                        });

                        removeLocalStorage("userdata");
                        router.push('/login');

                    }

                    commit("SET_PRESENSI",[]);

                })
                .finally(() => {

                    commit("loadingux/SET_DATA_LOADING",{show:false,text:''},{ root: true });

                })


        },
        DO_UPDATE: function ({ commit,rootState,dispatch,getters },form) {
            commit("loadingux/SET_DATA_LOADING",{show:true,text:'menyimpan'},{ root: true });

            axios
                .put(`${rootState.apiurl}/api/v1/presensi`,form,{
                    headers: {
                      token: getLocalStorage("userdata").token
                    }
                })
                .then(( ) => {

                    toast.success(`sholat ${form.get('sholat')} berhasil disimpan`, {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                    if (form.get('history')==1) {
                        let query = rootState.studentdetailapi.query;
                        dispatch("studentdetailapi/GET_HISTORY",query,{root : true});
                    } else {
                        dispatch("GET_PRESENSI",getters.queryGetter);
                    }

                })
                .catch(( error ) => {
                    
                    if (error.response.status >= 500) {
                        toast.error("terjadi kesalahan pada server, refresh halaman !", {
                            position: toast.POSITION.TOP_LEFT,
                        });
                    }
                    else if (error.response.status == 401) {
                        
                        toast.warn(error.response.data.message, {
                            position: toast.POSITION.TOP_RIGHT,
                        });

                        removeLocalStorage("userdata");
                        router.push('/login');

                    }

                    commit("SET_PRESENSI",[]);

                })
                .finally(() => {

                    commit("loadingux/SET_DATA_LOADING",{show:false,text:''},{ root: true });

                })


        },
    },
    mutations: {
        SET_QUERY: function(state, data) {
            state.query = data;
        },
        SET_PRESENSI: function(state, data) {
            state.presensi = data;
        },
    }
}