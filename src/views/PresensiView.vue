<template>
  
  <!-- Container -->
  <section
    id="container_presensi"
    class="min-h-full w-full max-h-full flex flex-col overflow-hidden">

      <!-- title page -->
      <title-page title="TABEL PRESENSI">
        <button
          @click="createTodayPresensi"
          class="absolute top-3 right-3 px-3 py-2 text-center text-white bg-green-600 hover:bg-green-500 rounded-md cursor-pointer">
            <svg viewBox="0 0 24 24" width="20" height="20" class="inline-block"><path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path></svg>
        </button>
      </title-page>

      <!-- table container -->
      <div
        class="flex-1 w-full max-w-full p-3 overflow-hidden">

          <!-- table wraper -->
          <div
            class="h-full max-h-full w-full max-w-full flex flex-col bg-neutral-900/70 backdrop-blur-md rounded-xl overflow-hidden">

              <!-- head -->
              <div
                class="flex flex-col lg:flex-row justify-between p-4">

                  <!-- filter wraper -->
                  <div class="flex flex-1 lg:flex-none flex-col sm:flex-row items-center">
                      <!-- jumlah -->
                      <input 
                        type="number" placeholder="jumlah" v-model="limitVal"
                        class="w-full sm:w-24 h-10 px-2 py-2 bg-transparent text-neutral-200 placeholder-neutral-400/50 outline-none border border-neutral-400 rounded">

                      <!-- date -->
                      <input 
                        type="date" v-model="dateVal"
                        class="min-w-fit w-full sm:max-w-fit h-10 px-2 py-2 sm:ml-1 mt-1 sm:mt-0 bg-transparent text-neutral-200 placeholder-neutral-400/50 outline-none border border-neutral-400 rounded">

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
                        class="w-full sm:w-auto h-10 px-2 py-2 sm:ml-1 mt-1 sm:mt-0 bg-transparent text-neutral-200 placeholder-neutral-400/50 outline-none border border-neutral-400 rounded">
                  </div>

              </div>

              <!-- body -->
              <div class="flex-1 w-full max-w-full overflow-hidden">
                <div class="relative h-full w-full max-w-full flex flex-col overflow-auto">
                    <table class="max-w-full min-w-max">
                        <thead class="sticky top-0 z-20 border-y border-neutral-500 bg-neutral-900 text-neutral-400">
                          <tr>
                            <th class="py-3 border-r border-neutral-400">NO</th>
                            <th class="border-r border-neutral-400">SISWA</th>
                            <th class="border-r border-neutral-400">SUBUH</th>
                            <th class="border-r border-neutral-400">DZUHUR</th>
                            <th class="border-r border-neutral-400">ASHAR</th>
                            <th class="border-r border-neutral-400">MAGRIB</th>
                            <th class="">ISYA</th>
                          </tr>
                        </thead>
                        <tbody v-if="arrPresensi != null" class="text-neutral-400">
                          <template v-for="(x,i) in arrPresensi" :key="x">
                            <tr 
                              :class="{'bg-neutral-900':i%2==1}"
                              class="border-b border-neutral-500">
                                <td class="px-4 border-r border-neutral-400">
                                  {{ ++i }}
                                </td>
                                <td class="px-4 border-r border-neutral-400">
                                  <table>
                                    <tr class="text-left align-top">
                                      <td>nama</td> 
                                      <td class="pr-2">:</td>
                                      <td>{{ x.nama_lengkap }}</td>
                                    </tr>
                                    <tr class="text-left">
                                      <td>nis</td> 
                                      <td class="pr-2">:</td>
                                      <td>{{ x.nis }}</td>
                                    </tr>
                                    <tr class="text-left">
                                      <td>kelas</td> 
                                      <td class="pr-2">:</td>
                                      <td>{{ x.kelas }}-{{ x.sub_kelas }}</td>
                                    </tr>
                                  </table>
                                </td>
                                <template v-if="x.presensi">
                                  <td
                                    v-for="sholat in x.presensi.detil_presensi" :key="sholat"
                                    class="relative z-10 border-r border-neutral-400">
                                      <Form
                                        v-slot="{ errors }"
                                        @submit="updatePresensi"
                                        :validation-schema="updatePresensiValidation"
                                        class="relative z-10 px-6 pt-5 pb-2.5">
                                          <span 
                                            v-if="sholat.status"
                                            :class="{'bg-blue-700':sholat.check_status == 'sudah','bg-gray-400':sholat.check_status == 'sedang'}"
                                            class="absolute top-1.5 left-1.5 px-1 pb-0.5 text-white rounded-full">
                                              <svg viewBox="0 0 24 24" width="16" height="16" class="inline-block"><path fill="currentColor" d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"></path></svg>
                                          </span>

                                          <Field
                                            type="hidden" name="uniqid"
                                            :value="sholat.uniqid" />
                                          <Field
                                            type="hidden" name="sholat"
                                            :value="sholat.sholat" />
                                          <Field
                                            as="select"
                                            name="status"
                                            :value="sholat.status"
                                            class="w-full h-8 px-1 text-neutral-400 outline-none border rounded"
                                            :class="{
                                              'border-red-700 outline-red-500':errors.status!=null,
                                              'border-neutral-400':errors.status==null,
                                              'text-neutral-400':sholat.status==null,
                                              'text-neutral-800':sholat.status!=null,
                                              'bg-transparent':sholat.status==null,
                                              'bg-green-300': sholat.status == 'berjamaah',
                                              'bg-yellow-300': sholat.status == 'munfarid',
                                              'bg-red-300': sholat.status == 'tidak sholat',
                                            }">
                                              <option value="">belum disi</option>
                                              <option value="berjamaah">berjamaah</option>
                                              <option value="munfarid">munfarid</option>
                                              <option value="tidak sholat">tidak sholat</option>
                                          </Field>
                                          <div class="flex mt-3">
                                            <div
                                              @click="confirmPresensi($event,sholat.uniqid,sholat.sholat,sholat.check_status)"
                                              :class="{
                                                'cursor-not-allowed opacity-50':sholat.check_status == null || sholat.check_status == 'sudah',
                                                'hover:bg-yellow-500 cursor-pointer':sholat.check_status == 'sedang',
                                              }"
                                              class="w-max mr-1 px-3 text-lg text-center text-white font-extrabold bg-yellow-600 rounded">
                                                &check;
                                            </div>
                                            <button
                                              class="flex-1 px-3 text-sm text-center text-white bg-green-600 hover:bg-green-500  rounded">
                                                simpan
                                            </button>
                                          </div>
                                      </Form>
                                  </td>
                                </template>
                            </tr>
                          </template>
                        </tbody>
                    </table>

                    <!-- loading -->
                    <div 
                      v-if="arrPresensi == null"
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

      </div>

  </section>

