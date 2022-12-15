<template>
  
  <!-- Container -->
  <section
    id="container_orangtua"
    class="min-h-full max-h-full w-full flex flex-col">

      <!-- title page -->
      <title-page title="TABEL ORANGTUA" />

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
                      <!-- jumlah -->
                      <input 
                        type="number" placeholder="jumlah" v-model="limitVal"
                        class="w-full sm:w-24 h-10 px-2 py-2 bg-transparent text-neutral-200 placeholder-neutral-400/50 outline-none border border-neutral-400 rounded">

                      <!-- kelas -->
                      <select
                        @change="doSearch($event,'kelas')"
                        class="min-w-fit w-full sm:max-w-fit h-10 px-2 py-2.5 sm:ml-1 mt-1 sm:mt-0 bg-transparent  text-neutral-200 outline-none border border-neutral-400 rounded">
                          <option class="bg-neutral-900" value="">semua kelas</option>
                          <option v-for="kelas in arrKelas" :key="kelas" class="bg-neutral-900" :value="kelas.name"> 
                            {{ kelas.name }}
                          </option>
                      </select>

                      <!-- sub kelas -->
                      <select
                        @change="doSearch($event,'subkelas')"
                        class="min-w-fit w-full sm:max-w-fit h-10 px-2 py-2.5 sm:ml-1 mt-1 sm:mt-0 bg-transparent  text-neutral-200 outline-none border border-neutral-400 rounded">
                          <option class="bg-neutral-900" value="">semua subkelas</option>
                          <option v-for="subkelas in arrSubkelas" :key="subkelas" class="bg-neutral-900" :value="subkelas.name"> 
                            {{ subkelas.name }}
                          </option>
                      </select>

                      <!-- jumlah -->
                      <input 
                        v-model="searchVal"
                        type="text" placeholder="cari nama/nis"
                        class="w-full sm:w-auto flex-none sm:flex-1 h-10 px-2 py-2 sm:ml-1 mt-1 sm:mt-0 bg-transparent text-neutral-200 placeholder-neutral-400/50 outline-none border border-neutral-400 rounded">
                  </div>

              </div>

              <!-- body -->
              <div class="relative flex-1 flex flex-col text-neutral-400 overflow-auto">

                  <table class="w-full min-w-max">
                      <thead class="sticky top-0 z-10 border-y border-neutral-500 bg-neutral-900">
                        <tr>
                          <th class="py-3 border-r border-neutral-500">NO</th>
                          <th class="border-r border-neutral-500">NAMA SISWA</th>
                          <th class="border-r border-neutral-500">NIS</th>
                          <th class="border-r border-neutral-500">KELAS</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody  v-if="arrParent != null">
                        <tr v-for="(x,i) in arrParent" :key="x">
                          <td class="py-3 px-4 border-r border-neutral-500">{{ ++i }}</td>
                          <td class="px-4 border-r border-neutral-500">{{ x.student.nama_lengkap }}</td>
                          <td class="px-4 border-r border-neutral-500">{{ x.student.nis }}</td>
                          <td class="px-4 border-r border-neutral-500">{{ x.student.kelas }} - {{ x.student.sub_kelas }}</td>
                          <td class="px-4">
                            <div class="w-full h-full flex justify-center items-center text-neutral-200">
                              <button 
                                @click="showForm($event,x)"
                                class="h-6 px-1 mx-1 flex justify-center items-center bg-yellow-600 hover:bg-yellow-500 rounded-sm">
                                  <svg viewBox="0 0 24 24" width="16" height="16" class="inline-block"><path fill="currentColor" d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z"></path></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                  </table>

                  <!-- loading -->
                  <div 
                    v-if="arrParent == null"
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
import FormAddEdit  from '@/components/FormAddEditStudentParent.vue'
import { ref }      from 'vue'
import { useStore } from "vuex"

export default {
  name: 'ParentView',
  components: {
    TitlePage,
    FormAddEdit
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
    let arrParent = computed(() => {
      return store.state.parentapi.parent;
    });

    // filter computed
    let limit    = ref(50);
    let limitVal = computed({
      get() {
        return limit.value
      },
      set(val) {
        limit.value = val
        filterOnChange();
      }
    })

    const search    = ref("");
    const searchVal = computed({
      get() {
        return search.value
      },
      set(val) {
        search.value = val
        filterOnChange();
      }
    })

    // search
    const doSearch = (event,by) => {
      let key       = event.target.value;
      let tmpParent = store.state.parentapi.tmpParent;
      let parent    = tmpParent.filter(e => {
        let student = e.student;
        if (by =='kelas') {
          if (student.kelas.includes(key)) {
            return e;
          }
        }
        if (by =='subkelas') {
          if (student.sub_kelas.includes(key)) {
            return e;
          }
        }
      })

      store.commit("parentapi/SET_PARENT",parent);
    }

    // filter value on change
    const filterOnChange = () => {
      
      store.dispatch("parentapi/GET_PARENT",{
        limit:limit.value,
        key: search.value
      });

    }

    // show form
    const showForm = (event,data = {}) => {
      store.commit("formAddEditStudentParentUx/SET_SHOW_FORM",true);
      store.commit("formAddEditStudentParentApi/SET_DATA_PRIVILEGE",'parent');
      store.commit("formAddEditStudentParentApi/SET_DATA_TARGET",data);
    }

    onMounted(() => {
      store.dispatch("kelasapi/GET_KELAS");
      store.dispatch("kelasapi/GET_SUBKELAS");
      filterOnChange();
    })

    return {
      arrKelas,
      arrSubkelas,
      arrParent,
      limit,
      limitVal,
      searchVal,
      doSearch,
      showForm,
    }

  }
}
</script>
