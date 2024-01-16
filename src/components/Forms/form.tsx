import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import * as z from 'zod';
import { formSchema } from "@/lib/schema/formSchema";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button";
import { formQuestion } from "@/constants";
const FormComponents = ({id}:{id:string | null}) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues: {
      ID: id || '',
    }
      
  })
  const handleFormSubmit = (values: z.infer<typeof formSchema>)=>{
    console.group('Form Submitted', values);
}
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8 text-right">
          <Input className="hidden" value={id || ''} {...form.register('ID')} />  
          <FormField
          control={form.control}
          name="firstName"
          render={({field})=>(
            <FormItem>
              <FormLabel>
                שם פרטי
              </FormLabel>
              <FormControl>
                <Input type="text"  className="text-right font-extrabold"{...field} />
              </FormControl>
            </FormItem>
          )}/>
          <FormField
          control={form.control}
          name="secondName"
          render={({field})=>(
            <FormItem>
              <FormLabel>
                שם משפחה
              </FormLabel>
              <FormControl>
                <Input type="text" className="text-right" {...field} />
              </FormControl>
            </FormItem>
          )}/>

       
        <Button type="submit">הבא</Button>
        </form>
      </Form>
    </div>
  )
}

export default FormComponents
