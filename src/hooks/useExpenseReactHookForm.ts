import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  TExpenseSchema,
  expenseSchema,
} from "@/validations/expenseSchema";

export const useExpenseReactHookForm = () => {
  return useForm<TExpenseSchema>({
    mode: "onChange",
    shouldUnregister: false,
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: "",
      amount: "",
      date: "",
      category: "",
      notes: "",
    },
  });
};
