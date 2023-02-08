import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  IGetHero, IInitialState, ISendUpgradeSkills, ISkills,
} from '../../models/types/ReducerTypes/upgrade';

import { urlStore } from '../ApiUrlStore';

export const getHeroUpgrade = createAsyncThunk<IGetHero, void, {rejectValue: string}>(
  'game/getHero',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(urlStore.GET_HERO);
      return res.data.hero as IGetHero;
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

export const sendUpgradeSkills = createAsyncThunk<ISkills,
 ISendUpgradeSkills, {rejectValue: string}>(
   'hero/sendUpgradeSkills',
   async (data, { rejectWithValue }) => {
     try {
       const res = await axios.post(urlStore.SEND_UPGRADE_SKILLS, data);
       return res.data.hero as ISkills;
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
  upSkillsСonstants: {
    hpUpdateArray: [
      100, 110, 120, 132, 144, 157, 170, 184, 199, 213, 228, 243, 257, 271, 285, 300,
    ],
    damageUpdateArray: [8, 10, 13, 16, 20, 25, 29, 33, 37, 41, 45, 49, 52, 56, 59, 62],
    speedUpdateArray: [4, 5, 6, 7],
    hpStartPrice: 30,
    damageStartPrice: 40,
    speedStartPrice: 50,
    hpPriceCoefficient: 1.05,
    damagePriceCoefficient: 1.1,
    speedPriceCoefficient: 1.07,
  },
  UpgradeGold: null,
  UpgradeHeroValue: {
    hp: null,
    damage: null,
    speed: null,
    lvl: null,
    type: null,
  },
  error: false,
  status: null,
};

const userSlice = createSlice({
  name: 'UpgradeHero',
  initialState,
  reducers: {
    getUserGold(state, action) {
      state.UpgradeGold = action.payload.gold;
    },
    UpgradeHp(state, action) {
      state.UpgradeHeroValue.hp = action.payload.hp;
      state.UpgradeGold = action.payload.gold;
    },
    UpgradeDamage(state, action) {
      state.UpgradeHeroValue.damage = action.payload.damage;
      state.UpgradeGold = action.payload.gold;
    },
    UpgradeSpeed(state, action) {
      state.UpgradeHeroValue.speed = action.payload.speed;
      state.UpgradeGold = action.payload.gold;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getHeroUpgrade.pending, (state) => {
        state.status = 'loading';
        state.error = false;
      })
      .addCase(getHeroUpgrade.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.UpgradeHeroValue = { ...state.UpgradeHeroValue, ...action.payload };
      })
      .addCase(getHeroUpgrade.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.error = action.payload;
        }
      })
      .addCase(sendUpgradeSkills.pending, (state) => {
        // state.status = 'loading';
        state.error = false;
      })
      .addCase(sendUpgradeSkills.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.UpgradeHeroValue = action.payload;
      })
      .addCase(sendUpgradeSkills.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

export const {
  UpgradeHp, UpgradeDamage, UpgradeSpeed, getUserGold,
} = userSlice.actions;

export default userSlice.reducer;
