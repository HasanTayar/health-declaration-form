import * as z from "zod";

export const idFormSchema = z.object({
  ID: z.string().min(9).max(9),
});
export const detailsFormSchema = z.object({
  first_name: z.string().min(2),
  second_name: z.string().min(2),
  age: z.string(),
});
export const Q1Schema = z.object({
  Q1: z.enum(["לא", "כן"]),
});
export const Q2Schema = z.object({
  Q2: z.enum(["לא", "כן"]),
  Q3: z.enum(["לא", "כן"]),
  Q4: z.enum(["לא", "כן"]),
});
export const Q3Schema = z.object({
  Q5: z.enum(["לא", "כן"]),
  Q6: z.enum(["לא", "כן"]),
});
export const Q4Schema = z.object({
  Q7: z.enum(["לא", "כן"]),
  Q8: z.enum(["לא", "כן"]),
});
export const Q5Schema = z.object({
  Q9: z.enum(["לא", "כן"]),
  Q10: z.enum(["לא", "כן"]),
});
export const Q6Schema = z.object({
  Q11: z.enum(["לא", "כן"]),
});
export const Q7Schema = z.object({
  Q12: z.enum(["לא", "כן"]),
});
export const Q8Schema = z.object({
  Q13: z.enum(["לא", "כן", "לא-בהריון"]),
});
export const SignatureSchema = z.object({
  Signature: z.any(),
});
export const AdminAuthSchema = z.object({
  email: z
    .string()
    .email({ message: "כתובת המייל אינה תקינה" })
    .nonempty({ message: "נדרשת כתובת מייל" }),
  password: z.string(),
});
