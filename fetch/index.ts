import { useState } from "react";

export interface FetchState<T> {
  list: T[];
  item: T | undefined;
  loading: boolean;
  error: boolean;
  empty: boolean;
  activeId: bigint | undefined;
  setList: React.Dispatch<React.SetStateAction<T[]>>;
  setItem: React.Dispatch<React.SetStateAction<T | undefined>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveId: React.Dispatch<React.SetStateAction<bigint | undefined>>;
}

export function useFetchState<T>(): FetchState<T> {1
  const [list, setList] = useState<T[]>([]);
  const [item, setItem] = useState<T | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<bigint>();

  return {
    list,
    item,
    error,
    loading,
    empty: list.length === 0 && item === undefined,
    activeId,
    setList,
    setItem,
    setError,
    setLoading,
    setActiveId,
  };
}
