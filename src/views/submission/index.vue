<script setup>
import { onBeforeMount, ref } from 'vue'
import MyIcon from '@/components/icon/index.vue'
import { useLoading } from 'vue-loading-overlay'
import SubmissionService from '@/service/submission'
import TrainingEnrollmentService from '@/service/training_enrollment'
import CertificationService from '@/service/certification'

import { toast } from 'vue3-toastify'

const data = ref([])

const $loading = useLoading({
  color: '#dc2626',
})

const ChipsColor = (status) => {
  if (status.match(/^LULUS|green/gi)) return 'green'
  if (status.match(/^TIDAK_LULUS|red/gi)) return 'red'
  return 'gray'
}

let status = ref('')

const ChipsStyles = (props) => {
  let style = ''
  switch (ChipsColor(props.status)) {
    case 'green':
      style = 'bg-green-600 font-poppins font-bold text-white'
      break

    case 'red':
      style = 'bg-red-500 font-poppins font-bold text-white'
      break

    case 'gray':
      style = 'bg-gray-500 font-poppins font-bold text-white'
      break

    default:
      break
  }

  return props.status && style
    ? `<div class="flex"><div class="rounded-full whitespace-nowrap px-2 py-1 ${style}"><span class="capitalize">${props.title}</span></div></div>`
    : '-'
}

