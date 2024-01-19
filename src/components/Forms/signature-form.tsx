import { useRef } from "react";
import FormHeader from "@/layout/form-header";
import SignaturePad from "react-signature-canvas";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignatureSchema } from "@/lib/schema/formSchema";
import { useFormState } from "@/context/form-state";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
const SignatureForm = () => {
  const { state, setState } = useFormState();
  const sigCanvas = useRef<SignaturePad>(null);
  const navigate = useNavigate();
  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
  };
  const form = useForm<z.infer<typeof SignatureSchema>>({
    resolver: zodResolver(SignatureSchema),
  });

  const saveData = (data: z.infer<typeof SignatureSchema>) => {
    setState({ ...state, ...data });
    navigate("/health-declaration-form/yes-no-form/q-6");
  };

  const formatIntoPng = () => {
    if (sigCanvas.current) {
      const dataURL = sigCanvas.current.toDataURL();
      console.log(dataURL);
    }
  };

  return (
    <FormHeader>
      <div className="p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(saveData)}
            className="space-y-6"
            dir="rtl"
          >
            <FormField
              control={form.control}
              name="Signature"
              render={(field) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold mb-4">
                    אני, החתום מטה, מצהיר כי קראתי והבנתי את כל השאלון הרפואי
                    שבחלק א' לטופס זה וכל התשובות לשאלות בטופס זה הן שליליות;
                    אני מצהיר כי מסרתי ידיעות מלאות ונכונות אודות מצבי הרפואי
                    בעבר ובהווה לפי השאלות שנשאלתי בשאלון האמור.
                  </FormLabel>
                  <FormControl>
                    <div className="border border-black rounded p-2">
                      <SignaturePad
                        ref={sigCanvas}
                        {...field}
                        canvasProps={{
                          className: "sigCanvas w-full h-48",
                          style: { touchAction: "none" },
                        }}
                        penColor="black"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-between mt-4">
              <Button type="submit" onClick={formatIntoPng}>
                הבא
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={clearSignature}
              >
                נקי
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </FormHeader>
  );
};

export default SignatureForm;
