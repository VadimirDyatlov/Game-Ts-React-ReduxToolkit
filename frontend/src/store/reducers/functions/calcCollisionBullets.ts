import { v4 as uuidv4 } from 'uuid';
import { objectsCollision } from '../../../models/functions';
import { IInitialState } from '../../../models/types/ReducerTypes/game';

function valueGold(type: number, state: IInitialState): number {
  if (type === 1) return state.gamePlay.droppedGoldType1;
  if (type === 2) return state.gamePlay.droppedGoldType2;
  if (type === 3) return state.gamePlay.droppedGoldType3;
  if (type === 4) return state.gamePlay.droppedGoldType4;
  return 5;
}

function calcCollisionBullets(state: IInitialState) {
  state.bulletsArray.forEach((bullet) => {
    state.enemiesArray.forEach((enemy) => {
      if (objectsCollision(bullet, enemy, 'bullet')) {
        if (+bullet.damage >= +enemy.hp) {
          enemy.hp = 0;
        } else {
          enemy.hp = +enemy.hp - +bullet.damage;
          if (enemy.x > state.hero.x) {
            enemy.x = enemy.x + 6
            
          } else {
            enemy.x = enemy.x - 6
          }
        }

        if (bullet.visibility) {
          state.bloodArray.push({
            id: uuidv4(),
            // x: bullet.x - enemy.w / 2.2,
            // y: bullet.y - enemy.h / 2,
            x: bullet.x - state.blood.w / 2,
            y: bullet.y - state.blood.w / 2,
            w: state.blood.w,
            h: state.blood.h,
            skin: enemy.bloodSkin,
            lifetime: state.gameLoop + 4,
            move: enemy.move,
          });
        }
        
        bullet.visibility = false;
        bullet.damage = 0;
        if (enemy.hp <= 0) {
          state.deadBodyArray.push({
            id: uuidv4(),
            x: enemy.x,
            y: enemy.y,
            w: enemy.w,
            h: enemy.h,
            skin: enemy.deadSkin,
            lifetime: state.gameLoop + 14,
            move: enemy.move,
          });
          console.log(state.deadBodyArray.length);
          
          state.hero.lvl += enemy.xp;
          state.goldsArray.push({
            id: uuidv4(),
            x: enemy.x,
            y: enemy.y,
            h: state.gold.h,
            w: state.gold.w,
            skin: state.gold.skin,
            value: valueGold(enemy.type, state),
          });
          state.gameStats.killings += 1;
          const index = state.enemiesArray.indexOf(enemy)
          state.enemiesArray.splice(index, 1);
        }
      }
    });
  });
}

export default calcCollisionBullets;
