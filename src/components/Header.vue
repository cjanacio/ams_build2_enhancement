<script setup>
  import Menu from "./Menu.vue";
  defineProps({
    parentClass: {
      type: String
    },
    pagePath: {
      type: String
    },
    userName: {
      type: String
    }
  })
</script>

<template>
  <section :class = "parentClass">
    <p className = "p-2 sm:p-2 md:p-0 lg:p-0 xl:p-0 2xl:p-0 tracking-wide text-5xl text-4xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl subpixel-antialiased font-sans font-bold mt-12 text-center sm:text-center md:text-left lg:text-left xl:text-left 2xl:text-left mb-4 sm:mb-4 md:mb-6 lg:mb-6 xl:mb-6 2xl:mb-6 sm:ml-8 md:ml-12 lg:ml-12 xl:ml-12 2xl:ml-12 sm:mt-6 md:mt-12 lg:mt-12 xl:mt-12 2xl:mt-12 text-blue-400 uppercase">
      RLC Web App Service
    </p>
    <p className="tracking-wide subpixel-antialiased font-sans font-light text-2xl text-center sm:text-center md:text-left lg:text-left xl:text-left 2xl:text-left mb-4 sm:mb-6 md:mb-10 lg:mb-10 xl:mb-10 2xl:mb-10 sm:ml-8 md:ml-12 lg:ml-12 xl:ml-12 2xl:ml-12 text-blue-400">{{ pagePath }}</p>
    
    <p class="tracking-wide subpixel-antialiased font-sans font-light text-sm text-center sm:text-center md:text-right lg:text-right xl:text-right 2xl:text-right mb-4 sm:mb-6 md:mb-6 lg:mb-6 xl:mb-6 2xl:mb-6 sm:mr-8 md:mr-12 lg:mr-12 xl:mr-12 2xl:mr-12 text-blue-400 uppercase">Logged in as <u>{{ userName }}</u></p>
    <Menu />
  </section>
</template>