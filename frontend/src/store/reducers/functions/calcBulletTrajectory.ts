import { IInitialState } from '../../../models/types/ReducerTypes/game';

function calcBulletTrajectory(state: IInitialState, cord: number[]) {
  let speedX = 0;
  let speedY = 0;
  const codrX = cord[0] + state.hero.w / 2;
  const codrY = cord[1] + state.hero.h / 2;
  const speed = state.bullet?.speed; // скорость пули
  const heroX = state.hero.x + state.hero.w / 2; // корды героя по Х
  const heroY = state.hero.y + state.hero.h / 2; // корды героя по У
  const dX = codrX - heroX; // длинна катета Х героя и Х клика
  const dY = codrY - heroY; // длинна катета У героя и У клика
  const hypotenuse = Math.sqrt(dX ** 2 + dY ** 2); // гипотенуза
  if (speed) {
    speedX = speed / hypotenuse * dX; // скорость по Х
    speedY = speed / hypotenuse * dY; // скорость по У
  }
  const corner = Math.asin(dY / hypotenuse);
  let g = (corner * 180 / Math.PI);
  if (heroX > codrX) {
    g = -g;
  }
  return [speedX, speedY, g];
}
export default calcBulletTrajectory;
