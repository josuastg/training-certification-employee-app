<script setup>
import { getRedirectResult, signInWithEmailAndPassword } from 'firebase/auth'
import { computed, onMounted, ref } from 'vue'
import { getAuth } from 'firebase/auth'
import router from '@/router'
import { useLoading } from 'vue-loading-overlay'
import { toast } from 'vue3-toastify'
const $loading = useLoading({
  color: '#dc2626',
})
const auth = getAuth() // only exists on client side
// display errors if any
const error = ref(null)
const email = ref('')
const password = ref('')
function signIn() {
  const loader = $loading.show()
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      router.push('/dashboard')
    })
    .catch((reason) => {
      if (reason.code === 'auth/invalid-email') {
        error.value = 'Email yang anda masukkan salah!'
      }
      if (reason.code === 'auth/invalid-credential') {
        error.value = 'Email/Password yang anda masukkan salah!'
      }
      toast(error.value, {
        theme: 'colored',
        type: 'error',
        position: 'top-center',
        closeOnClick: true,
        hideProgressBar: true,
        transition: 'bounce',
        dangerouslyHTMLString: true,
      })
    })
    .finally(() => {
      loader.hide()
    })
}

const disabledButton = computed(() => {
  return !email.value.length || !password.value.length
})

const passwordType = ref('password')
const iconType = ref('eye-slash')
function showPassword() {
  if (passwordType.value === 'password' && iconType.value === 'eye-slash') {
    passwordType.value = 'text'
    iconType.value = 'eye'
  } else {
    passwordType.value = 'password'
    iconType.value = 'eye-slash'
  }
}
</script>
<template>
  <div class="bg-gray-50 font-poppins">
    <div class="min-h-screen flex flex-col items-center justify-center py-4 px-4">
      <p class="text-gray-800 font-bold text-3xl text-center">
        Employee Training and <br />Certification Monitoring Application
      </p>
      <div class="max-w-md w-full mt-4">
        <div class="p-8 rounded-2xl bg-white shadow">
          <h2 class="text-gray-800 text-center text-2xl font-bold">Sign In</h2>
          <div class="mt-8 space-y-4">
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Email</label>
              <div class="relative flex items-center">
                <input
                  v-model="email"
                  name="email"
                  type="email"
                  required
                  class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-red-600"
                  placeholder="Masukkan email anda"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  class="w-4 h-4 absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path
                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>

            <div>
              <label class="text-gray-800 text-sm mb-2 block">Password</label>
              <div class="relative flex items-center">
                <input
                  v-model="password"
                  @keyup.enter="signIn"
                  name="password"
                  :type="passwordType"
                  required
                  class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-red-600"
                  placeholder="Masukkan password anda"
                />
                <button @click="showPassword" class="w-4 h-4 absolute right-4 cursor-pointer">
                  <svg
                    v-if="iconType === 'eye'"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    viewBox="0 0 128 128"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    viewBox="0 0 128 128"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm-6.828-8.828a4 4 0 0 1 0-5.656l24-24a4 4 0 1 1 5.656 5.656l-24 24a4 4 0 0 1-5.656 0z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  class="h-4 w-4 shrink-0 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label for="remember-me" class="ml-3 block text-sm text-gray-800">
                  Remember me
                </label>
              </div>
            </div>

            <div class="mt-8">
              <button
                :disabled="disabledButton"
                @click="!disabledButton ? signIn() : null"
                type="button"
                :class="`w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white focus:outline-none ${
                  !disabledButton
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-gray-400 cursor-not-allowed opacity-50'
                }`"
              >
                Sign in
              </button>
            </div>
            <p class="text-gray-800 text-sm !mt-8 text-center">
              Don't have an account?
              <a
                @click="$router.push('/register')"
                class="text-red-600 cursor-pointer hover:underline ml-1 whitespace-nowrap font-semibold"
                >Register here</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
