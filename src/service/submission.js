import { db } from "@/firebase";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";

class SubmissionService {
    async addSubmission(submission) {
        try {
            const docRef = await addDoc(collection(db, "submission"), submission);

            await updateDoc(doc(db, "submission", docRef.id), { submission_id: docRef.id });
            return docRef.id;
        } catch (err) {
            console.error("Error adding submission:", err);
            throw err;
        }
    }

    async updateSubmission(submissionId, payload) {
        try {
            await updateDoc(doc(db, "submission", submissionId), { ...payload });
            return true;
        } catch (err) {
            console.error("Error update submission:", err);
            throw err;
        }
    }

    async fetchSubmissionByProperty(key, value, employeId = '') {
        const auth = getAuth();
        try {
            const q = query(
                collection(db, "submission"),
                where(key, "==", value),
                where('employee_id', "==", employeId ? employeId : auth.currentUser.uid)
            );

            const snapshot = await getDocs(q);

            // Map the documents into an array of course objects
            const submissions = [];
            for (const submissionDoc of snapshot.docs) {
                const submissionData = submissionDoc.data();

                // Fetch course data for the associated course_id
                const courseDocRef = doc(db, "courses", submissionData.course_id);
                const courseDoc = await getDoc(courseDocRef);

                const courseData = courseDoc.exists() ? courseDoc.data() : null;

                // Combine enrollment data with course data
                submissions.push({
                    id: submissionDoc.id,
                    ...submissionData,
                    course: courseData, // Add course data here
                });
            }

            return { result: true, resp: submissions };
        } catch (err) {
            console.error("Error fetching submissions by status:", err);
            throw err;
        }
    }

    async fetchAllSubmission() {
        try {
            const q = query(
                collection(db, "submission"),
                where('status', "in", ['LULUS', 'TIDAK_LULUS', ''])

            );

            const snapshot = await getDocs(q);

            // Map the documents into an array of course objects
            const submissions = [];
            snapshot.forEach((doc) => {
                submissions.push({ ...doc.data() });
            });

            return { result: true, resp: submissions };
        } catch (err) {
            console.error("Error fetching submissions by status:", err);
            throw err;
        }
    }
}

export default new SubmissionService();