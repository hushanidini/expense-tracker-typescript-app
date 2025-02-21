import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'https://67b38500392f4aa94fa78062.mockapi.io/api/v1/expenses/expense'; 

export const useFetchExpenses = () => {
    return useQuery('expenses', async () => {
        const response = await axios.get(API_URL);
        return response.data;
    });
};

export const useAddExpense = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (expense: any) => {
            const response = await axios.post(API_URL, expense);
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('expenses');
            },
        }
    );
};

export const useUpdateExpense = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (expense: any) => {
            const response = await axios.put(`${API_URL}/${expense.id}`, expense);
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('expenses');
            },
        }
    );
};

export const useDeleteExpense = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (id: string) => {
            await axios.delete(`${API_URL}/${id}`);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('expenses');
            },
        }
    );
};