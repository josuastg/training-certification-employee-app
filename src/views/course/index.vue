<script setup>
import ellipsisString from '@/misc/EllipsisString'
import { onMounted, ref } from 'vue'

const dummy = [
  {
    course_name: 'Kelas Online Web Dev with Next JS, Prisma, Typescript: Projek E-commerce',
    description_course:
      'Dari perusahaan, yayasan, organisasi, dan pemerintahan membutuhkan landing page untuk memperkenalkan layanannya kepada publik. Namun luasnya penggunaan web ini terkadang belum dibarengi dengan pengembangan cyber security yang baik. <br /> <br />  Kelas Web Security Dasar untuk Penetration Tester dan Bug Bounty Hunter ini cocok untuk dipelajari oleh kalian yang punya keminatan di web security. Konten dari course ini berfokus kepada offensive security (cyber security menyerang) untuk menemukan celah pada layanan web dan kemudian melaporkan temuan tersebut kepada pemilik layanan. Kelas ini menggunakan tools Kali Linux dan BurpSuite Community edition.',
    start_date: '2024-02-01',
    end_date: '2024-04-01',
    status: 'upcoming',
    image_url:
      'https://buildwithangga.com/storage/assets/thumbnails/cu00eq71-kelas%20full%20stack%20javascript%20next%20typescript%20website%20ecommerce%20buildwithangga.png',
  },
  {
    course_name: 'Kelas Online Belajar Flutter Test Driven Development - Weather Forecast',
    description_course:
      'Sebuah aplikasi yang baik adalah aplikasi yang lulus uji sebelum di release. Oleh karena nya kita akan belajar Test Driven Development (TDD) di Flutter dengan studi kasus "Weather Forecast". Teman-teman harus menyelesaikan kelas Belajar Flutter Clean Architecture - Travel App terlebih dahulu sebelum mengambil ke kelas ini.',
    start_date: '2024-02-01',
    end_date: '2024-04-01',
    status: 'upcoming',
    image_url: 'https://buildwithangga.com/storage/assets/thumbnail/117650/Course-TDD-Weather.png',
  },
  {
    course_name: 'Kelas Online Web Security untuk Penetration Tester dan Bug Bounty Hunter',
    description_course:
      'Penggunaan web dari tahun ke tahun semakin meluas. Dari perusahaan, yayasan, organisasi, dan pemerintahan membutuhkan landing page untuk memperkenalkan layanannya kepada publik. Namun luasnya penggunaan web ini terkadang belum dibarengi dengan pengembangan cyber security yang baik.',
    start_date: '2024-02-01',
    end_date: '2024-04-01',
    status: 'upcoming',
    image_url:
      'https://buildwithangga.com/storage/assets/thumbnails/3tvtwjdv-Web%20Security%20untuk%20Penetration%20Tester%20dan%20Bug%20Bounty%20Hunter%20BuildWith%20Angga.png',
  },
  {
    course_name:
      'Kelas Online Gratis Become a Freelance Web Developer with WordPress and Elementor',
    description_course:
      'Di era digital saat ini banyak sekali perusahaan besar memulai bisnis mereka secara online untuk menjangkau lebih luas calon customer. Peran seorang freelance website developer semakin dicari dengan bayaran tinggi seperti negara Singapore, Hong Kong, Canada, dan Amerika Serikat. Pada kelas online gratis Become a Freelance WordPress Developer for Beginners 2023, kita akan belajar memulai karir sebagai freelance website developer, mulai mengenal freelancer, bagaimana cara kerjanya, selanjutnya akan membangun portfolio pertama menarik juga menjual.',
    start_date: '2024-02-01',
    end_date: '2024-04-01',
    status: 'upcoming',
    image_url: 'https://buildwithangga.com/storage/assets/thumbnails/6atnuxa7-1.png',
  },
  {
    course_name: 'Kelas Online Gratis Web Development Menggunakan Webflow',
    description_course:
      'Membangun website tanpa menggunakan koding. Sangat cocok jika kamu saat ini seseorang yang tidak terlalu paham pemrograman atau ingin membangun bisnis menggunakan website. Developer juga dapat mempelajari teknologi web terbaru dari platform Webflow ini.',
    start_date: '2024-02-01',
    end_date: '2024-04-01',
    status: 'upcoming',
    image_url: 'https://buildwithangga.com/storage/assets/thumbnails/kelas_webflow_dasar_thumb.png',
  },
  {
    course_name: 'Kelas Online Gratis NuxtJS Javascript Framework',
    description_course:
      'NuxtJS adalah sebuah framework VueJS yang memungkinkan kamu untuk membut website yang mendukung Server Side Rendering dan PWA Progressive Web App dan Server Side Rendering itu penting agar website kamu mempunyai SEO yang baik, dan dapat mendatangkan visitor dan calon customer yang tentunya akan berpengaruh pada profit bisnismu.',
    start_date: '2024-02-01',
    end_date: '2024-04-01',
    status: 'upcoming',
    image_url:
      'https://buildwithangga.com/storage/assets/thumbnails/thumbnail%20kelas%20es6%20buildwith%20angga.png',
  },
  {
    course_name: 'Kelas Online Web Dev with Next JS, Prisma, Typescript: Projek E-commerce',
    description_course: 'Web Developer with Next JS, Prisma, Typescript: Projek E-commerce',
    start_date: '2024-02-01',
    end_date: '2024-04-01',
    status: 'upcoming',
    image_url:
      'https://buildwithangga.com/storage/assets/thumbnails/cu00eq71-kelas%20full%20stack%20javascript%20next%20typescript%20website%20ecommerce%20buildwithangga.png',
  },
  {
    course_name: 'Kelas Online Belajar Flutter Test Driven Development - Weather Forecast',
    description_course:
      'Sebuah aplikasi yang baik adalah aplikasi yang lulus uji sebelum di release. Oleh karena nya kita akan belajar Test Driven Development (TDD) di Flutter dengan studi kasus "Weather Forecast". Teman-teman harus menyelesaikan kelas Belajar Flutter Clean Architecture - Travel App terlebih dahulu sebelum mengambil ke kelas ini.',
    start_date: '2024-02-01',
    end_date: '2024-04-01',
    status: 'upcoming',
    image_url: 'https://buildwithangga.com/storage/assets/thumbnail/117650/Course-TDD-Weather.png',
  },
  {
    course_name: 'Kelas Online Web Security untuk Penetration Tester dan Bug Bounty Hunter',
    description_course:
      'Penggunaan web dari tahun ke tahun semakin meluas. Dari perusahaan, yayasan, organisasi, dan pemerintahan membutuhkan landing page untuk memperkenalkan layanannya kepada publik. Namun luasnya penggunaan web ini terkadang belum dibarengi dengan pengembangan cyber security yang baik.',
    start_date: '2024-02-01',
    end_date: '2024-04-01',
    status: 'upcoming',
    image_url:
      'https://buildwithangga.com/storage/assets/thumbnails/3tvtwjdv-Web%20Security%20untuk%20Penetration%20Tester%20dan%20Bug%20Bounty%20Hunter%20BuildWith%20Angga.png',
  },
]
const onEllipsisString = (name, long) => {
  return ellipsisString(name, long)
}
const isLoading = ref(false)
const tab = ref(null)
const isOpenDialog = ref(false)

