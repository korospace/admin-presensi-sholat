<template>
  
  <!-- Container -->
  <section
    id="container_teacher"
    class="min-h-full max-h-full w-full flex flex-col">

      <!-- title page -->
      <title-page title="TABEL TEACHER">
        <button
          @click="showForm($event)"
          class="absolute top-3 right-3 px-3 py-2 text-center text-white bg-green-600 hover:bg-green-500 rounded-md cursor-pointer">
            <svg viewBox="0 0 24 24" width="20" height="20" class="inline-block"><path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path></svg>
        </button>
      </title-page>

      <!-- form add edit -->
      <FormAddEdit />

      <!-- table container -->
      <div
        class="flex-1 w-full p-3 overflow-hidden">

          <!-- table wraper -->
          <div
            class="h-full max-h-full w-full flex flex-col bg-neutral-900/70 backdrop-blur-md rounded-xl overflow-hidden">

              <!-- head -->
              <div
                class="flex flex-col lg:flex-row justify-between p-4">

                  <!-- filter wraper -->
                  <div class="flex flex-1 lg:flex-none flex-col sm:flex-row items-center">
                      <!-- search -->
                      <input 
                        @keyup="doSearch"
                        type="text" placeholder="cari username"
                        class="w-full sm:w-auto flex-none sm:flex-1 h-10 px-2 py-2 sm:ml-1 mt-1 sm:mt-0 bg-transparent text-neutral-200 placeholder-neutral-400/50 outline-none border border-neutral-400 rounded">
                  </div>

              </div>

              <!-- body -->
              <div class="relative flex-1 flex flex-col text-neutral-400 overflow-auto">

                  <table class="w-full min-w-max">
                      <thead class="sticky top-0 z-10 border-y border-neutral-500 bg-neutral-900">
                        <tr>
                          <th class="py-3 border-r border-neutral-500">NO</th>
                          <th class="border-r border-neutral-500">USERNAME</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody  v-if="arrTeacher != null">
                        <tr v-for="(x,i) in arrTeacher" :key="x">
                          <td class="py-3 px-4 border-r border-neutral-500">{{ ++i }}</td>
                          <td class="px-4 border-r border-neutral-500">{{ x.username }}</td>
                          <td class="px-4">
                            <div class="w-full h-full flex justify-center items-center text-neutral-200">
                              <button
                                @click="showForm($event,x)" 
                                class="h-6 px-1 mx-1 flex justify-center items-center bg-yellow-600 hover:bg-yellow-500 rounded-sm">
                                  <svg viewBox="0 0 24 24" width="16" height="16" class="inline-block"><path fill="currentColor" d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z"></path></svg>
                              </button>
                              <button
                                @click="deleteTeacher($event,x.id)" 
                                class="h-6 px-1 flex justify-center items-center bg-red-600 hover:bg-red-500 rounded-sm">
                                  <svg viewBox="0 0 24 24" width="16" height="16" class="inline-block"><path fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"></path></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                  </table>

                  <!-- loading -->
                  <div 
                    v-if="arrTeacher == null"
                    class="flex-1 flex justify-center items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; display: block; shape-rendering: auto;" width="50px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                          <circle cx="50" cy="50" fill="none" stroke="#737373" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                          </circle>
                      </svg>
                  </div>

              </div>

          </div>

      </div>

  </section>

</template>

<script>
import { computed, onMounted } from '@vue/runtime-core';
import TitlePage    from '@/components/TitlePage.vue'
import FormAddEdit  from '@/components/FormAddEditAdminTeacher.vue'
import { useStore } from "vuex"
import Swal         from 'sweetalert2';

export default {
  name: 'TeacherView',
  components: {
    TitlePage,
    FormAddEdit
  },
  
  setup() {
    // instance
    const store = useStore();

    // vuex state
    let arrTeacher = computed(() => {
      return store.state.teacherapi.teacher;
    });

    // search
    const doSearch = (event) => {
      let key      = event.target.value;
      let tmpTeacher = store.state.teacherapi.tmpTeacher;
      let teacher    = tmpTeacher.filter(e => {
        if (e.username.includes(key)) {
          return e;
        }
      })

      store.commit("teacherapi/SET_TEACHER",teacher);
    }

    // show form
    const showForm = (event,data = {}) => {
      store.commit("formAddEditAdminTeacherUx/SET_SHOW_FORM",true);
      store.commit("formAddEditAdminTeacherApi/SET_DATA_TARGET",data);
      store.commit("formAddEditAdminTeacherApi/SET_PRIVILEGE",'teacher');
    }

    // delete teacher
    const deleteTeacher = (event,id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Anda yakin menghapus akun ini?',
            showDenyButton: true,
            confirmButtonText: 'iya',
            denyButtonText: `tidak`,
        }).then((result) => {
            if (result.isConfirmed) {
                let tmpTeacher = store.state.teacherapi.tmpTeacher;
                let teacher    = tmpTeacher.filter(e => {
                  if (e.id != id) {
                    return e;
                  }
                })

                store.commit("teacherapi/SET_TEACHER",teacher);
                store.commit("teacherapi/SET_TMPTEACHER",teacher);
                store.dispatch("teacherapi/DELETE_TEACHER",id);
            } 

            Swal.close()
        })
    }

    onMounted(() => {
      store.dispatch("teacherapi/GET_TEACHER");
    })

    return {
      arrTeacher,
      doSearch,
      showForm,
      deleteTeacher,
    }

  }
}
</script>
