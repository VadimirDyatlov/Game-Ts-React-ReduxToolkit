/* eslint-disable import/no-unresolved */
import { IInitialState } from '../../../models/types/ReducerTypes/game';

function calcEnemies(state: IInitialState) {
  function randomFlag() {
    const arrFlag = [true, false];
    const flag = Math.floor(Math.random() * arrFlag.length);
    return arrFlag[flag];
  }
  state.enemies.forEach((enemy) => {
    function randomNumLoop() {
      const arrr = [70, 110, 150];
      const flag = Math.floor(Math.random() * arrr.length);
      return arrr[flag];
    }
    function randomCord(stateR: IInitialState) {
      const arrCord = [
        [stateR.hero.x, state.hero.y - state.hero.w],
        [state.hero.x + state.hero.w, state.hero.y - state.hero.w],
        [state.hero.x, state.hero.y],
        [state.hero.x - state.hero.h, state.hero.y - state.hero.w]];
      const cord = Math.floor(Math.random() * arrCord.length);
      return arrCord[cord];
    }
    if (state.hero.x < enemy.x) {
      if (enemy.x - state.hero.x < 130) {
        const cord = randomCord(state);
        // console.log('ближе 50 влево');
        if (enemy.type === 1) {
          // el.skin = '/animations/enemie0attack.gif';
        }
        if (enemy.type === 2) {
          enemy.skin = '/animations/enemie1attack.gif';
        }
        if (enemy.type === 3) {
          enemy.skin = '/animations/enemie2attack.gif';
        }
        if (cord[0] <= enemy.x) {
          enemy.x -= enemy.speed;
          enemy.move = -1;
        }
        if (cord[1] >= enemy.y) {
          enemy.y += 0.7;
        }
        if (cord[1] <= enemy.y) {
          enemy.y -= 0.7;
        }
      } else {
        if (state.gameLoop % randomNumLoop() === 0) {
          state.calcEnemiesFlag = !state.calcEnemiesFlag;
        }
        if (state.calcEnemiesFlag) {
          if (state.calcEnemiesFlag1) {
            enemy.y += 0.95;
            if (randomFlag()) {
              state.calcEnemiesFlag1 = !state.calcEnemiesFlag1;
            }
          } else {
            enemy.y -= 0.95;
            if (randomFlag()) {
              state.calcEnemiesFlag1 = !state.calcEnemiesFlag1;
            }
          }
        } else {
          if (state.hero.y > enemy.y) {
            enemy.y += 0.35;
          }
          if (state.hero.y < enemy.y) {
            enemy.y -= 0.35;
          }
        }
        if (enemy.x <= state.hero.x) {
          if (enemy.type === 1) {
            enemy.skin = '/animations/enemie0move.gif';
            enemy.move = 1;
            enemy.x += enemy.speed;
          }
          if (enemy.type === 2) {
            enemy.skin = '/animations/enemie1move.gif';
            enemy.move = 1;
            enemy.x += enemy.speed;
          }
          if (enemy.type === 3) {
            enemy.skin = '/animations/enemie2move.gif';
            enemy.move = -1;
            enemy.x += enemy.speed;
          }
          if (enemy.type === 4) {
            enemy.skin = '/animations/enemie3move.gif';
            enemy.move = 1;
            enemy.x += 8;
          }
        }
        if (state.hero.x <= enemy.x) {
          if (enemy.type === 1) {
            enemy.skin = '/animations/enemie0move.gif';
            enemy.move = -1;
            enemy.x -= enemy.speed;
          }
          if (enemy.type === 2) {
            enemy.skin = '/animations/enemie1move.gif';
            enemy.move = -1;
            enemy.x -= enemy.speed;
          }
          if (enemy.type === 3) {
            enemy.skin = '/animations/enemie2move.gif';
            enemy.move = 1;
            enemy.x -= enemy.speed;
          }
          if (enemy.type === 4) {
            enemy.skin = '/animations/enemie3move.gif';
            enemy.move = 1;
            enemy.x -= 2;
          }
        }
        // console.log('дальше 50 влево');
      }
    } else if (state.hero.x - enemy.x < 130) {
      const cord = randomCord(state);
      // console.log('ближе 50 вправо');
      if (enemy.type === 1) {
        // el.skin = '/animations/enemie0attack.gif';
        enemy.move = 1;
      }
      if (enemy.type === 2) {
        // el.skin = '/animations/enemie1attack.gif';
        enemy.move = 1;
      }
      if (enemy.type === 3) {
        // el.skin = '/animations/enemie2attack.gif';
        enemy.move = -1;
      }
      if (cord[0] >= enemy.x) {
        enemy.x += enemy.speed;
      }
      if (cord[1] >= enemy.y) {
        enemy.y += 0.7;
      }
      if (cord[1] <= enemy.y) {
        enemy.y -= 0.7;
      }
    } else {
      if (state.gameLoop % randomNumLoop() === 0) {
        state.calcEnemiesFlag = !state.calcEnemiesFlag;
      }
      if (state.calcEnemiesFlag) {
        if (state.calcEnemiesFlag1) {
          enemy.y += 0.95;
          if (randomFlag()) {
            state.calcEnemiesFlag1 = !state.calcEnemiesFlag1;
          }
        } else {
          enemy.y -= 0.95;
          if (randomFlag()) {
            state.calcEnemiesFlag1 = !state.calcEnemiesFlag1;
          }
        }
      } else {
        if (state.hero.y > enemy.y) {
          enemy.y += 0.35;
        }
        if (state.hero.y < enemy.y) {
          enemy.y -= 0.35;
        }
      }
      if (enemy.x <= state.hero.x) {
        if (enemy.type === 1) {
          enemy.skin = '/animations/enemie0move.gif';
          enemy.move = 1;
          enemy.x += enemy.speed;
        }
        if (enemy.type === 2) {
          enemy.skin = '/animations/enemie1move.gif';
          enemy.move = 1;
          enemy.x += enemy.speed;
        }
        if (enemy.type === 3) {
          enemy.skin = '/animations/enemie2move.gif';
          enemy.move = -1;
          enemy.x += enemy.speed;
        }
        if (enemy.type === 4) {
          enemy.skin = '/animations/enemie3move.gif';
          enemy.move = -1;
          enemy.x += 3;
        }
      }
      if (state.hero.x <= enemy.x) {
        if (enemy.type === 1) {
          enemy.skin = '/animations/enemie0attack.gif';
          enemy.move = -1;
          enemy.x -= enemy.speed;
        }
        if (enemy.type === 2) {
          enemy.skin = '/animations/enemie1attack.gif';
          enemy.move = -1;
          enemy.x -= enemy.speed;
        }
        if (enemy.type === 3) {
          enemy.skin = '/animations/enemie2attack.gif';
          enemy.move = 1;
          enemy.x -= enemy.speed;
        }
        if (enemy.type === 4) {
          enemy.skin = '/animations/enemie3attack.gif';
          enemy.move = 1;
          enemy.x -= 2;
        }
      }
      // console.log('дальше 50 вправо');
    }
  });
}

export default calcEnemies;