</template>

<script>
import updatePresensiValidation from '@/validations/updatePresensi'
import { computed, onMounted }  from '@vue/runtime-core';
import { Field, Form }          from "vee-validate";
import TitlePage    from '@/components/TitlePage.vue'
import { ref }      from 'vue'
import { useStore } from "vuex"
import { toast }    from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  name: 'PresensiView',
  components: {
    Field, Form,
    TitlePage
  },
  setup() {
    // instance
    const store = useStore();
    let currentUnixTime = new Date(new Date().getTime());
    let currentDay   = currentUnixTime.toLocaleString("en-US",{day: "2-digit"});
    let currentMonth = currentUnixTime.toLocaleString("en-US",{month: "2-digit"});
    let currentYear  = currentUnixTime.toLocaleString("en-US",{year: "numeric"});

    // vuex state
    let arrKelas = computed(() => {
      return store.state.kelasapi.kelas;
    });
    let arrSubkelas = computed(() => {
      return store.state.kelasapi.subkelas;
    });
    let arrPresensi = computed(() => {
      return store.state.presensiapi.presensi;
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

    let date    = ref(`${currentYear}-${currentMonth}-${currentDay}`);
    let dateVal = computed({
      get() {
        return date.value
      },
      set(val) {
        date.value = val
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
      
      store.dispatch("presensiapi/GET_PRESENSI",{
        limit:limit.value,
        date:date.value,
        kelas:kelas.value,
        subkelas:subkelas.value,
        key: search.value
      });

    }

    // create today presensi
    const createTodayPresensi = () => {

      store.dispatch("presensiapi/CREATE_TODAY_PRESENSI");

    }

    const confirmPresensi = (event,uniqid,name,status) => {
      if (status == null || status == 'sudah') {
        return 0;
      }

      let form = new FormData();

      form.set('uniqid',uniqid);
      form.set('sholat',name);

      store.dispatch("presensiapi/DO_CONFIRM",form);
    }
        
    const updatePresensi = (event) => {
        let form = new FormData(event.target);

        for ( const key in event ) {
            if (event[key] === undefined || event[key] === null || event[key] === "") {
                form.delete(key);
            } else {
                form.append(key, event[key]);
            }
        }

        store.dispatch("presensiapi/DO_UPDATE",form);
    }

    onMounted(() => {
      store.dispatch("kelasapi/GET_KELAS");
      store.dispatch("kelasapi/GET_SUBKELAS");
      filterOnChange();
    })

    return {
      updatePresensiValidation,
      createTodayPresensi,
      confirmPresensi,
      updatePresensi,
      arrKelas,
      arrSubkelas,
      arrPresensi,
      limit,
      limitVal,
      dateVal,
      kelasVal,
      subkelasVal,
      searchVal,
    }

  }
}
</script>
