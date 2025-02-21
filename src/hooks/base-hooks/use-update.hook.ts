import {
    useMutation,
    UseMutationOptions,
    MutationFunction,
    useQueryClient,
} from "@tanstack/react-query";

type UseMutationHandlerParams<
    ResultType,
    ErrorType = unknown,
    VariablesType = void,
    ContextType = unknown
> = {
    mutationFn: MutationFunction<ResultType, VariablesType>;
    options?: UseMutationOptions<
        ResultType,
        ErrorType,
        VariablesType,
        ContextType
    >;
};

export const useUpdate = <
    ResultType,
    ErrorType = unknown,
    VariablesType = void,
    ContextType = unknown
>({
    mutationFn,
    options,
}: UseMutationHandlerParams<
    ResultType,
    ErrorType,
    VariablesType,
    ContextType
>) => {
    return useMutation<ResultType, ErrorType, VariablesType, ContextType>({
        mutationFn,
        ...options,
    });
};