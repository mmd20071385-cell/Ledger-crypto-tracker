import {
  Category,
  MarketChartResponse,
  MarketCoin,
  SearchResponse,
} from "./types";

const BASE_URL = "https://api.coingecko.com/api/v3";

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { accept: "application/json" },
  });

  if (!res.ok) {
    if (res.status === 429) {
      throw new Error("درخواست‌ها توسط CoinGecko محدود شده‌اند — لطفاً کمی صبر کنید.");
    }
    throw new Error(`درخواست با خطا مواجه شد (${res.status})`);
  }

  return res.json() as Promise<T>;
}

export interface FetchMarketsParams {
  page?: number;
  perPage?: number;
  category?: string; // "all" to omit
  sort?: string; // CoinGecko "order" param, e.g. market_cap_desc
  ids?: string; // comma separated coin ids, used when searching
}

export function fetchMarkets({
  page = 1,
  perPage = 50,
  category,
  sort = "market_cap_desc",
  ids,
}: FetchMarketsParams): Promise<MarketCoin[]> {
  const params = new URLSearchParams({
    vs_currency: "usd",
    order: sort,
    per_page: String(perPage),
    page: String(page),
    sparkline: "true",
    price_change_percentage: "1h,24h,7d,30d",
  });

  if (category && category !== "all") {
    params.set("category", category);
  }
  if (ids) {
    params.set("ids", ids);
  }

  return getJSON<MarketCoin[]>(`${BASE_URL}/coins/markets?${params.toString()}`);
}

export function searchCoins(query: string): Promise<SearchResponse> {
  const params = new URLSearchParams({ query });
  return getJSON<SearchResponse>(`${BASE_URL}/search?${params.toString()}`);
}

export function fetchCategories(): Promise<Category[]> {
  return getJSON<Category[]>(`${BASE_URL}/coins/categories/list`);
}

export function fetchMarketChart(
  id: string,
  days: number | "max" = 7
): Promise<MarketChartResponse> {
  const params = new URLSearchParams({
    vs_currency: "usd",
    days: String(days),
  });
  return getJSON<MarketChartResponse>(
    `${BASE_URL}/coins/${id}/market_chart?${params.toString()}`
  );
}
