import { createAsyncThunk } from '@reduxjs/toolkit';
import { exchangeCurrency, latestRates } from 'service/exchangeAPI';
import { getUserInfo } from 'service/opencagedataApi';

export const fetchBaseCurrency = createAsyncThunk(
  'currency/fetchCurrency',
  async (coords, thunkAPI) => {
    const state = thunkAPI.getState();
    const { baseCurrency } = state.currency;

    if (baseCurrency) {
      return thunkAPI.rejectWithValue('We already have base currency!');
    }
    try {
      const response = await getUserInfo(coords);
      return response.results[0].annotations.currency.iso_code;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchExchangeCurrency = createAsyncThunk(
  'currency/fetchExchangeCurrency',
  async (currency, thunkAPI) => {
    try {
      const response = await exchangeCurrency(currency);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchLatestRates = createAsyncThunk(
  'rates/fetchLatestRates',
  async (baseCurrency, thunkAPI) => {
    try {
      const response = await latestRates(baseCurrency);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
