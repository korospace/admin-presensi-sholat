<template>
  
  <!-- Container -->
  <section
    id="container_title_page"
    class="sticky z-10 top-0 w-full p-3">

      <!-- title page -->
      <div
        class="relative py-5 px-2 text-neutral-100 font-bold tracking-widest bg-neutral-900/70 backdrop-blur-md rounded-xl">
          <p class="w-full text-center text-md sm:text-xl">
            {{ title }}
          </p>
          <slot></slot>
      </div>

  </section>

</template>

<script>
export default {
  name: 'TitlePage',
  props: {
    title: String,
  }
}
</script>
