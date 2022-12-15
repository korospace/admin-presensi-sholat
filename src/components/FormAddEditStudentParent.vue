<template>
    <transition name="fade">

        <!-- Container -->
        <div
          id="container_form"
          v-if="isFormShow"
          class="fixed z-40 top-0 bottom-0 left-0 right-0 flex justify-center items-start py-3 bg-black/50">
            
            <!-- form excel -->
            <FormExcel />

            <transition name="slide" appear>
                
                <!-- Form -->
                <Form
                  @submit="formOnSubmit"
                  class="w-full max-w-sm h-full max-h-max min-h-fit flex flex-col bg-neutral-100 rounded-lg shadow-md overflow-hidden">

                    <!-- header -->
                    <header
                     class="relative w-full h-max py-4 text-center text-neutral-800 tracking-widest border-b border-neutral-400">
                        {{ dataTarget.id ? 'Edit Akun' : 'Tambah Akun' }}
                    </header>

                    <!-- body -->
                    <main
                        class="flex-1 px-4 pb-6 overflow-auto">

                        <Field
                            type="hidden" name="id"
                            :value="dataTarget.id" />

                        <template v-if="privilege == 'student'">
                            <p class="w-full text-left mt-6 text-neutral-500 text-sm font-semibold">NIS</p>
                            <Field
                                v-if="privilege == 'student'"
                                type="text" name="nis" autocomplete="off"
                                @keyup="clearNisError"
                                :value="dataTarget.nis"
                                :class="{'border-red-500':nisError,'border-neutral-500':nisError==null}"
                                class="w-full z-10 mt-2 px-4 py-3 focus:outline-none bg-transparent border rounded" />
                            <div class="w-full text-left text-xs mt-1 tracking-wide text-red-500">
                                {{ nisError }}
                            </div>

                            <p class="w-full text-left mt-6 text-neutral-500 text-sm font-semibold">nama lengkap</p>
                            <Field
                                v-if="privilege == 'student'"
                                type="text" name="nama_lengkap" autocomplete="off"
                                @keyup="clearNamaLengkapError"
                                :value="dataTarget.nama_lengkap"
                                :class="{'border-red-500':namaLengkapError,'border-neutral-500':namaLengkapError==null}"
                                class="w-full z-10 mt-2 px-4 py-3 focus:outline-none bg-transparent border rounded" />
                            <div class="w-full text-left text-xs mt-1 tracking-wide text-red-500">
                                {{ namaLengkapError }}
                            </div>

                            <div
                            class="w-full flex mt-6">

                                <!-- kelas -->
                                <div class="w-1/2 mr-1">
                                    <p class="w-full text-left text-neutral-500 text-sm font-semibold">kelas</p>
                                    <Field
                                        as="select"
                                        name="kelas"
                                        @change="clearKelasError"
                                        :value="dataTarget.kelas"
                                        :class="{'border-red-500':kelasError,'border-neutral-500':kelasError==null}"
                                        class="w-full h-10 px-2 py-2.5 mt-1 sm:mt-0 bg-transparent text-neutral-500 outline-none border rounded">
                                        <option class="" value="">semua kelas</option>
                                        <option v-for="kelas in arrKelas" :key="kelas" class="" :value="kelas.name"> 
                                            {{ kelas.name }}
                                        </option>
                                    </Field>
                                </div>

                                <!-- sub kelas -->
                                <div class="w-1/2">
                                    <p class="w-full text-left text-neutral-500 text-sm font-semibold">sub kelas</p>
                                    <Field
                                        as="select"
                                        name="sub_kelas"
                                        @change="clearSubKelasLengkapError"
                                        :value="dataTarget.sub_kelas"
                                        :class="{'border-red-500':subKelasError,'border-neutral-500':subKelasError==null}"
                                        class="w-full h-10 px-2 py-2.5 mt-1 sm:mt-0 bg-transparent text-neutral-500 outline-none border rounded">
                                        <option class="" value="">semua subkelas</option>
                                        <option v-for="subkelas in arrSubkelas" :key="subkelas" class="" :value="subkelas.name"> 
                                            {{ subkelas.name }}
                                        </option>
                                    </Field>
                                </div>

                            </div>

                            <p 
                              v-if="dataTarget.id==null" 
                              @click="showImportExcel"
                              class="mt-10 text-blue-500 hover:text-blue-400 flex justify-center items-center underline cursor-pointer">
                                <svg viewBox="0 0 24 24" width="21" height="21" class="mr-2 inline-block"><path fill="currentColor" d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z"></path></svg>
                                import excel
                            </p>

                            <p v-if="dataTarget.id" class="w-full text-left mt-6 text-neutral-500 text-sm font-semibold">
                                status
                            </p>
                            <Field type="hidden" name="active" v-model="isStudentActive" id="" />
                            <div 
                                v-if="dataTarget.id"
                                :class="{'justify-end':isStudentActive==true}" 
                                class="relative w-16 h-7 px-0.5 flex items-center mt-3 rounded-full bg-neutral-400 duration-300">
                                <div
                                    @click="isStudentActive=isStudentActive"
                                    :class="{'bg-red-500 hover:bg-red-600': isStudentActive==false,'bg-green-500 hover:bg-green-600': isStudentActive==true}"
                                    class="w-6 h-6 rounded-full cursor-pointer">
                                </div>
                            </div>

                            <!-- separator -->
                            <div v-if="dataTarget.id" class="relative w-full flex justify-center mt-10 border-t border-neutral-300">
                                <p class="absolute -top-3 px-2 bg-neutral-100 text-neutral-400 text-sm italic">
                                    opsional
                                </p>
                            </div>
                            <!-- separator -->
                        </template>

                        <p v-if="dataTarget.id" class="w-full text-left mt-6 text-neutral-500 text-sm font-semibold">password</p>
                        <Field
                            v-if="dataTarget.id"
                            type="password" name="password"
                            :value="dataTarget.password"
                            :class="{'border-red-500':passwordError,'border-neutral-500':passwordError==null}"
                            class="w-full z-10 mt-2 px-4 py-3 focus:outline-none bg-transparent border rounded" />
                        <div class="w-full text-left text-xs mt-1 tracking-wide text-red-500">
                            {{ passwordError }}
                        </div>
                    
                    </main>

                    <!-- button -->
                    <footer
                      class="w-full h-max flex items-center py-4 px-2 border-t border-neutral-400">

                        <button
                         class="w-1/2 py-3 font-bold text-center text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded">
                            simpan
                        </button>
                        <button
                         @click.prevent="closeForm"
                         class="w-1/2 text-neutral-700 hover:text-neutral-900 underline">
                            tutup
                        </button>

                    </footer>

                </Form>

            </transition>

        </div>

    </transition>
