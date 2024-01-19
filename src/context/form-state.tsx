import React, { createContext, useContext, useState } from "react";

export const FormStateContext = createContext<
  | {
      state: any;
      setState: React.Dispatch<React.SetStateAction<any>>;
    }
  | undefined
>(undefined);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState({});
  const value = { state, setState };

  return (
    <FormStateContext.Provider value={value}>
      {children}
    </FormStateContext.Provider>
  );
};

export function useFormState() {
  const context = useContext(FormStateContext);
  if (!context) {
    throw new Error("useFormState must be used within the FormProvider");
  }
  return context;
}
