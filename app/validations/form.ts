import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),
  age: z
    .number()
    .int()
    .positive({ message: "Please enter a valid age" }),
});
