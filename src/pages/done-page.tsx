import React, { useEffect } from "react";
import success from "/assets/success.svg";
import { savingPdfToDataBase } from "@/lib/firebase/services/saving-pdf-file";
import { useFormState } from "@/context/form-state";

interface FormData {
  [key: string]: string | boolean;
}

// Helper function to transform form data
const transformFormData = (formData: FormData): FormData => {
  console.log("Original data:", formData); // Log at the start

  const transformedData: FormData = {};
  Object.keys(formData).forEach((key) => {
    if (formData[key] === "כן") {
      transformedData[`${key}-YES`] = "כן";
      transformedData[`${key}-NO`] = "לא";
    } else if (formData[key] === "לא") {
      transformedData[`${key}-YES`] = "לא";
      transformedData[`${key}-NO`] = "כן";
    } else if (formData[key] === "לא-בהריון") {
      transformedData[`${key}-YES`] = "לא";
      transformedData[`${key}-NO`] = "לא";
    } else {
      transformedData[key] = formData[key];
    }
  });

  console.log("Transformed data:", transformedData); // Log at the end
  return transformedData;
};

const DonePage = () => {
  const { state } = useFormState();

  useEffect(() => {
    if (state) {
      const transformedState = transformFormData(state as FormData);
      savingPdfToDataBase(transformedState).catch(console.error);
    }
  }, [state]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-red-50">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden mx-4 md:mx-auto">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-center mb-4">
            <img
              src="/assets/logo.jpg"
              alt="Logo"
              className="object-contain mx-auto"
            />
            הטופה שלכה התקבל בהצליה
          </h2>
          <img src={success} alt="Success" />
        </div>
      </div>
    </div>
  );
};

export default DonePage;
