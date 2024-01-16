import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import { formSchema } from "@/lib/schema/formSchema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { formQuestion } from "@/constants";

const FormComponents = ({ id }: { id: string | null }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuestions, setShowQuestions] = useState(false);
  const [answers, setAnswers] = useState({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ID: id || '',
      firstName: '',
      secondName: '',
      Age: '',
      date: new Date(),
      // Initialize boolean questions
      ...formQuestion.reduce((acc, _, index) => ({ ...acc, ['Q' + (index + 1)]: false }), {}),
    }
  });

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    console.group('Form Submitted', values);
    setAnswers({ ...answers, ['Q' + (currentQuestionIndex + 1)]: values['Q' + (currentQuestionIndex + 1) as keyof z.infer<typeof formSchema>] });

    if (currentQuestionIndex < formQuestion.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("All answers: ", answers);
      // Submit form or perform next steps
    }

    if (!showQuestions) {
      setShowQuestions(true); // Start showing questions after first submission
    }
  };

  const currentQuestion = formQuestion[currentQuestionIndex];

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8 text-right">
          {/* Personal Information Fields */}
          {!showQuestions && (
            <>
              <Input className="hidden" {...form.register('ID')} value={id || ''} />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>שם פרטי</FormLabel>
                    <FormControl>
                      <Input type="text" className="text-right" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secondName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>שם משפחה</FormLabel>
                    <FormControl>
                      <Input type="text" className="text-right" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>גיל</FormLabel>
                    <FormControl>
                      <Input type="text" className="text-right" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          )}

          {/* Dynamic Question Field */}
          {showQuestions && (
            <FormField
              control={form.control}
              name={'Q' + (currentQuestionIndex + 1) as keyof z.infer<typeof formSchema>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{currentQuestion.question}</FormLabel>
                  <FormControl>
                    <label className="inline-flex items-center">
                      <input type="checkbox" {...field} checked={field.value} onChange={field.onChange} className="text-lg" />
                      <span className="ml-2 text-sm text-gray-600">כן</span>
                    </label>
                    <label className="inline-flex items-center ml-4">
                      <input type="checkbox" {...field} checked={field.value} onChange={field.onChange} className="text-lg" />
                      <span className="ml-2 text-sm text-gray-600">לא</span>
                    </label>
                  </FormControl>
                </FormItem>
              )}
            />
          )}
      <Button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {showQuestions ? "הבא" : "התחל"}
      </Button>
    </form>
  </Form>
</div>

);
};

export default FormComponents;