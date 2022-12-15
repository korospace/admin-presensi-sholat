<template>
  
  <!-- Container -->
  <aside
    id="container_aside"
    :class="{'w-0 lg:w-full':isShowAside==false,'w-full px-3':isShowAside==true}"
    class="absolute lg:relative top-0 bottom-0 z-30 max-w-xs min-h-full py-3 lg:px-3 duration-300">

        <!-- Wraper -->
        <div
          id="wraper_aside"
          :class="{'-translate-x-full lg:-translate-x-0':isShowAside==false,'-translate-x-0':isShowAside==true}"
          class="w-72 h-full min-h-fit flex flex-col bg-neutral-700 rounded-2xl duration-300">

            <!-- Header -->
            <header
              class="relative w-full h-auto flex justify-between lg:justify-center items-center px-6 py-5 bg-neutral-900 text-md sm:text-xl text-neutral-200 font-bold tracking-widest rounded-t-2xl">
                DASHBOARD 
                <!-- burger open -->
                <div
                  @click="showAside(!isShowAside)"
                  :class="{'translate-x-4 rotate-0':isShowAside==false,'-translate-x-16 rotate-180':isShowAside==true}"
                  class="absolute -right-10 z-10 lg:hidden max-w-fit px-0.5 bg-neutral-900/30 text-neutral-300 hover:text-neutral-100 cursor-pointer duration-500 rounded-sm">
                    <svg viewBox="0 0 24 24" width="24" height="24" class="inline-block"><path fill="currentColor" d="M19,13H3V11H19L15,7L16.4,5.6L22.8,12L16.4,18.4L15,17L19,13M3,6H13V8H3V6M13,16V18H3V16H13Z"></path></svg>
                </div>
            </header>

            <!-- Body -->
            <main
              class="flex-1 overflow-hidden text-lg">
                
                <div class="h-full overflow-auto">
                <!-- link presensi -->
                <router-link 
                  @click="showAside(!isShowAside)"
                  to="/presensi" 
                  class="w-full flex justify-start items-center py-4 text-neutral-400 hover:text-neutral-200">
                    <svg viewBox="0 0 24 24" width="20" height="20" class="ml-5 inline-block"><path fill="currentColor" d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z"></path></svg>

                    <div class="ml-5 capitalize">presensi</div>
                </router-link>
                
                <!-- link score -->
                <router-link 
                  @click="showAside(!isShowAside)"
                  to="/nilai" 
                  class="w-full flex justify-start items-center py-4 text-neutral-400 hover:text-neutral-200">
                    <svg viewBox="0 0 24 24" width="20" height="20" class="ml-5 inline-block"><path fill="currentColor" d="M5,4H19A2,2 0 0,1 21,6V18A2,2 0 0,1 19,20H5A2,2 0 0,1 3,18V6A2,2 0 0,1 5,4M5,8V12H11V8H5M13,8V12H19V8H13M5,14V18H11V14H5M13,14V18H19V14H13Z"></path></svg>

                    <div class="ml-5 capitalize">nilai</div>
                </router-link>
                
                <!-- link siswa -->
                <router-link 
                  v-if="isAdmin==false"
                  @click="showAside(!isShowAside)"
                  to="/siswa" 
                  class="w-full flex justify-start items-center py-4 text-neutral-400 hover:text-neutral-200">
                    <svg viewBox="0 0 24 24" width="24" height="24" class="ml-4 inline-block"><path fill="currentColor" d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z"></path></svg>

                    <div class="ml-5 capitalize">siswa</div>
                </router-link>

                <!-- link account -->
                <div
                  id="account_dropdown"
                  v-if="isAdmin" >
                  
                  <!-- dropdown title -->
                  <div 
                    @click="showUserDropdown"
                    class="w-full flex justify-between items-center py-4 text-neutral-400 hover:text-neutral-200 cursor-pointer">
                      <div
                        class="flex items-center">
                          <svg viewBox="0 0 24 24" width="24" height="24" class="ml-4 inline-block"><path fill="currentColor" d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z"></path></svg>
                          <div class="ml-5 capitalize">akun</div>
                      </div>

                      <svg v-if="isShowUserDropdown==false" viewBox="0 0 24 24" width="16" height="16" class="mr-5 inline-block"><path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path></svg>
                      <svg v-if="isShowUserDropdown==true" viewBox="0 0 24 24" width="16" height="16" class="mr-5 inline-block"><path fill="currentColor" d="M19,13H5V11H19V13Z"></path></svg>
                  </div>
                  <!-- list -->
                  <div v-if="isShowUserDropdown==true" class="w-full bg-neutral-600 text-sm">
                    <router-link 
                      to="/admin"
                      @click="showAside(!isShowAside)"
                      class="w-full flex justify-start items-center py-4 text-neutral-400 hover:text-neutral-200">
                        <div class="ml-5 capitalize">admin</div>
                    </router-link>
                    <router-link 
                      to="/guru" 
                      @click="showAside(!isShowAside)"
                      class="w-full flex justify-start items-center py-4 text-neutral-400 hover:text-neutral-200">
                        <div class="ml-5 capitalize">guru</div>
                    </router-link>
                    <router-link 
                      to="/siswa" 
                      @click="showAside(!isShowAside)"
                      class="w-full flex justify-start items-center py-4 text-neutral-400 hover:text-neutral-200">
                        <div class="ml-5 capitalize">siswa</div>
                    </router-link>
                    <router-link 
                      to="/orangtua" 
                      @click="showAside(!isShowAside)"
                      class="w-full flex justify-start items-center py-4 text-neutral-400 hover:text-neutral-200">
                        <div class="ml-5 capitalize">orangtua</div>
                    </router-link>
                  </div>

                </div>

                <!-- kelas & subkelas -->
                <router-link 
                  v-if="isAdmin"
                  to="/kelas" 
                  @click="showAside(!isShowAside)"
                  class="w-full flex justify-start items-center py-4 text-neutral-400 hover:text-neutral-200">
                    <svg viewBox="0 0 24 24" width="22" height="22" class="ml-4 inline-block"><path fill="currentColor" d="M9,5V9H21V5M9,19H21V15H9M9,14H21V10H9M4,9H8V5H4M4,19H8V15H4M4,14H8V10H4V14Z"></path></svg>

                    <div class="ml-5 capitalize">kelas</div>
                </router-link>
            
                <!-- link settings -->
                <a
                  href="" 
                  @click.prevent="showSetting($event);showAside(!isShowAside)"
                  class="w-full flex justify-start items-center py-4 text-neutral-400 hover:text-neutral-200">
                    <svg viewBox="0 0 24 24" width="21" height="21" class="ml-5 inline-block"><path fill="currentColor" d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z"></path></svg>

                    <div class="ml-5 capitalize">pengaturan</div>
                </a>
                </div>

            </main>

            <!-- Logout -->
            <footer
              @click="doLogout"
              class="w-full h-auto flex justify-start items-center py-4 bg-red-500 hover:bg-red-600 text-neutral-200 text-lg cursor-pointer rounded-b-2xl">
                <svg viewBox="0 0 24 24" width="20" height="20" class="ml-5 inline-block"><path fill="currentColor" d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"></path></svg>

                <div class="ml-5 capitalize">Keluar</div> 
            </footer>
        </div>
  
  </aside>

