<script setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import MyIcon from '@/components/icon/index.vue'
import FeedbackService from '@/service/feedback'
import { useProfileStore } from '@/stores/profile'
import { getAuth } from 'firebase/auth'
import { useLoading } from 'vue-loading-overlay'
import { toast } from 'vue3-toastify'

const feedbacks = ref([])

const store = useProfileStore()
const $loading = useLoading({
  color: '#dc2626',
})
const onGetFeedback = async () => {
  const loader = $loading.show()
  try {
    const resp = await FeedbackService.fetchAllFeedback(
      store.profile.role_name === 'admin' ? '' : 'employee_id',
      store.profile.role_name === 'admin' ? '' : store.profile.employee_id
    )
    if (resp.result) {
      feedbacks.value = resp.resp
    }
  } catch (error) {
    toast('Terjadi error saat get all certification!!!', {
      theme: 'colored',
      type: 'error',
      position: 'top-center',
      closeOnClick: true,
      hideProgressBar: true,
      transition: 'bounce',
      dangerouslyHTMLString: true,
    })
  } finally {
    loader.hide()
  }
}
const auth = getAuth()

onBeforeMount(async () => {
  await store.fetchProfile(auth.currentUser.uid)
  onGetFeedback()
})
</script>
<template>
  <div class="font-poppins">
    <div class="mb-4">
      <p class="text-gray-800 text-xl font-semibold mb-1">
        Daftar Feedback {{ store.profile.role_name === 'admin' ? 'Karyawan' : 'Anda' }}
      </p>
      <p class="text-gray-500 text-sm leading-relaxed">
        Lihat semua umpan balik yang telah Anda buat di sini. Gunakan feedback ini untuk terus
        berkembang dan belajar.
      </p>
    </div>
    <div>
      <div
        v-if="!feedbacks.length"
        class="w-full h-screen flex flex-col justify-center items-center"
      >
        <MyIcon iconName="emptyData" />
        <p class="text-gray-500 text-sm leading-relaxed w-1/4 text-center">
          Belum ada feedback anda.
        </p>
      </div>
      <v-table v-else fixed-header hover height="600">
        <thead>
          <tr>
            <th class="text-left">Course Name</th>
            <th v-if="store.profile.role_name === 'admin'" class="text-left">Employee Name</th>
            <th class="text-left">Result</th>
            <th class="text-left">
              Feedback From {{ store.profile.role_name === 'admin' ? 'Employee' : 'You' }}
            </th>
            <th class="text-left">
              Feedback From {{ store.profile.role_name === 'admin' ? 'You' : 'Admin' }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in feedbacks" :key="item.name">
            <td class="w-1/4">{{ item.course_name }}</td>
            <td v-if="store.profile.role_name === 'admin'" class="w-1/4">
              {{ item.employee_name }}
            </td>
            <td class="w-1/8">{{ item.score }}</td>
            <td class="w-1/3">{{ item.comment || '-' }}</td>
            <td class="w-1/3">{{ item.comment_from_admin || '-' }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>