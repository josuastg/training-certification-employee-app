<script setup>
import { ref } from 'vue'
import MyIcon from '@/components/icon/index.vue'

const feedbacks = ref([
  {
    evaluation_id: 'xxxxxx-12321',
    employee_id: 'employee123',
    employee_name: 'Jon Doe', // Reference to the employee
    course_id: 'course456',
    course_name: 'Kelas Online Gratis NuxtJS Javascript Framework', // Reference to the course
    score: 100,
    comment: 'Great content, but could include more examples.',
  },
  {
    evaluation_id: 'xxxxxx-1233213',
    employee_id: 'employee123',
    employee_name: 'Ergi A', // Reference to the employee
    course_id: 'course456',
    course_name: 'Kelas Online Belajar Flutter Test Driven Development - Weather Forecast', // Reference to the course
    score: 90,
    comment: 'The course was very insightful and well-structured.',
  },
  {
    evaluation_id: 'xxxxxx-12321111',
    employee_id: 'employee123',
    employee_name: 'Kakang Rudi', // Reference to the employee
    course_id: 'course456',
    course_name:
      'Kelas Online Gratis Become a Freelance Web Developer with WordPress and Elementor  ', // Reference to the course
    score: 50,
    comment: 'Great content, but could include more examples.',
  },
])

const onPrintPDF = (item) => {
  console.log('print', item)
}
</script>
<template>
  <div class="font-poppins">
    <div class="mb-4">
      <p class="text-gray-800 text-xl font-semibold mb-1">Daftar Feedback Anda</p>
      <p class="text-gray-500 text-sm leading-relaxed">
        Lihat semua umpan balik yang telah Anda terima di sini. Gunakan feedback ini untuk terus
        berkembang dan belajar.
      </p>
    </div>
    <div>
      <div
        v-if="!feedbacks.length"
        class="w-full h-screen flex flex-col justify-center items-center"
      >
        <MyIcon iconName="emptyData" />
        <p class="text-gray-500 text-sm leading-relaxed w-1/4 text-center">
          Belum ada feedback anda, mohon menunggu feedback dari admin.
        </p>
      </div>
      <v-table v-else fixed-header hover height="600">
        <thead>
          <tr>
            <th class="text-left">Course Name</th>
            <th class="text-left">Score</th>
            <th class="text-left">Comment</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in feedbacks" :key="item.name">
            <td class="w-1/3">{{ item.course_name }}</td>
            <td class="w-1/8">{{ item.score }}</td>
            <td>{{ item.comment }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>