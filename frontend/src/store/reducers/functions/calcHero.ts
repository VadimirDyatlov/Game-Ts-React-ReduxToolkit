import { v4 as uuidv4 } from 'uuid';
import { IInitialState } from '../../../models/types/ReducerTypes/game';
import calcBulletTrajectory from './calcBulletTrajectory';

interface IAction {
    payload: {
      hero: string[]
      mouseCord: number[]
      // cordMouseOver: number[]
    }
}

function calcHero(state: IInitialState, action: IAction) {
  if (action.payload.hero.includes('d')) {
    if (state.hero.x < (state.display.width - state.hero.w)) {
      state.hero.x += state.hero.speed; // идет вправо
      if (action.payload.mouseCord) {
        if (action.payload.mouseCord[0] > state.hero.x) {
          state.hero.skin = '/animations/hero4move.gif'; // меняет скин при ходьбе
          state.hero.move = 1; // отзеркаливает скин
        } else {
          state.hero.skin = '/animations/hero4move.gif'; // меняет скин при ходьбе
          state.hero.move = -1; // отзеркаливает скин
        }
      } else {
        state.hero.skin = '/animations/hero4move.gif'; // меняет скин при ходьбе
        state.hero.move = -1; // отзеркаливает скин
      }
    }
  }
  if (action.payload.hero.includes('a')) {
    if (state.hero.x > 0) {
      state.hero.x -= state.hero.speed; // идет влево
      if (action.payload.mouseCord) {
        if (action.payload.mouseCord[0] < state.hero.x) {
          state.hero.skin = '/animations/hero4move.gif'; // меняет скин при ходьбе
          state.hero.move = -1; // отзеркаливает скин
        } else {
          state.hero.skin = '/animations/hero4move.gif'; // меняет скин при ходьбе
          state.hero.move = 1; // отзеркаливает скин
        }
      } else {
        state.hero.skin = '/animations/hero4move.gif'; // меняет скин при ходьбе
        state.hero.move = -1; // отзеркаливает скин
      }
    }
  }
  if (action.payload.hero.includes('w')) {
    if (state.hero.y > 300) {
      state.hero.y -= state.hero.speed; // идет вверх
      state.hero.skin = '/animations/hero4move.gif'; // меняет скин при ходьбе
      // state.hero.move = 1; // отзеркаливает скин
    }
  }
  if (action.payload.hero.includes('s')) {
    if (state.hero.y < (state.display.height - state.hero.h)) {
      state.hero.y += state.hero.speed; // идет вниз
      state.hero.skin = '/animations/hero4move.gif'; // меняет скин при ходьбе
      // state.hero.move = -1; // отзеркаливает скин
    }
  }
  if (action.payload.hero.includes('stop')) {
    if (action.payload.mouseCord) {
      if (action.payload.mouseCord[0] > state.hero.x) {
        state.hero.skin = '/animations/test4.png';
        state.hero.move = 1;
      } else {
        state.hero.skin = '/animations/test4.png';
        state.hero.move = -1;
      }
    }
  }
// console.log(action.payload.mouseCord);

  if (action.payload.hero.includes('shot') && state.gameLoop - state.gamePlay.lastShoot > state.hero.rateOfFire) {
    state.gamePlay.lastShoot = state.gameLoop;
    const [speedX, speedY, g] = calcBulletTrajectory(
      state,
      action.payload.mouseCord,
      ); // скорость пуль по Х и У
      state.bulletsArray.push({
        id: uuidv4(),
        x: state.hero.x + state.hero.w / 2, 
        y: state.hero.y + state.hero.h / 2,
        w: state.bullet.w, // ширина пули
        h: state.bullet.h, // высота пули
        speedX, // скорость пуль по Х
        speedY, // скорость пуль по У
        damage: state.hero.damage, // нанисенный урон
        corner: g,
        visibility: true,
      });
  }
}
export default calcHero;
