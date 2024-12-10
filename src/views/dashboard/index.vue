<script setup>
import { useProfileStore } from '@/stores/profile'
const store = useProfileStore()
</script>

<template>
  <div class="px-2 font-poppins">
    <div v-if="!isLoading" class="mb-4">
      <p class="text-2xl font-semibold text-gray-800">Hai, {{ store.profile.employee_name }} !</p>
    </div>
    <div
      class="bg-gray-800 font-poppins min-h-[350px] relative max-w-6xl mx-auto rounded overflow-hidden"
    >
      <div class="grid lg:grid-cols-2 w-full h-full absolute inset-0">
        <div class="p-4 max-lg:hidden">
          <img
            src="https://readymadeui.com/image-1.webp"
            class="object-cover w-full h-full "
            alt="img"
          />
        </div>

        <div
          class="flex flex-col items-end justify-center text-right px-8 relative bg-[#262464] rounded-tl-[206px] z-20 before:absolute before:inset-0 before:!left-auto before:bg-[#293587] before:w-2/3 before:rounded-bl-[206px] before:-z-10"
        >
          <h3 class="font-bold sm:text-4xl text-2xl text-yellow-400">Level Up Your Skills</h3>
          <p class="text-sm text-gray-300 mt-4">
            Ready to elevate your expertise? Tap some activities below or take the training designed
            to boost your abilities and give you the competitive edge. Every skill you learn is a
            step closer to mastering your field
          </p>
        </div>
      </div>
    </div>
    <div class="max-w-6xl mx-auto py-8 px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-md:max-w-md mx-auto">
        <div class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all">
          <div class="p-6">
            <h3 class="text-gray-800 text-xl font-semibold mb-3">Course</h3>
            <p class="text-gray-500 text-sm leading-relaxed">
              Ready to dive in? Let’s get started and unlock the knowledge that will help you excel
              in your career. You’ve got this!
            </p>
            <div class="mt-12"></div>
            <button
              @click="$router.push('/course')"
              type="button"
              class="px-6 py-2 mt-8 rounded text-white text-sm tracking-wider font-medium outline-none border-2 border-red-600 bg-red-600 hover:text-black transition-all duration-300"
            >
              View More
            </button>
          </div>
        </div>

        <div class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all">
          <div class="p-6">
            <h3 class="text-gray-800 text-xl font-semibold mb-3">Certification</h3>
            <p class="text-gray-500 text-sm leading-relaxed">
              Congratulations on reaching this exciting stage! You’ve put in the effort, completed
              the training, and now it’s time to earn your well-deserved certification
            </p>
            <div class="mt-7"></div>
            <button
              @click="$router.push('/certification')"
              type="button"
              class="px-6 py-2 mt-8 rounded text-white text-sm tracking-wider font-medium outline-none border-2 border-red-600 bg-red-600 hover:text-black transition-all duration-300"
            >
              View More
            </button>
          </div>
        </div>

        <div class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all">
          <div class="p-6">
            <h3 class="text-gray-800 text-xl font-semibold mb-3">Feedback</h3>
            <p class="text-gray-500 text-sm leading-relaxed">
              Ready to take a closer look? Click below to view your feedback and continue your
              journey of growth!
            </p>
            <div class="mt-12"></div>

            <button
              @click="$router.push('/feedback')"
              type="button"
              class="px-6 py-2 mt-8 rounded text-white text-sm tracking-wider font-medium outline-none border-2 border-red-600 bg-red-600 hover:text-black transition-all duration-300"
            >
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>