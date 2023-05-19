import { getLocalStorage, removeLocalStorage } from "@/services/localstorage.service";
import axios     from 'axios';
import router    from "@/router"; 
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    namespaced: true,
    state: {
      dataTarget: {},
      privilege: null,
      usernameError: null,
      passwordError: null,
    },
    getters: {
        privilegeGetter: state => state.privilege
    },
    actions: {
        DO_ADD: function ({ commit,getters,dispatch,rootState },form) {

            // show loading
            commit("loadingux/SET_DATA_LOADING",{show:true,text:'menambahkan'},{ root: true });

            axios
                .post(`${rootState.apiurl}/api/v1/${getters.privilegeGetter}`,form,{
                    headers: {
                      token: getLocalStorage("userdata").token
                    }
                })
                .then(( ) => {

                    toast.success("akun berhasil dibuat !", {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                    if (getters.privilegeGetter == "admin") {
                        dispatch("adminapi/GET_ADMIN",{},{ root: true });
                    } else {
                        dispatch("teacherapi/GET_TEACHER",{},{ root: true });
                    }
                })
                .catch(( error ) => {
                    
                    if (error.response.status == 400) {
                        let usernameError = error.response.data.username;
                        let passwordError = error.response.data.password;
                        
                        if (usernameError) {
                            commit("SET_USERNAME_ERROR",usernameError[0]);
                        }
                        if (passwordError) {
                            commit("SET_PASSWORD_ERROR",passwordError[0]);
                        }
                    }
                    else if (error.response.status == 401) {

                        toast.warn(error.response.status.message, {
                            position: toast.POSITION.TOP_RIGHT,
                        });

                        removeLocalStorage("userdata");
                        router.push("/login");

                    }
                    else if (error.response.status >= 500) {
                        toast.error("terjadi kesalahan pada server !", {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    }
                
                })
                .finally(() => {

                    commit("loadingux/SET_DATA_LOADING",{show:false,text:''},{ root: true });

                })

        },
        DO_UPDATE: function ({ commit,getters,dispatch,rootState },form) {

            // show loading
            commit("loadingux/SET_DATA_LOADING",{show:true,text:'update'},{ root: true });

            axios
                .put(`${rootState.apiurl}/api/v1/${getters.privilegeGetter}`,form,{
                    headers: {
                      token: getLocalStorage("userdata").token
                    }
                })
                .then(( ) => {

                    toast.success("akun berhasil update !", {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                    if (getters.privilegeGetter == "admin") {
                        dispatch("adminapi/GET_ADMIN",{},{ root: true });
                    } else {
                        dispatch("teacherapi/GET_TEACHER",{},{ root: true });
                    }

                })
                .catch(( error ) => {
                    
                    if (error.response.status == 400) {
                        let usernameError = error.response.data.username;
                        let passwordError = error.response.data.password;
                        
                        if (usernameError) {
                            commit("SET_USERNAME_ERROR",usernameError[0]);
                        }
                        if (passwordError) {
                            commit("SET_PASSWORD_ERROR",passwordError[0]);
                        }
                    }
                    else if (error.response.status == 401) {

                        toast.warn(error.response.status.message, {
                            position: toast.POSITION.TOP_RIGHT,
                        });

                        removeLocalStorage("userdata");
                        router.push("/login");

                    }
                    else if (error.response.status >= 500) {
                        toast.error("terjadi kesalahan pada server !", {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    }
                
                })
                .finally(() => {

                    commit("loadingux/SET_DATA_LOADING",{show:false,text:''},{ root: true });

                })

        },
    },
    mutations: {
        SET_DATA_TARGET: function(state, data) {
            state.dataTarget = data;
        },
        SET_PRIVILEGE: function(state, data) {
            state.privilege = data;
        },
        SET_USERNAME_ERROR: function(state, msg) {
            state.usernameError = msg;
        },
        SET_PASSWORD_ERROR: function(state, msg) {
            state.passwordError = msg;
        },
    }
}