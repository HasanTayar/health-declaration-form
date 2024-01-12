import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/lib/schema/formSchema";
import { Form, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
const FormPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const formMethod = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gradient-bg">
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
            <Form {...formMethod}>
              <form onSubmit={formMethod.handleSubmit(onSubmit)}>
                <Input
                  type="text"
                  value={id || ""}
                  className=" rounded-lg text-lg text-clip"
                  {...formMethod.register("ID")}
                />

                <FormField
                  control={formMethod.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl  text-right mb-4">
                        שם פרטי
                        <span className="text-red-500 font-bold">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="rounded-lg text-lg text-clip"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formMethod.control}
                  name="secondName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl  text-right mb-4">
                        שם משפחה{" "}
                        <span className="text-red-500 font-bold">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="rounded-lg text-lg text-clip"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="mt-5 flex justify-end">
                  <Button type="submit">הבא</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default FormPage;
