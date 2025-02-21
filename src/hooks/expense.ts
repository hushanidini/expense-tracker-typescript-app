import { GET_ALL_EXPENSES } from "@/constants";
import {
  getAllExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../services/expense.services";
import { useFetch } from "./base-hooks";
import { useCreate } from "./base-hooks";

//get all expenses
export const FetchAllExpenses = (isFetching?: boolean) => {
  const queryKey = [GET_ALL_EXPENSES];
  return useFetch({
    queryKey,
    queryFn: () => getAllExpenses(),
    enabled: isFetching,
  });
};

export const AddExpense = () =>
  useCreate({
    mutationFn: addExpense,
  });

export const UpdateExpense = () =>
  useCreate({
    mutationFn: updateExpense,
  });

export const DeleteExpense = () =>
  useCreate({
    mutationFn: deleteExpense,
  });
