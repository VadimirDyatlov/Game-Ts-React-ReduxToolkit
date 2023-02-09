/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
import { objectsCollision } from '../../../models/functions';
import { IInitialState } from '../../../models/types/ReducerTypes/game';

function calcCollisionsEnemie(state: IInitialState) {
  state.enemies.forEach((enemy) => {
    if (objectsCollision(state.hero, enemy)) {
      if (state.gameLoop % enemy.coolDown === 0) {
        state.hero.hp =  Number(state.hero.hp) - Number(enemy.damage) < 0 ? 0 : Number(state.hero.hp) - Number(enemy.damage)
        if (enemy.type === 1) {
          enemy.skin = '/animations/enemie0attack.gif'; // меняет скин врага при ударе первого типа
        }
        if (enemy.type === 2) {
          enemy.skin = '/animations/enemie1attack.gif'; // меняет скин врага при ударе второго типа
        }
        if (enemy.type === 3) {
          enemy.skin = '/animations/enemie2attack.gif'; // меняет скин врага при ударе третьего типа
        }
        if (enemy.type === 4) {
          if (enemy.x < state.hero.x) {
            enemy.skin = '/animations/enemie3attack.gif';
            enemy.move = -1;
          } else {
            enemy.skin = '/animations/enemie3attack.gif'; // меняет скин врага при ударе третьего типа
            enemy.move = 1;
          }
        }
      }
    }
  });
}

export default calcCollisionsEnemie;
