import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import chatReducer from './reducers/chatReducer';
import gameReducer from './reducers/gameReducer';
import settingsReducer from './reducers/settingsReducer';
import statisticsReducer from './reducers/statisticsReducer';
import upgradeReducer from './reducers/upgradeReducer';

const store = configureStore({
  reducer: {
    game: gameReducer,
    auth: authReducer,
    upgrade: upgradeReducer,
    settings: settingsReducer,
    statistics: statisticsReducer,
    chat: chatReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
