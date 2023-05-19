<template>
  
  <!-- Container -->
  <section
    id="container_siswa"
    class="min-h-full max-h-full w-full flex flex-col">

      <!-- title page -->
      <title-page title="TABEL SISWA">
        <div class="absolute top-3 right-3 flex">
          <button
            v-if="isAdmin"
            @click="showForm($event)"
            class="px-3 py-2 mr-2 text-center text-white bg-green-600 hover:bg-green-500 rounded-md cursor-pointer">
              <svg viewBox="0 0 24 24" width="20" height="20" class="inline-block"><path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path></svg>
          </button>
          <button
            v-if="isAdmin"
            @click="upStudentClass"
            class="px-3 py-2 mr-2 text-center text-white bg-yellow-600 hover:bg-yellow-500 rounded-md cursor-pointer">
              <svg viewBox="0 0 24 24" width="22" height="22" class="inline-block translate-y-[3px]"><path fill="currentColor" d="M9,16V10H5L12,3L19,10H15V16H9M5"></path></svg>
          </button>
        </div>
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
                      <!-- jumlah -->
                      <input 
                        type="number" placeholder="jumlah" v-model="limitVal"
                        class="w-full sm:w-24 h-10 px-2 py-2 bg-transparent text-neutral-200 placeholder-neutral-400/50 outline-none border border-neutral-400 rounded">

                      <!-- kelas -->
                      <select
                        v-model="kelasVal"
                        class="min-w-fit w-full sm:max-w-fit h-10 px-2 py-2.5 sm:ml-1 mt-1 sm:mt-0 bg-transparent  text-neutral-200 outline-none border border-neutral-400 rounded">
                          <option class="bg-neutral-900" value="">semua kelas</option>
                          <option v-for="kelas in arrKelas" :key="kelas" class="bg-neutral-900" :value="kelas.name"> 
                            {{ kelas.name }}
                          </option>
                      </select>

                      <!-- sub kelas -->
                      <select
                        v-model="subkelasVal"
                        class="min-w-fit w-full sm:max-w-fit h-10 px-2 py-2.5 sm:ml-1 mt-1 sm:mt-0 bg-transparent  text-neutral-200 outline-none border border-neutral-400 rounded">
                          <option class="bg-neutral-900" value="">semua subkelas</option>
                          <option v-for="subkelas in arrSubkelas" :key="subkelas" class="bg-neutral-900" :value="subkelas.name"> 
                            {{ subkelas.name }}
                          </option>
                      </select>

                      <!-- search -->
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
                          <th class="border-r border-neutral-500">NAMA</th>
                          <th class="border-r border-neutral-500">NIS</th>
                          <th class="border-r border-neutral-500">KELAS</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody  v-if="arrSiswa != null">
                        <tr 
                          v-for="(x,i) in arrSiswa" :key="x">
                            <td
                              class="py-3 px-4 border-r border-neutral-500"
                              :class="{'bg-red-400/40':x.active==0}">
                                {{ ++i }}
                            </td>
                            <td class="px-4 border-r border-neutral-500">{{ x.nama_lengkap }}</td>
                            <td class="px-4 border-r border-neutral-500">{{ x.nis }}</td>
                            <td class="px-4 border-r border-neutral-500">{{ x.kelas }} - {{ x.sub_kelas }}</td>
                            <td class="px-4">
                              <div class="w-full h-full flex justify-center items-center text-neutral-200">
                                <router-link 
                                  :to="{name:'student detail',query:{nis:x.nis} }" 
                                  class="h-6 px-1 flex justify-center items-center bg-blue-600 hover:bg-blue-500 rounded-sm">
                                    <svg viewBox="0 0 24 24" width="16" height="16" class="inline-block"><path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"></path></svg>
                                </router-link>
                                <button 
                                  v-if="isAdmin"
                                  @click="showForm($event,x)"
                                  class="h-6 px-1 mx-1 flex justify-center items-center bg-yellow-600 hover:bg-yellow-500 rounded-sm">
                                    <svg viewBox="0 0 24 24" width="16" height="16" class="inline-block"><path fill="currentColor" d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z"></path></svg>
                                </button>
                                <button
                                  v-if="isAdmin"
                                  @click="deleteSiswa($event,x.id)" 
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
                    v-if="arrSiswa == null"
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
import { getLocalStorage }     from '@/services/localstorage.service';
import TitlePage    from '@/components/TitlePage.vue'
import FormAddEdit  from '@/components/FormAddEditStudentParent.vue'
import { ref }      from 'vue'
import { useStore } from "vuex"
import Swal         from 'sweetalert2';
import { toast }    from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  name: 'StudentView',
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
    let arrSiswa = computed(() => {
      return store.state.siswaapi.siswa;
    });

    // filter computed
    let limit    = ref(50);
    let limitVal = computed({
      get() {
        return limit.value
      },
      set(val) {
        if (val > 100) {
          limit.value = 100

          toast.warning("hanya boleh menampilkan 100 siswa!", {
              position: toast.POSITION.TOP_RIGHT,
          });
        }
        else {
          limit.value = val
        }

        filterOnChange();
      }
    })

    let kelas    = ref("");
    let kelasVal = computed({
      get() {
        return kelas.value
      },
      set(val) {
        kelas.value = val
        filterOnChange();
      }
    })

    let subkelas    = ref("");
    let subkelasVal = computed({
      get() {
        return subkelas.value
      },
      set(val) {
        subkelas.value = val
        filterOnChange();
      }
    })

    // search
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

    // filter value on change
    const filterOnChange = () => {
      
      store.dispatch("siswaapi/GET_SISWA",{
        limit:limit.value,
        kelas:kelas.value,
        subkelas:subkelas.value,
        key: search.value
      });

    }

    // show form
    const showForm = (event,data = {}) => {
      store.commit("formAddEditStudentParentUx/SET_SHOW_FORM",true);
      store.commit("formAddEditStudentParentApi/SET_DATA_PRIVILEGE",'student');
      store.commit("formAddEditStudentParentApi/SET_DATA_TARGET",data);
    }

    // up student class
    const upStudentClass = () => {
      Swal.fire({
          icon: 'warning',
          title: 'Anda yakin?',
          text: 'aksi ini akan menaikan data kelas semua siswa',
          showDenyButton: true,
          confirmButtonText: 'iya',
          denyButtonText: `tidak`,
      }).then((result) => {
          if (result.isConfirmed) {
            store.dispatch("siswaapi/UP_STUDENT_CLASS");
          } 

          Swal.close()
      })
    }

    // delete siswa
    const deleteSiswa = (event,id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Anda yakin?',
            text: 'data presensi juga akan terhapus',
            showDenyButton: true,
            confirmButtonText: 'iya',
            denyButtonText: `tidak`,
        }).then((result) => {
            if (result.isConfirmed) {
                let tmpSiswa = store.state.siswaapi.tmpSiswa;
                let siswa    = tmpSiswa.filter(e => {
                  if (e.id != id) {
                    return e;
                  }
                })

                store.commit("siswaapi/SET_SISWA",siswa);
                store.commit("siswaapi/SET_TMPSISWA",siswa);
                store.dispatch("siswaapi/DELETE_SISWA",id);
            } 

            Swal.close()
        })
    }

    const isAdmin = computed(() => {
        let userData = getLocalStorage('userdata');
        return userData.privilege == 'admin';
    });

    onMounted(() => {
      store.dispatch("kelasapi/GET_KELAS");
      store.dispatch("kelasapi/GET_SUBKELAS");
      filterOnChange();
    })

    return {
      isAdmin,
      arrKelas,
      arrSubkelas,
      arrSiswa,
      limit,
      limitVal,
      kelasVal,
      subkelasVal,
      searchVal,
      deleteSiswa,
      showForm,
      upStudentClass,
    }

  }
}
</script>
