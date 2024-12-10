<script setup>
import Sidebar from '@/components/Sidebar.vue'
import { auth } from '@/firebase'
import router from '@/router'
import { onBeforeMount } from 'vue'
import { useProfileStore } from '../stores/profile'
const store = useProfileStore()
onBeforeMount(() => {
  store.fetchProfile(auth.currentUser.uid)
})
</script>

<template>
  <div class="relative bg-[#f7f6f9] h-full min-h-screen font-poppins">
    <div class="flex items-start">
      <Sidebar />
      <section class="main-content w-full pl-24 pr-8 pt-6">
        <router-view />
      </section>
    </div>
  </div>
</template>
