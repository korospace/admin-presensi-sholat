import { getLocalStorage, removeLocalStorage } from "@/services/localstorage.service";
import router    from "@/router";
import axios     from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    namespaced: true,
    state: {
        kelas: null,
        subkelas: null,
    },
    getters: {
        // userDataGetter: state => state.userData
    },
    actions: {
        GET_KELAS: function ({ commit,rootState }) {
            commit("SET_KELAS",null);
            
            axios
                .get(`${rootState.apiurl}/api/v1/kelas`,{
                    headers: {
                      token: getLocalStorage("userdata").token,
                    }
                })
                .then(( res ) => {

                    commit("SET_KELAS",res.data);

                })
                .catch(( error ) => {
                    commit("SET_KELAS",[]);
                    
                    if (error.response.status >= 500) {
                        toast.error("terjadi kesalahan pada server, refresh halaman !", {
                            position: toast.POSITION.TOP_LEFT,
                        });
                    }
                
                })

        },
        GET_SUBKELAS: function ({ commit,rootState }) {
            commit("SET_SUBKELAS",null);
            
            axios
                .get(`${rootState.apiurl}/api/v1/subkelas`,{
                    headers: {
                      token: getLocalStorage("userdata").token
                    }
                })
                .then(( res ) => {

                    commit("SET_SUBKELAS",res.data);

                })
                .catch(( error ) => {
                    commit("SET_KELAS",[]);
                    
                    if (error.response.status >= 500) {
                        toast.error("terjadi kesalahan pada server, refresh halaman !", {
                            position: toast.POSITION.TOP_LEFT,
                        });
                    }
                
                })

        },
        DELETE: function ({ rootState },data) {
            console.log(data.formName);

            axios
                .delete(`${rootState.apiurl}/api/v1/${data.formName}/${data.id}`,{
                    headers: {
                      token: getLocalStorage("userdata").token
                    }
                })
                .then((  ) => {

                    toast.success(`${data.formName} berhasil dihapus !`, {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                })
                .catch(( error ) => {
                    
                    if (error.response.status >= 500) {
                        toast.error("terjadi kesalahan pada server, refresh halaman !", {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    }
                    else if (error.response.status == 401) {
                        
                        toast.warn(error.response.data.message, {
                            position: toast.POSITION.TOP_RIGHT,
                        });

                        removeLocalStorage("userdata");
                        router.push('/login');

                    }

                })

        },
    },
    mutations: {
        SET_KELAS: function(state, data) {
            state.kelas = data;
        },
        SET_SUBKELAS: function(state, data) {
            state.subkelas = data;
        },
    }
}