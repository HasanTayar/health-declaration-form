import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../config";
import { FormSubmission } from "@/constants";

export const getAllFormSubmissions = async (): Promise<
  FormSubmission[] | null
> => {
  try {
    const q = query(collection(db, "FormSubmissions"));
    const querySnapshot = await getDocs(q);
    const submissions: FormSubmission[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as FormSubmission;
      return {
        ...data,
        doc_id: doc.id,
      };
    });
    return submissions;
  } catch (error) {
    console.error("Error retrieving form submissions:", error);
    return null;
  }
};
