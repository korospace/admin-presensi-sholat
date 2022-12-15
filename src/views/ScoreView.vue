<template>
  
  <!-- Container -->
  <section
    id="container_siswa"
    class="min-h-full max-h-full w-full flex flex-col">

      <!-- title page -->
      <title-page title="NILAI SHOLAT SISWA">
        <button
          @click="downloadScore"
          class="absolute top-3 right-3 px-3 pt-1.5 pb-2.5 text-center text-white bg-green-600 hover:bg-green-500 rounded-md cursor-pointer">
            <svg viewBox="0 0 24 24" width="26" height="26" class="inline-block rotate-180"><path fill="currentColor" d="M9,16V10H5L12,3L19,10H15V16H9M5"></path></svg>
        </button>
      </title-page>

      <!-- form date range -->
      <FormDateRange @filterOnChange="filterOnChange()" />

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

                      <!-- date start & date end -->
                      <div
                        @click="showDateRange" 
                        class="w-full sm:min-w-fit h-10 px-2 py-2 sm:ml-1 mt-1 sm:mt-0 bg-transparent hover:bg-neutral-800 text-neutral-200 placeholder-neutral-400/50 text-left sm:text-center outline-none border border-neutral-400 rounded cursor-pointer">
                          <p>{{ dateStartVal }} -> {{ dateEndVal }}</p>
                      </div>

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
                          <th>NILAI</th>
                        </tr>
                      </thead>
                      <tbody  v-if="arrScore != null">
                        <tr v-for="(x,i) in arrScore" :key="x">
                          <td class="py-3 px-4 border-r border-neutral-500">{{ ++i }}</td>
                          <td class="px-4 border-r border-neutral-500">{{ x.nama_lengkap }}</td>
                          <td class="px-4 border-r border-neutral-500">{{ x.nis }}</td>
                          <td class="px-4 border-r border-neutral-500">{{ x.kelas }} - {{ x.sub_kelas }}</td>
                          <td class="px-4 border-r border-neutral-500">{{ x.nilai }}</td>
                        </tr>
                      </tbody>
                  </table>

                  <!-- loading -->
                  <div 
                    v-if="arrScore == null"
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
import TitlePage     from '@/components/TitlePage.vue'
import FormDateRange from '@/components/FormDateRange.vue'
import { ref }       from 'vue'
import { useStore }  from "vuex"

export default {
  name: 'ScoreView',
  components: {
    TitlePage,
    FormDateRange,
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
    let arrScore = computed(() => {
      return store.state.scoreapi.score;
    });

    // vuex action
    const downloadScore = () => {
        store.dispatch("scoreapi/DOWNLOAD_SCORE",{
          dateStart:dateStartVal.value,
          dateEnd:dateEndVal.value,
          limit:limit.value,
          kelas:kelas.value,
          subkelas:subkelas.value,
          key: search.value
        });
    }

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

    // date range
    const showDateRange = () => {
      store.commit("formDateRangeUx/SET_SHOW_FORM",true)
    }

    let dateStartVal = computed(() => {
        return store.state.formDateRangeUx.dateStart;
    })

    let dateEndVal = computed(() => {
        return store.state.formDateRangeUx.dateEnd;
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

      store.dispatch("scoreapi/GET_SCORE",{
        dateStart:dateStartVal.value,
        dateEnd:dateEndVal.value,
        limit:limit.value,
        kelas:kelas.value,
        subkelas:subkelas.value,
        key: search.value
      });

    }

    onMounted(() => {
      store.dispatch("kelasapi/GET_KELAS");
      store.dispatch("kelasapi/GET_SUBKELAS");
      filterOnChange();
    })

    return {
      arrKelas,
      arrSubkelas,
      arrScore,
      downloadScore,
      limit,
      dateStartVal,
      dateEndVal,
      limitVal,
      kelasVal,
      subkelasVal,
      showDateRange,
      searchVal,
      filterOnChange,
    }

  }
}
</script>
