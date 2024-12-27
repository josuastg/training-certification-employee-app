<script setup>
import router from '@/router'
import { ref } from 'vue'
let form = ref({
  course_name: '',
  description_course: '',
  start_date: '',
  end_date: '',
  status: '',
  course_image: '',
  course_file: '',
})

let dialog = ref(false)

let rules = [(v) => v.length <= 500 || 'Maksimal 500 karakter']
const dateSelected = (payload) => {
  console.log(payload)
}

const onSaveCourse = () => {
  dialog.value = false
  router.push('/course')
}
</script>

<template>
  <div>
    <div class="bg-white rounded-2xl h-auto overflow-hidden shadow-md font-poppins">
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
              class="px-8 py-3 rounded text-white text-sm tracking-wider font-medium outline-none border-2 border-red-600 bg-red-600"
            >
              Simpan
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
              :items="['Aktif', 'Tidak Aktif']"
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
                />
              </div>
            </div>
            <div class="mt-10">
              <v-file-input clearable label="Unggah Gambar" accept="image/*"></v-file-input>
              <v-file-input clearable label="Unggah File" accept=".pdf"></v-file-input>
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
      <v-card
        text="Pastikan data yang disimpan sesuai dan benar."
        title="Simpan Pembuatan Data Pelatihan?"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="dialog = false"> Kembali </v-btn>

          <v-btn @click="onSaveCourse" color="#dc2626" text="Gabung Pelatihan" variant="flat">
            Simpan
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>