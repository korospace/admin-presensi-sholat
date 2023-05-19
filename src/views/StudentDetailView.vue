<template>
  
  <!-- Container -->
  <section
    id="container_admin"
    class="min-h-full max-h-full w-full max-w-full flex flex-col overflow-hidden">

      <!-- title page -->
      <title-page title="DETAIL SISWA" />

      <!-- form date range -->
      <FormDateRange @filterOnChange="filterOnChange()" />

      <div class="flex flex-col md:flex-row w-full">
        <!-- data profile -->
        <div class="w-full min-h-max md:min-h-full md:w-1/2 pr-3 md:pr-0 pl-3 md:mr-1.5">
          <div
            class="w-full h-full p-5 bg-neutral-900/70 backdrop-blur-md rounded-xl overflow-hidden">
              <!-- main -->
              <table v-if="profile!=null" class="w-max-content uppercase text-neutral-400">
                <tr class="text-left align-top">
                  <td>nama</td> 
                  <td class="px-2">:</td>
                  <td>{{ profile.nama_lengkap }}</td>
                </tr>
                <tr class="text-left align-top">
                  <td>nis</td> 
                  <td class="px-2">:</td>
                  <td>{{ profile.nis }}</td>
                </tr>
                <tr class="text-left align-top">
                  <td>kelas</td> 
                  <td class="px-2">:</td>
                  <td>{{ profile.kelas }}-{{ profile.sub_kelas }}</td>
                </tr>
              </table>

              <!-- skeleton -->
              <template v-if="profile==null">
                <div 
                  v-for="x in 3" :key="x"
                  :class="{'my-2':x==2}" 
                  class="flex">
                    <div class="w-10 h-4 mr-2  bg-neutral-500 animate-pulse rounded"></div>
                    <div class="w-20 h-4 bg-neutral-500 animate-pulse rounded"></div>
                </div>
              </template>
          </div>
        </div>

        <!-- data nilai sholat -->
        <div class="w-full md:w-1/2 mt-3 md:mt-0 pl-3 md:pl-0 pr-3 md:ml-1.5">
          <div
            class="w-full p-5 bg-neutral-900/70 backdrop-blur-md rounded-xl overflow-hidden">
              <!-- date start & date end -->
              <div
                @click="showDateRange" 
                class="w-max px-2 py-1 mb-3 sm:mt-0 bg-transparent hover:bg-neutral-800 text-sm text-neutral-200 placeholder-neutral-400/50 text-left sm:text-center outline-none border border-neutral-400 rounded cursor-pointer">
                  <p>{{ dateStartVal }} -> {{ dateEndVal }}</p>
              </div>

              <!-- main -->
              <table v-if="historySholat!=null" class="w-max-content uppercase text-neutral-400">
                <tr class="text-left align-top">
                  <td>berjamaah</td> 
                  <td class="px-2">:</td>
                  <td>{{ historySholat.berjamaah }}</td>
                </tr>
                <tr class="text-left align-top">
                  <td>munfarid</td> 
                  <td class="px-2">:</td>
                  <td>{{ historySholat.munfarid }}</td>
                </tr>
                <tr class="text-left align-top">
                  <td>tidak sholat</td> 
                  <td class="px-2">:</td>
                  <td>{{ historySholat.tidak_sholat }}</td>
                </tr>
                <tr class="text-left align-top">
                  <td>belum terkonfirmasi</td> 
                  <td class="px-2">:</td>
                  <td>{{ historySholat.unconfirm }}</td>
                </tr>
                <tr class="text-left align-top">
                  <td>total sholat</td> 
                  <td class="px-2">:</td>
                  <td>{{ historySholat.total_sholat }}</td>
                </tr>
                <tr class="text-left align-top">
                  <td>nilai</td> 
                  <td class="px-2">:</td>
                  <td>{{ historySholat.nilai }}</td>
                </tr>
              </table>

              <!-- skeleton -->
              <template v-if="historySholat==null">
                <div 
                  v-for="x in 5" :key="x"
                  :class="{'my-2':x==2||x==3||x==4}" 
                  class="flex">
                    <div class="w-10 h-4 mr-2  bg-neutral-500 animate-pulse rounded"></div>
                    <div class="w-20 h-4 bg-neutral-500 animate-pulse rounded"></div>
                </div>
              </template>
          </div>
        </div>
      </div>

      <!-- table container -->
      <div
        class="flex-1 w-full max-w-full mt-3 px-3 pb-3 overflow-hidden">

          <!-- table wraper -->
          <div
            class="h-full max-h-full w-full max-w-full flex flex-col bg-neutral-900/70 backdrop-blur-md rounded-xl overflow-hidden">

              <!-- body -->
              <div class="flex-1 w-full max-w-full overflow-hidden">
                <div class="relative h-full w-full max-w-full flex flex-col overflow-auto">
                    <table class="max-w-full min-w-max">
                        <thead class="sticky top-0 z-20 border-y border-neutral-500 bg-neutral-900 text-neutral-400">
                          <tr>
                            <th class="py-3 border-r border-neutral-400">NO</th>
                            <th class="py-3 border-r border-neutral-400">HARI</th>
                            <th class="border-r border-neutral-400">SUBUH</th>
                            <th class="border-r border-neutral-400">DZUHUR</th>
                            <th class="border-r border-neutral-400">ASHAR</th>
                            <th class="border-r border-neutral-400">MAGRIB</th>
                            <th class="">ISYA</th>
                          </tr>
                        </thead>
                        <tbody v-if="historySholat != null" class="text-neutral-400">
                          <template v-for="(x,i) in historySholat.list_presensi" :key="x">
                            <!-- <tr
                              class="border-b border-neutral-500 text-left">
                                <td colspan="7" class="p-2">{{ createMonthYear(x.created_at) }}</td>
                            </tr> -->
                            <tr 
                              :class="{'bg-neutral-900':i%2==1}"
                              class="border-b border-neutral-500">
                                <td class="px-4 border-r border-neutral-400">
                                  {{ ++i }}
                                </td>
                                <td class="px-4 border-r border-neutral-400 text-center">
                                  <p class="text-2xl">
                                    {{ createDate(x.created_at).strDay }}
                                  </p>
                                  <p class="text-md">
                                    {{ createDate(x.created_at).fullDate }}
                                  </p>
                                </td>
                                <td
                                  v-for="sholat in x.detil_presensi" :key="sholat"
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
                                          class="w-full h-8 px-1 text-neutral-400 outline-none border bg-transparent rounded"
                                          :class="{
                                            'border-red-700 outline-red-500':errors.status!=null,
                                            'border-neutral-400':errors.status==null,
                                            'text-neutral-400':sholat.status==null,
                                            'text-neutral-800':sholat.status!=null,
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
                            </tr>
                          </template>
                        </tbody>
                    </table>

                    <!-- loading -->
                    <div 
                      v-if="historySholat == null"
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
import { Field, Form }          from "vee-validate";
import { computed, onMounted, } from '@vue/runtime-core';
import TitlePage     from '@/components/TitlePage.vue'
import FormDateRange from '@/components/FormDateRange.vue'
import { useStore }  from "vuex"

