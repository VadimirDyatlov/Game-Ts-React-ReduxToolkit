import { IInitialState } from '../../../models/types/ReducerTypes/game';

function calcDeadBody(state: IInitialState) {
  
  state.deadBodyArray.forEach((deadBody) => {
    
    if (state.gameLoop > deadBody.lifetime) {
      // state.deadBodyArray.splice(Number(deadBody.id), 1);
      const index = state.deadBodyArray.indexOf(deadBody)
      state.deadBodyArray.splice(index, 1);

    }
  });
}
export default calcDeadBody;
