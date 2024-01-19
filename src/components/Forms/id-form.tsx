import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { useFormState } from "@/context/form-state";
import { zodResolver } from "@hookform/resolvers/zod";
import { idFormSchema } from "@/lib/schema/formSchema";
import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormHeader from "@/layout/form-header";
import { checkForExistingPDF } from "@/lib/firebase/services/check-for-existing-pdf";
import { useNavigate } from "react-router-dom";

const IdForm = () => {
  const navigate = useNavigate();
  const formState = useFormState();
  const { state, setState } = formState;

  const form = useForm<z.infer<typeof idFormSchema>>({
    resolver: zodResolver(idFormSchema),
    defaultValues: {
      ID: "",
    },
  });

  const saveData = async (data: z.infer<typeof idFormSchema>) => {
    const id = data.ID;
    const exists = await checkForExistingPDF({ id });
    if (exists) return true;
    setState({ ...state, ...data });
    navigate("/health-declaration-form/personal-info");
  };

  return (
    <FormHeader>
      <div className="max-w-md mx-auto p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(saveData)}
            className="space-y-4"
            dir="rtl"
          >
            <FormField
              control={form.control}
              name="ID"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="font-bold mb-2">ת.ז</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="ת.ז"
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

export default IdForm;
