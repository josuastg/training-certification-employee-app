<script setup>
import BasedLogo from '@/components/BasedLogo.vue'
import SidebarIcon from '@/components/sidebar-icon/index.vue'
import router from '@/router'
import { computed } from 'vue'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'

async function onLogout() {
  await signOut(auth)
  router.push('/')
}
const routes = computed(() => {
  return [
    ...router.options.routes[2].children,
    {
      name: 'logout',
    },
  ]
})
const isActive = (name) => {
  return router.options.routes[2].children.currentRoute.includes(name)
}

const onClick = (path) => {
  router.push(path)
}
</script>
<template>
  <div>
    <nav id="sidebar" class="lg:min-w-[250px] w-max max-lg:min-w-8 font-poppins">
      <div
        id="sidebar-collapse-menu"
        class="bg-white shadow-lg h-screen fixed top-0 left-0 overflow-auto z-[99] lg:min-w-[250px] lg:w-max max-lg:w-0 max-lg:invisible transition-all duration-500"
      >
        <div class="pt-8 pb-2 px-4 sticky top-0 bg-white min-h-[80px] z-[100]">
          <based-logo />
        </div>

        <div class="py-6 px-4">
          <ul class="space-y-2">
            <li v-for="route in routes" :key="route">
              <a
                @click="route.name === 'logout' ? onLogout() : onClick(route.path)"
                href="javascript:void(0)"
                :class="`menu-item ${
                  route.path === $route.fullPath ? ' bg-[#F8E9E9] text-[#cd4425] ' : 'text-gray-800'
                }text-sm flex items-center cursor-pointer hover:bg-[#F8E9E9] hover:text-[#cd4425] rounded-md px-3 py-3 transition-all duration-300`"
              >
                <SidebarIcon :iconName="route.name" />
                <span :class="route.path === $route.fullPath ? 'font-bold' : ''">{{
                  route.name?.toUpperCase()
                }}</span>
              </a>
            </li>
            <!-- <li>
              <a
                href="javascript:void(0)"
                class="menu-item text-gray-800 text-sm flex items-center cursor-pointer hover:bg-[#F8E9E9] rounded-md px-3 py-3 transition-all duration-300"
              >
                <span>Training</span>
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                class="menu-item text-gray-800 text-sm flex items-center cursor-pointer hover:bg-[#F8E9E9] rounded-md px-3 py-3 transition-all duration-300"
              >
                <span>Certification</span>
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                class="menu-item text-gray-800 text-sm flex items-center cursor-pointer hover:bg-[#F8E9E9] rounded-md px-3 py-3 transition-all duration-300"
              >
                <span>Feedback</span>
              </a>
            </li>
            <li>
              <a
                @click="onLogout"
                href="javascript:void(0)"
                class="menu-item text-gray-800 text-sm flex items-center cursor-pointer hover:bg-[#F8E9E9] rounded-md px-3 py-3 transition-all duration-300"
              >
                <span> &nbsp; Logout</span>
              </a>
            </li> -->
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
  </div>
</template>