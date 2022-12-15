<template>

    <!-- Container -->
    <section
      id="bg_dashboard"
      v-bind:style="{ 'background-image': 'url(' + bgLogin + ')' }" 
      class="min-h-screen max-h-screen w-full bg-no-repeat bg-cover">
        <section
          id="container_dashboard"
          class="min-h-screen max-h-screen w-full bg-neutral-900/50 overflow-hidden">
            
            <div class="min-h-screen max-h-screen w-full max-w-7xl flex m-auto overflow-hidden">
            
              <!-- aside bar -->
              <dashboard-aside />

              <!-- setting -->
              <dashboard-setting />

              <router-view/>

            </div>

        </section>
    </section>

</template>

<script>
// component
import { getLocalStorage, removeLocalStorage } from '@/services/localstorage.service'
import DashboardAside      from '@/components/DashboardAside.vue'
import DashboardSetting    from '@/components/DashboardSetting.vue'
import { onMounted }       from '@vue/runtime-core'
import router              from '@/router'
import { toast }           from 'vue3-toastify'
import 'vue3-toastify/dist/index.css';

export default {
  name: 'DashboardView',
  components: {
    DashboardAside,
    DashboardSetting
  },
  setup() {

    // images
    const bgLogin = require('@/assets/images/masjid1.webp');

    // expired check
    onMounted(() => {

      let intervalCheckExp = null;
      let userData = getLocalStorage('userdata');
      let expired  = parseInt(userData.expired) * 1000;

      let checkExpired = function() {
        if (Date.now() > expired) {
          clearInterval(intervalCheckExp);
          toast.warn("waktu login anda habis !", {
              position: toast.POSITION.TOP_RIGHT,
          });
          removeLocalStorage("userdata");
          router.push('/login');
        }
      }

      intervalCheckExp = setInterval(checkExpired, 2000);

    })

    return {
      bgLogin
    }

  }
}
</script>
