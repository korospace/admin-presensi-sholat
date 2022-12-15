import axios     from 'axios';
import router    from "@/router";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import { getLocalStorage, removeLocalStorage } from "@/services/localstorage.service";

export default {
    namespaced: true,
    state: {
        teacher: null,
        tmpTeacher: [],
    },
    getters: {
        // userDataGetter: state => state.userData
    },
    actions: {
        GET_TEACHER: function ({ commit,rootState }) {
            commit("SET_TEACHER",null);

            axios
                .get(`${rootState.apiurl}/api/v1/teacher`,{
                    headers: {
                      token: getLocalStorage("userdata").token
                    }
                })
                .then(( res ) => {

                    commit("SET_TEACHER",res.data);
                    commit("SET_TMPTEACHER",res.data);

                })
                .catch(( error ) => {
                    
                    if (error.response.status >= 500) {
                        toast.error("terjadi kesalahan pada server, refresh halaman !", {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    }
                    // else if (error.response.status == 401) {
                        
                    //     toast.warn(error.response.data.message, {
                    //         position: toast.POSITION.TOP_RIGHT,
                    //     });

                    //     removeLocalStorage("userdata");
                    //     router.push('/login');

                    // }

                    commit("SET_TEACHER",[]);
                    commit("SET_TMPTEACHER",[]);

                })

        },
        DELETE_TEACHER: function ({ rootState },id) {

            axios
                .delete(`${rootState.apiurl}/api/v1/teacher/${id}`,{
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
        SET_TEACHER: function(state, data) {
            state.teacher = data;
        },
        SET_TMPTEACHER: function(state, data) {
            state.tmpTeacher = data;
        },
    }
}