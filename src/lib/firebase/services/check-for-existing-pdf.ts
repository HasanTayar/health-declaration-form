import { UserType, checkForExistingPDFProps } from "@/constants";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config";

export const checkForExistingPDF = async ({
  id,
}: checkForExistingPDFProps): Promise<boolean | null> => {
  try {
    const q = query(collection(db, "FormSubmissions"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking for existing PDF:", error);
    return null;
  }
};
export const getTheUserDetails = async (
  id: string
): Promise<UserType | undefined> => {
  try {
    const q = query(collection(db, "FormSubmissions"), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data() as UserType;

    return data;
  } catch (error) {
    console.error("Error retrieving user details:", error);
    return;
  }
};