const onTitleSubmitted = (status) => {
  if (status === 'LULUS') return 'LULUS'
  if (status === 'TIDAK_LULUS') return 'TIDAK LULUS'
  else return 'BELUM DINILAI'
}
const getListSubmission = async () => {
  const loader = $loading.show()
  try {
    const resp = await SubmissionService.fetchAllSubmission()
    if (resp.result) {
      data.value = resp.resp
    }
  } catch (error) {
    toast('Terjadi error saat get all submission!!!', {
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

const detailSubmission = ref({
  submission_file: '',
  submission_id: '',
  course_id: '',
  course_name: '',
  employee_id: '',
  employee_name: '',
  score: 0,
  status: '',
  training_enrollment_id: '',
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

onBeforeMount(() => {
  getListSubmission()
})

const onGetDetailSubmission = async (item) => {
  isLoadingDetail.value = true
  try {
    const detail = await SubmissionService.fetchSubmissionByProperty(
      'submission_id',
      item.submission_id,
      item.employee_id
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
    isLoadingDetail.value = false
  }
}

let dialog = ref(false)
let isLoadingDetail = ref(false)
const onSetSubmission = (item) => {
  dialog.value = true
  onGetDetailSubmission(item)
}

const onOpenFile = (item) => {
  window.open(item)
}

let form = ref({ score: 0, comment: '' })

const onSubmit = async () => {
  const loader = $loading.show()
  try {
    const result = await SubmissionService.updateSubmission(detailSubmission.value.submission_id, {
      score: form.value.score,
      comment: form.value.comment,
      status:
        form.value.score < detailSubmission.value.course.passing_grade ? 'TIDAK_LULUS' : 'LULUS',
    })
    if (result) {
      const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }
      const updateTrainingEnrollment = await TrainingEnrollmentService.updateTrainingEnrollment(
        detailSubmission.value.training_enrollment_id,
        { training_enrollment_status: 'DONE' }
      )
      if (updateTrainingEnrollment) {
        if (form.value.score >= detailSubmission.value.course.passing_grade) {
          await CertificationService.addCertification({
            certification_id: '',
            certification_name: detailSubmission.value.course_name,
            institution_name: 'PT. Lorem Ipsum Dolo',
            certification_date: `${new Date().toLocaleDateString('id-ID', options)}`,
            employee_id: detailSubmission.value.employee_id,
          })
        }
        toast('Terimakasih atas penilaian anda, data berhasil disimpan!!!', {
          theme: 'colored',
          type: 'success',
          position: 'top-center',
          closeOnClick: true,
          hideProgressBar: true,
          transition: 'bounce',
          dangerouslyHTMLString: true,
        })
        dialog.value = false
        onResetForm()
        getListSubmission()
      } else {
        toast('Terjadi error saat menyimpan data!!!', {
          theme: 'colored',
          type: 'error',
          position: 'top-center',
          closeOnClick: true,
          hideProgressBar: true,
          transition: 'bounce',
          dangerouslyHTMLString: true,
        })
      }
    } else {
      toast('Terjadi error saat menyimpan data!!!', {
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
    toast('Terjadi error saat menyimpan data!!!', {
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

const onResetForm = () => {
  dialog.value = false
  form.value = { score: 0, comment: '' }
}

let rules = [(v) => v.length <= 1000 || 'Maksimal 1000 karakter']
let rulesPassingGrade = [(v) => v <= 100 || 'Maksimal Skor 100']
</script>

<template>
  <div class="font-poppins">
    <div class="mb-4">
      <p class="text-gray-800 text-xl font-semibold mb-1">Daftar Submission Karyawan</p>
      <p class="text-gray-500 text-sm leading-relaxed">
        Lihat semua submission yang telah Anda terima di sini.
      </p>
    </div>
    <div>
      <div v-if="!data.length" class="w-full h-screen flex flex-col justify-center items-center">
        <MyIcon iconName="emptyData" />
        <p class="text-gray-500 text-sm leading-relaxed w-1/4 text-center">
          Belum ada submission anda, mohon menunggu submission dari karyawan.
        </p>
      </div>
      <v-table v-else fixed-header hover height="600">
        <thead>
          <tr>
            <th class="text-left">Employee Name</th>
            <th class="text-left">Course Name</th>
            <th class="text-left">Score</th>
            <th class="text-left">Status</th>
            <th class="text-left">Created At</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.name">
            <td>{{ item.employee_name }}</td>
            <td>{{ item.course_name }}</td>
            <td>{{ item.score === 0 && !status ? '-' : item.score }}</td>
            <td>
              <div
                v-if="item.submission_file"
                v-html="
                  ChipsStyles({
                    status: !item.status ? 'BELUM DINILAI' : item.status,
                    title: onTitleSubmitted(item.status),
                  })
                "
              ></div>
            </td>
            <td>{{ item.created_at }} WIB</td>
            <td class="font-poppins">
              <v-btn
                v-if="!item.status && item.score === 0"
                color="#dc2626"
                prepend-icon="mdi-marker"
                text="Nilai"
                variant="flat"
                @click="onSetSubmission(item)"
              >
              </v-btn>
              <p v-else>-</p>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" scrollable transition="dialog-bottom-transition" fullscreen>
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
              <p class="text-black text-lg font-medium">Nama Pelatihan</p>
              <p class="text-gray-500 text-base font-normal">
                {{ detailSubmission.course.course_name }}
              </p>
              <p class="text-black text-lg font-medium">Nama Karyawan</p>
              <p class="text-gray-500 text-base font-normal">
                {{ detailSubmission.employee_name }}
              </p>
              <p class="text-black text-lg font-medium">Passing Grade Pelatihan</p>
              <p class="text-gray-500 text-base font-normal">
                {{ detailSubmission.course.passing_grade }}
              </p>
              <p class="text-black text-lg font-medium">Link Pelatihan</p>
              <p
                @click="onOpenFile(detailSubmission.course.course_file)"
                class="text-blue-500 max-w-max lowercase text-base leading-relaxed text-justify cursor-pointer underline"
              >
                soal_{{ detailSubmission.course.course_name }}.pdf
              </p>
              <p :class="`text-black text-lg font-medium`">File Jawaban</p>
              <p
                @click="onOpenFile(detailSubmission.submission_file)"
                class="text-blue-500 max-w-max text-base leading-relaxed text-justify cursor-pointer underline mb-2"
              >
                Jawaban_{{ detailSubmission.employee_name }}_{{
                  detailSubmission.course.course_name
                }}.pdf
              </p>
              <p :class="`text-black text-lg font-medium`">Hasil Pelatihan</p>
              <v-number-input
                :min="0"
                :rules="rulesPassingGrade"
                v-model="form.score"
                label="Skor"
                placeholder="Isi Nilai Skor Pelatihan"
                :max-errors="100"
              ></v-number-input>
              <p :class="`text-black text-lg font-medium`">Komentar Anda</p>
              <v-textarea
                v-model="form.comment"
                :rules="rules"
                label="Komentar"
                placeholder="Isi Komentar Anda"
                counter
              ></v-textarea>
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              :disabled="isLoadingDetail || !detailSubmission.course_id"
              text="Batal"
              variant="text"
              @click="onResetForm"
            ></v-btn>

            <v-btn
              :disabled="
                isLoadingDetail ||
                !detailSubmission.submission_id ||
                !form.score ||
                !form.comment ||
                form.score > 100
              "
              color="#dc2626"
              text="Simpan"
              variant="flat"
              @click="onSubmit"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>