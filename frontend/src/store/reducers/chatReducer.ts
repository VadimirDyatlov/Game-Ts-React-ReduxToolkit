import { createSlice } from '@reduxjs/toolkit';
import { IInitialState } from '../../models/types/ReducerTypes/chat';

const initialState: IInitialState = {
  messageHistory: [],
};

const userSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    getMessageHistory(state, action) {
      state.messageHistory = action.payload.allMessage;
    },
    getNewMessage(state, action) {
      state.messageHistory = [...state.messageHistory, action.payload.newMessage];
    },
  },

  extraReducers: {
  },
});

export const { getMessageHistory, getNewMessage } = userSlice.actions;

export default userSlice.reducer;
