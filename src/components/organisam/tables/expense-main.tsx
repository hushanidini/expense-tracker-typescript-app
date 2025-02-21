import { useState, useEffect } from "react";
import { ConfirmationDialogStateProps } from "@/types/types"
import { DeleteExpense } from "@/hooks/expense"

type Expense = {
    id: string;
    title: string;
    amount: number;
    category: string;
    date: number;
};

type ExpenseTableProps = {
    itemsToDisplay: Expense[];
    handleAction: (actionType: "add-expense" | "update-expense" | "delete-expense", id?: number, selectedData?: Expense) => void;
    formContent?: any;
    dialogState?: ConfirmationDialogStateProps;
    setDialogState?: React.Dispatch<React.SetStateAction<ConfirmationDialogStateProps>> | undefined;
    refetch?: any;
    handleCloseDialog?: () => void | undefined
};

const ExpenseTable = ({ itemsToDisplay, handleAction, dialogState, formContent, refetch, handleCloseDialog }: ExpenseTableProps) => {
    // delete expense
    const { mutate: deleteExpense } = DeleteExpense()

    const [sortConfig, setSortConfig] = useState<{ key: keyof Expense; direction: "asc" | "desc" } | null>(null);

    const sortedExpenses = [...itemsToDisplay].sort((a, b) => {
        if (!sortConfig) return 0;

        const { key, direction } = sortConfig;
        let aValue = a[key];
        let bValue = b[key];

        if (key === "amount") {
            aValue = Number(aValue);
            bValue = Number(bValue);
        }

        if (key === "date") {
            aValue = new Date(aValue).getTime();
            bValue = new Date(bValue).getTime();
        }

        if (aValue < bValue) return direction === "asc" ? -1 : 1;
        if (aValue > bValue) return direction === "asc" ? 1 : -1;
        return 0;
    });

    const handleSort = (key: keyof Expense) => {
        setSortConfig((prev) => ({
            key,
            direction: prev?.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    useEffect(() => {
        const selectedItem = dialogState?.selectedData;
        if (selectedItem) {
            const modifiedEditData = {
                title: selectedItem?.title ?? "",
                amount: String(selectedItem?.amount) ?? "",
                date: new Date(selectedItem?.date * 1000).toISOString().split('T')[0] ?? "",
                category: selectedItem?.category ?? "",
                notes: selectedItem?.notes ?? "",
            }
            formContent.reset(modifiedEditData);
        }
    }, [formContent, dialogState]);



    // Handle Confirm Delete
    const handleConfirmDelete = () => {
        if (dialogState?.requestId && dialogState?.actionType === "delete-expense") {
            deleteExpense(dialogState?.requestId, {
                onSuccess: () => {
                    refetch?.();
                    alert("Expense Deleted Successfully");
                    handleCloseDialog?.();
                },
                onError: (error: any) => {
                    alert(error?.response?.data?.message || "Error deleting expense");
                },
            });
        }
        handleCloseDialog?.();
    };
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-4 border border-gray-300 text-center">Actions</th>
                        <th className="p-4 border border-gray-300 text-left">Title</th>
                        <th
                            className="p-4 border border-gray-300 text-left cursor-pointer"
                            onClick={() => handleSort("amount")}
                        >
                            Amount {sortConfig?.key === "amount" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                        </th>
                        <th className="p-4 border border-gray-300 text-left">Category</th>
                        <th
                            className="p-4 border border-gray-300 text-left cursor-pointer"
                            onClick={() => handleSort("date")}
                        >
                            Date {sortConfig?.key === "date" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedExpenses.map((expense) => (
                        <tr key={expense.id} className="border-b hover:bg-gray-50">
                            <td className="p-4 border border-gray-300 flex gap-2 ">
                                <button
                                    type="button"
                                    className="px-3 py-1 text-white bg-neutral hover:bg-black-100 cursor-pointer"
                                    onClick={() => handleAction("update-expense", Number(expense?.id), expense)}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="px-3 py-1 text-white bg-red-500 hover:bg-red-600 cursor-pointer"
                                    onClick={() => handleAction("delete-expense", Number(expense?.id))}
                                >
                                    Delete
                                </button>
                            </td>
                            <td className="p-4 border border-gray-300">{expense?.title}</td>
                            <td className="p-4 border border-gray-300">{expense?.amount}</td>
                            <td className="p-4 border border-gray-300">{expense?.category}</td>
                            <td className="p-4 border border-gray-300">
                                {new Date(expense?.date * 1000).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Delete Confirmation Dialog */}
            {(dialogState?.open && dialogState?.actionType === "delete-expense") && (<div className="modal modal-open">
                <div className="modal-box bg-gray-100">
                    <h2 className="text-xl font-semibold">Confirm Deletion</h2>
                    <p>Are you sure you want to delete this expense?</p>
                    <div className="modal-action">
                        <button type="button"
                            className="btn btn-outline"
                            onClick={handleCloseDialog}>Cancel</button>
                        <button className="btn bg-red-500 hover:bg-red-600" onClick={handleConfirmDelete}>Delete</button>
                    </div>
                </div>
            </div>)}
        </div>
    );
};

export default ExpenseTable;
