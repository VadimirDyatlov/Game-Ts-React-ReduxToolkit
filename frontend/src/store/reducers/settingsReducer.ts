/* eslint-disable import/no-unresolved */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IInitialState, IPlayerStats } from '../../models/types/ReducerTypes/settings';
import { urlStore } from '../ApiUrlStore';

export const getPlayerStats = createAsyncThunk<IPlayerStats, void, { rejectValue: string }>(
  'settings/getPlayerStats',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(urlStore.GET_PLAYER_STATS);
      return res.data.playerStats as IPlayerStats;
    } catch (error) {
      let message: string;
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data.message;
      } else {
        message = String(error);
      }
      return rejectWithValue(message);
    }
  },
);

const initialState: IInitialState = {
  error: false,
  status: null,
  playerStats: {
    gamesPlayed: '0',
    killings: '0',
    gold: '0',
    time: '0',
  },
};

const userSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlayerStats.pending, (state) => {
        state.status = 'loading';
        state.error = false;
      })
      .addCase(getPlayerStats.fulfilled, (state, action) => {
        state.status = 'resolved';
        if (action.payload) {
          state.playerStats = action.payload;
        }
      })
      .addCase(getPlayerStats.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

export default userSlice.reducer;
