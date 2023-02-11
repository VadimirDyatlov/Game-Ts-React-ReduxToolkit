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
  state.bullets.forEach((bullet) => {
    state.enemies.forEach((enemy) => {
      if (objectsCollision(bullet, enemy)) {
        if (+bullet.damage >= +enemy.hp) {
          enemy.hp = 0;
        } else {
          enemy.hp = +enemy.hp - +bullet.damage;
        }
        state.bullets.splice(
          state.enemies.findIndex((el) => el.id === bullet.id),
          1,
        );
        if (enemy.hp <= 0 && enemy.type === 4) {
          enemy.skin = '/animations/enemie3deeth.gif';
        }

        if (enemy.hp <= 0) {
          state.hero.lvl += enemy.xp;
          state.golds.push({
            id: uuidv4(),
            x: enemy.x,
            y: enemy.y,
            h: state.gold.h,
            w: state.gold.w,
            skin: state.gold.skin,
            value: valueGold(enemy.type, state),
          });
          state.gameStats.killings += 1;
          state.enemies.splice(
            state.enemies.findIndex((el) => el.id === enemy.id),
            1,
          );
        }
      }
    });
  });
}

export default calcCollisionBullets;
