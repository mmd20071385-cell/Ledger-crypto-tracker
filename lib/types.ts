export interface MarketCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_percentage_1h_in_currency?: number | null;
  price_change_percentage_24h_in_currency?: number | null;
  price_change_percentage_7d_in_currency?: number | null;
  price_change_percentage_30d_in_currency?: number | null;
  circulating_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  sparkline_in_7d?: { price: number[] };
  last_updated: string;
}

export interface SearchCoin {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number | null;
  thumb: string;
  large: string;
}

export interface SearchResponse {
  coins: SearchCoin[];
}

export interface Category {
  category_id: string;
  name: string;
}

export interface MarketChartResponse {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export type TimeFrame = "1h" | "24h" | "7d" | "30d";

export type SortKey =
  | "market_cap_desc"
  | "market_cap_asc"
  | "price_desc"
  | "price_asc"
  | "volume_desc"
  | "change_desc"
  | "change_asc";

export interface CoinFilters {
  query: string;
  category: string; // "all" | category_id
  minPrice: string;
  maxPrice: string;
  timeframe: TimeFrame;
  changeDirection: "all" | "gainers" | "losers";
  sort: SortKey;
}
