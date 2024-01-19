import * as z from 'zod';

export const idFormSchema = z.object({
    ID:z.string().min(9).max(9)
})
export const detailsFormSchema = z.object({
    
})