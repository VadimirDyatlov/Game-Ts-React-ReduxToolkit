/* eslint-disable import/no-unresolved */
import React from 'react';
// import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
// import { getUserLogOut } from '../store/reducers/authReducer';
// import Li from '../components/gameMenu/Li';
// import Loading from '../components/reused/Loading';

function GameMenu() {
  const { user, status } = useAppSelector((state) => state.auth);
  // const dispatch = useAppDispatch();
  // const handleClickLogOut = useCallback(() => {
  //   dispatch(getUserLogOut());
  // }, []);
  return (
    <>
      { status === 'loading'
        ? 
        123
        // <Loading />
        : (
          <nav className="nes-container is-rounded is-dark">
            <menu className="game-menu">
              { user.name ? (
                <>
                 <li>
                  123
                 </li>
                  {/* <Li path="/game" text="Начать игру" />
                  <Li path="/upgrade" text="Улучшить героя" />
                  <Li path="/settings" text="Настройки профиля" />
                  <Li path="/chat" text="Войти в чат" />
                  <Li path="/statistics" text="Рейтинг игроков" /> */}
                  {/* <Li path="/signin" text="Сменить пользователя" handleClickLogOut={handleClickLogOut} /> */}
                </>
              ) : (
                <>
                  <li>
                  123
                 </li>
                  {/* <Li path="/signin" text="Войти" />
                  <Li path="/signup" text="Зарегистрироваться" /> */}
                </>
              )}
            </menu>
          </nav>
        )}
    </>
  );
}

export default GameMenu;

