import { useEffect, useState } from "react";

type FetchState<T> = {
  isLoading: boolean;
  data?: T;
  error?: Error;
};

export default function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ isLoading: true });

  useEffect(() => {
    const controller = new AbortController();
    setState({ isLoading: true });
    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: T) => setState({ isLoading: false, data }))
      .catch((error: Error) => {
        if (!controller.signal.aborted) {
          setState({ isLoading: false, error });
        }
      });
    return () => controller.abort();
  }, [url]);

  return state;
}
