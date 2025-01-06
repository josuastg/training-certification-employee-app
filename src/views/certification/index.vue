<script setup>
import { onBeforeMount, ref } from 'vue'
import MyIcon from '@/components/icon/index.vue'
import generatePDF from './pdf/index'
import { useLoading } from 'vue-loading-overlay'
import CertificationService from '@/service/certification'
import { useProfileStore } from '@/stores/profile'
import { getAuth } from 'firebase/auth'
const $loading = useLoading({
  color: '#dc2626',
})
const store = useProfileStore()

const certifications = ref([])

const onPrintPDF = async (item) => {
  const loader = $loading.show()
  generatePDF({ ...item, employee_name: item.employee.employee_name })
  loader.hide()
}

const onGetCertifcate = async () => {
  const loader = $loading.show()
  try {
    const resp = await CertificationService.fetchAllSubmission(
      store.profile.role_name === 'admin' ? '' : 'employee_id',
      store.profile.role_name === 'admin' ? '' : store.profile.employee_id
    )
    if (resp.result) {
      certifications.value = resp.resp
    }
  } catch (error) {
    toast('Terjadi error saat get all certification!!!', {
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
const auth = getAuth()

onBeforeMount(async () => {
  await store.fetchProfile(auth.currentUser.uid)
  onGetCertifcate()
})
</script>
<template>
  <div class="font-poppins">
    <div class="mb-4">
      <p class="text-gray-800 text-xl font-semibold mb-1">
        Daftar Sertifikat {{ store.profile.role_name === 'admin' ? 'Karyawan' : 'Anda' }}
      </p>
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
            <th class="text-left">Employee Name</th>
            <th class="text-left">Institution Name</th>
            <th class="text-left">Certification Date</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in certifications" :key="item.name">
            <td>{{ item.certification_id }}</td>
            <td class="w-1/4">{{ item.certification_name }}</td>
            <td>{{ item.employee.employee_name }}</td>
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