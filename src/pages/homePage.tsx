import React, { useState, useRef, useEffect, useMemo } from "react";
import DashboardPageTemplate from "@/components/templates/dashboard-template";
import CommonFilter from "@/components/organisam/commons/common-filter";
import { CommonCard } from "@/components/organisam/commons/common-card";
import { Loader } from "@/components/molecule/loader/loader";
import EmptyView from "@/components/molecule/empty-view/empty-view";
import { PlusCircleIcon } from "lucide-react";
import { FetchAllExpenses } from "@/hooks/expense";
import { useDebounce } from "@/hooks/useDebounce";
import { ConfirmationDialogStateProps, Expense } from "@/types/types";
import ExpenseAddUpdateForm from "@/components/organisam/forms/add-expense-form";
import { useExpenseReactHookForm } from "@/hooks/useExpenseReactHookForm"
import ExpenseTable from "@/components/organisam/tables/expense-main"
import useOfflineSync from '@/hooks/useOfflineSync';

export default function Homepage() {
    const [page, setPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("All");
    const [dialogState, setDialogState] = useState<ConfirmationDialogStateProps>({
        open: false,
        actionType: undefined,
        requestId: undefined,
        selectedData: undefined
    });
    const ITEMS_PER_PAGE = 10;
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const expenseHookForm = useExpenseReactHookForm()

    const { isOffline, isSyncing, saveToLocalStorage } = useOfflineSync();

    // Fetch all expenses 
    const { data: expensesData, isLoading, refetch } = FetchAllExpenses();

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const filteredExpenses = useMemo(() => {
        if (expensesData?.data?.length === 0) return [];
        let filtered = expensesData?.data;

        if (debouncedSearchTerm) {
            filtered = filtered.filter((expense: any) =>
                expense.title.toLowerCase().includes(debouncedSearchTerm?.toLowerCase())
            );
        }

        // Filter by category
        if (category !== "All") {
            filtered = filtered.filter((expense: any) => expense.category === category);
        }
        saveToLocalStorage(filtered)
        return filtered;
    }, [expensesData, debouncedSearchTerm, category, saveToLocalStorage]);


    const itemsToDisplay =
        filteredExpenses?.length > 0
            ? filteredExpenses?.slice(0, page * ITEMS_PER_PAGE)
            : [];


    const handleLoadMore = () => {
        setIsLoadingMore(true);
        setPage((prevPage) => prevPage + 1);
    };


    useEffect(() => {
        if (page > 1) {
            const timeout = setTimeout(() => {
                setIsLoadingMore(false);
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [page]);


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    itemsToDisplay.length < (filteredExpenses?.length || 0) &&
                    !isLoadingMore
                ) {
                    handleLoadMore();
                }
            },
            { threshold: 1.0 }
        );
        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }
        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [itemsToDisplay, filteredExpenses, isLoadingMore]);


    function rightSideButtonGroup(): React.ReactNode {
        return (
            <div className="flex items-center gap-3">
                <button className="btn btn-neutral" onClick={() => handleAction("add-expense", undefined)}>
                    <PlusCircleIcon className="text-slate-500" size={20} />
                    Add Expenses
                </button>
            </div>
        );
    }

    function handleAction(actionType: "add-expense" | "update-expense" | "delete-expense", id?: number, data?: Expense) {
        setDialogState({ open: true, actionType, requestId: id, selectedData: data });
    };

    function handleCloseDialog() {
        setDialogState?.({
            open: false,
            actionType: "delete-expense",
            requestId: undefined,
        });
    };

    return (
        <DashboardPageTemplate
            title="Expenses Management"
            hasRightSideContent={true}
            rightSideContent={rightSideButtonGroup()}
        >
            <div className="space-y-1">
                {isOffline && <div className="offline-indicator bg-red-500">You are offline</div>}
                {isSyncing && <div className="sync-indicator">Syncing...</div>}
                <section>
                    <CommonFilter
                        searchPlaceholder="Search by title"
                        searchOnChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(1);
                        }}
                        hAlign="items-end"
                    >
                        <div className="flex flex-col gap-2">
                            <span className="text-slate-500">Filter By Category</span>
                            <select
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                    setPage(1);
                                }}
                                className="select bg-gray-100 select-neutral"
                            >
                                <option value="All">All</option>
                                <option value="Food">Food</option>
                                <option value="Travel">Travel</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </CommonFilter>
                </section>
                <section>
                    <CommonCard>
                        {isLoading && page === 1 ? (
                            <Loader />
                        ) : itemsToDisplay.length === 0 ? (
                            <div className="flex items-center justify-center">
                                <EmptyView
                                    title="No Expense Available"
                                    subtitle="Please check back later"
                                />
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1">
                                    <ExpenseTable
                                        itemsToDisplay={itemsToDisplay}
                                        handleAction={handleAction}
                                        formContent={expenseHookForm}
                                        dialogState={dialogState}
                                        refetch={refetch}
                                        handleCloseDialog={handleCloseDialog}
                                    />
                                </div>
                                {isLoadingMore ? (
                                    <Loader />
                                ) : (
                                    itemsToDisplay.length < (expensesData?.data?.length || 0) && (
                                        <button className="btn btn-neutral mt-4" onClick={handleLoadMore}>
                                            Load More
                                        </button>
                                    )
                                )}

                            </>
                        )}
                    </CommonCard>
                </section>
            </div>
            {(dialogState?.open && (dialogState?.actionType === "add-expense" || dialogState?.actionType === "update-expense")) && (
                <ExpenseAddUpdateForm
                    dialogStateOpen={dialogState?.open}
                    dialogState={dialogState}
                    formContent={expenseHookForm}
                    setDialogState={setDialogState}
                    refetch={refetch}
                />
            )}
        </DashboardPageTemplate>
    );
} 