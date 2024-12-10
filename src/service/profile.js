import { db } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'
async function getUserProfile(userId) {
    const docRef = doc(db, 'employee', userId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        throw new Error('No such document!')
    }
}

export default getUserProfile;