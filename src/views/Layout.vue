<script setup>
import Sidebar from '@/components/Sidebar.vue'
import router from '@/router'
</script>

<template>
  <div class="relative bg-[#f7f6f9] h-full min-h-screen font-poppins">
    <div class="flex items-start">
      <Sidebar />
      <section class="main-content w-full pl-24 pr-8 pt-10">
        <router-view />
      </section>
    </div>
  </div>
</template>
