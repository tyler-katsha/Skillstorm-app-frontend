import { useEffect, useState } from "react"

type FetchResult<T> = {
    data: T | null,
    loading: boolean,
    error: Error | null
}

export function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
        fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP request failed (returned status code ${response.status} "${response.statusText}")`);
            }
            return response.json();
        })
        .then((response) => {setData(response.json()) as T})
        .catch((e) => {
            const error = e as Error;
            console.assert(error instanceof Error);
            setError(error);
        })
        .finally(() => {setLoading(false)});
    });

    return {"data": data, "loading": loading, "error": error} as FetchResult<T>;
}