import { useForm } from "react-hook-form";
import FormHeader from "@/layout/form-header";
import { useFormState } from "@/context/form-state";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Q7Schema } from "@/lib/schema/formSchema";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../ui/form";
import { Button } from "../../ui/button";

const Q7 = () => {
  const { state, setState } = useFormState();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof Q7Schema>>({
    resolver: zodResolver(Q7Schema),
  });

  const saveData = (data: z.infer<typeof Q7Schema>) => {
    setState({ ...state, ...data });
    navigate("/health-declaration-form/yes-no-form/q-8");
  };

  return (
    <FormHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(saveData)}
          className="space-y-6 "
          dir="rtl"
        >
          <FormField
            control={form.control}
            name="Q12"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  האם הינך סובל ממחלה קבועה , שאינה נזכרת בשאלות לעיל ועשויה
                  למנוע או להגביל אותך בביצוע פעילות גופנית?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex  flex-col space-y-1"
                  >
                    <FormItem className="flex justify-end  space-x-3 space-y-0">
                      <FormLabel className="font-normal">לא</FormLabel>

                      <FormControl>
                        <RadioGroupItem value="לא" />
                      </FormControl>
                    </FormItem>
                    <FormItem className=" flex justify-end space-x-3 space-y-0">
                      <FormLabel className="font-normal">כן</FormLabel>

                      <FormControl>
                        <RadioGroupItem value="כן" />
                      </FormControl>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">הבא</Button>
        </form>
      </Form>
    </FormHeader>
  );
};

export default Q7;
