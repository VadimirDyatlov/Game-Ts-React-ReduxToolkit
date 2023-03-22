import { objectsCollision } from '../../../models/functions';
import { IInitialState } from '../../../models/types/ReducerTypes/game';

function calcGoldCoin(state: IInitialState) {
  state.goldsArray.forEach((coin) => {
    if (objectsCollision(state.hero, coin)) {
      state.gameStats.gold += coin.value;
      const index = state.goldsArray.indexOf(coin)
      state.goldsArray.splice(index, 1);
    }
  });
}

export default calcGoldCoin;
