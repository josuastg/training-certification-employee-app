<script setup>
import ellipsisString from '@/misc/EllipsisString'
import CourseService from '@/service/course'
import { onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
const onEllipsisString = (name, long) => {
  return ellipsisString(name, long)
}
const isLoading = ref(false)
const isLoadingDetail = ref(false)
const tab = ref(null)
const isOpenDialog = ref(false)
const courses = ref(false)
const detailCourse = ref(null)
async function fetchListCourse(key, value) {
  isLoading.value = true
  try {
    courses.value = await CourseService.fetchCoursesByProperty(key, value)
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

async function fetchDetailCourse(key, value) {
  isLoadingDetail.value = true
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
  }
}
function onChangeTabs() {
  fetchListCourse('status', tab.value === 1 ? 'active' : 'inactive')
}
async function onSetDialog(status, param, courseId = '') {
  if (status === 'inactive') return
  fetchDetailCourse('course_id', courseId)
  isOpenDialog.value = param
}
</script>
<template>
  <div class="font-poppins">
    <div class="mb-4">
      <p class="text-gray-800 text-xl font-semibold mb-1">
        Jelajahi Pilihan Course Terbaik untuk Anda!
      </p>
      <p class="text-gray-500 text-sm leading-relaxed">
        Pilih course yang sesuai kebutuhan Anda dan mulai belajar hari ini.
      </p>
    </div>
    <v-tabs
      v-model="tab"
      :disabled="isLoading"
      @update:modelValue="(param) => (param === tab.value ? {} : onChangeTabs())"
      align-tabs="center"
      color="#dc2626"
      slider-color="#f78166"
    >
      <v-tab :value="1"> <b>Active</b></v-tab>
      <v-tab :value="2"><b>Inactive</b></v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item v-for="n in 2" :key="n" :value="n">
        <v-container fluid>
          <div class="grid grid-cols-3 w-full inset-0 gap-9" v-if="isLoading">
            <v-skeleton-loader
              v-for="test in 6"
              :key="test"
              class="w-full rounded-md"
              type="image, article"
            ></v-skeleton-loader>
          </div>
          <div class="grid grid-cols-3 w-full inset-0 gap-9 mb-5" v-else>
            <div
              v-for="course in courses"
              :key="course"
              @click="onSetDialog(course.status, true, course.course_id)"
              :class="`bg-white rounded-2xl overflow-hidden shadow-md ${
                course.status === 'active'
                  ? 'hover:shadow-lg cursor-pointer transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none'
                  : 'shadow-md cursor-not-allowed opacity-50'
              }`"
            >
              <div class="">
                <img
                  id="thumbnail-course"
                  :src="course.image_url"
                  class="w-full"
                  style="height: 180px"
                />
                <div class="p-4">
                  <p class="text-gray-800 text-base font-bold mb-3">
                    {{ onEllipsisString(course.course_name, 81) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>

    <div class="pa-4 text-center">
      <v-dialog
        max-width="800"
        v-model="isOpenDialog"
        transition="dialog-bottom-transition"
        class="font-poppins"
      >
        <template v-slot:default="{ isActive }">
          <v-card :disabled="isLoadingDetail" :loading="isLoadingDetail">
            <template v-slot:loader="{ isActive }">
              <v-progress-linear
                :active="isActive"
                color="#dc2626"
                height="5"
                indeterminate
              ></v-progress-linear>
            </template>
            <template v-slot:text v-if="!isLoadingDetail && detailCourse.course_id">
              <!-- {{ detailCourse }} -->
              <img
                id="thumbnail-course"
                :src="detailCourse.image_url"
                class="w-full h-1/2 rounded-lg shadow-lg"
              />
              <p class="text-gray-800 text-lg font-bold my-3">
                {{ detailCourse.course_name }}
              </p>

              <p
                class="text-gray-500 text-sm leading-relaxed text-justify"
                v-html="detailCourse.description_course"
              ></p>
            </template>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                :disabled="isLoadingDetail || !detailCourse.course_id"
                text="Tidak, Lain Kali Saja"
                variant="text"
                @click="isOpenDialog = false"
              ></v-btn>

              <v-btn
                :disabled="isLoadingDetail || !detailCourse.course_id"
                color="#dc2626"
                text="Gabung Pelatihan"
                variant="flat"
                @click="isOpenDialog = false"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
  </div>
</template>