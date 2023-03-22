import { IInitialState } from '../../../models/types/ReducerTypes/game';

function calcBlood(state: IInitialState) {
  
  state.bloodArray.forEach((blood) => {
    
    if (state.gameLoop > blood.lifetime) {
      const index = state.bloodArray.indexOf(blood)
      console.log(index);
      
      state.bloodArray.splice(index, 1);
    }
  });
}
export default calcBlood;
