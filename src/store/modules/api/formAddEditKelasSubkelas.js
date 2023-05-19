import { getLocalStorage, removeLocalStorage } from "@/services/localstorage.service";
import axios     from 'axios';
import router    from "@/router"; 
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    namespaced: true,
    state: {
      formName:"",
      dataTarget:{},
      nameError: null,
    },
    getters: {
      formNameGetter: state => state.formName
    },
    actions: {
      DO_ADD: function ({ commit,getters,dispatch,rootState },form) {

          // show loading
          commit("loadingux/SET_DATA_LOADING",{show:true,text:'menambahkan'},{ root: true });

          axios
              .post(`${rootState.apiurl}/api/v1/${getters.formNameGetter}`,form,{
                  headers: {
                    token: getLocalStorage("userdata").token
                  }
              })
              .then(( ) => {

                  toast.success(`${getters.formNameGetter} berhasil dibuat !`, {
                      position: toast.POSITION.TOP_RIGHT,
                  });

                  if (getters.formNameGetter == "kelas") {
                      dispatch("kelasapi/GET_KELAS",{},{ root: true });
                  } 
                  else {
                      dispatch("kelasapi/GET_SUBKELAS",{},{ root: true });
                  }
              })
              .catch(( error ) => {
                  
                  if (error.response.status == 400) {
                      let nameError = error.response.data.name;
                      
                      if (nameError) {
                          commit("SET_NAME_ERROR",nameError[0]);
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
              .put(`${rootState.apiurl}/api/v1/${getters.formNameGetter}`,form,{
                  headers: {
                    token: getLocalStorage("userdata").token
                  }
              })
              .then(( ) => {

                  toast.success(`${getters.formNameGetter} berhasil diupdate !`, {
                      position: toast.POSITION.TOP_RIGHT,
                  });

                  if (getters.formNameGetter == "kelas") {
                      dispatch("kelasapi/GET_KELAS",{},{ root: true });
                  } 
                  else {
                      dispatch("kelasapi/GET_SUBKELAS",{},{ root: true });
                  }
              })
              .catch(( error ) => {
                  
                  if (error.response.status == 400) {
                      let nameError = error.response.data.name;
                      
                      if (nameError) {
                          commit("SET_NAME_ERROR",nameError[0]);
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
      SET_FORM_NAME: function(state, name) {
          state.formName = name;
      },
      SET_DATA_TARGET: function(state, data) {
          state.dataTarget = data;
      },
      SET_NAME_ERROR: function(state, msg) {
          state.nameError = msg;
      },
    }
}