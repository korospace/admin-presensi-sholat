<template>

    <!-- Container -->
    <section 
      id="container_login"
      v-bind:style="{ 'background-image': 'url(' + bgLogin + ')' }" 
      class="w-full min-h-screen relative bg-no-repeat bg-cover">

        <!-- Wraper -->
        <div
          class="w-full absolute top-0 bottom-0 flex justify-center items-center px-6 bg-neutral-900/50">

            <!-- Form -->
            <form 
              @submit.prevent="doLogin"
              class="w-full max-w-xs flex flex-col items-center px-6 pb-6 bg-white/90 rounded shadow-md">

                <!-- logo -->
                <img :src="imgLogo" alt="logo" class="w-20 mt-6">

                <!-- title -->
                <h1
                  class="mt-4 text-sm">
                    PRESENSI SHOLAT SMPN 19 JAKARTA SELATAN
                </h1>

                <!-- swither -->
                <div
                 class="relative flex mt-6 bg-neutral-500 rounded cursor-pointer overflow-hidden">
                    <div 
                      :class="{'-translate-x-28.1': privilege=='admin'}"
                      class="w-1/2 absolute top-0.5 bottom-0.5 right-0.5 flex justify-center items-center text-neutral-600 bg-neutral-300 duration-300 rounded-sm"> 
                        <span>{{ privilege }}</span> 
                    </div>
                    <div 
                      @click="changePrivilege($event)"
                      class="w-1/2 px-10 py-2 text-white/90 hover:bg-neutral-400 rounded-r">admin</div>
                    <div 
                      @click="changePrivilege($event)"
                      class="w-1/2 px-10 py-2 text-white/90 hover:bg-neutral-400 rounded-l">guru</div>
                </div>

                <!-- privilege -->
                <input type="hidden" name="privilege" :value="privilege">

                <!-- username -->
                <div
                  class="floating_label relative w-full mt-12">
                    <input 
                      type="text" name="username" id="username" placeholder="username" autocomplete="off"
                      class="w-full relative z-10 px-4 py-3 bg-transparent focus:outline-none placeholder-transparent border border-neutral-500 rounded">
                    <span
                      class="absolute -z-0 top-3 left-4 text-neutral-500 duration-300">
                        username</span>
                </div>

                <!-- password -->
                <div
                  class="floating_label relative w-full mt-8">
                    <input 
                      type="password" name="password" id="password" placeholder="password"
                      class="w-full relative z-10 px-4 py-3 bg-transparent focus:outline-none placeholder-transparent border border-neutral-500 rounded">
                    <span
                      class="absolute -z-0 top-3 left-4 text-neutral-500 duration-300">
                        password</span>
                </div>

                <!-- btn login -->
                <button
                  class="w-full mt-12 py-4 bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-400 text-neutral-600 text-center font-bold duration-300 rounded-full">
                    LOGIN
                </button>

            </form>

        </div>

    </section>

</template>

<script>
    import { computed } from 'vue';
    import { useStore } from 'vuex'

    export default {
        name: 'LoginView',
        components: {

        },
        setup() {
            // instance
            const store = useStore();

            // images
            const bgLogin = require('@/assets/images/masjid1.webp');
            const imgLogo = require('@/assets/images/logo.webp');

            // vuex state
            const privilege = computed(() => {
                return store.state.loginux.privilege;
            });

            // vuex mutation
            const changePrivilege = (event) => {
                store.commit("loginux/SET_PRIVILEGE",event.target.innerHTML);
            }

            // vuex action
            const doLogin = (event) => {
              
              const formLogin = new FormData(event.target); 
              
              store.dispatch("loginapi/DO_LOGIN",formLogin);

            }

            return {
                bgLogin,
                imgLogo,
                privilege,
                changePrivilege,
                doLogin
            }

        }
    }

</script>

<style lang="css" scoped>



</style>