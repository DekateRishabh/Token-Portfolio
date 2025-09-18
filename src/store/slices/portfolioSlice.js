import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTokenPrices } from "../../services/coingecko";

export const refreshTokenData = createAsyncThunk(
  "portfolio/refreshTokenData",
  async (tokenIds) => {
    const data = await getTokenPrices(tokenIds);
    return data;
  }
);

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    tokens: [],
    totalValue: 0,
    lastUpdated: null,
    loading: false,
    error: null,
  },
  reducers: {
    addToken: (state, action) => {
      const existingToken = state.tokens.find(
        (token) => token.id === action.payload.id
      );
      if (!existingToken) {
        state.tokens.push({ ...action.payload, holdings: 0 });
        portfolioSlice.caseReducers.calculateTotalValue(state);
      }
    },
    removeToken: (state, action) => {
      state.tokens = state.tokens.filter(
        (token) => token.id !== action.payload
      );
      portfolioSlice.caseReducers.calculateTotalValue(state);
    },
    updateHoldings: (state, action) => {
      const { tokenId, holdings } = action.payload;
      const token = state.tokens.find((token) => token.id === tokenId);
      if (token) {
        token.holdings = Math.max(0, parseFloat(holdings) || 0);
        portfolioSlice.caseReducers.calculateTotalValue(state);
      }
    },
    calculateTotalValue: (state) => {
      state.totalValue = state.tokens.reduce((total, token) => {
        return total + (token.holdings || 0) * (token.current_price || 0);
      }, 0);
    },
    setTokens: (state, action) => {
      state.tokens = action.payload;
      portfolioSlice.caseReducers.calculateTotalValue(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshTokenData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshTokenData.fulfilled, (state, action) => {
        state.loading = false;
        state.lastUpdated = Date.now();

        // Update token prices while preserving holdings
        action.payload.forEach((updatedToken) => {
          const existingToken = state.tokens.find(
            (token) => token.id === updatedToken.id
          );
          if (existingToken) {
            const currentHoldings = existingToken.holdings;
            Object.assign(existingToken, updatedToken);
            existingToken.holdings = currentHoldings;
          }
        });

        portfolioSlice.caseReducers.calculateTotalValue(state);
      })
      .addCase(refreshTokenData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  addToken,
  removeToken,
  updateHoldings,
  calculateTotalValue,
  setTokens,
} = portfolioSlice.actions;
export default portfolioSlice.reducer;
