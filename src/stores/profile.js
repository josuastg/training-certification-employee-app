import { defineStore } from 'pinia'
import { useLoading } from 'vue-loading-overlay'
import { toast } from 'vue3-toastify'
import getUserProfile from '@/service/profile'
import { ref } from 'vue'
import router from '@/router'
export const useProfileStore = defineStore('profile', () => {
    let profile = ref({
        gender: '',
        employee_id: '',
        employee_email: '',
        employee_contact_phone: '',
        employee_name: '',
        role_name: '',
    })
    const $loading = useLoading({
        color: '#dc2626',
    })
    let isLoadingProfile = ref(false);

    async function fetchProfile(userId, isFromLogin = false) {
        const loader = $loading.show()
        isLoadingProfile.value = true
        try {
            profile.value = await getUserProfile(userId)
            if (isFromLogin) {
                if (profile.value.role_name === 'employee') {
                    router.push('/dashboard')
                } else {
                    router.push('/course')
                }
            }
        } catch (err) {
            profile.value = {
                gender: '',
                employee_id: '',
                employee_email: '',
                employee_contact_phone: '',
                employee_name: '',
                role_name: '',
            }
            toast('Terjadi error saat get profile!!!', {
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
            isLoadingProfile.value = false
        }
    }

    return { profile, fetchProfile, isLoadingProfile }
})
