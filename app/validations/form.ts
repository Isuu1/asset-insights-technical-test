import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .max(25, { message: "Name must be less than 25 characters" })
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),
  age: z
    .number()
    .int()
    .max(100)
    .positive({ message: "Please enter a valid age" }),
});
