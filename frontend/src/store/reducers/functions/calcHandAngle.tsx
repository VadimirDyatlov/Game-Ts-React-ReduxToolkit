import { IInitialState } from '../../../models/types/ReducerTypes/game';

function calcHandAngle(state: IInitialState, cord: number[]) {
  const codrX = cord[0] + state.hero.w / 2;
  const codrY = cord[1] + state.hero.h / 2;
  const heroX = state.hero.x + state.hero.w / 2; // корды героя по Х
  const heroY = state.hero.y + state.hero.h / 2; // корды героя по У
  const dX = codrX - heroX; // длинна катета Х героя и Х клика
  const dY = codrY - heroY; // длинна катета У героя и У клика
  const hypotenuse = Math.sqrt(dX ** 2 + dY ** 2); // гипотенуза
  const corner = Math.asin(dY / hypotenuse);
  const g = (corner * 180 / Math.PI);
  state.hero.corner = g;
}
export default calcHandAngle;
