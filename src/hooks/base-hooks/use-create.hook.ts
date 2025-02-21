import {
    useMutation,
    UseMutationOptions,
    MutationFunction,
} from "@tanstack/react-query";


type UseMutationHandlerType<
    ResultType,
    ErrorType = unknown,
    VariablesType = void,
    ContextType = unknown
> = {
    mutationFn: MutationFunction<ResultType, VariablesType>;
    options?: UseMutationOptions<ResultType, ErrorType, VariablesType, ContextType>;
};


export const useCreate = <
    ResultType,
    ErrorType = unknown,
    VariablesType = void,
    ContextType = unknown
>({
    mutationFn,
    options,
}: UseMutationHandlerType<ResultType, ErrorType, VariablesType, ContextType>) => {
    return useMutation<ResultType, ErrorType, VariablesType, ContextType>({
        mutationFn,
        ...options,
    });
};
