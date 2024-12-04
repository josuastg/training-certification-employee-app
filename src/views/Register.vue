<script setup>
import { auth, db } from '@/firebase'
import router from '@/router'
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { computed, reactive, ref } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import { toast } from 'vue3-toastify'
const passwordType = ref('password')
const iconType = ref('eye-slash')
const error = ref(null)

const $loading = useLoading({
  color: '#dc2626',
})
const form = reactive({
  employee_id: '',
  password: '',
  confirm_password: '',
  employee_name: '',
  employee_contact_phone: '',
  employee_email: '',
  gender: '',
})
function showPassword() {
  if (passwordType.value === 'password' && iconType.value === 'eye-slash') {
    passwordType.value = 'text'
    iconType.value = 'eye'
  } else {
    passwordType.value = 'password'
    iconType.value = 'eye-slash'
  }
}
const disabledButton = computed(() => {
  return (
    !form.employee_name.length ||
    !form.gender.length ||
    !form.employee_contact_phone.toString().length ||
    !form.confirm_password.length
  )
})
const confirmPasswordType = ref('password')
const confirmIconType = ref('eye-slash')
function showConfirmPassword() {
  if (confirmPasswordType.value === 'password' && confirmIconType.value === 'eye-slash') {
    confirmPasswordType.value = 'text'
    confirmIconType.value = 'eye'
  } else {
    confirmPasswordType.value = 'password'
    confirmIconType.value = 'eye-slash'
  }
}

