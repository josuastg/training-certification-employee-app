import { db } from "@/firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";

class CourseService {

    async fetchCourses() {
        try {
            // Create a query to order courses by created_at in descending order
            const coursesQuery = query(collection(db, "courses"), orderBy("created_at", "desc"));
            const coursesSnapshot = await getDocs(coursesQuery);
            const courses = [];

            // Process the snapshot to extract course data
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


    async updateCourse(courseId, payload) {
        try {
            // Use the auto-generated ID as the course_id
            await updateDoc(doc(db, "courses", courseId), { ...payload });
            return true;
        } catch (err) {
            console.error("Error update course:", err);
            throw err;
        }
    }

    async updateStatusCourse(courseId, status) {
        try {
            // Use the auto-generated ID as the course_id
            await updateDoc(doc(db, "courses", courseId), { status });
            return true;
        } catch (err) {
            console.error("Error adding course:", err);
            throw err;
        }
    }

    async fetchCoursesByProperty(key, value) {
        try {
            const q = query(
                collection(db, "courses"),
                where(key, "==", value),
                orderBy("created_at", "desc")
            );

            const snapshot = await getDocs(q);

            // Map the documents into an array of course objects
            const courses = [];
            snapshot.forEach((doc) => {
                courses.push({ course_id: doc.id, ...doc.data() });
            });

            return courses;
        } catch (err) {
            console.error("Error fetching courses by status:", err);
            throw err;
        }
    }

    async deleteCourseById(courseId) {
        try {
            // Find the course document with the matching course_id
            const coursesRef = collection(db, "courses");
            const q = query(coursesRef, where("course_id", "==", courseId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                querySnapshot.forEach(async (docSnapshot) => {
                    // Delete the course document
                    await deleteDoc(doc(db, "courses", docSnapshot.id));
                });

                return { success: true, message: "Course deleted successfully." };
            } else {
                console.error(`No course found with ID ${courseId}.`);
                return { success: false, message: "Course not found." };
            }
        } catch (error) {
            console.error("Error deleting course:", error);
            return { success: false, message: error.message };
        }
    }
}

export default new CourseService();