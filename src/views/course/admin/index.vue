<script setup>
import { onMounted, ref } from 'vue'
import MyIcon from '@/components/icon/index.vue'
import { useLoading } from 'vue-loading-overlay'
import { useProfileStore } from '@/stores/profile'
import CourseService from '@/service/course'
import { toast } from 'vue3-toastify'
import ellipsisString from '@/misc/EllipsisString'
const $loading = useLoading({
  color: '#dc2626',
})
const onEllipsisString = (name, long) => {
  return ellipsisString(name, long)
}
const store = useProfileStore()

const courses = ref([])
const isLoading = ref(false)

async function fetchListCourse(key, value) {
  isLoading.value = true
  try {
    courses.value = await CourseService.fetchCourses()
  } catch (error) {
    courses.value = []
    toast('Terjadi error saat get course!!!', {
      theme: 'colored',
      type: 'error',
      position: 'top-center',
      closeOnClick: true,
      hideProgressBar: true,
      transition: 'bounce',
      dangerouslyHTMLString: true,
    })
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchListCourse('status', '')
})
</script>
<template>
  <div class="font-poppins">
    <div class="flex flex-row justify-between items-center pb-5">
      <div class="flex flex-col">
        <p class="text-gray-800 text-xl font-semibold mb-1">Daftar Pelatihan</p>
        <p class="text-gray-500 text-sm leading-relaxed">
          Temukan semua pelatihan yang telah Anda buat di sini.
        </p>
      </div>
      <div>
        <button
          @click="$router.push('/course/create')"
          type="button"
          class="px-6 py-2 mt-1 rounded text-white text-sm tracking-wider font-medium outline-none border-2 border-red-600 bg-red-600 hover:text-black transition-all duration-300"
        >
          Buat Pelatihan
        </button>
      </div>
    </div>
    <div>
      <div v-if="!courses.length" class="w-full h-screen flex flex-col justify-center items-center">
        <MyIcon iconName="emptyData" />
        <p class="text-gray-500 text-sm leading-relaxed w-1/4 text-center">
          Belum ada pelatihan, segera buat pelatihan.
        </p>
      </div>
      <v-table v-else fixed-header hover height="600">
        <thead>
          <tr>
            <th class="text-left">Course Name</th>
            <th class="text-left">Description</th>
            <th class="text-left">Start Date</th>
            <th class="text-left">End Date</th>
            <th class="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in courses" :key="item.name">
            <td class="w-1/4">{{ item.course_name }}</td>
            <td class="w-1/3">{{ onEllipsisString(item.description_course, 100) }}</td>
            <td>{{ item.start_date }}</td>
            <td>{{ item.end_date }}</td>
            <td>{{ item.status === 'active' ? 'Aktif' : 'Tidak Aktif' }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>