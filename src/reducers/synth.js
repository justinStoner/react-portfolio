import { generateKeys } from '../utils/audio';
import uuid from 'uuid';

const initialState={
  effects:[
    {
      type:'eq',
      id:uuid.v4(),
      eq80:24,
      eq350:22,
      eq720:21,
      eq16k:-14,
      eq5k:-20,
      eq10k:0,
      active:true,
      col:2
    },
    {
      type:'delay',
      id:uuid.v4(),
      delayTime:100,
      feedback:15,
      wetLevel:15,
      active:true,
      col:2
    },
    {
      type:'compressor',
      id:uuid.v4(),
      threshold:-20,
      knee:20,
      ratio:5,
      attack:0.1,
      release:0.1,
      active:true,
      col:2
    }
    // {
    //   type:'sidechain-compressor',
    //   id:uuid.v4(),
    //   threshold:-20,
    //   knee:20,
    //   ratio:5,
    //   attack:0.1,
    //   release:0.1,
    //   active:true,
    //   col:3
    // }
  ]
}
const synth = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;

  }
  return state
}

const output = (state = initialState, action) => {

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
