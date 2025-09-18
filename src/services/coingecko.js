const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";

class CoinGeckoService {
  constructor() {
    this.apiUrl = COINGECKO_API_URL;
  }

  async apiCall(endpoint, params = {}) {
    const url = new URL(`${this.apiUrl}${endpoint}`);

    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined) {
        url.searchParams.append(key, params[key]);
      }
    });

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data from CoinGecko:", error);
      throw error;
    }
  }

  async getTokenPrices(tokenIds) {
    return this.apiCall("/coins/markets", {
      vs_currency: "usd",
      ids: tokenIds.join(","),
      order: "market_cap_desc",
      per_page: 50,
      page: 1,
      sparkline: true,
      price_change_percentage: "24h,7d",
    });
  }

  async searchTokens(query) {
    if (!query.trim()) return [];

    try {
      const result = await this.apiCall("/search", { query });

      const coinIds = result.coins.slice(0, 10).map((coin) => coin.id);
      if (coinIds.length > 0) {
        return this.getTokenPrices(coinIds);
      }
      return [];
    } catch (error) {
      console.error("Error searching tokens:", error);
      return [];
    }
  }

  async getTrendingTokens() {
    try {
      const trending = await this.apiCall("/search/trending");
      const coinIds = trending.coins.slice(0, 10).map((coin) => coin.item.id);

      if (coinIds.length > 0) {
        return this.getTokenPrices(coinIds);
      }
      return [];
    } catch (error) {
      console.error("Error fetching trending tokens:", error);
      return [];
    }
  }
}

const coinGeckoService = new CoinGeckoService();

export const getTokenPrices = (tokenIds) =>
  coinGeckoService.getTokenPrices(tokenIds);
export const searchTokens = (query) => coinGeckoService.searchTokens(query);
export const getTrendingTokens = () => coinGeckoService.getTrendingTokens();

export default coinGeckoService;
