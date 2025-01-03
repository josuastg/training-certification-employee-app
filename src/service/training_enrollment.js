import { db } from "@/firebase";
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";

class TrainingEnrollmentService {
    async joinCourse(courseId, employeeId, status = 'IN_PROGRESS') {
        try {

            // Add new document
            const docRef = await addDoc(collection(db, "training_enrollment"), {
                employee_id: employeeId,
                course_id: courseId,
                training_enrollment_status: status,
                created_at: serverTimestamp(),
            });

            await updateDoc(doc(db, "training_enrollment", docRef.id), { training_enrollment_id: docRef.id });
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error("Error adding training enrollment:", error);
            return { success: false, message: error.message };
        }
    }

    async fetchTrainingEnrollment(value, status = 'IN_PROGRESS', key = 'employee_id', isNeedStatus = true) {
        try {
            // Create a query to order courses by created_at in descending order
            let trainingEnrollmentQuery = '';
            if (isNeedStatus) {
                trainingEnrollmentQuery = query(collection(db, "training_enrollment"), where(key, "==", value), where("training_enrollment_status", "==", status)
                    , orderBy("created_at", "desc"));
            } else {
                trainingEnrollmentQuery = query(collection(db, "training_enrollment"), where(key, "==", value)
                    , orderBy("created_at", "desc"));
            }
            const trainingEnrollmentSnapshot = await getDocs(trainingEnrollmentQuery);
            const trainingEnrollment = [];
            for (const enrollmentDoc of trainingEnrollmentSnapshot.docs) {
                const enrollmentData = enrollmentDoc.data();

                // Fetch course data for the associated course_id
                const courseDocRef = doc(db, "courses", enrollmentData.course_id);
                const courseDoc = await getDoc(courseDocRef);

                const courseData = courseDoc.exists() ? courseDoc.data() : null;

                // Combine enrollment data with course data
                trainingEnrollment.push({
                    id: enrollmentDoc.id,
                    ...enrollmentData,
                    course: courseData, // Add course data here
                });
            }
            return trainingEnrollment;
        } catch (err) {
            console.error("Error fetching trainingEnrollment:", err);
            throw err;
        }
    }


    async updateTrainingEnrollment(enrollmentId, payload) {
        try {
            // Use the auto-generated ID as the course_id
            await updateDoc(doc(db, "training_enrollment", enrollmentId), { ...payload });
            return true;
        } catch (err) {
            console.error("Error update training enrollment:", err);
            throw err;
        }
    }
}

export default new TrainingEnrollmentService();