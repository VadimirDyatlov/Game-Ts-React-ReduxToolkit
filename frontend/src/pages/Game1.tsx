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

function Push(w: string, arr: string[]): void {
  if (!arr.includes(w)) {
    arr.push(w)
  }
}

function Game() {
  console.log('render');
  
  const dispatch = useAppDispatch();
  const gameRef = useRef<HTMLDivElement>(null);
  const { user } = useAppSelector((state) => state.auth);
  const {
    status,
    enemiesArray,
    bloodArray,
    deadBodyArray,
    bulletsArray,
    hero,
    backgroundPositionLeft,
    goldsArray,
    gamePlay,
    gameStats,
  } = useAppSelector((state) => state.game);
  // const [passageWaves, setPassageWaves] = useState(1);
  const [playGame, setPlayGame] = useState('play');
  const [arrowRight, setArrowRight] = useState(false);
  const [arrowLeft, setArrowLeft] = useState(false);
  const [arrowUp, setArrowUp] = useState(false);
  const [arrowDown, setArrowDown] = useState(false);
  // // const [shot, setShot] = useState(false);
  // const [timeBullet, seTimeBullet] = useState(Date.now());
  // const [timeEnemy, setTimeEnemy] = useState(Date.now());
  // const [shoot, setShoot] = useState(false);
  const [mouseCord, setMouseCord] = useState<number[]>([]);
  // // const [cordMouseOver, setCordMouseOver] = useState<number[]>([]);
  const [timeoutFlag, setTimeoutFlag] = useState(false);
  // const [gameStartTime, setGameStartTime] = useState(0);
  // const [mFlag, setmFlag] = useState(false);
  const [arrayPressedButtons, setArrayPressedButtons] = useState<string[]>([])

  const arr: string[] = []
console.log(arr)
  const handleKeyDown = (event: KeyboardEvent): void => {
    // if (event.key === 'd' || event.key === 'в') setArrowRight(true);
    if (event.key === 'd' || event.key === 'в') {
      Push('d', arr) // arr.push('d');
      setArrayPressedButtons(['d'])
      console.log(arrayPressedButtons, 321)
    }
    if (event.key === 'a' || event.key === 'ф') {
      setArrowLeft(true);
      console.log(arrowLeft)
    }
    if (event.key === 'w' || event.key === 'ц') setArrowUp(true);
    if (event.key === 's' || event.key === 'ы') setArrowDown(true);
    // if (event.key === ' ') setShot(true);
  };

  const handleKeyUp = (event: KeyboardEvent): void => {
    if (event.key === 'd' || event.key === 'в') arr.splice(arr.indexOf('d'), 1);
    if (event.key === 'a' || event.key === 'ф') setArrowLeft(false);
    if (event.key === 'w' || event.key === 'ц') setArrowUp(false);
    if (event.key === 's' || event.key === 'ы') setArrowDown(false);
    // if (event.key === ' ') setShot(false);
  };

  // const handleMouseDown = (event: MouseEvent): void => {
  //   setShoot(true);
  // };

  // const handleMouseUp = () => {
  //   setShoot(false);
  // };

  // const handleMouseMove = (event: MouseEvent): void => {
  //   if (timeoutFlag && mFlag) {
  //     setmFlag(false);
  //     setMouseCord([event.clientX - 56, event.clientY - 35]);
  //   }
    
  // };

  useEffect(() => {
    dispatch(getHero());
    // setGameStartTime(new Date().getTime());
    // gameRef.current?.focus();
    dispatch(
      getDisplay({
        width: gameRef.current?.offsetWidth,
        height: gameRef.current?.offsetHeight,
      }),
    );
  }, []);

  //главный
  useEffect(() => {
    console.log('effect');
    
    const pressedButtons: any = [];
    // const mouseCord = [];

    // if (shoot) {
    //   if (Date.now() - timeBullet > 180) { // 300 в ориг
    //     pressedButtons.push('shot');
    //     seTimeBullet(Date.now);
    //   }
    // }

    if (arrowRight && playGame === 'play') pressedButtons.push('d');
    if (arrowLeft && playGame === 'play') pressedButtons.push('a');
    if (arrowUp && playGame === 'play') pressedButtons.push('w');
    if (arrowDown && playGame === 'play') pressedButtons.push('s');
    if (!arrowRight && !arrowLeft && !arrowUp && !arrowDown) {
      pressedButtons.push('stop');
    }


    // if (Date.now() - timeEnemy > gamePlay.coolDownEnemies && playGame === 'play') { // odin
    //   pressedButtons.push('enemy');
    //   setTimeEnemy(Date.now());
    // }



    // логика завершения игры
    if (hero.hp <= 0) {
      setPlayGame('game-over');
    }
    // логика смены волн врагов
    // if (playGame === 'play') {
    // dispatch(updateFrame({ hero: arr, mouseCord }));
    console.log('-->', arr);
    
    // if (playGame === 'play' || playGame === 'waiting') {
      setTimeout(() => {
        setTimeoutFlag((prev) => !prev);
      }, 1000);
      // setmFlag(true);// ??
    // }
  }, [timeoutFlag]);


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
                  // onMouseDown={handleMouseDown}
                  // onMouseUp={handleMouseUp}
                  // onMouseMove={handleMouseMove}
                  style={{
                    backgroundPosition: backgroundPositionLeft,
                  }}
                >
                  <GameBar />
                  {playGame === 'play' && (
                  <>
                    <Hero />
                    {/* <Column /> */}
                    {bulletsArray && bulletsArray.map((bullet) => (
                      <Bullet
                        key={bullet.id}
                        bullet={bullet}
                      />
                    ))}
                    {enemiesArray && enemiesArray.map((enemy) => <Enemy key={enemy.id} enemy={enemy} />)}
                    {goldsArray && goldsArray.map((coin) => <GoldCoin key={coin.id} coin={coin} />)}
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