async function registerEmployee() {
  const loader = $loading.show()
  try {
    // Register user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      form.employee_email,
      form.password
    )
    // Get the registered user's unique ID
    const userId = userCredential.user.uid
    // Save additional user info to Firestore
    if (userId) {
      await setDoc(doc(db, 'employee', userId), {
        employee_id: userId,
        employee_name: form.employee_name,
        employee_contact_phone: form.employee_contact_phone.toString(),
        employee_email: form.employee_email,
        gender: form.gender,
      })
      // Redirect to login after successful registration
      router.push('/')
      signOut(auth);
    }
  } catch (reason) {
    if (
      form.password.length &&
      form.confirm_password.length &&
      form.password !== form.confirm_password
    ) {
      error.value = 'Password tidak sama dengan konfirmasi password, mohon dicek kembali!'
    } else {
      if (reason.code === 'auth/invalid-email') {
        error.value = !form.employee_email.length
          ? 'Isi Email Anda ! '
          : 'Email yang anda masukkan salah!'
      }
      if (reason.code === 'auth/missing-email' && !form.employee_email.length) {
        error.value = 'Isi Email Anda !'
      }
      if (reason.code === 'auth/email-already-in-use') {
        error.value = 'Email anda sudah terdaftar, gunakan email yang lain!'
      }
      if (reason.code === 'auth/missing-password' && !form.password.length) {
        error.value = 'Anda belum memasukkan password!'
      }
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
  } finally {
    loader.hide()
  }
}
</script>
<template>
  <div class="bg-gray-50 font-poppins">
    <div class="min-h-screen flex flex-col items-center justify-center py-5 px-4">
      <p class="text-gray-800 font-bold text-3xl text-center">Register Your Account</p>
      <div class="max-w-md w-full mt-4">
        <div class="p-8 rounded-2xl bg-white shadow">
          <div class="mt-4 space-y-4">
            <form>
              <label class="text-gray-800 text-sm mb-2 block">Nama Lengkap</label>
              <div class="relative flex items-center">
                <input
                  v-model="form.employee_name"
                  name="fullname"
                  type="text"
                  required
                  class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-red-600"
                  placeholder="Masukkan nama lengkap anda"
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
            </form>
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Email</label>
              <div class="relative flex items-center">
                <input
                  v-model="form.employee_email"
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
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                    <path
                      fill="none"
                      stroke-miterlimit="10"
                      stroke-width="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <div>
              <label class="text-gray-800 text-sm mb-2 block">No. Telepon</label>
              <div class="relative flex items-center">
                <input
                  v-model="form.employee_contact_phone"
                  name="telepon"
                  type="number"
                  required
                  maxlength="15"
                  class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-red-600"
                  placeholder="Contoh : 628000000"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  class="w-5 h-5 absolute right-3"
                  viewBox="0 0 682.667 682.667"
                >
                  <path
                    d="M98.339 320.8c47.6 56.9 104.9 101.7 170.3 133.4 24.9 11.8 58.2 25.8 95.3 28.2 2.3.1 4.5.2 6.8.2 24.9 0 44.9-8.6 61.2-26.3.1-.1.3-.3.4-.5 5.8-7 12.4-13.3 19.3-20 4.7-4.5 9.5-9.2 14.1-14 21.3-22.2 21.3-50.4-.2-71.9l-60.1-60.1c-10.2-10.6-22.4-16.2-35.2-16.2-12.8 0-25.1 5.6-35.6 16.1l-35.8 35.8c-3.3-1.9-6.7-3.6-9.9-5.2-4-2-7.7-3.9-11-6-32.6-20.7-62.2-47.7-90.5-82.4-14.3-18.1-23.9-33.3-30.6-48.8 9.4-8.5 18.2-17.4 26.7-26.1 3-3.1 6.1-6.2 9.2-9.3 10.8-10.8 16.6-23.3 16.6-36s-5.7-25.2-16.6-36l-29.8-29.8c-3.5-3.5-6.8-6.9-10.2-10.4-6.6-6.8-13.5-13.8-20.3-20.1-10.3-10.1-22.4-15.4-35.2-15.4-12.7 0-24.9 5.3-35.6 15.5l-37.4 37.4c-13.6 13.6-21.3 30.1-22.9 49.2-1.9 23.9 2.5 49.3 13.9 80 17.5 47.5 43.9 91.6 83.1 138.7zm-72.6-216.6c1.2-13.3 6.3-24.4 15.9-34l37.2-37.2c5.8-5.6 12.2-8.5 18.4-8.5 6.1 0 12.3 2.9 18 8.7 6.7 6.2 13 12.7 19.8 19.6 3.4 3.5 6.9 7 10.4 10.6l29.8 29.8c6.2 6.2 9.4 12.5 9.4 18.7s-3.2 12.5-9.4 18.7c-3.1 3.1-6.2 6.3-9.3 9.4-9.3 9.4-18 18.3-27.6 26.8l-.5.5c-8.3 8.3-7 16.2-5 22.2.1.3.2.5.3.8 7.7 18.5 18.4 36.1 35.1 57.1 30 37 61.6 65.7 96.4 87.8 4.3 2.8 8.9 5 13.2 7.2 4 2 7.7 3.9 11 6 .4.2.7.4 1.1.6 3.3 1.7 6.5 2.5 9.7 2.5 8 0 13.2-5.1 14.9-6.8l37.4-37.4c5.8-5.8 12.1-8.9 18.3-8.9 7.6 0 13.8 4.7 17.7 8.9l60.3 60.2c12 12 11.9 25-.3 37.7-4.2 4.5-8.6 8.8-13.3 13.3-7 6.8-14.3 13.8-20.9 21.7-11.5 12.4-25.2 18.2-42.9 18.2-1.7 0-3.5-.1-5.2-.2-32.8-2.1-63.3-14.9-86.2-25.8-62.2-30.1-116.8-72.8-162.1-127-37.3-44.9-62.4-86.7-79-131.5-10.3-27.5-14.2-49.6-12.6-69.7z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>

            <div>
              <label class="text-gray-800 text-sm mb-2 block">Password</label>
              <div class="relative flex items-center">
                <input
                  v-model="form.password"
                  name="password"
                  :type="passwordType"
                  required
                  class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-red-600"
                  placeholder="Masukan password anda"
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

            <div>
              <label class="text-gray-800 text-sm mb-2 block">Confirm Password</label>
              <div class="relative flex items-center">
                <input
                  v-model="form.confirm_password"
                  name="confirm_password"
                  :type="confirmPasswordType"
                  required
                  class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-red-600"
                  placeholder="Masukan konfirmasi password anda"
                />
                <button
                  @click="showConfirmPassword"
                  class="w-4 h-4 absolute right-4 cursor-pointer"
                >
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
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Jenis Kelamin</label>
              <div class="relative flex items-center">
                <v-select
                  v-model="form.gender"
                  :options="['Pria', 'Wanita']"
                  class="w-full"
                  placeholder="Pilih jenis kelamin anda"
                ></v-select>
              </div>
            </div>

            <div class="!mt-8">
              <button
                :disabled="disabledButton"
                @click="!disabledButton ? registerEmployee() : null"
                type="button"
                :class="`w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white focus:outline-none ${
                  !disabledButton
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-gray-400 cursor-not-allowed opacity-50'
                }`"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
