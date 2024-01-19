import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { useFormState } from "@/context/form-state";
import { zodResolver } from "@hookform/resolvers/zod";
import { detailsFormSchema } from "@/lib/schema/formSchema";
import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormHeader from "@/layout/form-header";
import { useNavigate } from "react-router-dom";
const DetailsFrom = () => {
  const navigate = useNavigate();
  const formState = useFormState(); // Get the context object
  const { state, setState } = formState; // Destructure state and setState from the context object

  const form = useForm<z.infer<typeof detailsFormSchema>>({
    resolver: zodResolver(detailsFormSchema),
    defaultValues: {
      first_name: "",
      second_name: "",
      age: "",
    },
  });

  const saveData = (data: z.infer<typeof detailsFormSchema>) => {
    setState({ ...state, ...data });

    navigate("/health-declaration-form/yes-no-form/q-1");
  };

  return (
    <FormHeader>
      <div className="max-w-md mx-auto p-4" dir="rtl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(saveData)} className="space-y-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="font-bold mb-2 text-base">
                    שם פרטי
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder="שם פרטי"
                    className="border p-2 rounded"
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="second_name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="font-bold mb-2">שם משפחה</FormLabel>
                  <Input
                    {...field}
                    placeholder="שם משפחה"
                    className="border p-2 rounded text-base"
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="font-bold mb-2">גיל</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="גיל"
                      className="border p-2 rounded text-base"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            >
              הבא
            </Button>
          </form>
        </Form>
      </div>
    </FormHeader>
  );
};

export default DetailsFrom;
