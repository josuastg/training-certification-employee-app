<script setup>
import BasedLogo from '@/components/BasedLogo.vue'
import { auth } from '@/firebase'
import router from '@/router'
import { signOut } from 'firebase/auth'
async function onLogout() {
  await signOut(auth)
  router.push('/')
}
</script>

<template>
  <div class="relative bg-[#f7f6f9] h-full min-h-screen font-poppins">
    <div class="flex items-start">
      <nav id="sidebar" class="lg:min-w-[250px] w-max max-lg:min-w-8">
        <div
          id="sidebar-collapse-menu"
          class="bg-white shadow-lg h-screen fixed top-0 left-0 overflow-auto z-[99] lg:min-w-[250px] lg:w-max max-lg:w-0 max-lg:invisible transition-all duration-500"
        >
          <div class="pt-8 pb-2 px-4 sticky top-0 bg-white min-h-[80px] z-[100]">
            <based-logo />
          </div>

          <div class="py-6 px-4">
            <ul class="space-y-2">
              <li>
                <a
                  href="javascript:void(0)"
                  class="menu-item text-[#cd4425] text-sm flex items-center cursor-pointer bg-[#F8E9E9] hover:bg-[#F8E9E9] rounded-md px-3 py-3 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    class="w-[18px] h-[18px] mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M19.56 23.253H4.44a4.051 4.051 0 0 1-4.05-4.05v-9.115c0-1.317.648-2.56 1.728-3.315l7.56-5.292a4.062 4.062 0 0 1 4.644 0l7.56 5.292a4.056 4.056 0 0 1 1.728 3.315v9.115a4.051 4.051 0 0 1-4.05 4.05zM12 2.366a2.45 2.45 0 0 0-1.393.443l-7.56 5.292a2.433 2.433 0 0 0-1.037 1.987v9.115c0 1.34 1.09 2.43 2.43 2.43h15.12c1.34 0 2.43-1.09 2.43-2.43v-9.115c0-.788-.389-1.533-1.037-1.987l-7.56-5.292A2.438 2.438 0 0 0 12 2.377z"
                      data-original="#000000"
                    />
                    <path
                      d="M16.32 23.253H7.68a.816.816 0 0 1-.81-.81v-5.4c0-2.83 2.3-5.13 5.13-5.13s5.13 2.3 5.13 5.13v5.4c0 .443-.367.81-.81.81zm-7.83-1.62h7.02v-4.59c0-1.933-1.577-3.51-3.51-3.51s-3.51 1.577-3.51 3.51z"
                      data-original="#000000"
                    />
                  </svg>
                  <span class="font-bold">Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  class="menu-item text-gray-800 text-sm flex items-center cursor-pointer hover:bg-[#F8E9E9] rounded-md px-3 py-3 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    class="w-[18px] h-[18px] mr-4"
                    viewBox="0 0 64 64"
                  >
                    <path
                      d="M16.4 29.594a2.08 2.08 0 0 1 2.08-2.08h31.2a2.08 2.08 0 1 1 0 4.16h-31.2a2.08 2.08 0 0 1-2.08-2.08zm0 12.48a2.08 2.08 0 0 1 2.08-2.08h12.48a2.08 2.08 0 1 1 0 4.16H18.48a2.08 2.08 0 0 1-2.08-2.08z"
                      data-original="#000000"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M.8 18.154c0-8.041 6.519-14.56 14.56-14.56v-1.04a2.08 2.08 0 1 1 4.16 0v1.04h10.4v-1.04a2.08 2.08 0 1 1 4.16 0v1.04h10.4v-1.04a2.08 2.08 0 1 1 4.16 0v1.04c8.041 0 14.56 6.519 14.56 14.56v30.16c0 8.041-6.519 14.56-14.56 14.56H15.36C7.319 62.874.8 56.355.8 48.314zm33.28-10.4h10.4v1.04a2.08 2.08 0 1 0 4.16 0v-1.04c5.744 0 10.4 4.656 10.4 10.4v30.16c0 5.744-4.656 10.4-10.4 10.4H15.36c-5.744 0-10.4-4.656-10.4-10.4v-30.16c0-5.744 4.656-10.4 10.4-10.4v1.04a2.08 2.08 0 1 0 4.16 0v-1.04h10.4v1.04a2.08 2.08 0 1 0 4.16 0z"
                      clip-rule="evenodd"
                      data-original="#000000"
                    />
                  </svg>
                  <span>Training</span>
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  class="menu-item text-gray-800 text-sm flex items-center cursor-pointer hover:bg-[#F8E9E9] rounded-md px-3 py-3 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    class="w-[18px] h-[18px] mr-4"
                    viewBox="0 0 682.667 682.667"
                  >
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path d="M0 512h512V0H0Z" data-original="#000000" />
                      </clipPath>
                    </defs>
                    <g
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="30"
                      clip-path="url(#a)"
                      transform="matrix(1.33333 0 0 -1.33333 0 682.667)"
                    >
                      <path
                        d="M368 170.3V45c0-16.57-13.43-30-30-30H45c-16.57 0-30 13.43-30 30v422c0 16.571 13.43 30 30 30h293c16.57 0 30-13.429 30-30V261.26"
                        data-original="#000000"
                      />
                      <path
                        d="m287.253 180.508 159.099 159.099c5.858 5.858 15.355 5.858 21.213 0l25.042-25.041c5.858-5.859 5.858-15.356 0-21.214L332.508 135.253l-84.853-39.599ZM411.703 304.958l45.255-45.255M80 400h224M80 320h176M80 240h128"
                        data-original="#000000"
                      />
                    </g>
                  </svg>
                  <span>Certification</span>
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  class="menu-item text-gray-800 text-sm flex items-center cursor-pointer hover:bg-[#F8E9E9] rounded-md px-3 py-3 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    class="w-[18px] h-[18px] mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M17.933.899C16.973.82 15.78.82 14.258.82H9.742c-1.522 0-2.716 0-3.675.078-.977.08-1.784.245-2.514.618a6.382 6.382 0 0 0-2.79 2.79C.391 5.036.226 5.843.146 6.82c-.079.96-.079 2.154-.079 3.676v4.73a5.02 5.02 0 0 0 5.02 5.02h.667a.39.39 0 0 1 .363.535c-.763 1.905 1.432 3.627 3.101 2.435l2.899-2.07.055-.039a4.717 4.717 0 0 1 2.686-.861h.84c1.719 0 2.767 0 3.648-.258a6.382 6.382 0 0 0 4.329-4.329c.257-.881.257-1.929.257-3.648v-1.515c0-1.522 0-2.717-.077-3.676-.081-.976-.246-1.783-.618-2.514a6.382 6.382 0 0 0-2.79-2.79C19.717 1.145 18.91.98 17.933.9zM4.309 3c.456-.233 1.02-.37 1.893-.44.884-.073 2.01-.074 3.578-.074h4.44c1.568 0 2.694 0 3.578.073.873.071 1.437.209 1.894.44a4.717 4.717 0 0 1 2.062 2.063c.233.456.37 1.02.44 1.894.072.883.073 2.009.073 3.577v1.315c0 1.933-.008 2.721-.19 3.343a4.717 4.717 0 0 1-3.2 3.199c-.621.182-1.41.19-3.343.19h-.687a6.382 6.382 0 0 0-3.635 1.166l-2.96 2.115c-.318.226-.734-.1-.589-.462a2.055 2.055 0 0 0-1.909-2.818h-.667a3.354 3.354 0 0 1-3.355-3.354v-4.695c0-1.568 0-2.694.074-3.577.07-.874.208-1.438.44-1.894A4.717 4.717 0 0 1 4.31 3z"
                      clip-rule="evenodd"
                      data-original="#000000"
                    />
                    <path
                      d="M8.67 10.533a1.11 1.11 0 1 1-2.22 0 1.11 1.11 0 0 1 2.22 0zm4.44 0a1.11 1.11 0 1 1-2.22 0 1.11 1.11 0 0 1 2.22 0zm4.44 0a1.11 1.11 0 1 1-2.22 0 1.11 1.11 0 0 1 2.22 0z"
                      data-original="#000000"
                    />
                  </svg>
                  <span>Feedback</span>
                </a>
              </li>
              <li>
                <a
                  @click="onLogout"
                  href="javascript:void(0)"
                  class="menu-item text-gray-800 text-sm flex items-center cursor-pointer hover:bg-[#F8E9E9] rounded-md px-3 py-3 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    class="w-[18px] h-[18px] mr-3"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM111.105 429.297c8.454-72.735 70.989-128.89 144.895-128.89 38.96 0 75.598 15.179 103.156 42.734 23.281 23.285 37.965 53.687 41.742 86.152C361.641 462.172 311.094 482 256 482s-105.637-19.824-144.895-52.703zM256 269.507c-42.871 0-77.754-34.882-77.754-77.753C178.246 148.879 213.13 114 256 114s77.754 34.879 77.754 77.754c0 42.871-34.883 77.754-77.754 77.754zm170.719 134.427a175.9 175.9 0 0 0-46.352-82.004c-18.437-18.438-40.25-32.27-64.039-40.938 28.598-19.394 47.426-52.16 47.426-89.238C363.754 132.34 315.414 84 256 84s-107.754 48.34-107.754 107.754c0 37.098 18.844 69.875 47.465 89.266-21.887 7.976-42.14 20.308-59.566 36.542-25.235 23.5-42.758 53.465-50.883 86.348C50.852 364.242 30 312.512 30 256 30 131.383 131.383 30 256 30s226 101.383 226 226c0 56.523-20.86 108.266-55.281 147.934zm0 0"
                      data-original="#000000"
                    />
                  </svg>
                  <span> &nbsp; Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <button
        id="toggle-sidebar"
        class="lg:hidden w-8 h-8 z-[100] fixed top-[36px] left-[10px] cursor-pointer bg-[#007bff] flex items-center justify-center rounded-full outline-none transition-all duration-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#fff"
          class="w-3 h-3"
          viewBox="0 0 55.752 55.752"
        >
          <path
            d="M43.006 23.916a5.36 5.36 0 0 0-.912-.727L20.485 1.581a5.4 5.4 0 0 0-7.637 7.638l18.611 18.609-18.705 18.707a5.398 5.398 0 1 0 7.634 7.635l21.706-21.703a5.35 5.35 0 0 0 .912-.727 5.373 5.373 0 0 0 1.574-3.912 5.363 5.363 0 0 0-1.574-3.912z"
            data-original="#000000"
          />
        </svg>
      </button>

      <section class="main-content w-full pl-24 pr-8">
        <div class="my-2 px-2">
          <div
            class="bg-gray-800 font-poppins min-h-[350px] relative max-w-6xl mx-auto rounded overflow-hidden"
          >
            <div class="grid lg:grid-cols-2 w-full h-full absolute inset-0">
              <div class="p-4 max-lg:hidden">
                <img
                  src="https://readymadeui.com/image-1.webp"
                  class="object-cover w-full h-full"
                  alt="img"
                />
              </div>

              <div
                class="flex flex-col items-end justify-center text-right px-8 relative bg-[#262464] rounded-tl-[206px] z-20 before:absolute before:inset-0 before:!left-auto before:bg-[#293587] before:w-2/3 before:rounded-bl-[206px] before:-z-10"
              >
                <h3 class="font-bold sm:text-4xl text-2xl text-yellow-400">Level Up Your Skills</h3>
                <p class="text-sm text-gray-300 mt-4">
                  Ready to elevate your expertise? Tap some activities below or take the training
                  designed to boost your abilities and give you the competitive edge. Every skill
                  you learn is a step closer to mastering your field
                </p>
              </div>
            </div>
          </div>
          <div class="max-w-6xl mx-auto py-16 px-4">
            <div
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-md:max-w-md mx-auto"
            >
              <div
                class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all"
              >
                <div class="p-8">
                  <h3 class="text-gray-800 text-xl font-semibold mb-3">Training</h3>
                  <p class="text-gray-500 text-sm leading-relaxed">
                    Ready to dive in? Let’s get started and unlock the knowledge that will help you
                    excel in your career. You’ve got this!
                  </p>
                  <div class="mt-12"></div>
                  <button
                    type="button"
                    class="px-6 py-2 mt-8 rounded text-white text-sm tracking-wider font-medium outline-none border-2 border-red-600 bg-red-600 hover:bg-transparent hover:text-black transition-all duration-300"
                  >
                    View More
                  </button>
                </div>
              </div>

              <div
                class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all"
              >
                <div class="p-8">
                  <h3 class="text-gray-800 text-xl font-semibold mb-3">Certification</h3>
                  <p class="text-gray-500 text-sm leading-relaxed">
                    Congratulations on reaching this exciting stage! You’ve put in the effort,
                    completed the training, and now it’s time to earn your well-deserved
                    certification
                  </p>
                  <div class="mt-1"></div>
                  <button
                    type="button"
                    class="px-6 py-2 mt-8 rounded text-white text-sm tracking-wider font-medium outline-none border-2 border-red-600 bg-red-600 hover:bg-transparent hover:text-black transition-all duration-300"
                  >
                    View More
                  </button>
                </div>
              </div>

              <div
                class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all"
              >
                <div class="p-8">
                  <h3 class="text-gray-800 text-xl font-semibold mb-3">Feedback</h3>
                  <p class="text-gray-500 text-sm leading-relaxed">
                    Ready to take a closer look? Click below to view your feedback and continue your
                    journey of growth!
                  </p>
                  <div class="mt-12"></div>

                  <button
                    type="button"
                    class="px-6 py-2 mt-8 rounded text-white text-sm tracking-wider font-medium outline-none border-2 border-red-600 bg-red-600 hover:bg-transparent hover:text-black transition-all duration-300"
                  >
                    View More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
