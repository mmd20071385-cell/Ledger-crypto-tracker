"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import TickerTape from "@/components/TickerTape";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import CoinTable from "@/components/CoinTable";
import Pagination from "@/components/Pagination";
import CoinDetailDrawer from "@/components/CoinDetailDrawer";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useCoinSearch, useMarkets, useMarketsByIds } from "@/lib/hooks/useCoins";
import { CoinFilters, MarketCoin } from "@/lib/types";

const DEFAULT_FILTERS: CoinFilters = {
  query: "",
  category: "all",
  minPrice: "",
  maxPrice: "",
  timeframe: "24h",
  changeDirection: "all",
  sort: "market_cap_desc",
};

function changeFor(coin: MarketCoin, timeframe: CoinFilters["timeframe"]): number {
  switch (timeframe) {
    case "1h":
      return coin.price_change_percentage_1h_in_currency ?? 0;
    case "24h":
      return coin.price_change_percentage_24h_in_currency ?? 0;
    case "7d":
      return coin.price_change_percentage_7d_in_currency ?? 0;
    case "30d":
      return coin.price_change_percentage_30d_in_currency ?? 0;
  }
}

export default function Home() {
  const [filters, setFilters] = useState<CoinFilters>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [selectedCoin, setSelectedCoin] = useState<MarketCoin | null>(null);

  const debouncedQuery = useDebounce(filters.query, 400);
  const isSearchMode = debouncedQuery.trim().length >= 2;

  function updateFilters(patch: Partial<CoinFilters>) {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1); // any filter change resets pagination
  }

  // --- Search mode: resolve free-text query to coin ids, then fetch full market data
  const searchResult = useCoinSearch(debouncedQuery);
  const searchIds = useMemo(
    () => (searchResult.data?.coins ?? []).slice(0, 25).map((c) => c.id),
    [searchResult.data]
  );
  const marketsByIds = useMarketsByIds(searchIds);

  // --- Browse mode: paginated, category-scoped market list
  const marketsList = useMarkets({
    page,
    category: filters.category,
    sort: "market_cap_desc", // baseline fetch order; display sort is applied client-side below
    enabled: !isSearchMode,
  });

  const activeQuery = isSearchMode ? marketsByIds : marketsList;
  const rawCoins = activeQuery.data ?? [];

  const filteredCoins = useMemo(() => {
    const min = filters.minPrice ? Number(filters.minPrice) : null;
    const max = filters.maxPrice ? Number(filters.maxPrice) : null;

    let list = rawCoins.filter((coin) => {
      if (min !== null && coin.current_price < min) return false;
      if (max !== null && coin.current_price > max) return false;

      const change = changeFor(coin, filters.timeframe);
      if (filters.changeDirection === "gainers" && change <= 0) return false;
      if (filters.changeDirection === "losers" && change >= 0) return false;

      return true;
    });

    list = [...list].sort((a, b) => {
      switch (filters.sort) {
        case "market_cap_desc":
          return b.market_cap - a.market_cap;
        case "market_cap_asc":
          return a.market_cap - b.market_cap;
        case "price_desc":
          return b.current_price - a.current_price;
        case "price_asc":
          return a.current_price - b.current_price;
        case "volume_desc":
          return b.total_volume - a.total_volume;
        case "change_desc":
          return changeFor(b, filters.timeframe) - changeFor(a, filters.timeframe);
        case "change_asc":
          return changeFor(a, filters.timeframe) - changeFor(b, filters.timeframe);
        default:
          return 0;
      }
    });

    return list;
  }, [rawCoins, filters]);

  const isLoading = isSearchMode
    ? searchResult.isLoading || marketsByIds.isLoading
    : marketsList.isLoading;
  const isError = isSearchMode
    ? searchResult.isError || marketsByIds.isError
    : marketsList.isError;

  return (
    <main className="min-h-screen">
      <TickerTape />
      <Header />

      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar
            value={filters.query}
            onChange={(query) => updateFilters({ query })}
            isSearching={filters.query.trim().length >= 2 && searchResult.isFetching}
          />
          <p className="font-body text-xs text-paper-faint">
            {isSearchMode
              ? `${filteredCoins.length} نتیجه برای «${debouncedQuery}»`
              : `نمایش ${filteredCoins.length} از ${rawCoins.length} در این صفحه`}
          </p>
        </div>

        <div className="mb-5">
          <FilterBar filters={filters} onChange={updateFilters} />
        </div>

        <CoinTable
          coins={filteredCoins}
          timeframe={filters.timeframe}
          isLoading={isLoading}
          isError={isError}
          onSelect={setSelectedCoin}
        />

        {!isSearchMode && (
          <Pagination
            page={page}
            onPageChange={setPage}
            disabled={marketsList.isFetching}
            canGoNext={rawCoins.length === 50}
          />
        )}
      </div>

      <CoinDetailDrawer coin={selectedCoin} onClose={() => setSelectedCoin(null)} />
    </main>
  );
}
