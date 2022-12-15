<template>
    <transition name="fade">
        
        <!-- Container -->
        <div
          id="container_form"
          v-if="isFormShow"
          class="fixed z-40 top-0 bottom-0 left-0 right-0 flex justify-center items-center py-3 bg-black/70">
            
            <transition name="slide" appear>
                
                <!-- Form -->
                <Form
                  @submit="formOnSubmit"
                  class="w-full max-w-sm max-h-max flex flex-col bg-neutral-100 rounded-lg shadow-md overflow-hidden">

                    <!-- header -->
                    <header
                     class="relative w-full h-max py-4 text-center text-neutral-800 tracking-widest border-b border-neutral-400">
                        Import Excel
                    </header>

                    <!-- body -->
                    <main
                        class="flex-1 px-4 pb-6 overflow-auto">

                            <div class="text-left mt-4 mb-4">
                                download format excel 
                                <span 
                                  @click="downloadExcel"
                                  class="text-blue-500 hover:text-blue-400 cursor-pointer">
                                    disini
                                </span>
                            </div>

                            <Field
                                type="file" name="studentexcel" autocomplete="off"
                                @keyup="clearFileError"
                                :class="{'border-red-500':fileError,'border-neutral-500':fileError==null}"
                                class="w-full z-10 mt-2 px-4 py-3 focus:outline-none bg-transparent border rounded" />
                            <div class="w-full text-left text-xs mt-1 tracking-wide text-red-500">
                                <ul class="list-disc list-inside">
                                   <li v-for="x in fileError" :key="x"> 
                                       {{ x[0] }}
                                    </li> 
                                </ul>
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
import { computed }    from 'vue'
import { Field, Form } from "vee-validate";
import { useStore }    from "vuex"

export default {
    name: "FormAddStudentExcel",
    components: {
        Field, Form,
    },
    setup(){
        // instance
        const store = useStore();

        // vuex data
        const apiurl = computed(() => {
            return store.state.apiurl;
        }); 
        const isFormShow = computed(() => {
            return store.state.formAddStudentExcelUx.show;
        });
        const fileError = computed(() => {
            return store.state.formAddStudentExcelApi.fileError;
        });

        // vuex mutation
        const downloadExcel = () => {
            // window.open(`${apiurl.value}/formatexcelsiswa`);
            store.dispatch("formAddStudentExcelApi/DOWNLOAD_EXCEL_FORMAT");
        }
        const closeForm = () => {
            store.commit("formAddStudentExcelUx/SET_SHOW_FORM",false);
            clearFileError();
        }
        const clearFileError = () => {
            store.commit("formAddStudentExcelApi/SET_FILE_ERROR",null);
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

            store.dispatch("formAddStudentExcelApi/SEND_FILE",form);

            clearFileError();
        }

        return{
            apiurl,
            isFormShow,
            downloadExcel,
            fileError,
            clearFileError,
            closeForm,
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