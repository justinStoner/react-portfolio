import uuid from 'uuid';
const id1 = uuid.v4()
const id2 = uuid.v4()
const id3 = uuid.v4()
const id4 = uuid.v4()
const reverbId = uuid.v4()
const overdriveId = uuid.v4()
const initialState = {
  synth:{
    [overdriveId]:{
      type:'overdrive',
      amount:50,
      mode:0,
      col:1,
      id:overdriveId,
      active:true
    },
    [reverbId]:{
      type:'reverb',
      amount:66,
      active:true,
      col:1,
      id:reverbId,
      reverbType:'hall'
    },
    [id1]:{
      type:'eq',
      id:id1,
      eq80:24,
      eq350:22,
      eq720:21,
      eq16k:-14,
      eq5k:-20,
      eq10k:0,
      active:false,
      col:2,
      index:0
    },
    [id2]:{
      type:'delay',
      id:id2,
      delayTime:100,
      feedback:15,
      wetLevel:15,
      active:false,
      col:2,
      index:1
    },
    [id3]:{
      type:'compressor',
      id:id3,
      threshold:-50,
      knee:8,
      ratio:10,
      attack:0.1,
      release:0.1,
      active:true,
      col:2,
      index:2
    }
    // [id4]:{
    //   type:'sidechain-compressor',
    //   id:id4,
    //   threshold:-20,
    //   knee:20,
    //   ratio:5,
    //   attack:0.1,
    //   release:0.1,
    //   active:true,
    //   col:2,
    //   index:3
    // }
  },
  drums:{}
}

const effects = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case 'UPDATE_EFFECT':
      newState = Object.assign({}, state);
      newState[action.parent][action.id] = Object.assign({}, newState[action.parent][action.id], action.payload);
      return newState;
      //break;
    case 'REORDER_EFFECTS':
      newState = Object.assign({}, state);
      let effect1 = Object.assign({}, newState[action.parent][action.id]);
      let effect2 = Object.assign({}, Object.values( newState[action.parent] ).filter( eff => {
          return eff.index === action.toIndex
        })[0]
      )
      console.log(effect2);
      //TODO reorder array
      return newState
      break;
    default:
      return state;
  }
}

export default effects