</template>

<script>
import FormExcel       from '@/components/FormAddStudentExcel.vue'
import { computed }    from 'vue'
import { Field, Form } from "vee-validate";
import { useStore }    from "vuex"

export default {
    name: "FormAddEditStudentParent",
    components: {
        Field, Form, FormExcel
    },
    setup(){
        // instance
        const store = useStore();

        // vuex data
        const isFormShow = computed(() => {
            return store.state.formAddEditStudentParentUx.show;
        });
        const isStudentActive = computed({
            get() {
                let x = store.state.formAddEditStudentParentApi.dataTarget.active;
                return x;
            },
            set() {
                let x = store.state.formAddEditStudentParentApi.dataTarget.active;
                store.commit("formAddEditStudentParentApi/SET_ACTIVE",x==0 ? 1 : 0);
            }
        })
        
        const dataTarget = computed(() => {
            return store.state.formAddEditStudentParentApi.dataTarget;
        });
        const privilege = computed(() => {
            return store.state.formAddEditStudentParentApi.privilege;
        });
        let arrKelas = computed(() => {
            return store.state.kelasapi.kelas;
        });
        let arrSubkelas = computed(() => {
            return store.state.kelasapi.subkelas;
        });
        const nisError = computed(() => {
            return store.state.formAddEditStudentParentApi.nisError;
        });
        const namaLengkapError = computed(() => {
            return store.state.formAddEditStudentParentApi.namaLengkapError;
        });
        const kelasError = computed(() => {
            return store.state.formAddEditStudentParentApi.kelasError;
        });
        const subKelasError = computed(() => {
            return store.state.formAddEditStudentParentApi.subKelasError;
        });
        const passwordError = computed(() => {
            return store.state.formAddEditStudentParentApi.passwordError;
        });

        // vuex mutation
        const closeForm = () => {
            store.commit("formAddEditStudentParentUx/SET_SHOW_FORM",false);
            clearNisError();
            clearNamaLengkapError();
            clearKelasError();
            clearSubKelasLengkapError();
            clearPassError();
        }
        const showImportExcel = () => {
            store.commit("formAddStudentExcelUx/SET_SHOW_FORM",true);
        }
        const clearNisError = () => {
            store.commit("formAddEditStudentParentApi/SET_NIS_ERROR",null);
        }
        const clearNamaLengkapError = () => {
            store.commit("formAddEditStudentParentApi/SET_NAMALENGKAP_ERROR",null);
        }
        const clearKelasError = () => {
            store.commit("formAddEditStudentParentApi/SET_KELAS_ERROR",null);
        }
        const clearSubKelasLengkapError = () => {
            store.commit("formAddEditStudentParentApi/SET_SUBKELAS_ERROR",null);
        }
        const clearPassError = () => {
            store.commit("formAddEditStudentParentApi/SET_PASSWORD_ERROR",null);
        }
        
        const formOnSubmit = (event) => {
            let form = new FormData(event.target);

            for ( const key in event ) {
                if (event[key] === undefined || event[key] === null || event[key] === "") {
                    form.delete(key);
                } else {
                    form.append(key, event[key]);
                }
            }

            if (dataTarget.value.id == null) {
                store.dispatch("formAddEditStudentParentApi/DO_ADD",form);
            } else {
                store.dispatch("formAddEditStudentParentApi/DO_UPDATE",form);
            }

            clearNisError();
            clearNamaLengkapError();
            clearKelasError();
            clearSubKelasLengkapError();
            clearPassError();
        }

        return{
            isFormShow,
            isStudentActive,
            dataTarget,
            privilege,
            arrKelas,
            arrSubkelas,
            nisError,
            namaLengkapError,
            kelasError,
            subKelasError,
            passwordError,
            clearPassError,
            clearNisError,
            clearNamaLengkapError,
            clearKelasError,
            clearSubKelasLengkapError,
            closeForm,
            showImportExcel,
            formOnSubmit,
        }
    }
}
</script>

<style scoped>
    .fade-enter-active{
        animation: fade .4s;
    }
    .fade-leave-active{
        animation: fade .2s reverse;
    }
    @keyframes fade {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .slide-enter-active{
        animation: slide-in .4s;
    }
    @keyframes slide-in {
        0% {
            opacity: 0;
            transform: translateY(-20px)
        }
        100% {
            opacity: 1;
            transform: translateY(0px)
        }
    }
</style>