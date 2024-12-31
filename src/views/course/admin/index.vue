<script setup>
import { onMounted, ref } from 'vue'
import MyIcon from '@/components/icon/index.vue'
import { useLoading } from 'vue-loading-overlay'
import CourseService from '@/service/course'
import { toast } from 'vue3-toastify'
import ellipsisString from '@/misc/EllipsisString'
import router from '@/router'
const $loading = useLoading({
  color: '#dc2626',
})
const onEllipsisString = (name, long) => {
  return ellipsisString(name, long)
}

const courses = ref([])
const isLoading = ref(false)

async function fetchListCourse(key, value) {
  isLoading.value = true
  const loader = $loading.show()
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
    loader.hide()
  }
}

const onDeleteCourse = async () => {
  dialog.value = false
  const item = detailCourse.value
  const loader = $loading.show()
  try {
    const resp = await CourseService.deleteCourseById(item?.course_id)
    if (resp.success) {
      toast(`Berhasil hapus pelatihan ${item?.course_name}!!!`, {
        theme: 'colored',
        type: 'success',
        position: 'top-center',
        closeOnClick: true,
        hideProgressBar: true,
        transition: 'bounce',
        dangerouslyHTMLString: true,
      })
      fetchListCourse('status', '')
    } else {
      toast('Terjadi error saat hapus pelatihan!!!', {
        theme: 'colored',
        type: 'error',
        position: 'top-center',
        closeOnClick: true,
        hideProgressBar: true,
        transition: 'bounce',
        dangerouslyHTMLString: true,
      })
    }
  } catch (error) {
    toast('Terjadi error saat hapus pelatihan!!!', {
      theme: 'colored',
      type: 'error',
      position: 'top-center',
      closeOnClick: true,
      hideProgressBar: true,
      transition: 'bounce',
      dangerouslyHTMLString: true,
    })
  } finally {
    detailCourse.value = null
    loader.hide()
  }
}

let detailCourse = ref(null)

const onSetDetailCourse = (item) => {
  dialog.value = true
  detailCourse.value = item
}

let refId = ref(null)

let dialog = ref(false)

const goDetail = (item) => {
  router.push(`/course/detail/${item?.course_id}`)
}

onMounted(() => {
  fetchListCourse('status', '')
})
</script>
<template>
  <div class="font-poppins">
    <v-dialog
      v-model="dialog"
      max-width="600"
      transition="dialog-bottom-transition"
      class="font-poppins"
    >
      <v-card
        text="Data yang telah dihapus tidak dapat dipulihkan lagi."
        title="Hapus Data Pelatihan?"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="dialog = false"> Tidak </v-btn>

          <v-btn @click="onDeleteCourse" color="#dc2626" text="Hapus Pelatihan" variant="flat">
            Hapus
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
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
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="cursor-pointer"
            v-for="item in courses"
            :key="item.name"
            @click="refId === 'delete_button' || !refId ? {} : goDetail(item)"
            @mouseover="
              (ref) => {
                refId = ref?.target?.id
              }
            "
          >
            <td class="w-1/4" id="course_name">{{ item.course_name }}</td>
            <td class="w-1/3" id="course_desc">
              {{ onEllipsisString(item.description_course, 100) }}
            </td>
            <td id="startDate">{{ item.start_date }}</td>
            <td id="endDate">{{ item.end_date }}</td>
            <td id="course_status">{{ item.status === 'active' ? 'Aktif' : 'Tidak Aktif' }}</td>
            <td id="delete_button" class="font-poppins">
              <v-btn
                prepend-icon="mdi-delete-outline"
                color="#dc2626"
                text="Hapus"
                variant="flat"
                @click="onSetDetailCourse(item)"
              >
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>