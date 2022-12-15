<template>
    
    <transition name="fade">
        
        <!-- Container -->
        <div
          id="container_form"
          v-if="isFormShow"
          class="fixed z-40 top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/50">
            
            <transition name="slide" appear>
                
                <!-- Form -->
                <Form
                  @submit="formOnSubmit"
                  ref="anyName"
                  class="w-full max-w-xs min-h-fit flex flex-col bg-neutral-100 lg:rounded-l-lg shadow-md overflow-hidden">

                    <!-- header -->
                    <header
                     class="relative w-full py-4 text-center text-neutral-800 tracking-widest border-b border-neutral-400">
                        {{ dataTarget.username == null ? 'Tambah Akun' : 'Edit Akun' }}
                    </header>

                    <!-- body -->
                    <main
                      class="flex-1 px-4 pb-6">

                        <Field
                          type="hidden" name="id"
                          :value="dataTarget.id" />

                        <p class="w-full text-left mt-6 text-neutral-500 text-sm font-semibold">username</p>
                        <Field
                          type="text" name="username" autocomplete="off"
                          :value="dataTarget.username"
                          :class="{'border-red-500':usernameError,'border-neutral-500':usernameError==null}"
                          class="w-full z-10 mt-2 px-4 py-3 focus:outline-none bg-transparent border rounded" />
                        <div class="w-full text-left text-xs mt-1 tracking-wide text-red-500">
                        </div>
                        <div class="w-full text-left text-xs mt-1 tracking-wide text-red-500">
                            {{ usernameError }}
                        </div>

                        <!-- separator -->
                        <div v-if="dataTarget.username != null" class="relative w-full flex justify-center mt-10 border-t border-neutral-300">
                            <p class="absolute -top-3 px-2 bg-neutral-100 text-neutral-400 text-sm italic">
                                opsional
                            </p>
                        </div>
                        <!-- separator -->

                        <p class="w-full text-left mt-6 text-neutral-500 text-sm font-semibold">password</p>
                        <Field
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
                      class="w-full flex items-center py-4 px-2 border-t border-neutral-400">

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
import { computed, }      from 'vue'
import { Field, Form }    from "vee-validate";
import { useStore }       from "vuex"

export default {
    name: "FormAddEditAdminTeacher",
    components: {
        Field, Form, // vee-validate
    },
    setup(){
        // instance
        const store = useStore();

        // vuex state
        const isFormShow = computed(() => {
            return store.state.formAddEditAdminTeacherUx.show;
        });
        const dataTarget = computed(() => {
            return store.state.formAddEditAdminTeacherApi.dataTarget;
        });
        const usernameError = computed(() => {
            return store.state.formAddEditAdminTeacherApi.usernameError;
        });
        const passwordError = computed(() => {
            return store.state.formAddEditAdminTeacherApi.passwordError;
        });

        // vuex mutation
        const closeForm = () => {
            store.commit("formAddEditAdminTeacherUx/SET_SHOW_FORM",false);
            clearUsernameError();
            clearPassError();
        }
        const clearUsernameError = () => {
            store.commit("formAddEditAdminTeacherApi/SET_USERNAME_ERROR",null);
        }
        const clearPassError = () => {
            store.commit("formAddEditAdminTeacherApi/SET_PASSWORD_ERROR",null);
        }

        // vuex action
        const formOnSubmit = (event) => {
            let form = new FormData(event.target);

            for ( const key in event ) {
                if (event[key] == undefined) {
                    form.delete(key);
                } else {
                    form.append(key, event[key]);
                }
            }

            if (dataTarget.value.username == null) {
                store.dispatch("formAddEditAdminTeacherApi/DO_ADD",form);
            } else {
                store.dispatch("formAddEditAdminTeacherApi/DO_UPDATE",form);
            }

            clearUsernameError();
            clearPassError();
        }

        return{
            isFormShow,
            dataTarget,
            usernameError,
            passwordError,
            closeForm,
            formOnSubmit,
            clearUsernameError,
            clearPassError,
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