export default {
  name: 'StudentDetailView',
  components: {
    TitlePage,
    FormDateRange,
    Field, Form,
  },
  props: ["query"],
  setup(props) {
    // instance
    const store = useStore();

    // vuex state
    let monthYear = computed(() => {
      return store.state.studentdetailapi.monthYear;
    });
    
    let profile = computed(() => {
      return store.state.studentdetailapi.profile;
    });
    
    let historySholat = computed(() => {
      return store.state.studentdetailapi.historySholat;
    });

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

    // filter 
    const filterOnChange = () => {
      store.dispatch("studentdetailapi/GET_HISTORY",{
        nis:props.query.nis,
        datestart:dateStartVal.value,
        dateend:dateEndVal.value
      });
    }

    const createMonthYear = (createdAt) => {
      let date  = new Date(new Date(createdAt).getTime());
      let month = date.toLocaleString("id-ID",{month: "long",timeZone: 'Asia/Jakarta'});
      let year  = date.toLocaleString("id-ID", {year: 'numeric',timeZone: 'Asia/Jakarta'});
      let createMonthYear = `${month}, ${year}`;

      if (createMonthYear != monthYear.value) {
        store.commit("studentdetailapi/SET_MONTH_YEAR",createMonthYear)
      }

    }

    const createDate = (createdAt) => {
      let date   = new Date(new Date(createdAt).getTime());
      let numDay = date.toLocaleString("id-ID",{day: "2-digit",timeZone: 'Asia/Jakarta'});
      let strDay = date.toLocaleString("id-ID", {weekday: 'long',timeZone: 'Asia/Jakarta'});
      let month  = date.toLocaleString("id-ID", {month: 'long',timeZone: 'Asia/Jakarta'});
      let year   = date.toLocaleString("id-ID", {year: 'numeric',timeZone: 'Asia/Jakarta'});

      return{
        numDay,
        strDay,
        fullDate:`${numDay} ${month}, ${year}`
      }
    }

    const confirmPresensi = (event,uniqid,name,status) => {
      if (status == null || status == 'sudah') {
        return 0;
      }

      let form = new FormData();

      form.set('uniqid',uniqid);
      form.set('sholat',name);
      form.set('history',1);

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

        form.set('history',1);

        store.dispatch("presensiapi/DO_UPDATE",form);
    }

    onMounted(() => {
      store.dispatch("studentdetailapi/GET_PROFILE",props.query.nis);
      filterOnChange();
    })

    return {
      updatePresensiValidation,
      profile,
      historySholat,
      showDateRange,
      dateStartVal,
      dateEndVal,
      filterOnChange,
      createMonthYear,
      createDate,
      confirmPresensi,
      updatePresensi,
    }

  }
}
</script>
