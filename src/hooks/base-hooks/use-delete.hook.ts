import { useMutation, UseMutationOptions, MutationKey, MutationFunction } from '@tanstack/react-query';

type useDeleteHookType<T> = {
    mutationKey: MutationKey;
    mutationFn: MutationFunction<T, string>;
    options?: UseMutationOptions<T, Error, string>;
};

export const useDelete = <T>({ mutationKey, mutationFn, options }: useDeleteHookType<T>) => {
    return useMutation<T, Error, string>({
        mutationKey,
        mutationFn,
        ...options,
    });
};
