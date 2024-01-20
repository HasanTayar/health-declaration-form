import LandingPage from "./pages/landing-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailsFrom from "./components/Forms/details-from";
import IdForm from "./components/Forms/id-form";
import { FormProvider } from "./context/form-state";
import {
  Q1,
  Q2,
  Q3,
  Q4,
  Q5,
  Q6,
  Q7,
  Q8,
} from "./components/Forms/YesNoQuestion";
import SignatureForm from "./components/Forms/signature-form";
import DonePage from "./pages/done-page";

const App: React.FC = () => {
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
            element={<Q1 />}
            path="/health-declaration-form/yes-no-form/q-1"
          />
          <Route
            element={<Q2 />}
            path="/health-declaration-form/yes-no-form/q-2"
          />
          <Route
            element={<Q3 />}
            path="/health-declaration-form/yes-no-form/q-3"
          />
          <Route
            element={<Q4 />}
            path="/health-declaration-form/yes-no-form/q-4"
          />
          <Route
            element={<Q5 />}
            path="/health-declaration-form/yes-no-form/q-5"
          />
          <Route
            element={<Q6 />}
            path="/health-declaration-form/yes-no-form/q-6"
          />
          <Route
            element={<Q7 />}
            path="/health-declaration-form/yes-no-form/q-7"
          />
          <Route
            element={<Q8 />}
            path="/health-declaration-form/yes-no-form/q-8"
          />
          <Route
            element={<SignatureForm />}
            path="/health-declaration-form/signature-form"
          />
          <Route
            element={<DonePage />}
            path="/health-declaration-form/done-page"
          />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  );
};

export default App;
