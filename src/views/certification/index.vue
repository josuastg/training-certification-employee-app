<script setup>
import { ref } from 'vue'
import MyIcon from '@/components/icon/index.vue'

const certifications = ref([
  {
    certification_id: 'XXXXXXX1',
    certification_name: 'Kelas Online Gratis NuxtJS Javascript Framework',
    institution_name: 'Google',
    certification_date: '2024-01-15',
    employee_id: 'employee123',
  },
  {
    certification_id: 'XXXXXXX2',
    certification_name: 'Kelas Online Belajar Flutter Test Driven Development - Weather Forecast',
    institution_name: 'Oracle',
    certification_date: '2024-01-15',
    employee_id: 'employee123',
  },
  {
    certification_id: 'XXXXXXX3',
    certification_name: 'Flutter Developer',
    institution_name: 'Google',
    certification_date: '2024-01-15',
    employee_id: 'employee123',
  },
  {
    certification_id: 'XXXXXXX1',
    certification_name:
      'Kelas Online Gratis Become a Freelance Web Developer with WordPress and Elementor',
    institution_name: 'Google',
    certification_date: '2024-01-15',
    employee_id: 'employee123',
  },
  {
    certification_id: 'XXXXXXX2',
    certification_name: 'Java Developer',
    institution_name: 'Oracle',
    certification_date: '2024-01-15',
    employee_id: 'employee123',
  },
  {
    certification_id: 'XXXXXXX3',
    certification_name: 'Flutter Developer',
    institution_name: 'Google',
    certification_date: '2024-01-15',
    employee_id: 'employee123',
  },
  {
    certification_id: 'XXXXXXX1',
    certification_name: 'Certified Data Analyst',
    institution_name: 'Google',
    certification_date: '2024-01-15',
    employee_id: 'employee123',
  },
  {
    certification_id: 'XXXXXXX2',
    certification_name: 'Java Developer',
    institution_name: 'Oracle',
    certification_date: '2024-01-15',
    employee_id: 'employee123',
  },
  {
    certification_id: 'XXXXXXX3',
    certification_name: 'Flutter Developer',
    institution_name: 'Google',
    certification_date: '2024-01-15',
    employee_id: 'employee123',
  },
  {
    certification_id: 'XXXXXXX1',
    certification_name: 'Certified Data Analyst',
    institution_name: 'Google',
    certification_date: '2024-01-15',
    employee_id: 'employee123',
  },
  {
    certification_id: 'XXXXXXX2',
    certification_name: 'Java Developer',
    institution_name: 'Oracle',
    certification_date: '2024-01-15',
    employee_id: 'employee123',
  },
  {
    certification_id: 'XXXXXXX3',
    certification_name: 'Flutter Developer',
    institution_name: 'Google',
    certification_date: '2024-01-15',
    employee_id: 'employee123',
  },
])

const onPrintPDF = (item) => {
  console.log('print', item)
}
</script>
<template>
  <div class="font-poppins">
    <div class="mb-4">
      <p class="text-gray-800 text-xl font-semibold mb-1">Daftar Sertifikat Anda</p>
      <p class="text-gray-500 text-sm leading-relaxed">
        Temukan semua sertifikat yang telah Anda peroleh di sini.
      </p>
    </div>
    <div>
      <div
        v-if="!certifications.length"
        class="w-full h-screen flex flex-col justify-center items-center"
      >
        <MyIcon iconName="emptyData" />
        <p class="text-gray-500 text-sm leading-relaxed w-1/4 text-center">
          Belum ada sertifikat anda, segera ikuti pelatihan yang ada.
        </p>
      </div>
      <v-table v-else fixed-header hover height="600">
        <thead>
          <tr>
            <th class="text-left">Certification ID</th>
            <th class="text-left">Certification Name</th>
            <th class="text-left">Institution Name</th>
            <th class="text-left">Certification Date</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in certifications" :key="item.name">
            <td>{{ item.certification_id }}</td>
            <td class="w-1/3">{{ item.certification_name }}</td>
            <td>{{ item.institution_name }}</td>
            <td>{{ item.certification_date }}</td>
            <td class="font-poppins">
              <v-btn
                prepend-icon="mdi-printer-outline"
                color="#dc2626"
                text="Print"
                variant="flat"
                @click="onPrintPDF(item)"
              >
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>