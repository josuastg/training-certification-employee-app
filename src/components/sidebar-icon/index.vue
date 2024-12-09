<script setup>
import dashboard from './dashboard.vue'
import certification from './certification.vue'
import logout from './logout.vue'
import training from './training.vue'
import feedback from './feedback.vue'

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
  <logout v-else-if="iconName === 'logout'" />
  <training v-else-if="iconName === 'training'" />
  <feedback v-else-if="iconName === 'feedback'" />
</template>
