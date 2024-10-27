import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBaseCurrency,
  fetchExchangeCurrency,
  fetchLatestRates,
} from './operations';

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    baseCurrency: '',
    exchangeInfo: null,
    isLoading: false,
    isError: null,
    rates: [],
  },
  reducers: {
    setBaseCurrency(state, action) {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBaseCurrency.fulfilled, (state, action) => {
        state.baseCurrency = action.payload;
      })
      .addCase(fetchExchangeCurrency.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchExchangeCurrency.fulfilled, (state, action) => {
        state.exchangeInfo = action.payload;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(fetchExchangeCurrency.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
        state.exchangeInfo = null;
      })
      .addCase(fetchLatestRates.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchLatestRates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rates = action.payload;
      })
      .addCase(fetchLatestRates.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
      });
  },
});
export const { setBaseCurrency } = currencySlice.actions;
export const currencyReduser = currencySlice.reducer;
