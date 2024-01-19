import { useForm } from "react-hook-form";
import FormHeader from "@/layout/form-header";
import { useFormState } from "@/context/form-state";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Q6Schema } from "@/lib/schema/formSchema";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../ui/form";
import { Button } from "../../ui/button";

const Q6 = () => {
  const { state, setState } = useFormState();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof Q6Schema>>({
    resolver: zodResolver(Q6Schema),
  });

  const saveData = (data: z.infer<typeof Q6Schema>) => {
    setState({ ...state, ...data });
    navigate("/health-declaration-form/yes-no-form/q-7");
  };

  return (
    <FormHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(saveData)}
          className="max-w-lg mx-auto p-4 space-y-6"
          dir="rtl"
        >
          <FormField
            control={form.control}
            name="Q11"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-base md:text-lg">
                  האם הרופא שלך אמר לך ב5 השנים האחרונות לבצע פעילות גופנית רק
                  תחת השגחה רפואית?
                </FormLabel>
                <FormControl>
                  <RadioGroup {...field} className="space-y-2">
                    <FormItem className="flex items-center justify-end space-x-reverse space-x-2">
                      <FormLabel className="font-bold pr-2">לא</FormLabel>
                      <RadioGroupItem
                        value="לא"
                        className="form-radio h-5 w-5"
                      />
                    </FormItem>
                    <FormItem className="flex items-center justify-end space-x-reverse space-x-2">
                      <FormLabel className="font-bold pr-2">כן</FormLabel>
                      <RadioGroupItem
                        value="כן"
                        className="form-radio h-5 w-5"
                      />
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            הבא
          </Button>
        </form>
      </Form>
    </FormHeader>
  );
};

export default Q6;
