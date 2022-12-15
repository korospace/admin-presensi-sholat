<template>
    
    <transition name="fade">
        
        <!-- Container -->
        <div
          id="container_setting"
          v-if="showSetting"
          class="fixed z-40 top-0 bottom-0 left-0 right-0 flex justify-end items-center bg-black/50">
            
            <transition name="slide" appear>
                
                <!-- Form -->
                <Form
                  v-slot="{ errors }"
                  @submit="updateProfile"
                  :validation-schema="profileValidation"
                  class="w-full max-w-xs h-full min-h-fit flex flex-col bg-neutral-100 rounded-lg shadow-md overflow-hidden">

                    <!-- header -->
                    <header
                     class="relative w-full py-4 text-center text-neutral-800 tracking-widest border-b border-neutral-400">
                        Pengaturan 
                    </header>

                    <!-- body -->
                    <main
                      class="flex-1 px-4 overflow-auto pb-6">

                        <p class="w-full text-left mt-6 text-neutral-500 text-sm font-semibold">username</p>
                        <Field
                          type="text" name="username" autocomplete="off"
                          v-model="username"
                          @keyup="clearUsernameError"
                          :class="{'border-red-500':errors.username,'border-neutral-500':errors.username==null}"
                          class="w-full z-10 mt-2 px-4 py-3 focus:outline-none bg-transparent border rounded" />
                        <div class="w-full text-left text-xs mt-1 tracking-wide text-red-500">
                            {{ errors.username }}
                        </div>
                        <div class="w-full text-left text-xs mt-1 tracking-wide text-red-500">
                            {{ usernameError }}
                        </div>

                        <!-- separator -->
                        <div class="relative w-full flex justify-center mt-10 border-t border-neutral-300">
                            <p class="absolute -top-3 px-2 bg-neutral-100 text-neutral-400 text-sm italic">
                                opsional
                            </p>
                        </div>
                        <!-- separator -->

                        <p class="w-full text-left mt-10 text-neutral-500 text-sm font-semibold">password</p>
                        <Field
                          type="password" name="password"
                          @keyup="clearPassError"
                          :class="{'border-red-500':passwordError,'border-neutral-500':passwordError==null}"
                          class="w-full z-10 mt-2 px-4 py-3 focus:outline-none bg-transparent border rounded" />
                        <div class="w-full text-left text-xs mt-1 tracking-wide text-red-500">
                            {{ passwordError }}
                        </div>

                        <p class="w-full text-left mt-6 text-neutral-500 text-sm font-semibold">password lama</p>
                        <Field
                          type="password" name="old_password"
                          @keyup="clearOldPassError"
                          :class="{'border-red-500':oldPasswordError,'border-neutral-500':oldPasswordError==null}"
                          class="w-full z-10 mt-2 px-4 py-3 focus:outline-none bg-transparent border rounded" />
                        <div class="w-full text-left text-xs mt-1 tracking-wide text-red-500">
                            {{ oldPasswordError }}
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
                         @click="closeSetting"
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
import { Field, Form }   from "vee-validate";
import { computed }      from 'vue'
import { useStore }      from "vuex"
import profileValidation from '@/validations/EditProfile'

export default {
    name: "DashboardSetting",
    components: {
        Field, Form, // vee-validate
    },
    setup(){
        // instance
        const store = useStore();

        // vuex state
        const showSetting = computed(() => {
            return store.state.settingux.show;
        });
        const username = computed(() => {
            return store.state.settingapi.username;
        });
        const usernameError = computed(() => {
            return store.state.settingapi.usernameError;
        });
        const passwordError = computed(() => {
            return store.state.settingapi.passwordError;
        });
        const oldPasswordError = computed(() => {
            return store.state.settingapi.oldPasswordError;
        });

        // vuex mutation
        const closeSetting = () => {
            store.commit("settingux/SET_SHOW_SETTING",false);
        }
        const clearUsernameError = () => {
            store.commit("settingapi/SET_USERNAME_ERROR",null);
        }
        const clearPassError = () => {
            store.commit("settingapi/SET_PASSWORD_ERROR",null);
        }
        const clearOldPassError = () => {
            store.commit("settingapi/SET_OLDPASSWORD_ERROR",null);
        }

        // vuex action
        const updateProfile = (event) => {
            
            const formProfile = new FormData(event.target); 

            for ( const key in event ) {
                formProfile.append(key, event[key]);
            }

            store.dispatch("settingapi/DO_UPDATE_PROFILE",formProfile);

        }

        return{
            showSetting,
            closeSetting,
            username,
            usernameError,
            passwordError,
            oldPasswordError,
            clearUsernameError,
            clearPassError,
            clearOldPassError,
            profileValidation,
            updateProfile,
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
            transform: translateX(20px)
        }
        100% {
            opacity: 1;
            transform: translateX(0px)
        }
    }
</style>