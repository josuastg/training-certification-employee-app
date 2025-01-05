<script setup>
import BasedLogo from '@/components/BasedLogo.vue'
import MyIcon from '@/components/icon/index.vue'
import router from '@/router'
import { computed, ref } from 'vue'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import { useProfileStore } from '@/stores/profile'
import initialName from '@/misc/InitialName'
import ellipsisString from '@/misc/EllipsisString'
import normalizePhoneNumber from '@/misc/NormalizePhoneNumber'
import feedback from '@/service/feedback'

const store = useProfileStore()
const dialogLogout = ref(false)
async function onLogout() {
  await signOut(auth)
  sessionStorage.removeItem('user_role_permission');
  router.push('/')
}
const routes = computed(() => {
  let resp = [...router.options.routes[2].children]

  const filterAllEnable = resp.filter(
    (key) => key.permission === 'all_enable' || key.permission === store.profile.role_name
  )
  resp = filterAllEnable
  return resp
})

const onClick = (path) => {
  router.push(path)
}
const initial = computed(() => {
  return initialName(store.profile.employee_name)
})

const onEllipsisString = (name, long) => {
  return ellipsisString(name, long)
}

const OnNormalizePhoneNumber = (phoneNumber) => {
  return normalizePhoneNumber(phoneNumber)
}
</script>
<template>
  <div>
    <nav id="sidebar" class="lg:min-w-[250px] w-max max-lg:min-w-8 font-poppins">
      <div
        id="sidebar-collapse-menu"
        class="bg-white shadow-lg h-screen fixed top-0 left-0 overflow-hidden z-[99] lg:min-w-[250px] lg:w-max max-lg:w-0 max-lg:invisible transition-all duration-500"
      >
        <div class="pt-6 pb-2 px-4 sticky top-0 bg-white min-h-[80px] z-[100]">
          <based-logo />
        </div>

        <div class="grow h-full">
          <div class="py-6 px-4">
            <ul class="space-y-2">
              <li v-for="route in routes" :key="route">
                <a
                  v-if="route.showOnSidebar"
                  @click="onClick(route.path)"
                  :class="`menu-item ${
                    route.path.includes($route.fullPath.split('/')[1])
                      ? ' text-[#dc2626] bg-[#F8E9E9] '
                      : 'text-gray-800'
                  }text-sm flex items-center cursor-pointer hover:bg-[#F8E9E9] hover:text-[#dc2626] rounded-md px-3 py-3 transition-all duration-300`"
                >
                  <MyIcon :iconName="route.name" />
                  <span
                    :class="route.path.includes($route.fullPath.split('/')[1]) ? 'font-bold' : ''"
                    >{{ route.name?.toUpperCase() }}</span
                  >
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          v-if="!store.isLoadingProfile"
          class="sticky bottom-0 min-h-[80px] z-[100] border-t cursor-pointer"
        >
          <ul class="px-4 space-y-2 hover:bg-[#F8E9E9]">
            <li>
              <a
                @click="dialogLogout = true"
                class="menu-item text-gray-800 text-sm flex items-center cursor-pointer hover:bg-[#F8E9E9] hover:text-[#dc2626] rounded-md px-3 py-3"
              >
                <MyIcon iconName="logout" />
                <span>LOGOUT</span>
              </a>
            </li>
          </ul>
          <div
            class="p-4 flex flex-row items-center hover:bg-[#F8E9E9]"
            :class="'/profile' === $route.fullPath ? 'bg-[#F8E9E9]' : ''"
            @click="onClick('/profile')"
          >
            <div class="flex flex-row items-start">
              <div class="flex">
                <div
                  :style="`background: ${initial.color}`"
                  :class="`mr-2 w-12 h-12 font-medium text-lg tracking-wider flex flex-col items-center justify-center text-white rounded-full relative`"
                >
                  <div
                    class="border-white absolute bottom-0 right-0"
                    style="width: 10px; height: 10px"
                  />
                  <span class="text-14px xxl:text-16px"> {{ initial.initial }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-col text-left">
              <div
                class="font-medium text-14px xxl:text-16px capitalize"
                :class="'/profile' === $route.fullPath ? 'text-[#dc2626]' : 'text-gray-800'"
              >
                {{ onEllipsisString(store.profile.employee_name, 17) }}
              </div>

              <div class="font-normal text-12px text-gray-500">
                {{ OnNormalizePhoneNumber(store.profile.employee_contact_phone) }}
              </div>
              <div class="font-normal text-12px text-gray-500">
                {{ onEllipsisString(store.profile.employee_email, 20) }}
              </div>
            </div>
          </div>
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
    <v-dialog
      v-model="dialogLogout"
      max-width="400"
      transition="dialog-bottom-transition"
      class="font-poppins"
    >
      <v-card
        prepend-icon="mdi-exit-to-app"
        text="Pastikan semuanya sudah selesai sebelum keluar."
        title="Yakin Ingin Keluar?"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="dialogLogout = false"> Tidak </v-btn>

          <v-btn @click="onLogout()"> Ya </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>