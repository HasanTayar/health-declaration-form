import { useEffect, useRef, useState } from "react";
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
  const [loading, setLoading] = useState(true);

  const saveFunctionCalled = useRef(false);

  useEffect(() => {
    if (state && !saveFunctionCalled.current) {
      setLoading(true);
      saveFunctionCalled.current = true;
      const transformedState = transformFormData(state as FormData);
      savingPdfToDataBase(transformedState)
        .then(() => setLoading(false))
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [state]);
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-red-50">
        <h2 className="text-xl md:text-2xl font-semibold text-center mb-4">
          הטופס שלכה בתהליך שמירה, כמה רגעים...
        </h2>

        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </div>
    );
  }
  const twoYearsLater = new Date();
  twoYearsLater.setFullYear(twoYearsLater.getFullYear() + 2);
  const validUntil = twoYearsLater.toLocaleDateString("he-IL");

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
        <footer className="flex items-center justify-center rounded-full">
          <a
            href="https://www.quantumpinnaclematrix.tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/poweredByQPM.svg"
              alt="Powered by QPM"
              className="w-32 md:w-48 hover:scale-105 transition-transform"
            />
          </a>
        </footer>
      </div>
    </div>
  );
};

export default DonePage;
