// const fileDownload = require('js-file-download');

import { getLocalStorage, removeLocalStorage } from "@/services/localstorage.service";
import axios     from 'axios';
import router    from "@/router"; 
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    namespaced: true,
    state: {
      fileError: null,
    },
    getters: {
    },
    actions: {
        DOWNLOAD_EXCEL_FORMAT: function ({ rootState }) {

            fetch(`${rootState.apiurl}/api/v1/student/excelformat`,{
                headers: {
                  token: getLocalStorage("userdata").token,
                }
            })
            .then((result) => {
                if (result.status == 401) {
                    toast.warn("waktu login anda habis", {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                    removeLocalStorage("userdata");
                    router.push("/login");
                    return 0;
                }
                else if (result.status == 500) {
                    toast.error("terjadi kesalahan pada server, refresh halaman !", {
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
                anchor.download = "format_siswa.xlsx";
                anchor.click();
            
                window.URL.revokeObjectURL(url);
                document.removeChild(anchor);
            })

            // axios
            //     .get(`${rootState.apiurl}/api/v1/student/excelformat`,{
            //         headers: {
            //           token: getLocalStorage("userdata").token,
            //           'Content-Disposition': "attachment;filename=format_siswa.xlsx",
            //           'Content-Type': "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            //         }
            //     })
            //     .then((response) => {
            //         fileDownload(response.data, 'format_siswa.xlsx');
            //     })
            //     .catch(( error ) => {
                    
            //         if (error.response.status == 401) {
            //             toast.warn(error.response.message, {
            //                 position: toast.POSITION.TOP_RIGHT,
            //             });

            //             removeLocalStorage("userdata");
            //             router.push("/login");
            //         }
            //         else if (error.response.status == 500) {
            //             toast.error("terjadi kesalahan pada server, refresh halaman !", {
            //                 position: toast.POSITION.TOP_LEFT,
            //             });
            //         }
                
            //     })

        },
        SEND_FILE: function ({ commit,rootState,dispatch },form) {

            // show loading
            commit("loadingux/SET_DATA_LOADING",{show:true,text:'import'},{ root: true });

            axios
                .post(`${rootState.apiurl}/api/v1/student/excel`,form,{
                    headers: {
                      token: getLocalStorage("userdata").token
                    }
                })
                .then(( res ) => {

                    toast.success(res.data.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                    dispatch("siswaapi/GET_SISWA",{
                        limit:50,
                        kelas:"",
                        subkelas:"",
                        key: ""
                    },{ root: true });
                })
                .catch(( error ) => {
                    
                    if (error.response.status == 400) {
                        toast.warn(error.response.data.message, {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                        let fileError = error.response.data.rules;
                        
                        if (fileError) {
                            commit("SET_FILE_ERROR",fileError);
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
        SET_FILE_ERROR: function(state, msg) {
            state.fileError = msg;
        },
    }
}