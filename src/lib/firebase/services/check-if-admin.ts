import { AdminType } from "@/constants";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config";

export const checkIfAdmin = async (
  id: string
): Promise<AdminType | undefined> => {
  try {
    const q = query(collection(db, "Admins"), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data() as AdminType;

    // Save to local storage
    localStorage.setItem("preAdminData", JSON.stringify(data));

    return data;
  } catch (error) {
    console.error("Error retrieving user details:", error);
    return;
  }
};
