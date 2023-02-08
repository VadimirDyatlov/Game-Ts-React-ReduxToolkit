/* eslint-disable import/no-unresolved */
import * as React from 'react';
import { useEffect } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import usuAppDispatch from './hooks/useAppDispatch';
import useAppSelector from './hooks/useAppSelector';
import { getCheckSession } from './store/reducers/authReducer';
// import './styles/css/index.css';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import GameMenu from './pages/GameMenu';
// import Game from './pages/Game';
// import Upgrade from './pages/Upgrade';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
// import Chat from './pages/Chat';

function App() {
  const dispatch = usuAppDispatch();
  const user = useAppSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getCheckSession());
  }, [dispatch]);

  return (
    <BrowserRouter>
      {user
        ? (
          <Routes>
            <Route index element={<GameMenu />} />
            <Route path="signup" element={<Signup />} />
            <Route path="signin" element={<Signin />} />
            {/* <Route path="game" element={<Game />} /> */}
            {/* <Route path="upgrade" element={<Upgrade />} /> */}
            <Route path="statistics" element={<Statistics />} />
            <Route path="settings" element={<Settings />} />
            {/* <Route path="chat" element={<Chat />} /> */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <Routes>
            <Route index element={<GameMenu />} />
            <Route path="signup" element={<Signup />} />
            <Route path="signin" element={<Signin />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
    </BrowserRouter>
  );
}

export default App;

