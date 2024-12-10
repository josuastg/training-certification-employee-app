import { db } from "@/firebase";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

class CourseService {

    async fetchCourses() {
        try {
            const coursesSnapshot = await getDocs(collection(db, "courses"));
            const courses = [];
            coursesSnapshot.forEach((doc) => {
                courses.push({ course_id: doc.id, ...doc.data() });
            });
            return courses;
        } catch (err) {
            console.error("Error fetching courses:", err);
            throw err;
        }
    }

    async addCourse(course) {
        try {
            // Add the course document and get the auto-generated ID
            const docRef = await addDoc(collection(db, "courses"), course);

            // Use the auto-generated ID as the course_id
            await updateDoc(doc(db, "courses", docRef.id), { course_id: docRef.id });
            return docRef.id;
        } catch (err) {
            console.error("Error adding course:", err);
            throw err;
        }
    }

    async fetchCoursesByProperty(key, value) {
        try {
            // Query the courses collection where the status matches the given status
            const q = query(collection(db, "courses"), where(`${key}`, "==", value));
            const snapshot = await getDocs(q);

            // Map the documents into an array of course objects
            const courses = [];
            snapshot.forEach((doc) => {
                courses.push({ ...doc.data() });
            });

            return courses;
        } catch (err) {
            console.error("Error fetching courses by status:", err);
            throw err;
        }
    }
}

export default new CourseService();