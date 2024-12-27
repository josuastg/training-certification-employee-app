<script setup>
import EmployeeCourse from './employee/index.vue'
import AdminCourse from './admin/index.vue'
import { useProfileStore } from '@/stores/profile'

const store = useProfileStore()
</script>

<template>
  <div>
    <EmployeeCourse v-if="store.profile.role_name === 'employee'" />
    <AdminCourse v-else />
  </div>
</template>