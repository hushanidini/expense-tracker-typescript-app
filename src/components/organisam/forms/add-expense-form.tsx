import { ConfirmationDialogStateProps } from "@/types/types";
import { SubmitHandler } from "react-hook-form";
import {
    TExpenseSchema,
} from "@/validations/expenseSchema";
import { AddExpense, UpdateExpense } from "@/hooks/expense";

type ExpenseAddUpdateFormProps = {
    dialogStateOpen?: boolean;
    dialogState?: ConfirmationDialogStateProps;
    formContent?: any;
    setDialogState?: React.Dispatch<React.SetStateAction<ConfirmationDialogStateProps>> | undefined;
    refetch?: any;
}
export default function ExpenseAddUpdateForm({ dialogStateOpen, dialogState, formContent, setDialogState, refetch }: ExpenseAddUpdateFormProps) {

    const { register, reset, formState: { errors } } = formContent;

    const { mutate: addExpense } = AddExpense()

    const { mutate: updateExpense } = UpdateExpense()

    const handleCloseDialog = () => {
        setDialogState?.({
            open: false,
            actionType: undefined,
            requestId: undefined,
            selectedData:undefined,
        });
        reset({
            title: "",
            amount: "",
            date: "",
            category: "",
            notes: "",
        })
    };

    const onSubmit: SubmitHandler<TExpenseSchema> = async (values:any) => {
        try {
            const payload = {
                id: String(dialogState?.requestId),
                title: String(values?.title),
                amount: Number(values?.amount),
                category: String(values?.category),
                date: Math.floor(new Date(values?.date).getTime() / 1000) 
            };

            const isUpdate = dialogState?.actionType === "update-expense";
            const apiCall = isUpdate ? updateExpense : addExpense;

            await apiCall(payload, {
                onSuccess: async (response) => {
                    if (response?.success) {
                        refetch();
                        alert(`Successfully ${isUpdate ? "Updated" : "Added"}`);
                        handleCloseDialog();
                    }
                },
                onError: (error: unknown) => {
                    const errorMessage =
                        (error as { response?: { data?: { message?: string } } })
                            ?.response?.data?.message || "An error occurred";
                    alert(errorMessage);
                    handleCloseDialog();
                },
            });
        } catch (error) {
            console.error("Unexpected Error:", error);
            alert("Something went wrong. Please try again.");
            handleCloseDialog();
        }
    };

    if (!dialogStateOpen) return null;
    return (
        <div className="modal modal-open ">
            <div className="modal-box bg-gray-100">
                <h3 className="font-bold text-lg">{dialogState?.actionType === "add-expense" ? `Add New` : dialogState?.actionType === "update-expense" ? "Update" : ""} Expense</h3>
                <form onSubmit={formContent?.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    {/* Title Field */}
                    <div>
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                            {...register("title", { required: true })}
                            type="text"
                            placeholder="Title"
                            className="input w-full input-neutral bg-gray-100"
                        />
                        {errors.title && (
                            <span className="text-red-500">{errors?.title?.message}</span>
                        )}
                    </div>
                    {/* Amount Field */}
                    <div>
                        <label className="label">
                            <span className="label-text">Amount</span>
                        </label>
                        <input
                            {...register("amount", { required: true })}
                            type="number"
                            placeholder="Amount"
                            className="input input-neutral bg-gray-100 w-full"
                        />
                        {errors.amount && (
                            <span className="text-red-500">{errors?.amount?.message}</span>
                        )}
                    </div>
                    {/* Date Field */}
                    <div>
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input
                            {...register("date", { required: true })}
                            type="date"
                            className="input input-neutral bg-gray-100 w-full"
                        />
                        {errors.date && (
                            <span className="text-red-500">{errors?.date?.message}</span>
                        )}
                    </div>
                    {/* Category Field */}
                    <div>
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select
                            {...register("category", { required: true })}
                            className="select select-neutral bg-gray-100 w-full"
                        >
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.category && (
                            <span className="text-red-500">{errors?.category?.message}</span>
                        )}
                    </div>
                    {/* Notes Field (optional) */}
                    <div>
                        <label className="label">
                            <span className="label-text">Notes</span>
                        </label>
                        <textarea
                            {...register("notes")}
                            placeholder="Notes (optional)"
                            className="textarea textarea-neutral bg-gray-100 w-full"
                        ></textarea>
                    </div>
                    <div className="modal-action">
                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={handleCloseDialog}
                        >
                            Cancel
                        </button>

                        <button type="submit" className="btn btn-neutral">
                            {dialogState?.actionType === "add-expense" ? `Add New` : dialogState?.actionType === "update-expense" ? "Update" : ""} Expense
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}