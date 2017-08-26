/*
 * action types
 */
import uuid from 'uuid';
//import { name } from './__init__';
export const SET_SYNTH_VOLUME = 'SET_SYNTH_VOLUME'
export const TOGGLE_SYNTH_VISUALIZER = 'TOGGLE_SYNTH_VISUALIZER'
export const SET_SYNTH_ATTACK = 'SET_SYNTH_ATTACK'
export const SET_SYNTH_DECAY = 'SET_SYNTH_DECAY'
export const SET_SYNTH_SUSTAIN = 'SET_SYNTH_SUSTAIN'
export const SET_SYNTH_RELEASE = 'SET_SYNTH_RELEASE'
export const SET_SYNTH_OCTAVE = 'SET_SYNTH_OCTAVE'

export const SET_LFO_WAVE = 'SET_LFO_WAVE'
export const SET_LFO_FREQ = 'SET_LFO_FREQ'
export const SET_LFO_OSC = 'SET_LFO_OSC'

export const SET_OSC_MIX = 'SET_OSC_MIX'
export const SET_OSC_WAVE = 'SET_OSC_WAVE'
export const SET_OSC_OCTAVE = 'SET_OSC_OCTAVE'
export const SET_OSC_DETUNE = 'SET_OSC_OCTAVE'

export const SET_FILTER_CUTOFF = 'SET_FILTER_CUTOFF'
export const SET_FILTER_Q = 'SET_FILTER_Q'
export const SET_FILTER_MOD = 'SET_FILTER_MOD'
export const SET_FILTER_ENV = 'SET_FILTER_ENV'
export const SET_FILTER_ATTACK = 'SET_FILTER_ATTACK'
export const SET_FILTER_SUSTAIN = 'SET_FILTER_SUSTAIN'
export const SET_FILTER_DECAY = 'SET_FILTER_DECAY'
export const SET_FILTER_RELEASE = 'SET_FILTER_RELEASE'

export const SET_EQ_FREQ = 'SET_EQ_FREQ'
export const SET_EQ_NODES = 'SET_EQ_NODES'
export const SET_EQ_ACTIVE = 'SET_EQ_ACTIVE'

export const SET_DELAY_TIME = 'SET_DELAY_TIME'
export const SET_DELAY_NODES = 'SET_DELAY_NODES'
export const SET_DELAY_WET = 'SET_DELAY_WET'
export const SET_DELAY_FEED = 'SET_DELAY_FEED'

