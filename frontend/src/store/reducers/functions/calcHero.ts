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

function enemiesRandomY() {
  return Math.floor(Math.random() * (300 - 100)) + 450;
}

function calcHero(state: IInitialState, action: IAction) {
  if (action.payload.hero.includes('d')) {
    if (state.hero.x < (state.display.width - state.hero.w)) {
      state.hero.x += state.hero.speed; // идет вправо
      if (action.payload.mouseCord) {
        if (action.payload.mouseCord[0] > state.hero.x) {
          state.hero.skin = '/animations/hero1move.gif'; // меняет скин при ходьбе
          state.hero.move = 1; // отзеркаливает скин
        } else {
          state.hero.skin = '/animations/hero1move.gif'; // меняет скин при ходьбе
          state.hero.move = -1; // отзеркаливает скин
        }
      } else {
        state.hero.skin = '/animations/hero1move.gif'; // меняет скин при ходьбе
        state.hero.move = -1; // отзеркаливает скин
      }
    }
  }
  if (action.payload.hero.includes('a')) {
    if (state.hero.x > 0) {
      state.hero.x -= state.hero.speed; // идет влево
      if (action.payload.mouseCord) {
        if (action.payload.mouseCord[0] < state.hero.x) {
          state.hero.skin = '/animations/hero1move.gif'; // меняет скин при ходьбе
          state.hero.move = -1; // отзеркаливает скин
        } else {
          state.hero.skin = '/animations/hero1move.gif'; // меняет скин при ходьбе
          state.hero.move = 1; // отзеркаливает скин
        }
      } else {
        state.hero.skin = '/animations/hero1move.gif'; // меняет скин при ходьбе
        state.hero.move = -1; // отзеркаливает скин
      }
    }
  }
  if (action.payload.hero.includes('w')) {
    if (state.hero.y > 300) {
      state.hero.y -= state.hero.speed; // идет вверх
      state.hero.skin = '/animations/hero1move.gif'; // меняет скин при ходьбе
      // state.hero.move = 1; // отзеркаливает скин
    }
  }
  if (action.payload.hero.includes('s')) {
    if (state.hero.y < (state.display.height - state.hero.h)) {
      state.hero.y += state.hero.speed; // идет вниз
      state.hero.skin = '/animations/hero1move.gif'; // меняет скин при ходьбе
      // state.hero.move = -1; // отзеркаливает скин
    }
  }
  if (action.payload.hero.includes('stop')) {
    if (action.payload.mouseCord) {
      if (action.payload.mouseCord[0] > state.hero.x) {
        state.hero.skin = '/animations/hero2.gif';
        state.hero.move = 1;
      } else {
        state.hero.skin = '/animations/hero2.gif';
        state.hero.move = -1;
      }
    }
  }
// console.log(action.payload.mouseCord);

  if (action.payload.hero.includes('shot')) {
    const [speedX, speedY, g] = calcBulletTrajectory(
      state,
      action.payload.mouseCord,
    ); // скорость пуль по Х и У
    state.bullets.push({
      id: uuidv4(),
      x: state.hero.x + state.hero.w / 2, // координата хиро по Х
      y: state.hero.y + state.hero.h / 2,
      w: state.bullet.w, // ширина пули
      h: state.bullet.h, // высота пули
      speedX, // скорость пуль по Х
      speedY, // скорость пуль по У
      damage: state.hero.damage, // нанисенный урон
      corner: g,
    });
  }
  if (action.payload.hero.includes('enemy')) { // рожает врагов
    if (state.gamePlay.countWaves === 1 && state.gamePlay.waves1Count < state.gamePlay.waves1) {
      const randomNum = Math.floor(Math.random() * (10 - 1)) + 1;
      if (randomNum < 6) {
        state.gamePlay.waves1Count += 1;
        state.enemies.push({
          id: uuidv4(),
          type: state.enemies1.type, // тип врага
          x: state.display.width + 50,
          y: enemiesRandomY(), // вертикаль
          w: state.enemies1.w, // высота
          h: state.enemies1.h, // ширина
          hp: +state.enemies1.hp, // здоровьее
          speed: state.enemies1.speed, // скорость перемещения
          damage: state.enemies1.damage, // урон
          coolDown: state.enemies1.coolDown, // скорость удара
          skin: '/animations/enemie0move.gif',
          move: 1,
          xp: state.enemies1.xp,
        });
      } else {
        state.gamePlay.waves1Count += 1;
        state.enemies.push({
          id: uuidv4(),
          type: state.enemies1.type, // тип врага
          x: -60, // горизонталь
          y: enemiesRandomY(), // вертикаль
          w: state.enemies1.w, // высота
          h: state.enemies1.h, // ширина
          hp: +state.enemies1.hp, // здоровьее
          speed: state.enemies1.speed, // скорость перемещения
          damage: state.enemies1.damage, // урон
          coolDown: state.enemies1.coolDown, // скорость удара
          skin: '/animations/enemie0move.gif',
          move: -1,
          xp: state.enemies1.xp,
        });
      }
    }
    if (state.gamePlay.countWaves === 2 && state.gamePlay.waves2Count < state.gamePlay.waves2) {
      const randomNum = Math.floor(Math.random() * (10 - 1)) + 1;
      if (randomNum < 6) {
        state.gamePlay.waves2Count += 1;
        state.enemies.push({
          id: uuidv4(),
          type: state.enemies2.type, // тип врага
          x: -50,
          y: enemiesRandomY(), // вертикаль
          w: state.enemies2.w, // высота
          h: state.enemies2.h, // ширина
          hp: +state.enemies2.hp, // здоровьее
          speed: state.enemies2.speed, // скорость перемещения
          damage: state.enemies2.damage, // урон
          coolDown: state.enemies2.coolDown, // скорость удара
          skin: '/animations/enemie1move.gif',
          move: -1,
          xp: state.enemies2.xp,
        });
      } else {
        state.gamePlay.waves2Count += 1;
        state.enemies.push({
          id: uuidv4(),
          type: state.enemies2.type, // тип врага
          w: state.enemies2.w, // высота
          h: state.enemies2.h, // ширина
          x: state.display.width + 50, // горизонталь
          y: enemiesRandomY(), // вертикаль
          // y: 200,
          hp: +state.enemies2.hp, // здоровьее
          speed: state.enemies2.speed, // скорость перемещения
          damage: state.enemies2.damage, // урон
          coolDown: state.enemies2.coolDown, // скорость удара
          skin: '/animations/enemie1move.gif',
          move: 1,
          xp: state.enemies2.xp,
        });
      }
    }
    if (state.gamePlay.countWaves === 3 && state.gamePlay.waves3Count < state.gamePlay.waves3) {
      const randomNum = Math.floor(Math.random() * (10 - 1)) + 1;
      if (randomNum < 6) {
        state.gamePlay.waves3Count += 1;
        state.enemies.push({
          id: uuidv4(),
          type: state.enemies3.type, // тип врага
          x: state.display.width + 50,
          y: enemiesRandomY(), // вертикаль
          w: state.enemies3.w, // высота
          h: state.enemies3.h, // ширина
          hp: +state.enemies3.hp, // здоровьее
          speed: state.enemies3.speed, // скорость перемещения
          damage: state.enemies3.damage, // урон
          coolDown: state.enemies3.coolDown, // скорость удара
          skin: '/animations/enemie2move.gif',
          move: 1,
          xp: state.enemies3.xp,
        });
      } else {
        state.gamePlay.waves3Count += 1;
        state.enemies.push({
          id: uuidv4(),
          type: state.enemies3.type, // тип врага
          x: -60, // горизонталь
          y: enemiesRandomY(), // вертикаль
          w: state.enemies3.w, // высота
          h: state.enemies3.h, // ширина
          hp: +state.enemies3.hp, // здоровьее
          speed: state.enemies3.speed, // скорость перемещения
          damage: state.enemies3.damage, // урон
          coolDown: state.enemies3.coolDown, // скорость удара
          skin: '/animations/enemie2move.gif',
          move: -1,
          xp: state.enemies3.xp,
        });
      }
    }
    if (state.gamePlay.countWaves === 3 && state.gameStats.killings
      === state.gamePlay.waves3 + state.gamePlay.waves2 + state.gamePlay.waves1
      && state.gamePlay.bossCount < state.gamePlay.boss) {
      state.gamePlay.bossCount += 1;
      state.enemies.push({
        id: uuidv4(),
        type: 4,
        x: -50,
        y: 500, // вертикаль
        w: state.enemies4.w, // высота
        h: state.enemies4.h, // ширина
        hp: state.enemies4.hp, // здоровьее
        speed: state.enemies4.speed, // скорость перемещения
        damage: state.enemies4.damage, // урон
        coolDown: state.enemies4.coolDown, // скорость удара
        skin: '/animations/enemie3move.gif',
        move: 1,
        xp: state.enemies4.xp,
      });
    }
  }
}
export default calcHero;
