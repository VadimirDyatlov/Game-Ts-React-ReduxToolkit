/* eslint-disable import/no-unresolved */
import React, {
  useRef, useState, useEffect, MouseEvent, KeyboardEvent,
} from 'react';
import { Navigate } from 'react-router-dom';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import Hero from '../components/game/Hero';
import GameBar from '../components/game/GameBar';
import Bullet from '../components/game/Bullet';
import Enemy from '../components/game/Enemy';
import GoldCoin from '../components/game/GoldCoin';
import GameOver from '../components/game/GameOver';
import Loading from '../components/reused/Loading';
// import Column from '../Column/Column';
import {
  getHero,
  getDisplay,
  updateFrame,
  sendGameStats,
  gameOverTime,
  updateWaves,
  updateBackgroundWaves2,
  updateBackgroundWaves3,
  updatePositionhero,
  deleteAllGolds,
} from '../store/reducers/gameReducer';

function Game() {
  // console.log('render');
  
  const dispatch = useAppDispatch();
  const gameRef = useRef<HTMLDivElement>(null);
  const { user } = useAppSelector((state) => state.auth);
  const {
    status,
    enemies,
    bullets,
    hero,
    backgroundPositionLeft,
    golds,
    gamePlay,
    gameStats,
  } = useAppSelector((state) => state.game);
  const [passageWaves, setPassageWaves] = useState(1);
  const [playGame, setPlayGame] = useState('play');
  const [arrowRight, setArrowRight] = useState(false);
  const [arrowLeft, setArrowLeft] = useState(false);
  const [arrowUp, setArrowUp] = useState(false);
  const [arrowDown, setArrowDown] = useState(false);
  // const [shot, setShot] = useState(false);
  const [timeBullet, seTimeBullet] = useState(Date.now());
  const [timeEnemy, setTimeEnemy] = useState(Date.now());
  const [shoot, setShoot] = useState(false);
  const [mouseCord, setMouseCord] = useState<number[]>([]);
  // const [cordMouseOver, setCordMouseOver] = useState<number[]>([]);
  const [timeoutFlag, setTimeoutFlag] = useState(false);
  const [gameStartTime, setGameStartTime] = useState(0);
  const [mFlag, setmFlag] = useState(false);

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'd' || event.key === 'в') setArrowRight(true);
    if (event.key === 'a' || event.key === 'ф') setArrowLeft(true);
    if (event.key === 'w' || event.key === 'ц') setArrowUp(true);
    if (event.key === 's' || event.key === 'ы') setArrowDown(true);
    // if (event.key === ' ') setShot(true);
  };

  const handleKeyUp = (event: KeyboardEvent): void => {
    if (event.key === 'd' || event.key === 'в') setArrowRight(false);
    if (event.key === 'a' || event.key === 'ф') setArrowLeft(false);
    if (event.key === 'w' || event.key === 'ц') setArrowUp(false);
    if (event.key === 's' || event.key === 'ы') setArrowDown(false);
    // if (event.key === ' ') setShot(false);
  };

  const handleMouseDown = (event: MouseEvent): void => {
    setShoot(true);
  };

  const handleMouseUp = () => {
    setShoot(false);
  };

  const handleMouseMove = (event: MouseEvent): void => {
    if (timeoutFlag && mFlag) {
      setmFlag(false);
      setMouseCord([event.clientX - 56, event.clientY - 35]);
    }
    
  };

  useEffect(() => {
    dispatch(getHero());
    setGameStartTime(new Date().getTime());
    // gameRef.current?.focus();
    dispatch(
      getDisplay({
        width: gameRef.current?.offsetWidth,
        height: gameRef.current?.offsetHeight,
      }),
    );
  }, []);

  // главный
  useEffect(() => {
    const pressedButtons = [];
    // const mouseCord = [];

    if (shoot) {
      if (Date.now() - timeBullet > 180) {
        pressedButtons.push('shot');
        seTimeBullet(Date.now);
      }
    }

    if (arrowRight && playGame === 'play') pressedButtons.push('d');
    if (arrowLeft && playGame === 'play') pressedButtons.push('a');
    if (arrowUp && playGame === 'play') pressedButtons.push('w');
    if (arrowDown && playGame === 'play') pressedButtons.push('s');
    if (!arrowRight && !arrowLeft && !arrowUp && !arrowDown) {
      pressedButtons.push('stop');
    }
    // логика скорострельности
    // if (shot && playGame === 'play') {
    //   if (Date.now() - timeBullet > gamePlay.coolDownBullet) {
    //     pressedButtons.push(' ');
    //     seTimeBullet(Date.now);
    //   }
    // }
    // логика появления врагов
    if (Date.now() - timeEnemy > gamePlay.coolDownEnemies && playGame === 'play') {
      pressedButtons.push('enemy');
      setTimeEnemy(Date.now());
    }
    // логика завершения игры
    if (hero.hp <= 0) {
      setPlayGame('game-over');
    }
    // логика смены волн врагов
    if (playGame === 'play') {
      if (gameStats.killings === gamePlay.waves1 && passageWaves === 1 && hero.x > 1050) {
        // меняет стейт для ожидание смены локации
        setPlayGame('waiting');
        // увеличевает волну
        dispatch(updateWaves());
        // стейт чтобы предотвартить заход в этот if каждыем 20 млск
        setPassageWaves(2);
      }

      if (
        gameStats.killings === gamePlay.waves2 + gamePlay.waves1
        && passageWaves === 2
        && hero.x > 1050
      ) {
        // меняет стейт для ожидание смены локации
        setPlayGame('waiting');
        // увеличевает волну
        dispatch(updateWaves());
        // стейт чтобы предотвартить заход в этот if каждыем 20 млск
        setPassageWaves(3);
      }
      // логика выгрыша
      if (
        gameStats.killings
        === gamePlay.waves2 + gamePlay.waves1 + gamePlay.waves3 + gamePlay.boss
      ) {
        setPlayGame('win');
      }
    }
    // главный диспатчэ
    // console.log(mouseCord);
    
    dispatch(updateFrame({ hero: pressedButtons, mouseCord }));

    // логика для смены локации при прохождении первой волны
    if (playGame === 'waiting' && gamePlay.countWaves === 2) {
      dispatch(deleteAllGolds());
      // переходт на вторую локацию
      dispatch(updateBackgroundWaves2());
      // меняет позицию героя для прохождения в ворота
      dispatch(updatePositionhero());
      // когда анимация смены локации закончилась меням стейт снова на 'play'
      if (backgroundPositionLeft === -2800) {
        setPlayGame('play');
      }
    }
    // логика для смены локации при прохождении первой волны
    if (playGame === 'waiting' && gamePlay.countWaves === 3) {
      dispatch(deleteAllGolds());
      // переходт на третью локацию
      dispatch(updateBackgroundWaves3());
      // меняет позицию героя для прохождения в ворота
      dispatch(updatePositionhero());
      // когда анимация смены локации закончилась меням стейт снова на 'play'
      if (backgroundPositionLeft === -5800) {
        setPlayGame('play');
      }
    }
    // перерендриваем компонет каждые 20 млск чтобы играть
    if (playGame === 'play' || playGame === 'waiting') {
      setTimeout(() => {
        setTimeoutFlag((prev) => !prev);
      }, 50);
      setmFlag(true);
    }
  }, [timeoutFlag]);

  useEffect(() => {
    // логика завершения игры
    if (playGame === 'game-over' || playGame === 'win') {
      const gameStopTime = new Date().getTime();
      const gameTime = gameStopTime - gameStartTime;
      dispatch(gameOverTime({ gameTime }));
      dispatch(sendGameStats({
        heroStats: { lvl: hero.lvl, type: hero.type },
        gameStats: { ...gameStats, gameTime },
      }));
    }
  }, [playGame]);
  return (
    <>
      {status === 'loading' ? <Loading />
        : (
          <>
            {user.name
              ? (
                <div
                  ref={gameRef}
                  className="game-box"
                  tabIndex={-1}
                  role="menu"
                  onKeyDown={handleKeyDown}
                  onKeyUp={handleKeyUp}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                  style={{
                    backgroundPosition: backgroundPositionLeft,
                  }}
                >
                  <GameBar />
                  {playGame === 'play' && (
                  <>
                    <Hero />
                    {/* <Column /> */}
                    {bullets && bullets.map((bullet) => (
                      <Bullet
                        key={bullet.id}
                        bullet={bullet}
                      />
                    ))}
                    {enemies && enemies.map((enemy) => <Enemy key={enemy.id} enemy={enemy} />)}
                    {golds && golds.map((coin) => <GoldCoin key={coin.id} coin={coin} />)}
                  </>
                  )}
                  {(playGame === 'game-over' || playGame === 'win') && <GameOver playGame={playGame} />}
                  {playGame === 'waiting' && (
                    <Hero />
                  )}
                </div>
              )
              : <Navigate to="/" />}
          </>
        )}
    </>
  );
}

export default Game;
