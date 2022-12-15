import axios     from 'axios';
// import router    from "@/router";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { 
        getLocalStorage, 
        // removeLocalStorage 
    } from "@/services/localstorage.service";

export default {
    namespaced: true,
    state: {
        parent: null,
        tmpParent: [],
    },
    getters: {
        // userDataGetter: state => state.userData
    },
    actions: {
        GET_PARENT: function ({ commit,rootState },query) {
            commit("SET_PARENT",null);

            axios
                .get(`${rootState.apiurl}/api/v1/parent?limit=${query.limit == "" ? 0 : query.limit}&key=${query.key}`,{
                    headers: {
                      token: getLocalStorage("userdata").token
                    }
                })
                .then(( res ) => {

                    commit("SET_PARENT",res.data);
                    commit("SET_TMPPARENT",res.data);

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

                    commit("SET_PARENT",[]);
                    commit("SET_TMPPARENT",[]);

                })

        },
    },
    mutations: {
        SET_PARENT: function(state, data) {
            state.parent = data;
        },
        SET_TMPPARENT: function(state, data) {
            state.tmpParent = data;
        },
    }
}