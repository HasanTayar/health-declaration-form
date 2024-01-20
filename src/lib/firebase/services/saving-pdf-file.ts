import { PDFDocument, PDFTextField, PDFCheckBox } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { storage, db } from "../config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";

interface FormData {
  [key: string]: string | boolean;
  Signature: string;
}

const processFormData = (
  formData: FormData
): { [key: string]: string | boolean } => {
  const processedData: { [key: string]: string | boolean } = {};
  for (const key of Object.keys(formData)) {
    const value = formData[key];
    if (key.startsWith("Q") && (key.endsWith("YES") || key.endsWith("NO"))) {
      processedData[key] = value === "כן" ? "Yes" : value === "לא" ? "No" : "";
    } else {
      processedData[key] = value;
    }
  }
  return processedData;
};

export const savingPdfToDataBase = async (
  formData: FormData
): Promise<void> => {
  try {
    const originalPdfFile = await fetch("/assets/1303.pdf").then((res) =>
      res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(originalPdfFile);
    pdfDoc.registerFontkit(fontkit);

    const fontBytes = await fetch("/assets/Rubik-Regular.ttf").then((res) =>
      res.arrayBuffer()
    );
    const customFont = await pdfDoc.embedFont(fontBytes);

    const pdfForm = pdfDoc.getForm();
    const rawUpdateFieldAppearances =
      pdfForm.updateFieldAppearances.bind(pdfForm);
    pdfForm.updateFieldAppearances = function () {
      return rawUpdateFieldAppearances(customFont);
    };

    const dateField = pdfForm.getTextField("Date");
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`;
    dateField.setText(formattedDate);

    // Add two years to the current date
    const expiryDate = new Date(currentDate);
    expiryDate.setFullYear(expiryDate.getFullYear() + 2);

    // Format the expiry date as a string
    const formattedExpiryDate = `${expiryDate.getDate()}-${
      expiryDate.getMonth() + 1
    }-${expiryDate.getFullYear()}`;

    const processedFormData = processFormData(formData);
    for (const fieldName of Object.keys(processedFormData)) {
      if (fieldName !== "Signature") {
        const field = pdfForm.getField(fieldName);
        if (field instanceof PDFTextField || field instanceof PDFCheckBox) {
          const value = processedFormData[fieldName];
          if (field instanceof PDFTextField) {
            field.defaultUpdateAppearances(customFont);
            field.setText(value as string);
          } else {
            const booleanValue = value === "Yes";
            booleanValue ? field.check() : field.uncheck();
          }
        }
      }
    }

    if (formData.Signature) {
      const signatureImage = await pdfDoc.embedPng(formData.Signature);
      const signatureFieldPosition = {
        x: 55.6344,
        y: 280.9696,
        width: 85.1976,
        height: 33.7424,
      };
      const page = pdfDoc.getPage(1);
      page.drawImage(signatureImage, {
        x: signatureFieldPosition.x,
        y: signatureFieldPosition.y - signatureFieldPosition.height,
        width: signatureFieldPosition.width,
        height: signatureFieldPosition.height,
      });
    }

    pdfForm.flatten();

    const pdfBytes = await pdfDoc.save();
    const pdfFileName = `${formData.ID}-${formattedDate}.pdf`;
    const pdfRef = ref(storage, `pdfs/${pdfFileName}`);
    await uploadBytes(pdfRef, pdfBytes);
    const downloadUrl = await getDownloadURL(pdfRef);
    await addDoc(collection(db, "FormSubmissions"), {
      id: formData.ID,
      firstName: formData.first_name,
      secondName: formData.second_name,
      submissionDate: formattedDate,
      pdfDownloadUrl: downloadUrl,
      expiredAt: formattedExpiryDate,
    });
  } catch (error) {
    console.error("Error processing PDF:", error);
  }
};
