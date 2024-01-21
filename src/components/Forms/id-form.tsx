import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { useFormState } from "@/context/form-state";
import { zodResolver } from "@hookform/resolvers/zod";
import { idFormSchema } from "@/lib/schema/formSchema";
import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormHeader from "@/layout/form-header";
import {
  checkForExistingPDF,
  getTheUserDetails,
} from "@/lib/firebase/services/check-for-existing-pdf";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import error from "/assets/error.gif";
import { UserType } from "@/constants";

const IdForm = () => {
  const navigate = useNavigate();
  const formState = useFormState();
  const { state, setState } = formState;
  const [isExits, setIsExits] = useState(false);
  const [user, setUser] = useState<UserType>();
  const form = useForm<z.infer<typeof idFormSchema>>({
    resolver: zodResolver(idFormSchema),
    defaultValues: {
      ID: "",
    },
  });
  const sendMessageOnWhatsApp = () => {
    const message = `שלום קרם,\nשמי ${user?.firstName} ${user?.secondName} עם ת.ז: ${user?.id}. אני רוצה לשנות או לעדכן את הטופס שלי. נא לתת לי אפשרות בבקשה.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/972529530800?text=${encodedMessage}`;

    window.open(whatsappLink, "_blank", "noopener noreferrer");
  };

  const saveData = async (data: z.infer<typeof idFormSchema>) => {
    const id = data.ID;
    const exists = await checkForExistingPDF({ id });
    if (exists) {
      setIsExits(true);
      const data = await getTheUserDetails(id);
      console.log(data);
      setUser(data);
    } else {
      setState({ ...state, ...data });
      navigate("/health-declaration-form/personal-info");
    }
  };

  return (
    <FormHeader>
      {isExits ? (
        <>
          <div className="flex items-center justify-center">
            <img src={error} alt="Error" className="h-20 md:h-24 lg:h-28" />
          </div>
          <h1 className="text-right font-bold text-base md:text-lg lg:text-xl">
            שלום, {user?.firstName}
          </h1>
          <p className="text-right text-sm md:text-base lg:text-lg">
            תעודת הזהות שלך עם המספר {user?.id} כבר רשומה במערכת. תוקפה של הטופס
            יפוג בתאריך {user?.expiredAt}. אנא בדוק את פרטי הטופס או צור קשר
            לעדכון נתונים.
          </p>
          <Button
            variant="outline"
            onClick={sendMessageOnWhatsApp}
            className="w-full md:w-auto"
          >
            לפניה מהירה
          </Button>
        </>
      ) : (
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
      )}
    </FormHeader>
  );
};

export default IdForm;
