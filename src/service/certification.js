import { db } from "@/firebase";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";

class CertificationService {

    async addCertification(certification) {
        try {
            // Add the certification document and get the auto-generated ID
            const docRef = await addDoc(collection(db, "certification"), certification);

            // Use the auto-generated ID as the certification_id
            await updateDoc(doc(db, "certification", docRef.id), { certification_id: docRef.id });
            return docRef.id;
        } catch (err) {
            console.error("Error adding certification:", err);
            throw err;
        }
    }

    async fetchAllSubmission(key = '', value) {
        try {
            let q = '';
            if (!key) {
                q = query(
                    collection(db, "certification")
                );
            } else {
                q = query(
                    collection(db, "certification"),
                    where(key, "==", value)
                );
            }

            const snapshot = await getDocs(q);

            // Map the documents into an array of course objects
            const certification = [];
            for (const certificationDoc of snapshot.docs) {
                const certificationData = certificationDoc.data();

                const employeeDocRef = doc(db, "employee", certificationData.employee_id);
                const employeeDoc = await getDoc(employeeDocRef);

                const employeeData = employeeDoc.exists() ? employeeDoc.data() : null;
                certification.push({
                    ...certificationData,
                    employee: employeeData
                })
            }

            return { result: true, resp: certification };
        } catch (err) {
            console.error("Error fetching certification by status:", err);
            throw err;
        }
    }
}
export default new CertificationService();