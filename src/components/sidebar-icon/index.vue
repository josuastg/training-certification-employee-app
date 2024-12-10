<script setup>
import dashboard from './dashboard.vue'
import certification from './certification.vue'
import profile from './profile.vue'
import course from './course.vue'
import feedback from './feedback.vue'
import logout from './logout.vue'

const props = defineProps({
  iconName: {
    type: String,
    default: 'Lanciao',
  },
})
</script>
<template>
  <dashboard v-if="iconName === 'dashboard'" />
  <certification v-else-if="iconName === 'certification'" />
  <profile v-else-if="iconName === 'profile'" />
  <course v-else-if="iconName === 'course'" />
  <feedback v-else-if="iconName === 'feedback'" />
  <logout v-else-if="iconName === 'logout'" />
</template>
