import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import calcHero from './functions/calcHero';
import calcBullets from './functions/calcBullets';
import calcEnemies from './functions/calcEnemies';
import calcBlood from './functions/calcBlood';
import calcCollisionsEnemie from './functions/calcCollisionsEnemie';
import calcCollisionBullets from './functions/calcCollisionBullets';
import upGameLoop from './functions/upGameLoop';
import calcGoldCoin from './functions/calcCollisionsGold';
import { IGetHero, IInitialState, ISendGameStats } from '../../models/types/ReducerTypes/game';
import { urlStore } from '../ApiUrlStore';
import calcDeadBody from './functions/calcDeadBody';
import calcHandAngle from './functions/calcHandAngle';
import factoryEnemies from './functions/factoryEnemies';

export const getHero = createAsyncThunk<IGetHero, void, {rejectValue: string}>(
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

export const sendGameStats = createAsyncThunk<string, ISendGameStats, {rejectValue: string}>(
  'game/roundstats',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(urlStore.SEND_ROUND_SRATS, data);
      return res.data.message as string;
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
  error: false,
  status: null,
  gamePlay: {
    waves1: 10, // кол-во мобов
    waves1Count: 0,
    waves2: 14, // кол-во мобов
    waves2Count: 0,
    waves3: 20, // кол-во мобов
    waves3Count: 0,
    boss: 1,
    bossCount: 0,
    countWaves: 1,
    coolDownEnemies: 1500,
    coolDownBullet: 7,
    droppedGoldType1: 5,
    droppedGoldType2: 10,
    droppedGoldType3: 15,
    droppedGoldType4: 100,
    lastShoot: 0
  },
  gameStats: {
    // объект для сбора статистики за игру
    killings: 0,
    gold: 0,
    gameTime: 0,
  },
  hero: {
    x: 500,
    y: 500,
    w: 180, 
    h: 180, 
    hp: 1,
    type: 0,
    lvl: 0,
    damage: 0,
    speed: 0,
    move: 1,
    skin: '/animations/hero1.gif',
    rateOfFire: 3,
    corner: 0,
  },
  enemiesArray: [], // массив врагов
  enemies1: {
    id: '',
    type: 1,
    w: 120, // высота
    h: 120, // ширина
    x: 500, // горизонталь
    y: 300, // вертикаль
    hp: 50, // здоровье
    speed: 5, // скорость
    damage: 5, // урон
    coolDown: 35, // скорость удара
    skin: '/animations/enemie0move.gif',
    move: 1,
    xp: 26,
    bloodSkin: '/animations/explosion1.gif',
    deadSkin: '/animations/enemie0dead.gif',
  },
  enemies2: {
    id: '',
    type: 2,
    w: 180, // высота
    h: 180, // ширина
    x: 600, // горизонталь
    y: 45, // вертикаль
    hp: 80, // здоровье
    speed: 6, // скорость
    damage: 8, // урон
    coolDown: 30, // скорость удара
    skin: '/animations/enemie1move.gif',
    move: 1,
    xp: 32,
    bloodSkin: '/animations/explosion1.gif',
    deadSkin: '/animations/enemie1deeth.gif',
  },
  enemies3: {
    id: '',
    type: 3,
    w: 200, // высота
    h: 200, // ширина
    x: 600, // горизонталь
    y: 30, // вертикаль
    hp: 180, // здоровье
    speed: 8,
    damage: 12, // урон
    coolDown: 30, // скорость удара
    skin: '/animations/enemie2move.gif',
    move: 1,
    xp: 48,
    bloodSkin: '/animations/explosion1.gif',
    deadSkin: '',
  },
  enemies4: {
    id: '',
    type: 4,
    w: 350, // высота
    h: 350, // ширина
    x: 400, // горизонталь
    y: 50, // вертикаль
    hp: 2000, // здоровье
    speed: 26,
    damage: 30, // урон
    coolDown: 50, // скорость удара
    skin: '/animations/enemie3move.gif',
    move: 1,
    xp: 300,
    bloodSkin: '/animations/explosion1.gif',
    deadSkin: '',
  },
  goldsArray: [], // массив монет
  gold: {
    id: '',
    x: 50,
    y: 70,
    h: 50,
    w: 50,
    skin: '/animations/gold.gif',
    value: 0,
  },
  bulletsArray: [], // массив пуль
  bullet: {
    id: '',
    x: 0, // координата хиро по Х
    y: 0, // координата хиро по У
    w: 12, // ширина пули
    h: 3, // высота пули
    speed: 50,
    speedX: 0, // скорость пуль по Х
    speedY: 0, // скорость пуль по У
    damage: 0, // нанисенный урон
    corner: 0, // угол разворота
    visibility: true,
  },
  bloodArray: [],
  blood: {
    id: '',
    x: 0,
    y: 0,
    w: 100,
    h: 100,
    skin: '',
    lifetime: 10,
    move: 0,
  },
  deadBodyArray: [],
  deadBody: {
    id: '',
    x: 0,
    y: 0,
    w: 1 * 0.7,
    h: 1 * 0.7,
    skin: '',
    lifetime: 10,
    move: 0,
  },
  gameLoop: 0, // игровой цик
  display: {
    // размеры экрана игрока
    width: 0,
    height: 0,
  },
  backgroundPositionLeft: 0, // начальные координаты локации
  calcEnemiesFlag: false,
  calcEnemiesFlag1: false,
  // column: {
  //   x: 600,
  //   y: 200,
  //   h: 300,
  //   w: 300,
  //   skin: '/img/column1.png',
  // },
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    gameOverTime(state, action) {
      state.gameStats.gameTime = action.payload.gameTime;
    },
    deleteAllGolds(state) {
      state.goldsArray = [];
    },
    deleteAllEnemies(state) {
      state.enemiesArray = [];
    },
    // логика движения игрока при смены локации чтобы он проходил в ворота
    updatePositionhero(state) {
      if (state.hero.y < 450) {
        if (state.hero.y !== 450) {
          state.hero.y += 5;
        }
      } else if (state.hero.y !== 600) {
        state.hero.y -= 5;
      }
    },
    // передвижение бэкграунда при прохождении первой волны
    updateBackgroundWaves2(state) {
      if (state.backgroundPositionLeft > -2800) {
        state.backgroundPositionLeft -= 20;
        state.hero.skin = '/animations/hero1move.gif';
        state.hero.move = 1;
        // state.column.x -= 10;
      }
    },
    // передвижение бэкграунда при прохождении второй волны
    updateBackgroundWaves3(state) {
      if (state.backgroundPositionLeft > -5800) {
        state.backgroundPositionLeft -= 20;
        state.hero.skin = '/animations/hero1move.gif';
        state.hero.move = 1;
      }
    },
    // записывает координаты экрана юзера
    getDisplay(state, action) {
      state.display.height = action.payload.height;
      state.display.width = action.payload.width;
    },
    // обновлят игроавую волну
    updateWaves(state) {
      state.gamePlay.countWaves += 1;
    },
    updateFrame(state, action) {
      upGameLoop(state); // прибовляет 1 каждый цикл;
      calcEnemies(state); // рассчитывает поведение мобов
      calcHero(state, action); // рассчитывает функционал героя, внутри скорость пуль по Х и У
      calcBlood(state);
      calcDeadBody(state)
      factoryEnemies(state, action);
      calcBullets(state); // рассчитыввает длинну полета пули
      calcCollisionsEnemie(state); // рассчит контакт героя и моба
      calcCollisionBullets(state); // рассчитывает контакт моба и пули
      calcGoldCoin(state);
      calcHandAngle(state, action.payload.mouseCord)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHero.pending, (state) => {
        state.status = 'loading';
        state.error = false;
      })
      .addCase(getHero.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.hero = { ...state.hero, ...action.payload };
      })
      .addCase(getHero.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

export const {
  gameOverTime,
  getDisplay,
  updateFrame,
  updateWaves,
  updateBackgroundWaves2,
  updateBackgroundWaves3,
  updatePositionhero,
  deleteAllEnemies,
  deleteAllGolds,
} = gameSlice.actions;

export default gameSlice.reducer;
