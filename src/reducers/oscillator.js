import uuid from 'uuid';
const initialState=[
    {
      wave:'sawtooth',
      detune:45,
      octave:-1,
      volume:100,
      index:0
    },
    {
      wave:'sine',
      detune:50,
      octave:0,
      volume:100,
      index:1
    },
    {
      wave:'sawtooth',
      detune:55,
      octave:2,
      volume:100,
      index:2
    }
]

export const oscillators = (state=initialState, action) => {
    if(action.type=='UPDATE_OSCILLATOR'){
      let newState, osc;
      action=action.action;
      console.log(action);
      switch (action.type) {
        case 'wave':
        case 'detune':
        case 'octave':
        case 'volume':
          newState = [...state];
          osc =  Object.assign({}, state[action.index], {[action.type] : action.payload});
          newState[osc.index] = osc;
          return newState;
          break;
        case 'index':
          newState = [...state];
          osc =  Object.assign({}, state[action.index], {[action.type] : action.payload});
          newState[osc.index] = osc;
          return newState;
          break;
        default:
          return state
      }
    }else{
      return state
    }

}

export const oscillator = (state=initialState, action) => {
  switch (action.type) {
    case 'wave':
    case 'detune':
    case 'octave':
    case 'volume':
      return Object.assign({}, state[action.index], action.payload)
      break;
    case 'index':
      return Object.assign({}, state[action.index], action.payload)
      break;
    default:
      return state[action.index]
  }
}
