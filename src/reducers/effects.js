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
      active:true,
      index:0
    },
    [reverbId]:{
      type:'reverb',
      amount:66,
      active:true,
      col:1,
      id:reverbId,
      reverbType:'hall',
      index:1
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
      index:2
    },
    [id2]:{
      type:'delay',
      id:id2,
      delayTime:100,
      feedback:15,
      wetLevel:15,
      active:false,
      col:2,
      index:3
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
      index:4
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
      let effect2;
      let arr = Object.values(newState[action.parent]);
      let obj={}
      console.log(arr);
      //moving right
      if(action.dir){
        //clast effect, cant move any further in this direction
        if(effect1.index === arr.length-1) return newState
        else{
          effect2=arr[effect1.index+1]
          effect1.index++;
          effect2.index--;
          arr[effect1.index] = effect1;
          arr[effect2.index] = effect2;
          arr.forEach( eff => {
            obj[eff.id] = eff
          })
          console.log(obj);
          newState[action.parent] = obj
        }
      }else{
        //clast effect, cant move any further in this direction
        if(effect1.index === 0) return newState
        else{
          effect2=arr[effect1.index-1]
          effect1.index--;
          effect2.index++;
          arr[effect1.index] = effect1;
          arr[effect2.index] = effect2;
          arr.forEach( eff => {
            obj[eff.id] = eff
          })
          console.log(obj);
          newState[action.parent] = obj
        }
      }
      return newState
      //TODO reorder array
      break;
    default:
      return state;
  }
}

export default effects
