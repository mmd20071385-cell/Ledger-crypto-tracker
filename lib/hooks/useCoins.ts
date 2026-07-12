import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  fetchCategories,
  fetchMarketChart,
  fetchMarkets,
  searchCoins,
} from "../api";

/** Top-level coin list: paginated, sortable, filterable by category. */
export function useMarkets(params: {
  page: number;
  category: string;
  sort: string;
  enabled?: boolean;
}) {
  const { page, category, sort, enabled = true } = params;

  return useQuery({
    queryKey: ["markets", { page, category, sort }],
    queryFn: () => fetchMarkets({ page, category, sort, perPage: 50 }),
    // Keep showing the previous page's rows while the next page loads,
    // instead of flashing a full loading state on every pagination click.
    placeholderData: keepPreviousData,
    enabled,
  });
}

/** Resolves a free-text query into coin ids via CoinGecko /search. */
export function useCoinSearch(debouncedQuery: string) {
  const query = debouncedQuery.trim();

  return useQuery({
    queryKey: ["search", query],
    queryFn: () => searchCoins(query),
    enabled: query.length >= 2,
    staleTime: 60_000,
  });
}

/** Full market data for a specific, known set of coin ids (from search). */
export function useMarketsByIds(ids: string[]) {
  const idsParam = ids.join(",");

  return useQuery({
    queryKey: ["marketsByIds", idsParam],
    queryFn: () => fetchMarkets({ ids: idsParam, perPage: ids.length || 1 }),
    enabled: ids.length > 0,
    placeholderData: keepPreviousData,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 60 * 60_000, // categories basically never change within a session
  });
}

export function useMarketChart(id: string | null, days: number) {
  return useQuery({
    queryKey: ["marketChart", id, days],
    queryFn: () => fetchMarketChart(id as string, days),
    enabled: Boolean(id),
    staleTime: 60_000,
  });
}
