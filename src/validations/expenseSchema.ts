import { z } from "zod";

export const expenseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.string().min(1, "Amount is required"),
  date: z.string().min(1, "Date is required"),
  category: z.string().min(1, "Category is required"),
  notes: z.string().optional(),
});

export type TExpenseSchema = z.infer<typeof expenseSchema>;
