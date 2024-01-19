import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import * as z from "zod";
import { formSchema } from "./lib/schema/formSchema";
import fontkit from "@pdf-lib/fontkit"; // Import fontkit
import LandingPage from "./pages/landing-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormPage from "./pages/form-page";
import DetailsFrom from "./components/Forms/details-from";
import IdForm from "./components/Forms/id-form";
import { FormProvider } from "./context/form-state";
import YesNoQuestion from "./components/Forms/yes-no-question-form";

const App: React.FC = () => {
  // const [formData, setFormData] = useState({
  //   firstName: '',
  //   secondName: '',
  //   ID: '',
  //   Age: '',
  //   Q1: false,
  //   Q2: false,
  //   Q3: false,
  //   Q4: false,
  //   Q5: false,
  //   Q6: false,
  //   Q7: false,
  //   Q8: false,
  //   Q9: false,
  //   Q10: false,
  //   Q11: false,
  //   Q12: false,
  //   Q13: false,
  //   Q14: false,

  //   date: new Date().toISOString().split('T')[0],
  // });
  // const [signature, setSignature] = useState('');

  // // Function to handle signature capture
  // const captureSignature = () => {
  //   const canvas = document.getElementById('signatureCanvas') as HTMLCanvasElement;
  //   setSignature(canvas.toDataURL('image/png'));
  // };

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value, type, checked } = event.target;
  //   setFormData(prevFormData => ({
  //     ...prevFormData,
  //     [name]: type === 'checkbox' ? checked : value,
  //   }));
  // };

  // const handleFormSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();

  //   // Prepare data for validation
  //   const validatedData = {
  //     ...formData,
  //     ID: formData.ID ? parseInt(formData.ID, 10) : null,
  //     Age: formData.Age ? parseInt(formData.Age, 10) : null,
  //     date: formData.date ? new Date(formData.date) : null,
  //   };

  //   // Validate using Zod
  //   try {
  //     formSchema.parse(validatedData);
  //   } catch (error) {
  //     console.error('Validation error:', error);
  //     return;
  //   }

  //   try {
  //     const originalPdfBytes = await fetch('/assets/test.pdf').then(res => res.arrayBuffer());

  //     const pdfDoc = await PDFDocument.load(originalPdfBytes);
  //     pdfDoc.registerFontkit(fontkit); // Register fontkit with PDFDocument

  //     const cFont = await fetch('/assets/Rubik-Regular.ttf').then(res => res.arrayBuffer());
  //     const font = await pdfDoc.embedFont(cFont);
  //     const form = pdfDoc.getForm();

  //     // Set the text fields
  //     const textFieldNames = ['firstName', 'secondName', 'ID', 'Age', 'date'];
  //     textFieldNames.forEach(fieldName => {
  //       try {
  //         const field = form.getTextField(fieldName);
  //         field.setText(validatedData[fieldName]?.toString() || '');
  //         field.defaultUpdateAppearances(font); // Use embedded font for better character support
  //       } catch (error) {
  //         console.warn(`Error processing field "${fieldName}":`, error);
  //       }
  //     });

  //     // Set the checkboxes
  //     for (let i = 1; i <= 14; i++) {
  //       try {
  //         const yesField = form.getCheckBox(`Y${i}`);
  //         const noField = form.getCheckBox(`N${i}`);
  //         if (validatedData[`Q${i}`]) {
  //           yesField.check();
  //           noField.uncheck();
  //         } else {
  //           yesField.uncheck();
  //           noField.check();
  //         }
  //       } catch (error) {
  //         console.warn(`Error setting checkbox for Q${i}:`, error);
  //       }
  //     }

  //     const pdfBytes = await pdfDoc.save();
  //     const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  //     saveAs(blob, `${formData.ID}.${Date.now().toFixed}.pdf`);
  //   } catch (error) {
  //     console.error('Error processing PDF:', error);
  //   }
  // };

  // return (
  //   <div>
  //     <form onSubmit={handleFormSubmit}>
  //       {/* Input fields for firstName, secondName, etc. */}
  //       <label>
  //         First Name:
  //         <input
  //           type="text"
  //           name="firstName"
  //           value={formData.firstName}
  //           onChange={handleInputChange}
  //           required
  //         />
  //       </label>
  //       <label>
  //         ID:
  //         <input
  //           type="text"
  //           name="ID"
  //           value={formData.ID}
  //           onChange={handleInputChange}
  //           required
  //         />
  //       </label>
  //       <label>
  //         Second Name:
  //         <input
  //           type="text"
  //           name="secondName"
  //           value={formData.secondName}
  //           onChange={handleInputChange}
  //           required
  //         />
  //       </label>
  //       <label>
  //         Age:
  //         <input
  //           type="text"
  //           name="Age"
  //           value={formData.Age}
  //           onChange={handleInputChange}
  //           required
  //         />
  //       </label>
  //       <label>
  //         Date:
  //         <input
  //           type="date"
  //           name="date"
  //           value={formData.date}
  //           onChange={handleInputChange}
  //           readOnly
  //         />
  //       </label>
  //       {/* Checkboxes for Q1 to Q14 */}
  //       {Array.from({ length: 14 }, (_, i) => i + 1).map(qNumber => (
  //         <div key={`Q${qNumber}`}>
  //           <label>
  //             Q{qNumber} Yes:
  //             <input
  //               type="checkbox"
  //               name={`Q${qNumber}`}
  //               checked={formData[`Q${qNumber}`]}
  //               onChange={handleInputChange}
  //             />
  //           </label>
  //           <label>
  //             Q{qNumber} No:
  //             <input
  //               type="checkbox"
  //               name={`Q${qNumber}`}
  //               checked={!formData[`Q${qNumber}`]}
  //               onChange={handleInputChange}
  //             />
  //           </label>
  //         </div>
  //       ))}
  //       <canvas id="signatureCanvas" width="200" height="100" style={{ border: '1px solid black' }}></canvas>
  //       <button type="button" onClick={captureSignature}>Capture Signature</button>

  //       <button type="submit">Download Filled PDF</button>
  //     </form>
  //   </div>
  // );
  return (
    <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<LandingPage />} index />

          <Route
            element={<IdForm />}
            path="/health-declaration-form/checking-form-submissions-id"
          />
          <Route
            element={<DetailsFrom />}
            path="/health-declaration-form/personal-info"
          />
          <Route
            element={<YesNoQuestion />}
            path="/health-declaration-form/yes-no-form"
          />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  );
};

export default App;
