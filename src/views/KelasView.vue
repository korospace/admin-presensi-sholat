<template>

  <!-- Container -->
  <section
    id="container_kelas"
    class="min-h-full max-h-full w-full flex flex-col">

      <!-- title page -->
      <title-page title="KELAS & SUBKELAS"/>

      <!-- Form Subkelas -->
      <FormAddEdit />
        
      <!-- table container -->
      <div
        class="flex-1 w-full p-3 overflow-hidden">

          <!-- table wraper -->
          <div
            class="h-full max-h-full w-full flex flex-col sm:flex-row text-neutral-400 overflow-hidden">

              <!-- table kelas -->
              <div
                class="relative flex flex-col h-full sm:w-1/2 sm:mr-1.5 bg-neutral-900/70 backdrop-blur-md rounded-xl overflow-hidden">
                  <div class="overflow-auto">
                    <table class="w-full min-w-max">
                        <thead class="sticky top-0 z-10 border-b border-neutral-500 bg-neutral-900">
                          <tr>
                            <th class="w-10 py-3 border-r border-neutral-500">NO</th>
                            <th class="border-r border-neutral-500">KELAS</th>
                            <th>ACTION</th>
                          </tr>
                        </thead>
                        <tbody  v-if="arrKelas != null">
                          <tr v-for="(x,i) in arrKelas" :key="x">
                            <td class="w-10 py-3 border-r border-neutral-500">{{ ++i }}</td>
                            <td class="px-4 border-r border-neutral-500">{{ x.name }}</td>
                              <td class="px-4">
                                <div class="w-full h-full flex justify-center items-center text-neutral-200">
                                  <button 
                                    @click="showForm($event,'kelas',x)"
                                    class="h-6 px-1 mx-1 flex justify-center items-center bg-yellow-600 hover:bg-yellow-500 rounded-sm">
                                      <svg viewBox="0 0 24 24" width="16" height="16" class="inline-block"><path fill="currentColor" d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z"></path></svg>
                                  </button>
                                  <button
                                    @click="deleteTarget($event,x.id,'kelas')" 
                                    class="h-6 px-1 flex justify-center items-center bg-red-600 hover:bg-red-500 rounded-sm">
                                      <svg viewBox="0 0 24 24" width="16" height="16" class="inline-block"><path fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"></path></svg>
                                  </button>
                                </div>
                              </td>
                          </tr>
                        </tbody>
                    </table>
                  </div>

                  <div class="mt-4 px-3 pb-3">
                    <button
                      @click="showForm($event,'kelas')"
                      class="w-full px-3 py-1 text-center text-white bg-green-600 hover:bg-green-500 rounded cursor-pointer">
                        <svg viewBox="0 0 24 24" width="20" height="20" class="inline-block"><path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path></svg>
                    </button>
                  </div>

                  <!-- loading -->
                  <div 
                    v-if="arrKelas == null"
                    class="flex-1 flex justify-center items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; display: block; shape-rendering: auto;" width="50px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                          <circle cx="50" cy="50" fill="none" stroke="#737373" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                          </circle>
                      </svg>
                  </div>
              </div>

              <!-- table sub kelas -->
              <div
                class="relative flex flex-col h-full sm:w-1/2 sm:ml-1.5 mt-4 sm:mt-0 bg-neutral-900/70 backdrop-blur-md rounded-xl overflow-hidden">
                  <div class="overflow-auto">
                    <table class="w-full min-w-max">
                        <thead class="sticky top-0 z-10 border-b border-neutral-500 bg-neutral-900">
                          <tr>
                            <th class="w-10 py-3 border-r border-neutral-500">NO</th>
                            <th class="border-r border-neutral-500">SUB KELAS</th>
                            <th>ACTION</th>
                          </tr>
                        </thead>
                        <tbody v-if="arrSubkelas != null">
                          <tr v-for="(x,i) in arrSubkelas" :key="x">
                            <td class="w-10 py-3 px-4 border-r border-neutral-500">{{ ++i }}</td>
                            <td class="px-4 border-r border-neutral-500">{{ x.name }}</td>
                            <td class="px-4">
                              <div class="w-full h-full flex justify-center items-center text-neutral-200">
                                <button 
                                  @click="showForm($event,'subkelas',x)"
                                  class="h-6 px-1 mx-1 flex justify-center items-center bg-yellow-600 hover:bg-yellow-500 rounded-sm">
                                    <svg viewBox="0 0 24 24" width="16" height="16" class="inline-block"><path fill="currentColor" d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z"></path></svg>
                                </button>
                                <button
                                  @click="deleteTarget($event,x.id,'subkelas')" 
                                  class="h-6 px-1 flex justify-center items-center bg-red-600 hover:bg-red-500 rounded-sm">
                                    <svg viewBox="0 0 24 24" width="16" height="16" class="inline-block"><path fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"></path></svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                    </table>
                  </div>

                  <div class="mt-4 px-3 pb-3">
                    <button
                      @click="showForm($event,'subkelas')"
                      class="w-full px-3 py-1 text-center text-white bg-green-600 hover:bg-green-500 rounded cursor-pointer">
                        <svg viewBox="0 0 24 24" width="20" height="20" class="inline-block"><path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path></svg>
                    </button>
                  </div>


                  <!-- loading -->
                  <div 
                    v-if="arrSubkelas == null"
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
    import { computed, onMounted } from 'vue';
    import FormAddEdit  from '@/components/FormAddEditKelasSubkelas.vue'
    import TitlePage    from '@/components/TitlePage.vue'
    import { useStore } from 'vuex'
    import Swal         from 'sweetalert2';

    export default {
        name: 'KelasView',
        components: {
            TitlePage,
            FormAddEdit,
        },
        setup() {
            // instance
            const store = useStore();

            // vuex state
            let arrKelas = computed(() => {
              return store.state.kelasapi.kelas;
            });
            let arrSubkelas = computed(() => {
              return store.state.kelasapi.subkelas;
            });

            // show form
            const showForm = (event,name,data = {}) => {
              store.commit("formAddEditKelasSubkelasApi/SET_FORM_NAME",name);
              store.commit("formAddEditKelasSubkelasApi/SET_DATA_TARGET",data);
              store.commit("formAddEditKelasSubkelasUx/SET_SHOW_FORM",true);
            }

            // delete
            const deleteTarget = (event,id,formName) => {
                Swal.fire({
                    icon: 'warning',
                    title: `Yakin menghapus ${formName} ini?`,
                    text: 'aksi ini mempengaruhi data siswa',
                    showDenyButton: true,
                    confirmButtonText: 'iya',
                    denyButtonText: `tidak`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        let tmp = [];

                        if (formName == "kelas") {
                          tmp = store.state.kelasapi.kelas;
                        } else {
                          tmp = store.state.kelasapi.subkelas;
                        }

                        let newData = tmp.filter(e => {
                          if (e.id != id) {
                            return e;
                          }
                        })

                        store.commit(`kelasapi/${formName == 'kelas'?'SET_KELAS':'SET_SUBKELAS'}`,newData);
                        store.dispatch("kelasapi/DELETE",{id,formName});
                    } 

                    Swal.close()
                })
            }

            onMounted(() => {
              store.dispatch("kelasapi/GET_KELAS");
              store.dispatch("kelasapi/GET_SUBKELAS");
            })

            return {
              showForm,
              arrKelas,
              arrSubkelas,
              deleteTarget,
            }

        }
    }

</script>

<style lang="css" scoped>



</style>