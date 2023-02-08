import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IInitialState, IPlayersStats } from '../../models/types/ReducerTypes/statistics';
import { urlStore } from '../ApiUrlStore';

export const getPlayersStats = createAsyncThunk<IPlayersStats[], void, { rejectValue: string }>(
  'statistics/getPlayerStats',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(urlStore.GET_PLAYERS_STATS);
      return res.data.statistics as IPlayersStats[];
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
  playerStats: [],
  error: false,
  status: null,
};

const userSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlayersStats.pending, (state) => {
        state.status = 'loading';
        state.error = false;
      })
      .addCase(getPlayersStats.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.playerStats = action.payload;
      })
      .addCase(getPlayersStats.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

export default userSlice.reducer;
