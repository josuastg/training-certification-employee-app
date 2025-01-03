import { db } from "@/firebase";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

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

    async fetchSubmissionByProperty(key, value) {
        try {
            const q = query(
                collection(db, "submission"),
                where(key, "==", value)
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