export const SET_COMP_ATTACK = "SET_COMP_ATTACK"
export const SET_COMP_RELEASE = "SET_COMP_RELEASE"
export const SET_COMP_DECAY = "SET_COMP_DECAY"
export const SET_COMP_SUSTAIN = "SET_COMP_SUSTAIN"
export const SET_COMP_THRESHOLD = "SET_COMP_THRESHOLD"
export const SET_COMP_RATIO = "SET_COMP_RATIO"
export const SET_COMP_KNEE = "SET_COMP_KNEE"
export const SET_COMP_ACTIVE = "SET_COMP_ACTIVE"
export const SET_COMP_NODES = "SET_COMP_NODES"
export const name = 'synth'
/*
 * other constants
 */

 export const addEffect = effect => {
   return {
     type: C.ADD_EFFECT,
     payload: {
       id: uuid.v4(),
       type: effect//,
       //...defaultSettings[effect]
     }
   };
 };
 export const removeEffect = id => {
   return {
     type: C.REMOVE_EFFECT,
     payload: id
   };
 };

 export const reorderEffects = (id, up = false) => {
   return {
     type: C.REORDER_EFFECTS,
     payload: {
       id,
       up
     }
   };
 };

 export const setEffectSettings = settings => {
   return {
     type: C.SET_EFFECT_SETTINGS,
     payload: settings
   };
 };

 export const setOutputLevel = level => {
   return {
     type: C.SET_OUTPUT_LEVEL,
     payload: level
   };
 };

 export const C = {
   ADD_OSCILLATOR: `${name}/ADD_OSCILLATOR`,
   REMOVE_OSCILLATOR: `${name}/REMOVE_OSCILLATOR`,
   SET_ARPEGGIATOR: `${name}/SET_ARPEGGIATOR`,
   SET_ARPEGGIATOR_INTERVAL: `${name}/SET_ARPEGGIATOR_INTERVAL`,
   SET_ARPEGGIATOR_MODE: `${name}/SET_ARPEGGIATOR_MODE`,
   SET_ARPEGGIATOR_OCTAVE: `${name}/SET_ARPEGGIATOR_OCTAVE`,
   SET_IGNORE_VELOCITY: `${name}/SET_IGNORE_VELOCITY`,
   SET_MODULATION_DEPTH: `${name}/SET_MODULATION_DEPTH`,
   SET_MODULATION_ON: `${name}/SET_MODULATION_ON`,
   SET_MODULATION_SHAPE: `${name}/SET_MODULATION_SHAPE`,
   SET_MODULATION_SPEED: `${name}/SET_MODULATION_SPEED`,
   SET_OSCILLATOR_SETTING: `${name}/SET_OSCILLATOR_SETTING`,
   SET_PITCH_BEND: `${name}/SET_PITCH_BEND`,
   SET_PORTAMENTO: `${name}/SET_PORTAMENTO`,
   SET_PORTAMENTO_SPEED: `${name}/SET_PORTAMENTO_SPEED`,
   SET_SUSTAIN: `${name}/SET_SUSTAIN`,
   SET_SYNTH_ATTACK: `${name}/SET_SYNTH_ATTACK`,
   SET_SYNTH_RELEASE: `${name}/SET_SYNTH_RELEASE`,
   SET_TRANSPOSE: `${name}/SET_TRANSPOSE`,
   SET_SYNTH_HAS_MOUNTED:'SET_SYNTH_HAS_MOUNTED'
 };

 export const addOscillator = () => {
   return {
     type: C.ADD_OSCILLATOR,
     payload: {
       id: uuid.v4(),
       detune: 0,
       gain: 1,
       octave: 0,
       waveShape: 'sine'
     }
   };
 };
 export const updateOscillator = () =>{
   return{
     type:'UPDATE_OSCILLATOR'
   }
 }
 export const mountSynth = id =>{
   return{
     type: C.SET_SYNTH_HAS_MOUNTED
   }
 }
 export const removeOscillator = id => {
   return {
     type: C.REMOVE_OSCILLATOR,
     payload: id
   };
 };

 export const setAttack = attack => {
   return {
     type: C.SET_SYNTH_ATTACK,
     payload: attack
   };
 };

 export const setArpeggiatorInterval = interval => {
   return {
     type: C.SET_ARPEGGIATOR_INTERVAL,
     payload: interval
   };
 };

 export const setArpeggiatorMode = mode => {
   return {
     type: C.SET_ARPEGGIATOR_MODE,
     payload: mode.id
   };
 };

 export const setArpeggiatorOctave = octave => {
   return {
     type: C.SET_ARPEGGIATOR_OCTAVE,
     payload: octave.id
   };
 };

 export const setArpeggiatorOn = () => {
   return {
     type: C.SET_ARPEGGIATOR
   };
 };

 export const setIgnoreVelocity = ignore => {
   return {
     type: C.SET_IGNORE_VELOCITY,
     payload: ignore
   };
 };

 export const setModulationDepth = depth => {
   return {
     type: C.SET_MODULATION_DEPTH,
     payload: depth
   };
 };

 export const setModulationOn = () => {
   return {
     type: C.SET_MODULATION_ON,
     payload: null
   };
 };

 export const setModulationShape = shape => {
   return {
     type: C.SET_MODULATION_SHAPE,
     payload: shape
   };
 };

 export const setModulationSpeed = speed => {
   return {
     type: C.SET_MODULATION_SPEED,
     payload: speed
   };
 };

 export const setOscillatorSetting = (id, value, setting) => {
   return {
     type: C.SET_OSCILLATOR_SETTING,
     payload: {
       id,
       setting,
       value
     }
   };
 };

 export const setPitchBend = bend => {
   return {
     type: C.SET_PITCH_BEND,
     payload: bend
   };
 };

 export const setPortamento = () => {
   return {
     type: C.SET_PORTAMENTO,
     payload: null
   };
 };

 export const setPortamentoSpeed = speed => {
   return {
     type: C.SET_PORTAMENTO_SPEED,
     payload: speed
   };
 };

 export const setRelease = release => {
   return {
     type: C.SET_SYNTH_RELEASE,
     payload: release
   };
 };

 export const setSustain = sustain => {
   return {
     type: C.SET_SUSTAIN,
     payload: sustain
   };
 };

 export const setTranspose = amount => {
   return {
     type: C.SET_TRANSPOSE,
     payload: amount
   };
 };

/*
 * action creators
 */
