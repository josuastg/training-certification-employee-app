<script setup>
import { onBeforeMount, ref } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
import CourseService from '@/service/course'
import formatDate from '@/misc/FormatDate'
import router from '@/router'

let dialog = ref(false)
const isLoadingDetail = ref(false)
const detailCourse = ref(null)
const $loading = useLoading({
  color: '#dc2626',
})
const route = useRoute()
async function fetchDetailCourse(key, value) {
  isLoadingDetail.value = true
  const loader = $loading.show()
  try {
    detailCourse.value = await CourseService.fetchCoursesByProperty(key, value)
    if (detailCourse.value.length) {
      detailCourse.value = { ...detailCourse.value['0'] }
    }
  } catch (error) {
    detailCourse.value = {
      end_date: '',
      course_name: '',
      start_date: '',
      status: '',
      description_course: '',
      course_id: '',
      image_url: '',
    }
    toast('Terjadi error saat get detail course!!!', {
      theme: 'colored',
      type: 'error',
      position: 'top-center',
      closeOnClick: true,
      hideProgressBar: true,
      transition: 'bounce',
      dangerouslyHTMLString: true,
    })
  } finally {
    isLoadingDetail.value = false
    loader.hide()
  }
}

const onUpdateStatus = async () => {
  dialog.value = false
  const loader = $loading.show()
  try {
    const result = await CourseService.updateStatusCourse(
      detailCourse.value.course_id,
      detailCourse.value.status === 'active' ? 'inactive' : 'active'
    )
    if (result) {
      toast('Berhasil ubah status pelatihan!!!', {
        theme: 'colored',
        type: 'success',
        position: 'top-center',
        closeOnClick: true,
        hideProgressBar: true,
        transition: 'bounce',
        dangerouslyHTMLString: true,
      })
      fetchDetailCourse('course_id', route.params.id)
    }
  } catch (error) {
    toast('Gagal ubah status pelatihan!!!', {
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

const onOpenFile = (item) => {
  window.open(item)
}

onBeforeMount(() => {
  fetchDetailCourse('course_id', route.params.id)
})
</script>

<template>
  <div v-if="!isLoadingDetail">
    <v-dialog
      v-model="dialog"
      max-width="600"
      transition="dialog-bottom-transition"
      class="font-poppins"
    >
      <v-card
        text="Pastikan data yang diubah statusnya sesuai dan benar."
        :title="detailCourse.status === 'active' ? 'Nonaktifkan Pelatihan?' : 'Aktifkan Pelatihan?'"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="dialog = false"> Tidak </v-btn>

          <v-btn
            @click="onUpdateStatus"
            color="#dc2626"
            :text="detailCourse.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'"
            variant="flat"
          >
            {{ detailCourse.status === 'active' ? 'Nonaktifkan' : 'Aktifkan' }}
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
    <div class="bg-white rounded-2xl mb-4 overflow-hidden shadow-md font-poppins">
      <div class="p-6">
        <div class="flex flex-row justify-between">
          <div class="flex flex-row items-center">
            <v-btn
              color="#dc2626"
              icon="mdi-arrow-left"
              variant="text"
              @click="router.back()"
            ></v-btn>
            <h3 class="text-gray-800 text-xl font-semibold">Detail Pelatihan</h3>
          </div>
          <div>
            <button
              @click="dialog = true"
              type="button"
              class="px-8 py-3 rounded text-white text-sm tracking-wider font-medium outline-none border-2 border-red-600 bg-red-600"
            >
              {{ detailCourse.status === 'active' ? 'Nonaktifkan' : 'Aktifkan' }} Pelatihan
            </button>
          </div>
        </div>
        <div class="flex flex-col gap-y-1.5 mt-6">
          <p class="text-black text-lg font-medium">Nama Pelatihan</p>
          <p class="text-gray-500 text-base leading-relaxed text-justify">
            {{ detailCourse.course_name }}
          </p>
          <p class="text-black text-lg font-medium">Poster Pelatihan</p>
          <img
            id="thumbnail-course"
            :src="detailCourse.image_url"
            @click="onOpenFile(detailCourse.image_url)"
            class="w-3/4 h-350px rounded-lg cursor-pointer object-cover shadow-lg mb-2"
          />
          <p class="text-black text-lg font-medium">Periode Pelatihan</p>
          <p class="text-gray-500 text-base leading-relaxed text-justify">
            {{ formatDate(detailCourse.start_date) }} - {{ formatDate(detailCourse.end_date) }}
          </p>
          <p class="text-black text-lg font-medium">Deskripsi Pelatihan</p>
          <p
            class="text-gray-500 text-base leading-relaxed capitalize text-justify"
            v-html="detailCourse.description_course"
          ></p>

          <p class="text-black text-lg font-medium" v-if="detailCourse.course_file">
            Link Soal Pelatihan
          </p>
          <p
            v-if="detailCourse.course_file"
            @click="onOpenFile(detailCourse.course_file)"
            class="text-blue-500 text-base leading-relaxed text-justify cursor-pointer underline"
          >
            {{ detailCourse.course_file }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>