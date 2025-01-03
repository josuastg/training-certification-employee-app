<script setup>
import { getAuth } from 'firebase/auth'
import { computed, ref } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import TrainingEnrollmentService from '@/service/training_enrollment'
import ellipsisString from '@/misc/EllipsisString'
import MyIcon from '@/components/icon/index.vue'
import router from '@/router'

const $loading = useLoading({
  color: '#dc2626',
})
const isLoading = ref(false)
const onEllipsisString = (name, long) => {
  return ellipsisString(name, long)
}
const training_enrollments = ref([])
const auth = getAuth()
const tab = ref(null)

const onMappingTab = computed(() => {
  let result = ''
  switch (tab.value) {
    case 1:
      result = 'IN_PROGRESS'
      break
    case 2:
      result = 'SUBMITTED'
      break
    case 3:
      result = 'DONE'
      break
    default:
      result = 'IN_PROGRESS'
      break
  }
  return result
})

async function fetchTrainingEnrollments() {
  isLoading.value = true
  try {
    const resp = await TrainingEnrollmentService.fetchTrainingEnrollment(
      auth.currentUser.uid,
      onMappingTab.value
    )
    training_enrollments.value = resp
  } catch (error) {
    toast('Terjadi error saat get list training enrollment!!!', {
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

function onChangeTabs() {
  fetchTrainingEnrollments()
}
</script>

<template>
  <div class="font-poppins">
    <div class="bg-white rounded-2xl mb-4 shadow-md">
      <div class="mb-4 flex flex-row items-center px-6 pt-0">
        <v-btn color="#dc2626" icon="mdi-arrow-left" variant="text" @click="router.back()"></v-btn>
        <div class="flex flex-col pt-6">
          <p class="text-gray-800 text-xl font-semibold mb-1">Pelatihan Saya</p>
          <p class="text-gray-500 text-sm leading-relaxed">
            Akses pelatihan yang sedang berjalan, telah dikirim dan yang telah selesai kapan saja.
          </p>
        </div>
      </div>
      <v-tabs
        v-model="tab"
        :disabled="isLoading"
        @update:modelValue="(param) => (param === tab.value ? {} : onChangeTabs())"
        align-tabs="center"
        slider-color="#dc2626"
        color="#1f2937"
        class="rounded-2xl rounded-b-none"
      >
        <v-tab :value="1"> <b>Sedang Berjalan</b></v-tab>
        <v-tab :value="2"><b>Telah Dikirim</b></v-tab>
        <v-tab :value="3"><b>Telah Selesai</b></v-tab>
      </v-tabs>
      <div class="p-6">
        <v-tabs-window v-model="tab">
          <v-tabs-window-item v-for="n in 3" :key="n" :value="n">
            <v-container fluid>
              <div class="grid grid-cols-3 w-full inset-0 gap-9" v-if="isLoading">
                <v-skeleton-loader
                  v-for="test in 6"
                  :key="test"
                  class="w-full rounded-md"
                  type="image, article"
                ></v-skeleton-loader>
              </div>
              <div v-else>
                <div
                  v-if="!training_enrollments.length"
                  style="height: 60vh"
                  class="w-full flex flex-col justify-center items-center"
                >
                  <MyIcon iconName="emptyData" />
                  <p class="text-gray-500 text-sm leading-relaxed w-1/4 text-center">
                    Belum ada data tersedia.
                  </p>
                </div>
                <div class="grid grid-cols-3 w-full inset-0 gap-9 mb-5" v-else>
                  <div
                    @click="
                      router.push(`/course/my-course/detail/${course.training_enrollment_id}`)
                    "
                    v-for="course in training_enrollments"
                    :key="course"
                    class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg cursor-pointer transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
                  >
                    <div class="">
                      <img
                        id="thumbnail-course"
                        :src="course.course.image_url"
                        class="w-full"
                        style="height: 180px"
                      />
                      <div class="p-4">
                        <p class="text-gray-800 text-base font-bold mb-3">
                          {{ onEllipsisString(course.course.course_name, 81) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-container>
          </v-tabs-window-item>
        </v-tabs-window>
      </div>
    </div>
  </div>
</template>