import { generateKeys } from '../utils/audio';
import uuid from 'uuid';
const initialState={
  lfo:{
    wave:'sine',
    detune:50,
    osc0:4,
    osc1:8,
    osc2:12,
    freq:13,
    type:'Lfo',
    modType:0
  },
  oscillators:[
    {
      wave:'sine',
      detune:45,
      octave:-1,
      volume:100,
      index:0
    },
    {
      wave:'square',
      detune:50,
      octave:0,
      volume:100,
      index:1
    },
    {
      wave:'sawtooth',
      detune:55,
      octave:3,
      volume:100,
      index:2
    }
  ],
  effects:[
    {
      type:'eq',
      id:uuid.v4()
    },
    {
      type:'delay',
      id:uuid.v4()
    },
    {
      type:'compressor',
      id:uuid.v4()
    },
    {
      type:'sidechain-compressor',
      id:uuid.v4()
    }
  ],
  filter:{
    lpfQ:10,
    lpfMod:13,
    lpfCutoff:7,
    lpfEnv:60,
    lpfA:50,
    lpfD:20,
    lpfS:30,
    lpfR:50
  },
  output:{
    masterVol:50,
    reverb:13,
    drive:10,
    visualizerOn:false,
    visualizerType:'waveform',
    envA:20,
    envD:65,
    envS:65,
    envR:50,
    synthOctave:0
  },
  keys:generateKeys()
}
const synth = (state = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_OSCILLATOR':
      break;
    default:
      return state;

  }
  return state
}

function keys(state = initialState.keys, action) {
  switch (action.type) {
    case 'KEY_DOWN':
      return Object.assign({}, state, {
        [action.payload.id]: action.payload
      });
    case 'KEY_UP':
      return Object.assign({}, state, {
        [action.payload]: Object.assign({}, state[action.payload], {
          velocity: 0
        })
      });
    default:
      return state;
  }
}

// function effects(state = initialState.effects, action) {
//   switch (action.type) {
//     case controls.ADD_CONTROL:
//       return state.map(e => {
//         if (e.id === action.payload.id) {
//           return Object.assign({}, e, {
//             [action.payload.propertyId]: Object.assign(
//               {},
//               e[action.payload.propertyId],
//               {
//                 control: action.payload.control
//               }
//             )
//           });
//         }
//         return e;
//       });
//     case C.ADD_EFFECT:
//       return [...state, action.payload];
//     case presets.LOAD_PRESET:
//       return action.payload.audio.effects;
//     case C.REMOVE_EFFECT:
//       return state.filter(e => e.id !== action.payload);
//     case controls.REMOVE_CONTROL:
//       return state.map(e => {
//         if (e.id === action.payload.id) {
//           return Object.assign({}, e, {
//             [action.payload.propertyId]: Object.assign(
//               {},
//               e[action.payload.propertyId],
//               {
//                 control: null
//               }
//             )
//           });
//         }
//         return e;
//       });
//     case C.REORDER_EFFECTS:
//       const start = state.findIndex(e => e.id === action.payload.id);
//       const up = action.payload.up;
//       const end = up ? start - 1 : start + 1;
//       if (end < 0 || end === state.length) {
//         return state;
//       }
//       const newState = [...state];
//       newState.splice(end, 0, newState.splice(start, 1)[0]);
//       return newState;
//     case controls.SEND_CONTROL_MESSAGE:
//       return state.map(e => {
//         if (e.id === action.payload.control.id) {
//           const property = e[action.payload.control.propertyId];
//           // transform midi range to target value range
//           const value =
//             action.payload.value / 127 * (property.max - property.min) +
//             property.min;
//           return Object.assign({}, e, {
//             [action.payload.control.propertyId]: Object.assign({}, property, {
//               value
//             })
//           });
//         }
//         return e;
//       });
//     case C.SET_EFFECT_SETTINGS:
//       return state.map(e => {
//         if (e.id === action.payload.id) {
//           return action.payload;
//         }
//         return e;
//       });
//     default:
//       return state;
//   }
// }

export default synth
