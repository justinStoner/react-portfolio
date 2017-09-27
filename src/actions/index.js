/*
 * action types
 */
import uuid from 'uuid';

export const name = 'synth'
/*
 * other constants
 */
 export const addEffect = ( type, parent) => {
   return {
     type:'ADD_EFFECT',
     payload:type,
     parent
   }
 }
 export const changeSequencerVolume = volume => {
   return {
     type:"CHANGE_VOLUME",
     payload:volume
   }
 }
 export const changeTempo = tempo =>{
   return {
     type:"CHANGE_TEMPO",
     payload:tempo
   }
 }
export const toggleDrums = playing =>{
  return {
    type:'TOGGLE_DRUMS',
    payload:playing
  }
}
export const scheduleDrum = indexes => {
  return {
    type:'SCHEDULE_DRUM',
    payload:indexes
  }
}
export const modifyDrum = drum => {
  return {
    type:'MODIFY_DRUM',
    payload:drum
  }
}
 export const reorderEffects = (parent, dir, id) => {
   return {
     type:'REORDER_EFFECTS',
     parent,
     dir,
     id
   }
 }
 export const updateEffect = (key, value, parent, id) => {
   return {
     type: 'UPDATE_EFFECT',
     parent:parent,
     id:id,
     payload: {
       [key]:value
       //...defaultSettings[effect]
     }
   };
 };
 export const removeEffect = ( parent, id ) => {
   return {
     type: 'REMOVE_EFFECT',
     parent,
     id
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
 export const updateOscillator = (key, index, value) =>{
   return{
     type:'UPDATE_OSCILLATOR',
     action:{type:key, index:index, payload:value}
   }
 }
 export const keyDown = (index) =>{
   return{
     type:'KEY_DOWN',
     index
   }
 }
 export const keyUp = (index) =>{
   return{
     type:'KEY_UP',
     index
   }
 }
 export const updateSynthFilter = (key, value) => {
   return{
     type:'UPDATE_SYNTH_FILTER',
     payload:{
       type:key,
       value
     }
   }
 }
 export const updateSynthOutput = (key, value) => {
   return{
     type:'UPDATE_SYNTH_OUTPUT',
     payload:{
       type:key,
       value
     }
   }
 }
 export const updateLfo = (key, index, value) =>{
   return{
     type:'UPDATE_LFO',
     action:{type:key, index:index, payload:value}
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
