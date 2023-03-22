import { v4 as uuidv4 } from 'uuid';
import { IInitialState } from '../../../models/types/ReducerTypes/game';

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

function factoryEnemies(state: IInitialState, action: IAction) {
  if (action.payload.hero.includes('enemy')) { // рожает врагов
    // state.enemiesArray.push({
    //     id: uuidv4(),
    //     type: state.enemies1.type, // тип врага
    //     x: 500,
    //     y: 700,
    //     // x: state.display.width + 60, // горизонталь
    //     // y: enemiesRandomY(), // вертикаль
    //     w: state.enemies1.w, // высота
    //     h: state.enemies1.h, // ширина
    //     hp: +state.enemies1.hp, // здоровьее
    //     speed: state.enemies1.speed, // скорость перемещения
    //     damage: state.enemies1.damage, // урон
    //     coolDown: state.enemies1.coolDown, // скорость удара
    //     skin: '/animations/enemie0move.gif',
    //     move: 1,
    //     xp: state.enemies1.xp,
    //     bloodSkin: state.enemies1.bloodSkin,
    //     deadSkin: state.enemies1.deadSkin,
    // }, {
    //   id: uuidv4(),
    //   type: state.enemies2.type, // тип врага
    //   // x: -50,
    //   // y: enemiesRandomY(), // вертикаль
    //   x: 700,
    //   y: 900,
    //   w: state.enemies2.w, // высота
    //   h: state.enemies2.h, // ширина
    //   hp: +state.enemies2.hp, // здоровьее
    //   speed: state.enemies2.speed, // скорость перемещения
    //   damage: state.enemies2.damage, // урон
    //   coolDown: state.enemies2.coolDown, // скорость удара
    //   skin: '/animations/enemie1move.gif',
    //   move: -1,
    //   xp: state.enemies2.xp,
    //   bloodSkin: state.enemies2.bloodSkin,
    //   deadSkin: ''
    // }, {
    //   id: uuidv4(),
    //   type: 4,
    //   x: 800,
    //   y: 300,
    //   // x: -50,
    //   // y: 500, // вертикаль
    //   w: state.enemies4.w, // высота
    //   h: state.enemies4.h, // ширина
    //   hp: state.enemies4.hp, // здоровьее
    //   speed: state.enemies4.speed, // скорость перемещения
    //   damage: state.enemies4.damage, // урон
    //   coolDown: state.enemies4.coolDown, // скорость удара
    //   skin: '/animations/enemie3move.gif',
    //   move: 1,
    //   xp: state.enemies4.xp,
    //   bloodSkin: state.enemies4.bloodSkin,
    //   deadSkin: ''
    // })

    if (state.gamePlay.countWaves === 1 && state.gamePlay.waves1Count < state.gamePlay.waves1) {
      const randomNum = Math.floor(Math.random() * (10 - 1)) + 1;
      if (randomNum < 6) {
        state.gamePlay.waves1Count += 1;
        state.enemiesArray.push({
              id: uuidv4(),
              type: state.enemies1.type, // тип врага
              x: -60, // горизонталь
              y: enemiesRandomY(), // вертикаль
              // x: 500,
              // y: 500,
              w: state.enemies1.w, // высота
              h: state.enemies1.h, // ширина
              hp: +state.enemies1.hp, // здоровьее
              speed: state.enemies1.speed, // скорость перемещения
              damage: state.enemies1.damage, // урон
              coolDown: state.enemies1.coolDown, // скорость удара
              skin: '/animations/enemie0move.gif',
              move: -1,
              xp: state.enemies1.xp,
              bloodSkin: state.enemies1.bloodSkin,
              deadSkin: state.enemies1.deadSkin,
        })
      } else {
        state.gamePlay.waves1Count += 1;
        state.enemiesArray.push({
                  id: uuidv4(),
          type: state.enemies1.type, // тип врага
          x: state.display.width + 60, // горизонталь
          y: enemiesRandomY(), // вертикаль
          // x: 500,
          // y: 500,
          w: state.enemies1.w, // высота
          h: state.enemies1.h, // ширина
          hp: +state.enemies1.hp, // здоровьее
          speed: state.enemies1.speed, // скорость перемещения
          damage: state.enemies1.damage, // урон
          coolDown: state.enemies1.coolDown, // скорость удара
          skin: '/animations/enemie0move.gif',
          move: -1,
          xp: state.enemies1.xp,
          bloodSkin: state.enemies1.bloodSkin,
          deadSkin: state.enemies1.deadSkin,
        })
      }
    }
        //   id: uuidv4(),
        //   type: state.enemies1.type, // тип врага
        //   // x: 500,
        //   // y: 700,
        //   x: state.display.width + 60, // горизонталь
        //   y: enemiesRandomY(), // вертикаль
        //   w: state.enemies1.w, // высота
        //   h: state.enemies1.h, // ширина
        //   hp: +state.enemies1.hp, // здоровьее
        //   speed: state.enemies1.speed, // скорость перемещения
        //   damage: state.enemies1.damage, // урон
        //   coolDown: state.enemies1.coolDown, // скорость удара
        //   skin: '/animations/enemie0move.gif',
        //   move: 1,
        //   xp: state.enemies1.xp,
        //   bloodSkin: state.enemies1.bloodSkin,
        //   deadSkin: state.enemies1.deadSkin,
      //   id: uuidv4(),
      // type: 4,
      // x: 800,
      // y: 300,
      // x: -50,
      // y: 500, // вертикаль
      // w: state.enemies4.w, // высота
      // h: state.enemies4.h, // ширина
      // hp: state.enemies4.hp, // здоровьее
      // speed: state.enemies4.speed, // скорость перемещения
      // damage: state.enemies4.damage, // урон
      // coolDown: state.enemies4.coolDown, // скорость удара
      // skin: '/animations/enemie3move.gif',
      // move: 1,
      // xp: state.enemies4.xp,
      // bloodSkin: state.enemies4.bloodSkin,
      // deadSkin: ''
    // }
      //   }, {
      //     id: uuidv4(),
      //     type: state.enemies1.type, // тип врага
      //     // x: -60, // горизонталь
      //     // y: enemiesRandomY(), // вертикаль
      //     x: 500,
      //     y: 500,
      //     w: state.enemies1.w, // высота
      //     h: state.enemies1.h, // ширина
      //     hp: +state.enemies1.hp + 10000, // здоровьее
      //     speed: state.enemies1.speed, // скорость перемещения
      //     damage: state.enemies1.damage, // урон
      //     coolDown: state.enemies1.coolDown, // скорость удара
      //     skin: '/animations/enemie0move.gif',
      //     move: -1,
      //     xp: state.enemies1.xp,
      //     bloodSkin: state.enemies1.bloodSkin,
      //     deadSkin: state.enemies1.deadSkin,
      //   }, {
      //     id: uuidv4(),
      //     type: state.enemies2.type, // тип врага
      //     x: -150,
      //     y: enemiesRandomY(), // вертикаль
      //     w: state.enemies2.w, // высота
      //     h: state.enemies2.h, // ширина
      //     hp: +state.enemies2.hp, // здоровьее
      //     speed: state.enemies2.speed, // скорость перемещения
      //     damage: state.enemies2.damage, // урон
      //     coolDown: state.enemies2.coolDown, // скорость удара
      //     skin: '/animations/enemie1move.gif',
      //     move: -1,
      //     xp: state.enemies2.xp,
      //     bloodSkin: state.enemies2.bloodSkin,
      //     deadSkin: '/animations/enemie1deeth.gif'
      //   });
      // } else {
      //   state.gamePlay.waves1Count += 1;
      //   state.enemiesArray.push({
      //     id: uuidv4(),
      //     type: state.enemies1.type, // тип врага
          // x: -60, // горизонталь
          // y: enemiesRandomY(), // вертикаль
  //         x: 500,
  //         y: 500,
  //         w: state.enemies1.w, // высота
  //         h: state.enemies1.h, // ширина
  //         hp: +state.enemies1.hp, // здоровьее
  //         speed: state.enemies1.speed, // скорость перемещения
  //         damage: state.enemies1.damage, // урон
  //         coolDown: state.enemies1.coolDown, // скорость удара
  //         skin: '/animations/enemie0move.gif',
  //         move: -1,
  //         xp: state.enemies1.xp,
  //         bloodSkin: state.enemies1.bloodSkin,
  //         deadSkin: state.enemies1.deadSkin,
  //       }, {
  //         id: uuidv4(),
  //         type: 4,
  //         x: 800,
  //         y: 300,
  //         // x: -50,
  //         // y: 500, // вертикаль
  //         w: state.enemies4.w, // высота
  //         h: state.enemies4.h, // ширина
  //         hp: state.enemies4.hp, // здоровьее
  //         speed: state.enemies4.speed, // скорость перемещения
  //         damage: state.enemies4.damage, // урон
  //         coolDown: state.enemies4.coolDown, // скорость удара
  //         skin: '/animations/enemie3move.gif',
  //         move: 1,
  //         xp: state.enemies4.xp,
  //         bloodSkin: state.enemies4.bloodSkin,
  //         deadSkin:  '/animations/enemie1deeth.gif'
  //       },{
  //         id: uuidv4(),
  //         type: state.enemies2.type, // тип врага
  //         // x: -150,
  //         x: 250,
  //         y: enemiesRandomY(), // вертикаль
  //         w: state.enemies2.w, // высота
  //         h: state.enemies2.h, // ширина
  //         hp: +state.enemies2.hp, // здоровьее
  //         speed: state.enemies2.speed, // скорость перемещения
  //         damage: state.enemies2.damage, // урон
  //         coolDown: state.enemies2.coolDown, // скорость удара
  //         skin: '/animations/enemie1move.gif',
  //         move: -1,
  //         xp: state.enemies2.xp,
  //         bloodSkin: state.enemies2.bloodSkin,
  //         deadSkin:  '/animations/enemie1deeth.gif'
  //       }
  // );
  //     }
  //   }
    if (state.gamePlay.countWaves === 2 && state.gamePlay.waves2Count < state.gamePlay.waves2) {
      const randomNum = Math.floor(Math.random() * (10 - 1)) + 1;
      if (randomNum < 6) {
        state.gamePlay.waves2Count += 1;
        state.enemiesArray.push({
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
          bloodSkin: state.enemies2.bloodSkin,
          deadSkin: '/animations/enemie1deeth.gif'
        });
      } else {
        state.gamePlay.waves2Count += 1;
        state.enemiesArray.push({
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
          bloodSkin: state.enemies2.bloodSkin,
          deadSkin: '/animations/enemie1deeth.gif'
        });
      }
    }
    if (state.gamePlay.countWaves === 3 && state.gamePlay.waves3Count < state.gamePlay.waves3) {
      const randomNum = Math.floor(Math.random() * (10 - 1)) + 1;
      if (randomNum < 6) {
        state.gamePlay.waves3Count += 1;
        state.enemiesArray.push({
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
          bloodSkin: state.enemies3.bloodSkin,
          deadSkin: '/animations/explosion3.gif'
        });
      } else {
        state.gamePlay.waves3Count += 1;
        state.enemiesArray.push({
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
          bloodSkin: state.enemies3.bloodSkin,
          deadSkin: '/animations/explosion3.gif'
        });
      }
    }
    if (state.gamePlay.countWaves === 3 && state.gameStats.killings
      === state.gamePlay.waves3 + state.gamePlay.waves2 + state.gamePlay.waves1
      && state.gamePlay.bossCount < state.gamePlay.boss) {
      state.gamePlay.bossCount += 1;
      state.enemiesArray.push({
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
        bloodSkin: state.enemies4.bloodSkin,
        deadSkin: '/animations/enemie3deeth.gif'
      });
    }
  }
}
export default factoryEnemies;
