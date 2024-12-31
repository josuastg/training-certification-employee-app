<script setup>
import router from '@/router'
import { computed, ref } from 'vue'
import CourseService from '@/service/course'
import { toast } from 'vue3-toastify'
import { useLoading } from 'vue-loading-overlay'
import axios from 'axios'
import {
  baseUrlPinataCloud,
  baseUrlPinataGateway,
} from '@/misc/Constant.js'
import formatDate from '@/misc/FormatDate'

const $loading = useLoading({
  color: '#dc2626',
})
let form = ref({
  course_name: '',
  description_course: '',
  start_date: '',
  end_date: '',
  status: '',
  image_url: null,
  course_file: null,
})

let ipfsLink = ref('')
let fileResult = ref([])

const isLoading = ref(false)

let dialog = ref(false)

let rules = [(v) => v.length <= 500 || 'Maksimal 500 karakter']

const onUploadFile = async (file) => {
  if (!file) return
}

const onClearFile = (data) => {
  if (data === 'img') {
    form.value.image_url = null
  } else {
    form.value.course_file = null
  }
}

const uploadFile = async (courseId = '', type = '', file) => {
  const formData = new FormData()
  const fileName = JSON.stringify({
    name: `course_${courseId}_${type}`,
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
    ipfsLink.value = `${baseUrlPinataGateway}/${response.data.IpfsHash}`
    fileResult.value.push(ipfsLink.value)
    return fileResult.value
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
    return []
  } finally {
    ipfsLink.value = ''
  }
}

const onSaveCourse = async () => {
  dialog.value = false
  const loader = $loading.show()
  const data = [form.value.image_url, form.value.course_file]
  try {
    const courseId = await CourseService.addCourse({
      course_name: form.value.course_name,
      description_course: form.value.description_course,
      start_date: formatDate(form.value.start_date, 'DD-MM-YYYY'),
      end_date: formatDate(form.value.end_date, 'DD-MM-YYYY'),
      status: form.value.status,
      image_url: '',
      course_file: '',
    })
    if (courseId) {
      for (let index = 0; index < data.length; index++) {
        await uploadFile(courseId, index === 0 ? 'img' : 'pdf', data[index])
      }
      if (fileResult.value.length > 1) {
        toast('Berhasil upload file!!!', {
          theme: 'colored',
          type: 'success',
          position: 'top-center',
          closeOnClick: true,
          hideProgressBar: true,
          transition: 'bounce',
          dangerouslyHTMLString: true,
        })
        const result = await CourseService.updateCourse(
          courseId,
          fileResult.value[0],
          fileResult.value[1]
        )
        if (result) {
          toast('Berhasil tambah pelatihan!!!', {
            theme: 'colored',
            type: 'success',
            position: 'top-center',
            closeOnClick: true,
            hideProgressBar: true,
            transition: 'bounce',
            dangerouslyHTMLString: true,
          })
          onResetState()
        }
      }
    }
  } catch (error) {
    toast('Terjadi error saat tambah pelatihan!!!', {
      theme: 'colored',
      type: 'error',
      position: 'top-center',
      closeOnClick: true,
      hideProgressBar: true,
      transition: 'bounce',
      dangerouslyHTMLString: true,
      autoClose: 10000,
    })
  } finally {
    loader.hide()
  }
}

const onResetState = () => {
  form.value = {
    course_name: '',
    description_course: '',
    start_date: '',
    end_date: '',
    status: '',
    image_url: null,
    course_file: null,
  }
  fileResult.value = []
  ipfsLink = ''
}

const isFormValid = computed(() => {
  return (
    form.value.course_file &&
    form.value.description_course &&
    form.value.start_date &&
    form.value.end_date &&
    form.value.status &&
    form.value.course_file &&
    form.value.course_file
  )
})
</script>

<template>
  <div>
    <div class="bg-white rounded-2xl h-screen mb-4 overflow-hidden shadow-md font-poppins">
      <div class="p-6">
        <div class="flex flex-row justify-between">
          <div class="flex flex-col">
            <h3 class="text-gray-800 text-xl font-semibold mb-2">Buat Pelatihan</h3>
            <p class="text-gray-500 text-lg leading-relaxed">
              Isi form dibawah ini dengan lengkap!
            </p>
          </div>
          <div>
            <button
              @click="dialog = true"
              type="button"
              :disabled="!isFormValid"
              :class="`px-8 py-3 rounded text-white text-sm tracking-wider font-medium outline-none border-2 ${
                isFormValid
                  ? 'border-red-600 bg-red-600'
                  : 'bg-gray-400 cursor-not-allowed opacity-50'
              }`"
            >
              Buat
            </button>
          </div>
        </div>

        <div class="flex flex-row gap-x-4">
          <div class="mt-7 gap-y-2 flex flex-col w-1/2">
            <v-text-field
              label="Nama Pelatihan"
              placeholder="Isi Nama Pelatihan"
              v-model="form.course_name"
            ></v-text-field>

            <v-textarea
              v-model="form.description_course"
              :rules="rules"
              label="Deskripsi Pelatihan"
              placeholder="Isi Deskripsi Pelatihan"
              counter
            ></v-textarea>
            <v-select
              clearable
              label="Pilih Status"
              v-model="form.status"
              item-title="name"
              item-value="value"
              :items="[
                { name: 'Aktif', value: 'active' },
                { name: 'Tidak Aktif', value: 'inactive' },
              ]"
            ></v-select>
          </div>
          <div class="flex flex-col">
            <div class="mt-2 gap-y-2 gap-x-5 flex flex-row items-center w-1/2">
              <div>
                <p class="text-black text-xs mb-1">Tanggal Awal</p>
                <Datepicker
                  v-model="form.start_date"
                  :full-month-name="true"
                  placeholder="YYYY-MM-DD"
                  :hideInput="false"
                  language="id"
                  :disabled-dates="{
                    to: new Date(),
                  }"
                />
              </div>
              <div>
                <p class="text-black text-xs mb-1">Tanggal Akhir</p>
                <Datepicker
                  v-model="form.end_date"
                  :full-month-name="true"
                  placeholder="YYYY-MM-DD"
                  :hideInput="false"
                  language="id"
                  :disabled-dates="{
                    to: new Date(form.start_date),
                  }"
                />
              </div>
            </div>
            <div class="mt-10">
              <v-file-input
                clearable
                label="Unggah Poster Pelatihan"
                accept="image/*"
                v-model="form.image_url"
                @update:modelValue="onUploadFile"
                @click:clear="onClearFile('img')"
              ></v-file-input>
              <v-file-input
                clearable
                label="Unggah Soal Pelatihan"
                accept=".pdf"
                v-model="form.course_file"
                @update:modelValue="onUploadFile"
                @click:clear="onClearFile('pdf')"
              ></v-file-input>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-dialog
      v-model="dialog"
      max-width="600"
      transition="dialog-bottom-transition"
      class="font-poppins"
    >
      <v-card text="Pastikan data yang disimpan sesuai dan benar." title="Buat Data Pelatihan?">
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="dialog = false"> Kembali </v-btn>

          <v-btn @click="onSaveCourse" color="#dc2626" text="Gabung Pelatihan" variant="flat">
            Buat
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>