import { db } from "@/firebase";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

class FeedbackService {
    async addFeedback(feedback) {
        try {
            // Add the feedback document and get the auto-generated ID
            const docRef = await addDoc(collection(db, "feedback"), feedback);

            // Use the auto-generated ID as the course_id
            await updateDoc(doc(db, "feedback", docRef.id), { evaluation_id: docRef.id });
            return docRef.id;
        } catch (err) {
            console.error("Error adding feedback:", err);
            throw err;
        }
    }

    async fetchAllFeedback(key = '', value) {
        try {
            let q = '';
            if (!key) {
                q = query(
                    collection(db, "feedback")
                );
            } else {
                q = query(
                    collection(db, "feedback"),
                    where(key, "==", value)
                );
            }

            const snapshot = await getDocs(q);
            const feedback = [];

            snapshot.forEach((doc) => {
                feedback.push({ ...doc.data() })
            })
            return { result: true, resp: feedback };
        } catch (err) {
            console.error("Error fetching feedback by status:", err);
            throw err;
        }
    }
}

export default new FeedbackService();
