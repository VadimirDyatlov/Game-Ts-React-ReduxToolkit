import { objectsCollision } from '../../../models/functions';
import { IInitialState } from '../../../models/types/ReducerTypes/game';

function calcGoldCoin(state: IInitialState) {
  state.golds.forEach((coin) => {
    if (objectsCollision(state.hero, coin)) {
      state.gameStats.gold += coin.value;
      state.golds.splice(
        state.golds.findIndex((el) => el.id === coin.id),
        1,
      );
    }
  });
}

export default calcGoldCoin;
