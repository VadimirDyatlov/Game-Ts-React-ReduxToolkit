/* eslint-disable import/no-unresolved */
import { IInitialState } from '../../../models/types/ReducerTypes/game';

function calcBullets(state: IInitialState) {
  state.bullets.forEach((bullet) => {
    bullet.x += bullet.speedX;
    bullet.y += bullet.speedY;
    if (bullet.x < 0
      || bullet.y < 0
      || bullet.x >= state.hero.x + 1200
      || bullet.y >= state.hero.y + 1400) {
      state.bullets.splice(Number(bullet.id), 1);
    }
  });
}
export default calcBullets;
