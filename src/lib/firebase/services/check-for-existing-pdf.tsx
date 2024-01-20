import { checkForExistingPDFProps } from "@/constants";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config";

export const checkForExistingPDF = async ({
  id,
}: checkForExistingPDFProps): Promise<boolean | null> => {
  try {
    const q = query(
      collection(db, "FormSubmissions"),
      where("customer_id", "==", id)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking for existing PDF:", error);
    return null;
  }
};
