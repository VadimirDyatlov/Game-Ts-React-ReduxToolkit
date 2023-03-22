import { IInitialState } from '../../../models/types/ReducerTypes/game';

function calcBullets(state: IInitialState) {
  state.bulletsArray.forEach((bullet) => {
    bullet.x += bullet.speedX;
    bullet.y += bullet.speedY;
    if (bullet.x < 0
      || bullet.y < 0
      || bullet.x >= state.hero.x + 1600
      || bullet.y >= state.hero.y + 1400) {
      const index = state.bulletsArray.indexOf(bullet)
      state.bulletsArray.splice(index, 1);
    }
  });
}
export default calcBullets;
