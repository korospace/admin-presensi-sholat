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
                     class="relative w-full h-max py-4 text-center text-neutral-800 capitalize tracking-widest border-b border-neutral-400">
                        {{ dataTarget.id == null ? 'tambah' : 'edit' }} {{ formName }}
                    </header>

                    <!-- body -->
                    <main
                        class="flex-1 px-4 pb-6 overflow-auto">

                            <Field
                                type="hidden" name="id"
                                :value="dataTarget.id" />

                            <p class="w-full text-left mt-6 text-neutral-500 text-sm font-semibold">
                                nama {{ formName }}
                            </p>
                            <Field
                                type="text" name="name" autocomplete="off"
                                @keyup="clearNameError"
                                :value="dataTarget.name"
                                :class="{'border-red-500':nameError,'border-neutral-500':nameError==null}"
                                class="w-full z-10 mt-2 px-4 py-3 focus:outline-none bg-transparent border rounded" />
                            <div class="w-full text-left text-xs mt-1 tracking-wide text-red-500">
                                {{ nameError }}
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
    name: "FormAddEditKelasSubkelas",
    components: {
        Field, Form,
    },
    setup(){
        // instance
        const store = useStore();

        // vuex data
        const isFormShow = computed(() => {
            return store.state.formAddEditKelasSubkelasUx.show;
        });
        const formName = computed(() => {
            return store.state.formAddEditKelasSubkelasApi.formName;
        });
        const dataTarget = computed(() => {
            return store.state.formAddEditKelasSubkelasApi.dataTarget;
        });
        const nameError = computed(() => {
            return store.state.formAddEditKelasSubkelasApi.nameError;
        });

        // vuex mutation
        const closeForm = () => {
            store.commit("formAddEditKelasSubkelasUx/SET_SHOW_FORM",false);
            clearNameError();
        }
        const clearNameError = () => {
            store.commit("formAddEditKelasSubkelasApi/SET_NAME_ERROR",null);
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
                store.dispatch("formAddEditKelasSubkelasApi/DO_ADD",form);
            } else {
                store.dispatch("formAddEditKelasSubkelasApi/DO_UPDATE",form);
            }

            clearNameError();
        }

        return{
            isFormShow,
            formName,
            dataTarget,
            nameError,
            clearNameError,
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