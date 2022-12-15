import axios     from 'axios';
import router    from "@/router";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { getLocalStorage, removeLocalStorage } from "@/services/localstorage.service";

export default {
    namespaced: true,
    state: {
        query:null,
        siswa: null,
        tmpSiswa: [],
    },
    getters: {
        queryGetter: state => state.query
    },
    actions: {
        GET_SISWA: function ({ commit,rootState },query) {
            commit("SET_QUERY",query);
            commit("SET_SISWA",null);

            axios
                .get(`${rootState.apiurl}/api/v1/student?limit=${query.limit == "" ? 0 : query.limit}&kelas=${query.kelas}&subkelas=${query.subkelas}&key=${query.key}`,{
                    headers: {
                      token: getLocalStorage("userdata").token
                    }
                })
                .then(( res ) => {

                    commit("SET_SISWA",res.data);
                    commit("SET_TMPSISWA",res.data);

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

                    commit("SET_SISWA",[]);
                    commit("SET_TMPSISWA",[]);

                })

        },
        UP_STUDENT_CLASS: function ({ commit,rootState,dispatch,getters }) {
            // show loading
            commit("loadingux/SET_DATA_LOADING",{show:true,text:'update kelas'},{ root: true });

            axios
                .get(`${rootState.apiurl}/api/v1/student/upclass`,{
                    headers: {
                      token: getLocalStorage("userdata").token
                    }
                })
                .then(( ) => {

                    toast.success(`data kelas siswa berhasil diupdate`, {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                    dispatch("GET_SISWA",getters.queryGetter);

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

                    commit("SET_SISWA",[]);

                })
                .finally(() => {

                    commit("loadingux/SET_DATA_LOADING",{show:false,text:''},{ root: true });

                })

        },
        DELETE_SISWA: function ({ rootState },id) {

            axios
                .delete(`${rootState.apiurl}/api/v1/student/${id}`,{
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
        SET_QUERY: function(state, data) {
            state.query = data;
        },
        SET_SISWA: function(state, data) {
            state.siswa = data;
        },
        SET_TMPSISWA: function(state, data) {
            state.tmpSiswa = data;
        },
    }
}