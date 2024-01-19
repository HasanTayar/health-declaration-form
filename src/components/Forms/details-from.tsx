import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { useFormState } from "@/context/form-state";
import { zodResolver } from "@hookform/resolvers/zod";
import { detailsFormSchema } from "@/lib/schema/formSchema";
import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormHeader from "@/common/form-headr";
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
    console.log("state:", state);
    console.log("data:", data);
    navigate("/health-declaration-form/yes-no-form");
  };

  return (
    <FormHeader>
      <div className="text-right" dir="rtl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(saveData)} className="space-y-8">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">שם פרטי</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="שם פרטי" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="second_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">שם משפחה</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="שם משפחה" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">גיל</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="גיל" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit"> הבא</Button>
          </form>
        </Form>
      </div>
    </FormHeader>
  );
};

export default DetailsFrom;
