import { combineReducers } from 'redux'
import synth from './synth'
import sequencer from './sequencer'
import { getContext } from '../utils/audio';

const initialState = {
  context: getContext(),
  playing:false,
  hasMounted:false
};

function context(state = initialState.context, action) {
  switch (action.type) {
    case 'SETUP_AUDIO':
      return action.payload;
    default:
      return state;
  }
}
function mount(state=initialState.hasMounted, action){
  switch (action.type) {
    case "SET_SYNTH_HAS_MOUNTED":
    default:
      return !state;
  }
}
function hasMounted(state=initialState.hasMounted, action){
  switch(action.type){
    case "GET_SYNTH_HAS_MOUNTED":
    default:
    return state;
  }
}

const appState = combineReducers({
  synth,
  sequencer,
  context,
  mount,
  hasMounted
})

export default appState
