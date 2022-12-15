import axios     from 'axios';
import router    from "@/router";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { getLocalStorage, removeLocalStorage } from "@/services/localstorage.service";

export default {
    namespaced: true,
    state: {
        score: null,
        tmpScore: [],
    },
    getters: {
        // userDataGetter: state => state.userData
    },
    actions: {
        GET_SCORE: function ({ commit,rootState },query) {
            commit("SET_SCORE",null);

            axios
                .get(`${rootState.apiurl}/api/v1/presensi/nilai?datestart=${query.dateStart}&dateend=${query.dateEnd}&limit=${query.limit == "" ? 0 : query.limit}&kelas=${query.kelas}&subkelas=${query.subkelas}&key=${query.key}`,{
                    headers: {
                      token: getLocalStorage("userdata").token
                    }
                })
                .then(( res ) => {

                    commit("SET_SCORE",res.data);
                    commit("SET_TMPSCORE",res.data);

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

                    commit("SET_SCORE",[]);
                    commit("SET_TMPSCORE",[]);

                })

        },
        DOWNLOAD_SCORE: function ({ commit,rootState },query) {
            // show loading
            commit("loadingux/SET_DATA_LOADING",{show:true,text:'download'},{ root: true });

            fetch(`${rootState.apiurl}/api/v1/presensi/nilai/excel?datestart=${query.dateStart}&dateend=${query.dateEnd}&limit=${query.limit == "" ? 0 : query.limit}&kelas=${query.kelas}&subkelas=${query.subkelas}&key=${query.key}`,{
                headers: {
                  token: getLocalStorage("userdata").token,
                }
            })
            .then((result) => {
                // hide loading
                commit("loadingux/SET_DATA_LOADING",{show:false,text:''},{ root: true });

                if (result.status == 401) {
                    toast.warn("waktu login anda habis", {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                    removeLocalStorage("userdata");
                    router.push("/login");
                    return 0;
                }
                else if (result.status >= 500) {
                    toast.error("gagal, terjadi kesalahan pada server!", {
                        position: toast.POSITION.TOP_LEFT,
                    });
                    return 0;
                }

                return result.blob();
            })
            .then((data) => {
                var url = window.URL.createObjectURL(data),
                anchor = document.createElement("a");
                anchor.href = url;
                anchor.download = "nilai_siswa.xlsx";
                anchor.click();
            
                window.URL.revokeObjectURL(url);
                document.removeChild(anchor);
            })
        },
    },
    mutations: {
        SET_SCORE: function(state, data) {
            state.score = data;
        },
        SET_TMPSCORE: function(state, data) {
            state.tmpScore = data;
        },
    }
}