<script setup>
import BasedLogo from '@/components/BasedLogo.vue'
import MyIcon from '@/components/icon/index.vue'
import { auth } from '@/firebase'
import { useProfileStore } from '@/stores/profile'
import initialName from '@/misc/InitialName'
import { computed } from 'vue'

const store = useProfileStore()

const onClick = (path) => {
  router.push(path)
}
const initial = computed(() => {
  return initialName(store.profile.employee_name)
})
</script>


<template>
  <div class="font-poppins">
    <div class="mb-4">
      <p class="text-2xl font-semibold text-gray-800">Profile Saya</p>
    </div>
    <div class="w-full h-screen flex flex-col justify-start items-center">
      <v-card class="mx-auto" width="500">
        <template v-slot:prepend>
          <div class="flex flex-row items-start">
            <div class="flex">
              <div
                :style="`background: ${initial.color}`"
                :class="`mr-2 w-12 h-12 font-medium text-lg tracking-wider flex flex-col items-center justify-center text-white rounded-full relative`"
              >
                <div
                  class="border-white absolute bottom-0 right-0"
                  style="width: 10px; height: 10px"
                />
                <span class="text-14px xxl:text-16px"> {{ initial.initial }}</span>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:title>
          <span class="font-weight-black">{{ store.profile.employee_name }}</span>
        </template>

        <template v-slot:subtitle> </template>

        <v-card-text class="bg-gray-50 pt-4 flex flex-row">
          <div class="w-1/3 text-16px font-medium">
            ID Karyawan<br />
            Email <br />
            Nomor Telepon <br />
            Jenis Kelamin
          </div>
          <div class="max-w-max text-16px">:<br />: <br />: <br />:</div>
          <div class="ml-4 text-16px">
            <span> {{ store.profile.employee_id }}</span> <br />
            <span> {{ store.profile.employee_email }}</span> <br />
            <span> {{ store.profile.employee_contact_phone }}</span> <br />
            <span> {{ store.profile.gender }}</span>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>