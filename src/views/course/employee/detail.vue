<script setup>
import router from '@/router'
import { computed, onBeforeMount, ref } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import { toast } from 'vue3-toastify'
import formatDate from '@/misc/FormatDate'
import { useRoute } from 'vue-router'
import CourseService from '@/service/course'
import SubmissionService from '@/service/submission'
import TrainingEnrollmentService from '@/service/training_enrollment'
import CertificationService from '@/service/certification'
import { getAuth } from 'firebase/auth'
import getUserProfile from '@/service/profile'
import { useProfileStore } from '@/stores/profile'
import FeedbackService from '@/service/feedback'
import axios from 'axios'
import { baseUrlPinataCloud, baseUrlPinataGateway } from '@/misc/Constant.js'
import generatePDF from '../../certification/pdf/index'

let form = ref(null)
const isLoadingDetail = ref(false)
const detailCourse = ref({
  training_enrollment_status: '',
  course_id: '',
  training_enrollment_id: '',
  employee_id: '',
  course: {
    passing_grade: 0,
    start_date: '',
    description_course: '',
    end_date: '',
    created_at: { seconds: 0, nanoseconds: 0 },
    course_id: '',
    course_name: '',
    course_file: '',
    status: '',
    image_url: '',
  },
})

const detailSubmission = ref({
  submission_file: '',
  submission_id: '',
  course_id: '',
  course_name: '',
  employee_id: '',
  employee_name: '',
  score: 0,
  status: '',
  comment: '',
})
const $loading = useLoading({
  color: '#dc2626',
})
let showInputFile = ref(false)

const onCancelSubmission = () => {
  showInputFile.value = false
  form.value = null
}

const auth = getAuth()

const store = useProfileStore()

const uploadFile = async (course_name = '', file) => {
  const formData = new FormData()
  const fileName = JSON.stringify({
    name: `submission_${course_name}_${store.profile.employee_name}_pdf`,
  })
  formData.append('file', file)
  formData.append('pinataMetadata', fileName)
  try {
    const response = await axios.post(`${baseUrlPinataCloud}/pinning/pinFileToIPFS`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        pinata_api_key: import.meta.env.VITE_APP_PINATA_API_KEY,
        pinata_secret_api_key: import.meta.env.VITE_APP_PINATA_SECRET_API_KEY,
      },
    })
    return `${baseUrlPinataGateway}/${response.data.IpfsHash}`
  } catch (error) {
    toast('Terjadi error saat upload file!!!', {
      theme: 'colored',
      type: 'error',
      position: 'top-center',
      closeOnClick: true,
      hideProgressBar: true,
      transition: 'bounce',
      dangerouslyHTMLString: true,
    })
    return ''
  }
}

