import axios     from 'axios';
import router    from "@/router";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import { getLocalStorage, removeLocalStorage } from "@/services/localstorage.service";

export default {
    namespaced: true,
    state: {
        admin: null,
        tmpAdmin: [],
    },
    getters: {
        // userDataGetter: state => state.userData
    },
    actions: {
        GET_ADMIN: function ({ commit,rootState }) {
            commit("SET_ADMIN",null);

            axios
                .get(`${rootState.apiurl}/api/v1/admin`,{
                    headers: {
                      token: getLocalStorage("userdata").token
                    }
                })
                .then(( res ) => {

                    commit("SET_ADMIN",res.data);
                    commit("SET_TMPADMIN",res.data);

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

                    commit("SET_ADMIN",[]);
                    commit("SET_TMPADMIN",[]);

                })

        },
        DELETE_ADMIN: function ({ rootState },id) {

            axios
                .delete(`${rootState.apiurl}/api/v1/admin/${id}`,{
                    headers: {
                      token: getLocalStorage("userdata").token
                    }
                })
                .then((  ) => {

                    toast.success("akun berhasil dihapus !", {
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
        SET_ADMIN: function(state, data) {
            state.admin = data;
        },
        SET_TMPADMIN: function(state, data) {
            state.tmpAdmin = data;
        },
    }
}