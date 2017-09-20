const initialState = {
  masterVol:50,
  visualizerOn:false,
  visualizerType:'waveform',
  envA:20,
  envD:65,
  envS:65,
  envR:50,
  synthOctave:0
}

export const synthOutput = (state = initialState, action) => {
  if(action.type == 'UPDATE_SYNTH_OUTPUT'){
    action = action.payload
    return Object.assign({}, state, {[action.type]: action.value})
  }else{
    return state;
  }
}
