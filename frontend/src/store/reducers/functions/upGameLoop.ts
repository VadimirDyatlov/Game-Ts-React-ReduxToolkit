/* eslint-disable import/no-unresolved */

import { IInitialState } from '../../../models/types/ReducerTypes/game';

export default function upGameLoop(state: IInitialState) { // прибовляет 1 каждый цикл
  state.gameLoop += 1;
}
