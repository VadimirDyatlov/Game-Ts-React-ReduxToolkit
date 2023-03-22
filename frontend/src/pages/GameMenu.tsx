import React, { useCallback } from 'react';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { getUserLogOut } from '../store/reducers/authReducer';
import Li from '../components/gameMenu/Li';
import Loading from '../components/reused/Loading';

function GameMenu() {
  const { user, status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleClickLogOut = useCallback(() => {
    dispatch(getUserLogOut());
  }, []);
  return (
    <>
      {(status === 'loading' || status === null)  ? <Loading />
        : (
          <nav className="nes-container is-rounded is-dark">
            <menu className="game-menu">
              { user.name ? (
                <>
                  <Li path="/game" text="Play" />
                  <Li path="/upgrade" text="Upgrades" />
                  <Li path="/settings" text="Settings" />
                  <Li path="/chat" text="Chat" />
                  <Li path="/statistics" text="Statistics" />
                  <Li path="/signin" text="Exit" handleClickLogOut={handleClickLogOut} />
                </>
              ) : (
                <>
                  <Li path="/signin" text="Sign In" />
                  <Li path="/signup" text="Sign Up" />
                </>
              )}
            </menu>
          </nav>
        )}
    </>
  );
}

export default GameMenu;

