import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  IAuthInitialState, IEditUserData, IUserLogOut, IUserResponse, IUserSingUp, UserSingIn,
} from '../../models/types/ReducerTypes/auth';
import { urlStore } from '../ApiUrlStore';

export const getCheckSession = createAsyncThunk<IUserResponse, void, { rejectValue: string }>(
  'auth/getCheckSession',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(urlStore.CHECK_SESSION);
      return res.data as IUserResponse;
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

export const getUserSingUp = createAsyncThunk<IUserResponse, IUserSingUp, { rejectValue: string }>(
  'auth/getUserSingUp',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(urlStore.SING_UP, data);
      return res.data as IUserResponse;
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

export const getUserSingIn = createAsyncThunk<IUserResponse, UserSingIn, { rejectValue: string }>(
  'auth/getUserSingIn',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(urlStore.SING_IN, data);
      return res.data as IUserResponse;
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

export const getUserLogOut = createAsyncThunk<IUserLogOut, void, { rejectValue: string }>(
  'auth/getUserLogOut',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(urlStore.LOG_OUT);
      return res.data as IUserLogOut;
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

export const editUserData = createAsyncThunk<IEditUserData, IEditUserData, { rejectValue: string }>(
  'settings/changeUserData',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(urlStore.EDIT_USER_DATA, data);
      return res.data as IEditUserData;
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

const initialState: IAuthInitialState = {
  user: {},
  error: false,
  status: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError(state) {
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getCheckSession.pending, (state) => {
        state.status = 'loading';
        state.error = false;
      })
      .addCase(getCheckSession.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.user = action.payload.user;
      })
      .addCase(getCheckSession.rejected, (state) => {
        state.status = 'rejected';
        state.user = {};
        // if (action.payload) {
        //   state.error = action.payload;
        // }
      })

      .addCase(getUserSingUp.pending, (state) => {
        state.status = 'loading';
        state.error = false;
      })
      .addCase(getUserSingUp.fulfilled, (state, action) => {
        state.status = 'resolved';
        if (action.payload.user) {
          state.user = action.payload.user;
        }
      })
      .addCase(getUserSingUp.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.error = action.payload;
        }
      })

      .addCase(getUserSingIn.pending, (state) => {
        state.status = 'loading';
        state.error = false;
      })
      .addCase(getUserSingIn.fulfilled, (state, action) => {
        state.status = 'resolved';
        if (action.payload.user) {
          state.user = action.payload.user;
        }
      })
      .addCase(getUserSingIn.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.error = action.payload;
        }
      })

      .addCase(getUserLogOut.pending, (state) => {
        state.status = 'loading';
        state.error = false;
      })
      .addCase(getUserLogOut.fulfilled, (state) => {
        state.status = 'resolved';
        state.user = {};
      })
      .addCase(getUserLogOut.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.error = action.payload;
        }
      })

      .addCase(editUserData.pending, (state) => {
        // state.status = 'loading';
        state.error = false;
      })
      .addCase(editUserData.fulfilled, (state, action) => {
        state.status = 'resolved';
        if (action.payload.name) {
          state.user.name = action.payload.name;
        }
      })
      .addCase(editUserData.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

export const { setError } = authSlice.actions;

export default authSlice.reducer;
