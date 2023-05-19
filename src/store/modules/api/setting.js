import { getLocalStorage, removeLocalStorage, } from '@/services/localstorage.service';
import router    from '@/router';
import axios     from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    namespaced: true,
    state: {
        username: "",
        usernameError: null,
        passwordError: null,
        oldPasswordError: null,
    },
    getters: {
    },
    actions: {
        DO_UPDATE_PROFILE: function ({ commit,rootState },form) {

            const userData = getLocalStorage("userdata");

            // if username or password empty
            if (form.get("password") == 'undefined' || form.get("password") == '') {
                form.delete("password");
            }
            if (form.get("old_password") == 'undefined' || form.get("old_password") == '') {
                form.delete("old_password");
            }

            // show loading
            commit("loadingux/SET_DATA_LOADING",{show:true,text:'update'},{ root: true });

            axios
                .put(`${rootState.apiurl}/api/v1/profile`,form,{
                    headers: {
                      token: userData.token
                    }
                })
                .then(( ) => {

                    toast.success("profile berhasil diupdate !", {
                        position: toast.POSITION.TOP_LEFT,
                    });

                })
                .catch(( error ) => {
                    
                    if (error.response.status == 400) {
                        let usernameError = error.response.data.username;
                        let passwordError = error.response.data.password;
                        let oldPasswordError = error.response.data.old_password;

                        if (usernameError) {
                            commit("SET_USERNAME_ERROR",usernameError[0]);
                            
                            toast.warn(usernameError[0], {
                                position: toast.POSITION.TOP_LEFT,
                            });
                        }
                        if (passwordError) {
                            commit("SET_PASSWORD_ERROR",passwordError[0]);
                            
                            toast.warn(passwordError[0], {
                                position: toast.POSITION.TOP_LEFT,
                            });
                        }
                        if (oldPasswordError) {
                            commit("SET_OLDPASSWORD_ERROR",oldPasswordError[0]);
                            
                            toast.warn(oldPasswordError[0], {
                                position: toast.POSITION.TOP_LEFT,
                            });
                        }
                    }
                    else if (error.response.status == 401) {
                        let oldPasswordError = error.response.data.old_password;

                        if (oldPasswordError) {
                            commit("SET_OLDPASSWORD_ERROR",oldPasswordError[0]);

                            toast.warn(oldPasswordError[0], {
                                position: toast.POSITION.TOP_LEFT,
                            });
                        }
                        else {
                            toast.warn("waktu login anda habis", {
                                position: toast.POSITION.TOP_RIGHT,
                            });

                            removeLocalStorage("userdata");
                            router.push('/login');
                        }
                    }
                    else if (error.response.status >= 500) {
                        toast.error("terjadi kesalahan pada server !", {
                            position: toast.POSITION.TOP_LEFT,
                        });
                    }
                
                })
                .finally(() => {

                    commit("loadingux/SET_DATA_LOADING",{show:false,text:''},{ root: true });

                })

        },
    },
    mutations: {
        SET_USERNAME_SETTING: function(state, username) {
            state.username = username;
        },
        SET_USERNAME_ERROR: function(state, msg) {
            state.usernameError = msg;
        },
        SET_PASSWORD_ERROR: function(state, msg) {
            state.passwordError = msg;
        },
        SET_OLDPASSWORD_ERROR: function(state, msg) {
            state.oldPasswordError = msg;
        },
    }
}