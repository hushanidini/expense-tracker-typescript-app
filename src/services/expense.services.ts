import { GetExpenseFilter, Expense } from "../types/types";
import { ApiRequestError, handleAxiosError } from "../utils/api-common-utils";
import { httpDelete, httpGet, httpPost, httpPut } from "./http.service";
// import {
//   TExpenseSchema,
// } from "@/validations/expenseSchema";

const GET_EXPENSE_API_URL =
  "https://67b38500392f4aa94fa78062.mockapi.io/api/v1/expenses/expense";

const POST_EXPENSE_API_URL =
  "https://67b38500392f4aa94fa78062.mockapi.io/api/v1/expenses/expense";

//get all expenses
export const getAllExpenses = async (payloadData?: GetExpenseFilter) => {
  try {
    const response = await httpGet(GET_EXPENSE_API_URL, payloadData);
    if (response.status === 200 || response.status === 201) {
      return { success: true, data: response?.data };
    } else {
      throw new ApiRequestError("Failed fetch expense data");
    }
  } catch (error: unknown) {
    const newError = handleAxiosError(error);
    return newError;
  }
};

export const addExpense = async (payload: object) => {
  try {
    const response = await httpPost(POST_EXPENSE_API_URL, payload);
    if (response.status === 201 || response.status === 200) {
      return { success: true, data: response?.data };
    } else {
      throw new ApiRequestError("Failed to post info");
    }
  } catch (error: unknown) {
    const newError = handleAxiosError(error);
    return newError;
  }
};

export const updateExpense = async (payload: Expense) => {
  try {
    const { id, ...payloadWithoutId } = payload;
    const response = await httpPut(
      `${POST_EXPENSE_API_URL}/${payload?.id}`,
      payloadWithoutId
    );
    if (response.status === 201 || response.status === 200) {
      return { success: true, data: response?.data };
    } else {
      throw new ApiRequestError("Failed to update expense");
    }
  } catch (error: unknown) {
    const newError = handleAxiosError(error);
    return newError;
  }
};

export const deleteExpense = async (id: number) => {
  try {
    const response = await httpDelete(`${POST_EXPENSE_API_URL}/${id}`);
    if (response.status === 201 || response.status === 200) {
      return { success: true, data: response?.data };
    } else {
      throw new ApiRequestError("Failed to delete expense");
    }
  } catch (error: unknown) {
    const newError = handleAxiosError(error);
    return newError;
  }
};
