import { combineReducers } from 'redux'
import synth from './synth'
import sequencer from './sequencer'
import effects from './effects';
import playing from './playing';
import audio from './audio'
import { oscillators, oscillator } from './oscillator';
import { lfo } from './lfo';
import { synthFilter } from './synthFilter';
import { synthOutput } from './synthOutput';
import { keys } from './keys';
import { getContext } from '../utils/audio';
import { tempo } from './tempo'

const initialState = {};

const appState = combineReducers({
  synth,
  audio,
  oscillators,
  lfo,
  synthFilter,
  synthOutput,
  keys,
  sequencer,
  effects,
  tempo,
  playing
})

const appReducer = (state, action) => {
  if( action.type === 'RESET_APP'){
    state =  undefined
  }
  return appState(state, action)
}

export default appReducer
