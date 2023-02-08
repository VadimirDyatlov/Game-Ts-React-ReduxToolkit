import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';

const store = configureStore({
  reducer: {
    // game: gameReducer,
    auth: authReducer,
    // upgrade: upgradeReducer,
    // settings: settingsReducer,
    // statistics: statisticsReducer,
    // chat: chatReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
