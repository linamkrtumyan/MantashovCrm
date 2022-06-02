import { useMemo } from "react";
import { useLocation } from "react-router-dom";
export function useQuery() {
  const { searchValue } = useLocation();

  return useMemo(() => new URLSearchParams(searchValue), [searchValue]);
}
