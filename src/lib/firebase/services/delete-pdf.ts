import { getStorage, ref, deleteObject } from "firebase/storage";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config";

const deletePDF = async (pdfDownloadUrl: string) => {
  try {
    const storage = getStorage();
    const pdfRef = ref(storage, pdfDownloadUrl);
    await deleteObject(pdfRef);

    const formSubmissionsCollection = collection(db, "FormSubmissions");
    const q = query(
      formSubmissionsCollection,
      where("pdfDownloadUrl", "==", pdfDownloadUrl)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      window.location.reload();
    } else {
      console.error("No matching document found in Firestore.");
    }

    console.log("PDF file deleted successfully.");
  } catch (error) {
    console.error("Error deleting PDF:", error);
  }
};

export default deletePDF;
