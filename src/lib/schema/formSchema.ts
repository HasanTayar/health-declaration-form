import * as z from 'zod';

export const formSchema = z.object({
    firstName:z.string().min(2),
    secondName:z.string().min(2),
    ID: z.string().min(100000000).max(999999999),
    Age:z.string(),
    Q1:z.boolean(),
    Q2:z.boolean(),
    Q3:z.boolean(),
    Q4:z.boolean(),
    Q5:z.boolean(),
    Q6:z.boolean(),
    Q7:z.boolean(),
    Q8:z.boolean(),
    Q9:z.boolean(),
    Q10:z.boolean(),
    Q11:z.boolean(),
    Q12:z.boolean(),
    Q13:z.boolean(),
    Q14:z.boolean(),
    date:z.date(),
    
})