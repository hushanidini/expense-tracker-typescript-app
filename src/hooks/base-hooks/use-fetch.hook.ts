import {
    useQuery,
    UseQueryOptions,
    QueryFunction,
    QueryKey,
} from "@tanstack/react-query";

type useFetchHookType<T> = {
    queryKey: QueryKey;
    queryFn: QueryFunction<T>;
    options?: UseQueryOptions<T>;
    id?: string | string[] | number;
    page?: number;
    per_page?: number;
    is_mobile?: boolean;
    paginate?: boolean;
    latest?: boolean;
    enabled?: boolean;
};

export const useFetch = <T>({
    queryKey,
    queryFn,
    options,
    id,
    page,
    per_page,
    is_mobile,
    paginate,
    latest,
    enabled = true, 
}: useFetchHookType<T>) => {
    const QueryKey = [queryKey, id, page, per_page, is_mobile, paginate, latest];

    return useQuery<T>({
        queryKey: QueryKey,
        queryFn,
        enabled: enabled,
        ...options,
    });
};
