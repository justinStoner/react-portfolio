import React, { Component } from 'react'
import { EqAudio } from '../Equalizer';
import { DelayAudio } from '../Delay';
import { CompressorAudio } from '../Compressor';
import { ReverbAudio } from '../Reverb';
import { OverdriveAudio } from '../Overdrive';
import { FilterAudio } from '../Filter';
import { WahWahAudio } from '../WahWah';

const createGains = (gains = {}, effects, context) => {
  // Create new gain nodes
  const createdGains = effects.reduce((total, e) => {
    return Object.assign({}, total, {
      [e.id]: gains[e.id] || context.createGain()
    });
  }, gains);
  // Remove old gain nodes
  return Object.keys(createdGains)
    .filter(k => {
      if (effects.some(e => e.id === k)) {
        return true;
      } else {
        createdGains[k].disconnect();
        return false;
      }
    })
    .reduce((total, k) => {
      return Object.assign({}, total, {
        [k]: createdGains[k]
      });
    }, {});
};

export default class EffectsAudio extends Component{
  constructor(props){
    super(props)
    this.effectsChain={}
  }
  render(){
    const arr = Object.values(this.props.effects);
    const length = arr.length
    let output;
    this.effectsChain = createGains(this.effectsChain, arr, this.props.context)
    if(arr.length === 0){
      this.props.effectsIn.disconnect()
      this.props.effectsIn.connect(this.props.effectsOut)
    }
    return arr.map( (e, i) => {
      const Effect = this.effect(e, i);
      output = this.props.effectsOut
      if( i < length -1 ){
        output = this.effectsChain[arr[i+1].id]
      }
      return (<Effect
                context={this.props.context}
                input={i===0?this.props.effectsIn:null}
                gain={this.effectsChain[e.id]}
                output={output}
                id={e.id}
                key={i}
                effect={e}
                parent={this.props.parent}/>)
    })
  }
  effect(e, i){
    switch (e.type) {
      case 'eq':
        return EqAudio
      case 'delay':
        return DelayAudio
      case 'compressor':
        return CompressorAudio
      case 'sidechain-compressor':
        return CompressorAudio
      case 'reverb':
        return ReverbAudio
      case 'overdrive':
        return OverdriveAudio
      case 'filter':
        return FilterAudio
      case 'wahwah':
        return WahWahAudio
      default:
        return null
    }
  }
}
