import React, { useEffect } from "react";
import success from "/assets/success.gif";
import { savingPdfToDataBase } from "@/lib/firebase/services/saving-pdf-file";
import { useFormState } from "@/context/form-state";

interface FormData {
  [key: string]: string | boolean;
  Signature: string;
}

const transformFormData = (formData: FormData): FormData => {
  const transformedData: FormData = {
    Signature: "",
  };

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

  // Calculate the date two years from now
  const twoYearsLater = new Date();
  twoYearsLater.setFullYear(twoYearsLater.getFullYear() + 2);
  const validUntil = twoYearsLater.toLocaleDateString("he-IL"); // Format the date in Hebrew locale

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-red-50">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden mx-4 md:mx-auto md:max-w-lg lg:max-w-xl">
        <div className="p-4">
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-4">
            <img
              src="/assets/logo.jpg"
              alt="Logo"
              className="object-contain mx-auto"
            />
            שלום {state.first_name} הטופה שלכה התקבל בהצליה
          </h2>
          <img src={success} alt="Success" className="mx-auto w-20 h-20" />
          <p className="text-center mt-4 text-sm md:text-base">
            הטופס שלכה תקף עד {validUntil} עם ת.ז: {state.ID}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonePage;
