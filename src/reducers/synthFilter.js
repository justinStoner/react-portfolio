const initialState = {
  lpfQ:10,
  lpfMod:13,
  lpfCutoff:7,
  lpfEnv:60,
  lpfA:50,
  lpfD:20,
  lpfS:30,
  lpfR:50
}

export const synthFilter = ( state = initialState, action ) => {
  if(action.type == 'UPDATE_SYNTH_FILTER'){
    action = action.payload
    return Object.assign({}, state, {[action.type]: action.value})
  }else{
    return state;
  }
}
