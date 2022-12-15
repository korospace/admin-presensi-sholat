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
      nisError: null,
      namaLengkapError: null,
      kelasError: null,
      subKelasError: null,
      passwordError: null,
    },
    getters: {
        privilegeGetter: state => state.privilege
    },
    actions: {
        DO_ADD: function ({ commit,dispatch,rootState },form) {

            // show loading
            commit("loadingux/SET_DATA_LOADING",{show:true,text:'login'},{ root: true });

            axios
                .post(`${rootState.apiurl}/api/v1/student`,form,{
                    headers: {
                      token: getLocalStorage("userdata").token
                    }
                })
                .then(( ) => {

                    toast.success("akun berhasil dibuat !", {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                    dispatch("siswaapi/GET_SISWA",{
                        limit:50,
                        kelas:form.get('kelas'),
                        subkelas:form.get('sub_kelas'),
                        key: ""
                    },{ root: true });
                })
                .catch(( error ) => {
                    
                    if (error.response.status == 400) {
                        let nisError         = error.response.data.nis;
                        let namaLengkapError = error.response.data.nama_lengkap;
                        let kelasError       = error.response.data.kelas;
                        let subKelasError    = error.response.data.sub_kelas;
                        let passwordError    = error.response.data.password;
                        
                        if (nisError) {
                            commit("SET_NIS_ERROR",nisError[0]);
                        }
                        if (namaLengkapError) {
                            commit("SET_NAMALENGKAP_ERROR",namaLengkapError[0]);
                        }
                        if (kelasError) {
                            commit("SET_KELAS_ERROR",kelasError[0]);
                        }
                        if (subKelasError) {
                            commit("SET_SUBKELAS_ERROR",subKelasError[0]);
                        }
                        if (passwordError) {
                            commit("SET_PASSWORD_ERROR",passwordError[0]);
                        }
                    }
                    else if (error.response.status == 401) {

                        toast.warn(error.response.message, {
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
        DO_UPDATE: function ({ commit,getters,rootState },form) {

            // show loading
            commit("loadingux/SET_DATA_LOADING",{show:true,text:'login'},{ root: true });

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

                    if (getters.privilegeGetter == 'student') {
                        let siswa    = rootState.siswaapi.siswa;
                        let siswaNew = siswa.filter(e => {
                            if (e.id == form.get('id')) {
                                e.nis = form.get('nis');
                                e.nama_lengkap = form.get('nama_lengkap');
                                e.kelas = form.get('kelas');
                                e.sub_kelas = form.get('sub_kelas');
                                e.active = form.get('active');
                            }

                            return e;
                        })

                        commit("siswaapi/SET_SISWA",siswaNew,{ root: true });
                    }

                })
                .catch(( error ) => {
                    
                    if (error.response.status == 400) {
                        let nisError         = error.response.data.nis;
                        let namaLengkapError = error.response.data.nama_lengkap;
                        let kelasError       = error.response.data.kelas;
                        let subKelasError    = error.response.data.sub_kelas;
                        let passwordError    = error.response.data.password;
                        
                        if (nisError) {
                            commit("SET_NIS_ERROR",nisError[0]);
                        }
                        if (namaLengkapError) {
                            commit("SET_NAMALENGKAP_ERROR",namaLengkapError[0]);
                        }
                        if (kelasError) {
                            commit("SET_KELAS_ERROR",kelasError[0]);
                        }
                        if (subKelasError) {
                            commit("SET_SUBKELAS_ERROR",subKelasError[0]);
                        }
                        if (passwordError) {
                            commit("SET_PASSWORD_ERROR",passwordError[0]);
                        }
                    }
                    else if (error.response.status == 401) {

                        toast.warn(error.response.message, {
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
        SET_DATA_PRIVILEGE: function(state, data) {
            state.privilege = data;
        },
        SET_NIS_ERROR: function(state, msg) {
            state.nisError = msg;
        },
        SET_NAMALENGKAP_ERROR: function(state, msg) {
            state.namaLengkapError = msg;
        },
        SET_KELAS_ERROR: function(state, msg) {
            state.kelasError = msg;
        },
        SET_SUBKELAS_ERROR: function(state, msg) {
            state.subKelasError = msg;
        },
        SET_PASSWORD_ERROR: function(state, msg) {
            state.passwordError = msg;
        },
        SET_ACTIVE: function(state, status) {
            state.dataTarget.active = status;
        },
    }
}