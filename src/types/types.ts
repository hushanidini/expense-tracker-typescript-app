export type GetExpenseFilter = {
  title?: string;
  id?: string;
  category?: string;
};

export type Expense = {
  id: string;
  title: string;
  amount: number;
  date: number;
  category: string;
  notes?: string;
};


export type ConfirmationDialogStateProps = {
  open: boolean;
  actionType?:
    | "add-expense"
    | "update-expense"
    | "delete-expense"
    | undefined;
  requestId?: number;
  date?: string;
  id?: number;
  selectedData?: Expense;
}