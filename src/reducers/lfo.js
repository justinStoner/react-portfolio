const initialState = {
  wave:'sine',
  detune:50,
  osc0:4,
  osc1:8,
  osc2:12,
  freq:13,
  type:'Lfo',
  volume:50
}

export const lfo = (state = initialState, action) => {
  if(action.type=="UPDATE_LFO"){
    action=action.action
    switch (action.type) {
      case 'wave':
      case 'freq':
      case 'detune':
      case 'volume':
        return Object.assign({}, state, {[action.type] : action.payload})
        break;
      case 'index':
        return Object.assign({}, state, {[action.type] : action.payload})
        break;
      case 'osc':
        return Object.assign({}, state, {[action.type + action.index] : action.payload})
      default:
        return state
    }
  }else{
    return state
  }
}
