import FormComponents  from "@/components/Forms/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useLocation } from "react-router-dom";

const FormPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-red-50">
      <Card>
        <CardHeader>
          <CardTitle className="max-w-lg w-full  rounded-lg overflow-hidden">
            <h2 className="text-xl font-semibold text-center mb-4">
              <img
                src="/assets/logo.jpg"
                alt="Logo"
                className="object-contain mx-auto"
              />
              מילוי טופס הצארת בריאות
            </h2>
          </CardTitle>
          <CardContent>
            <FormComponents id={id} />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default FormPage;
