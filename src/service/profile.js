import { db } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'
async function getUserProfile(userId) {
    try {
        // Fetch user by user_id
        const userRef = doc(db, "employee", userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            throw new Error("User not found");
        }

        const userData = userSnap.data();

        // Fetch the role by role_id
        const roleRef = doc(db, "roles", userData.role_id);
        const roleSnap = await getDoc(roleRef);

        const roleData = roleSnap.exists() ? roleSnap.data() : { role_name: "Unknown" };

        // Combine user data with role
        return {
            ...userData,
            role_name: roleData.role_name,
        };
    } catch (error) {
        console.error("Error fetching user profile with role:", error);
        throw error;
    }
}

export default getUserProfile;