onMounted(() => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
})
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
    <v-tabs v-model="tab" align-tabs="center" color="#dc2626" slider-color="#f78166">
      <v-tab :value="1"> <b>Active</b></v-tab>
      <v-tab :value="2"><b>Inactive</b></v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item v-for="n in 2" :key="n" :value="n">
        <v-container fluid v-if="n === 1">
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
              v-for="course in dummy"
              :key="course"
              @click="isOpenDialog = true"
              class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg cursor-pointer transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
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
        <v-container fluid v-else>
          <div class="grid grid-cols-3 w-full inset-0 gap-9" v-if="isLoading">
            <v-skeleton-loader
              v-for="test in 6"
              :key="test"
              class="w-full rounded-md"
              type="image, article"
            ></v-skeleton-loader>
          </div>
          <div class="grid grid-cols-3 w-full inset-0 gap-9 mb-5 opacity-50" v-else>
            <div
              v-for="course in dummy.slice(0, 2)"
              :key="course"
              class="bg-white rounded-2xl overflow-hidden shadow-md cursor-not-allowed"
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

                <!-- <p class="text-gray-500 text-sm leading-relaxed">
          {{ onEllipsisString(course.description_course, 100) }}
        </p> -->
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
          <v-card>
            <template v-slot:text>
              <img
                id="thumbnail-course"
                :src="dummy[0].image_url"
                class="w-full h-1/2 rounded-lg shadow-lg"
              />
              <p class="text-gray-800 text-lg font-bold my-3">
                {{ dummy[0].course_name }}
              </p>

              <p
                class="text-gray-500 text-sm leading-relaxed text-justify"
                v-html="dummy[0].description_course"
              ></p>
            </template>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                text="Tidak, Lain Kali Saja"
                variant="text"
                @click="isOpenDialog = false"
              ></v-btn>

              <v-btn
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