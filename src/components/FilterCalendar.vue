<script setup>

</script>

<template>
  <section class = "modal-section">
    <div class = "flex justify-center h-screen mb-20">
      <div class = "modal-relative w-full sm:w-full md:w-4/5 lg:w-4/5 xl:w-4/5 2xl:w-4/5 p-2 sm:p-2 md:p-4 lg:p-6 xl:p-6 2xl:p-6">
        <div class='bg-white dark:bg-slate-800/90 rounded-md mb-10'>
          <div class='float-right text-2xl text-center'>
            <button
              class='text-2xl text-center rounded-full hover:bg-slate-200 p-2 w-8 text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-xs font-normal uppercase dark:bg-slate-800 dark:text-sky-400 dark:hover:bg-sky-500 dark:hover:text-white transition ease-in-out delay-50 hover:shadow-2xl'
              type = "button"
              @click = "closeCallBack"
            >
              <i class = "fa fa-times"></i>
            </button>
            
          </div>
          <div class = "mb-2 border-b-2 dark:border-gray-600/50 py-6 font-bold md:text-left lg:text-left xl:text-left 2xl:text-left">
            <span class = "text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-2xl text-sky-500 uppercase p-8 ">Work&nbsp;Order</span>
          </div>

          <div className = "flex justify-end m-4 p-6"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .modal-section {
    display: block;
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    overflow-x: hidden;
    animation: fadeIn 0.5s ease 0s 1 normal none running;
  }

  .modal-relative {
    position: relative;
    text-align: center;
  }

  @keyframes fadeIn {
    0% {
      opacity:0;
    }
    100% {
      opacity:1;
    }
  }
</style>