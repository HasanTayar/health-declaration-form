import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { useForm } from 'react-hook-form';
import { useFormState } from '@/context/form-state';
import { zodResolver } from '@hookform/resolvers/zod';
import { idFormSchema } from '@/lib/schema/formSchema';
import * as z from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import FormHeader from '@/common/form-headr';
import { checkForExistingPDF } from '@/lib/firebase/services/check-for-existing-pdf';
import { useNavigate } from 'react-router-dom';
const IdForm = () => {
    const navigate = useNavigate()
    const formState = useFormState(); // Get the context object
    const { state, setState } = formState; // Destructure state and setState from the context object

    const form = useForm<z.infer<typeof idFormSchema>>({
        resolver: zodResolver(idFormSchema),
        defaultValues: {
            ID: ""
        }
    });

    const saveData = async (data: z.infer<typeof idFormSchema>) => {
        const id = data.ID
        const exists = await checkForExistingPDF({id})
        if(exists)
        return true
        setState({ ...state, ...data });
        console.log(data)
        navigate('/health-declaration-form/personal-info')
    };

    return (
        
            <FormHeader>
                <div className='text-right' dir='rtl'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(saveData)} className='space-y-8'>

                    <FormField
                        control={form.control}
                        name='ID'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>ת.ז</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='ת.ז' />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type='submit'> הבא</Button>
                </form>
            </Form>
            </div>
            </FormHeader>
        
    );
}

export default IdForm;
