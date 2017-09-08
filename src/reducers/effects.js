import uuid from 'uuid';
const id1 = uuid.v4()
const id2 = uuid.v4()
const id3 = uuid.v4()
const id4 = uuid.v4()
const initialState = {
  synth:{
    [id1]:{
      type:'eq',
      id:id1,
      eq80:24,
      eq350:22,
      eq720:21,
      eq16k:-14,
      eq5k:-20,
      eq10k:0,
      active:true,
      col:2
    },
    [id2]:{
      type:'delay',
      id:id2,
      delayTime:100,
      feedback:15,
      wetLevel:15,
      active:true,
      col:2
    },
    [id3]:{
      type:'compressor',
      id:id3,
      threshold:-20,
      knee:20,
      ratio:5,
      attack:0.1,
      release:0.1,
      active:true,
      col:2
    },
    [id4]:{
      type:'sidechain-compressor',
      id:id4,
      threshold:-20,
      knee:20,
      ratio:5,
      attack:0.1,
      release:0.1,
      active:true,
      col:2
    }
  },
  drums:{}
}

const effects = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_EFFECT':
      let newState = Object.assign({}, state);
      newState[action.parent][action.id] = Object.assign({}, newState[action.parent][action.id], action.payload);
      return newState;
      //break;
    default:
      return state;
  }
}

export default effects