</template>

<script>

import { getLocalStorage, removeLocalStorage } from '@/services/localstorage.service'
import { useRouter }          from 'vue-router';
import { useStore }           from "vuex"
import Swal from 'sweetalert2';
import { computed } from '@vue/runtime-core';

export default {
  name: 'DashboardAside',
  components: {

  },
  setup() {

    // instance
    const route = useRouter();
    const store = useStore();

    // vuex state
    const isShowAside = computed(() => {
        return store.state.asideux.show;
    });
    const isShowUserDropdown = computed(() => {
        return store.state.asideux.userDropdownShow;
    });

    // vuex mutation
    const showAside = (value) => {
        store.commit("asideux/SET_SHOW_ASIDE",value);
    }
    const showUserDropdown = () => {
        store.commit("asideux/SET_SHOW_USERDROPDOWN",!isShowUserDropdown.value);
    }
    const showSetting = () => {
        store.commit("settingux/SET_SHOW_SETTING",true);
    }

    const isAdmin = computed(() => {
        let userData = getLocalStorage('userdata');
        return userData.privilege == 'admin';
    });

    // logout
    const doLogout = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Anda yakin ingin keluar?',
            showDenyButton: true,
            confirmButtonText: 'iya',
            denyButtonText: `tidak`,
        }).then((result) => {
            Swal.close()

            if (result.isConfirmed) {
                removeLocalStorage('userdata');
                route.push('/login');
            } 
        })
    }

    return {
        doLogout,
        isShowAside,
        isShowUserDropdown,
        showAside,
        showUserDropdown,
        showSetting,
        isAdmin,
    }

  }
}
</script>

<style scoped>
    .router-link-exact-active {
        @apply text-neutral-100
    }
</style>