"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const usePromPromiseQuery = <T>(fetchFn?: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const lastFnRef = useRef<() => Promise<T> | undefined>(undefined);

  const execute = useCallback(async (fn?: () => Promise<T>) => {
    setLoading(true);
    setError(null);

    try {
      const functionToExecute = fn || lastFnRef.current;

      if (fn) lastFnRef.current = fn;

      if (!functionToExecute) {
        setLoading(false);
        throw new Error("No function to refetch");
      }

      const result = await functionToExecute();
      setData(result);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (fetchFn) {
      execute(fetchFn);
    }
  }, []);

  const onRefetch = useCallback(async () => {
    if (!lastFnRef.current) {
      console.warn("No function to refetch");
      return null;
    }
    return await execute(lastFnRef.current);
  }, [execute]);

  return {
    data,
    error,
    execute,
    loading,
    onRefetch,
  };
};

export { usePromPromiseQuery };
