import uuid from 'uuid';
import polyfill from 'object.values';
const id1 = uuid.v4()
const id2 = uuid.v4()
const id3 = uuid.v4()
const id4 = uuid.v4()
const reverbId = uuid.v4()
const overdriveId = uuid.v4()

if(!Object.values){
  polyfill.shim();
}

const initialState = {
  synth:{
    [overdriveId]:{
      type:'overdrive',
      gain:50,
      mode:0,
      curve:50,
      drive:50,
      col:2,
      id:overdriveId,
      active:true,
      index:0
    },
    [reverbId]:{
      type:'reverb',
      amount:66,
      active:true,
      col:2,
      highCut:22050,
      lowCut:20,
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
const presets = Object.values(initialState.synth).map( i => i)

const effects = (state = initialState, action) => {
  let newState, obj, arr;
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
      arr = Object.values(newState[action.parent]);
      obj={}
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
    case 'ADD_EFFECT':
      newState = Object.assign({}, state);
      newState[action.parent] = Object.assign({}, newState[action.parent])
      obj = presets.filter( p => p.type === action.payload)[0];
      //length++
      obj.index = Object.values(newState[action.parent]).length
      let id = uuid.v4()
      obj.id=id
      newState[action.parent][id]=obj
      return newState
    case 'REMOVE_EFFECT':
      obj = {}
      newState = Object.assign({}, state);
      let index = newState[action.parent][action.id].index
      console.log(index);
      arr = Object.values(newState[action.parent])
      arr.splice( index, 1 )
      arr.forEach( i => {
        if( i.index > index) i.index--
        obj[i.id] = i
      })
            console.log(obj);
      newState[action.parent] = obj;
      return newState
    default:
      return state
  }
}

export default effects