const onGetDetailSubmission = async () => {
  const loader = $loading.show()
  isLoadingDetail.value = true
  try {
    const detail = await SubmissionService.fetchSubmissionByProperty(
      'course_id',
      detailCourse.value.course.course_id
    )
    if (detail.result) {
      detailSubmission.value = { ...detail.resp['0'] }
    }
  } catch (error) {
    toast('Terjadi error saat get detail submission!!!', {
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
    isLoadingDetail.value = false
  }
}

const onSubmit = async () => {
  const loader = $loading.show()
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }
  const optionsTime = {
    hour: '2-digit',
    minute: '2-digit',
  }
  try {
    const submissionId = await SubmissionService.addSubmission({
      submission_file: '',
      training_enrollment_id: detailCourse.value.training_enrollment_id,
      course_id: detailCourse.value.course.course_id,
      course_name: detailCourse.value.course.course_name,
      employee_id: store.profile.employee_id,
      employee_name: store.profile.employee_name,
      score: 0,
      status: '',
      created_at: `${new Date().toLocaleDateString(
        'id-ID',
        options
      )} ${new Date().toLocaleTimeString('id-ID', optionsTime)}`,
      comment: '',
    })
    if (submissionId) {
      const linkFile = await uploadFile(detailCourse.value.course.course_name, form.value)
      if (linkFile) {
        toast('Berhasil upload file!!!', {
          theme: 'colored',
          type: 'success',
          position: 'top-center',
          closeOnClick: true,
          hideProgressBar: true,
          transition: 'bounce',
          dangerouslyHTMLString: true,
        })
        const result = await SubmissionService.updateSubmission(submissionId, {
          submission_file: linkFile,
        })
        if (result) {
          const updateTrainingEnrollment = await TrainingEnrollmentService.updateTrainingEnrollment(
            detailCourse.value.training_enrollment_id,
            { training_enrollment_status: 'SUBMITTED' }
          )
          if (updateTrainingEnrollment) {
            toast('Berhasil dikumpulkan!!!', {
              theme: 'colored',
              type: 'success',
              position: 'top-center',
              closeOnClick: true,
              hideProgressBar: true,
              transition: 'bounce',
              dangerouslyHTMLString: true,
            })
            onGetDetailSubmission()
            onCancelSubmission()
          }
        }
      }
    }
  } catch (error) {
    toast('Terjadi error saat mengumpulkan jawaban!!!', {
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

let dialogFeedback = ref(false)

async function fetchDetailTrainingEnrollment(value, key) {
  isLoadingDetail.value = true
  const loader = $loading.show()
  try {
    detailCourse.value = await TrainingEnrollmentService.fetchTrainingEnrollment(
      value,
      '',
      key,
      false
    )
    if (detailCourse.value) {
      detailCourse.value = detailCourse.value['0']
    }
    onGetDetailSubmission()
    const feedback = await FeedbackService.fetchDetailFeedback(detailCourse.value.course.course_id)
    if (
      detailCourse.value.training_enrollment_status === 'DONE' &&
      feedback.result &&
      !feedback.resp.length
    ) {
      dialogFeedback.value = true
    }
  } catch (error) {
    detailCourse.value = {
      training_enrollment_status: '',
      course_id: '',
      training_enrollment_id: '',
      employee_id: '',
      course: {
        passing_grade: 0,
        start_date: '',
        description_course: '',
        end_date: '',
        created_at: { seconds: 0, nanoseconds: 0 },
        course_id: '',
        course_name: '',
        course_file: '',
        status: '',
        image_url: '',
      },
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

const route = useRoute()

const onOpenFile = (item) => {
  window.open(item)
}

const ChipsColor = (status) => {
  if (status.match(/^LULUS|green/gi)) return 'green'
  if (status.match(/^TIDAK_LULUS|red/gi)) return 'red'
  return 'gray'
}

const ChipsStyles = (props) => {
  let style = ''
  switch (ChipsColor(props.status)) {
    case 'green':
      style = 'bg-green-600 font-bold text-white'
      break

    case 'red':
      style = 'bg-red-500 font-bold text-white'
      break

    case 'gray':
      style = 'bg-gray-500 font-bold text-white'
      break

    default:
      break
  }

  return props.status && style
    ? `<div class="flex"><div class="rounded-full px-2 py-0 ${style}"><span class="capitalize">${props.title}</span></div></div>`
    : '-'
}

onBeforeMount(() => {
  fetchDetailTrainingEnrollment(route.params.id, 'training_enrollment_id')
})

let myFeedback = ref('')

let dialogPrintCertificate = ref(false)

const titleSubmitted = computed(() => {
  if (detailSubmission.value.status === 'LULUS') return 'LULUS'
  if (detailSubmission.value.status === 'TIDAK_LULUS') return 'TIDAK LULUS'
  if (detailSubmission.value.status === '') return 'BELUM DINILAI'
  return ''
})
let rules = [(v) => v.length <= 1000 || 'Maksimal 1000 karakter']

const submitFeedback = async () => {
  const loader = $loading.show()
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }
  const optionsTime = {
    hour: '2-digit',
    minute: '2-digit',
  }
  try {
    const add = await FeedbackService.addFeedback({
      evaluation_id: '',
      employee_id: detailSubmission.value.employee_id,
      employee_name: detailSubmission.value.employee_name, // Reference to the employee
      course_id: detailSubmission.value.course_id,
      course_name: detailSubmission.value.course_name, // Reference to the course
      score: detailSubmission.value.score,
      comment: myFeedback.value,
      comment_from_admin: detailSubmission.value.comment,
      created_at: `${new Date().toLocaleDateString(
        'id-ID',
        options
      )} ${new Date().toLocaleTimeString('id-ID', optionsTime)}`,
    })
    if (add.length) {
      dialogFeedback.value = false
      toast('Berhasil kirim feedback anda!!!', {
        theme: 'colored',
        type: 'success',
        position: 'top-center',
        closeOnClick: true,
        hideProgressBar: true,
        transition: 'bounce',
        dangerouslyHTMLString: true,
      })
      // show dialog print certificate if lulus
      dialogPrintCertificate.value =
        detailSubmission.value.score >= detailCourse.value.course.passing_grade &&
        detailSubmission.value.status === 'LULUS'
    }
  } catch (error) {
    toast('Terjadi error saat kirim feedback!!!', {
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

const onPrintPDF = async (item) => {
  const loader = $loading.show()
  generatePDF({ ...item, employee_name: store.profile.employee_name })
  loader.hide()
}

const onPrintCertificate = async () => {
  const loader = $loading.show()
  dialogPrintCertificate.value = false
  const resp = await CertificationService.fetchDetailCertification(
    detailCourse.value.course.course_name
  )
  if (resp.result) {
    onPrintPDF(resp.resp['0'])
    router.push('/certification')
  }
  loader.hide()
}
</script>

<template>
  <div v-if="!isLoading && !dialogFeedback" class="font-poppins">
    <v-dialog
      v-model="dialogPrintCertificate"
      max-width="600"
      transition="dialog-bottom-transition"
      class="font-poppins"
    >
      <v-card
        text="Anda dapat langsung melihat dan mencetak sertifikat yang anda dapatkan."
        title="Cetak Sertifikat Anda ?"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="dialogPrintCertificate = false"> Tidak </v-btn>

          <v-btn @click="onPrintCertificate" color="#dc2626" text="Ya" variant="flat"> Ya </v-btn>
        </template>
      </v-card>
    </v-dialog>
    <div class="bg-white rounded-2xl mb-4 shadow-md">
      <div class="mb-4 flex flex-row items-center px-6 py-4">
        <v-btn color="#dc2626" icon="mdi-arrow-left" variant="text" @click="router.back()"></v-btn>
        <div class="flex flex-col">
          <p class="text-gray-800 text-xl font-semibold">{{ detailCourse.course.course_name }}</p>
        </div>
      </div>
      <div class="px-10 pb-6 gap-y-4 flex flex-col">
        <div class="flex flex-col gap-y-1">
          <p class="text-black text-lg font-medium">Opened</p>
          <p class="text-gray-500 text-base leading-relaxed text-justify">
            {{ formatDate(detailCourse.course.start_date) }}
          </p>
          <p class="text-black text-lg font-medium">Closed</p>
          <p class="text-gray-500 text-base leading-relaxed text-justify">
            {{ formatDate(detailCourse.course.end_date) }}
          </p>
        </div>
        <div class="flex flex-col gap-y-1">
          <p class="text-black text-lg font-medium">Link Pelatihan</p>
          <p
            @click="onOpenFile(detailCourse.course.course_file)"
            class="text-blue-500 lowercase text-base leading-relaxed text-justify cursor-pointer underline"
          >
            soal_{{ detailCourse.course.course_name }}.pdf
          </p>
        </div>
        <div>
          <p class="text-black text-lg font-medium mb-2">Status</p>
          <div
            v-if="detailSubmission.submission_file"
            v-html="
              ChipsStyles({
                status: !detailSubmission.status ? 'BELUM DINILAI' : detailSubmission.status,
                title: titleSubmitted,
              })
            "
          ></div>
          <p class="text-gray-500 text-base leading-relaxed text-justify" v-else>
            Belum Dikumpulkan
          </p>
        </div>
        <div class="gap-y-3">
          <button
            v-show="!showInputFile && !detailSubmission.submission_file"
            @click="showInputFile = true"
            :disabled="false"
            type="button"
            :class="`px-8 py-3 mb-5 rounded text-white text-sm tracking-wider font-medium outline-none border-2 ${
              false ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'border-red-600 bg-red-600'
            }`"
          >
            Kumpulkan Jawaban Anda
          </button>

          <p
            v-if="showInputFile || detailSubmission.submission_file"
            :class="`text-black text-lg font-medium ${showInputFile ? 'mb-3' : ''}`"
          >
            File Jawaban
          </p>
          <p
            v-if="detailSubmission.submission_file"
            @click="onOpenFile(detailSubmission.submission_file)"
            class="text-blue-500 lowercase text-base leading-relaxed text-justify cursor-pointer underline"
          >
            Jawaban_{{ store.profile.employee_name }}_{{ detailCourse.course.course_name }}.pdf
          </p>
          <div class="flex flex-col" v-if="showInputFile && !detailSubmission.submission_file">
            <v-file-input
              clearable
              label="Unggah Jawaban Anda"
              accept=".pdf"
              v-model="form"
              @click:clear="form = null"
            ></v-file-input>
            <div class="flex flex-row items-center gap-x-2 justify-end">
              <button
                @click="onSubmit"
                :disabled="!form"
                type="button"
                :class="`px-8 py-3 mb-5 rounded text-white text-sm tracking-wider font-medium outline-none border-2 ${
                  !form ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'border-red-600 bg-red-600'
                }`"
              >
                Simpan
              </button>
              <button
                @click="onCancelSubmission"
                type="button"
                style="border: 1px solid #dc2626"
                class="px-8 py-3 mb-5 rounded text-sm font-medium"
              >
                <p class="text-red-600">Batal</p>
              </button>
            </div>
          </div>
        </div>
        <div v-if="detailSubmission.status && detailSubmission.submission_file">
          <p class="text-black text-lg font-medium mb-2">Skor</p>
          <p class="text-gray-500 text-base leading-relaxed text-justify">
            {{ detailSubmission.score }}
          </p>
          <p class="text-black text-lg font-medium mb-2">Komentar dari Penyelenggara</p>
          <p class="text-gray-500 text-base leading-relaxed text-justify">
            {{ detailSubmission.comment }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialogFeedback"
      max-width="700"
      scrollable
      persistent
      transition="dialog-bottom-transition"
    >
      <template v-slot:default="{ isActive }">
        <v-card>
          <template v-slot:loader="{ isActive }">
            <v-progress-linear
              :active="isActive"
              color="#dc2626"
              height="5"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-card-text>
            <div class="flex flex-col gap-y-1.5 font-poppins">
              <p :class="`text-black text-lg font-medium`">
                Isi Feedback Sebelum Melihat Hasil Pelatihan
              </p>
              <v-textarea
                v-model="myFeedback"
                :rules="rules"
                label="Feedback"
                placeholder="Isi Feedback Anda"
                counter
              ></v-textarea>
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!myFeedback || !myFeedback.length > 1000"
              color="#dc2626"
              text="Kirim"
              variant="flat"
              @click="submitFeedback"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>
