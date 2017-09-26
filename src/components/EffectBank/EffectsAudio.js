import React, { Component } from 'react'
import { EqAudio } from '../Equalizer';
import { DelayAudio } from '../Delay';
import { CompressorAudio } from '../Compressor';
import { ReverbAudio } from '../Reverb';
import { OverdriveAudio } from '../Overdrive';

const createGains = (gains = {}, effectsChain, context) => {
  // Create new gain nodes
  let effects = Object.values(effectsChain);
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

export class EffectsAudio extends Component{
  constructor(props){
    super(props)
    this.effectsChain={}
  }

  // shouldComponentUpdate(nextProps){
  //   if(nextProps.effects!= this.props.effects) return true
  //   return false
  // }
  render(){
    const length = Object.keys(this.props.effects).length;
    const arr = Object.values(this.props.effects);
    let output, input;
    this.effectsChain = createGains(this.effectsChain, this.props.effects, this.props.context)
    if(arr.length === 0){
      this.props.effectsIn.disconnect()
      this.props.effectsIn.connect(this.props.effectsOut)
    }
    return (
      <div>
          {
            arr.map( (e, i) => {
              if( i < length -1 ){
                output = this.effectsChain[arr[i+1].id]
              }else{
                output = this.props.effectsOut
              }
              if( i === 0 ){
                input = this.props.effectsIn
              }else{
                input = this.effectsChain[e.id]
              }
              return (
                (() => {
                  switch (e.type) {
                    case 'eq':
                      return <EqAudio audio={this.props.context} input={input} output={output} id={e.id} key={i} parent={this.props.parent}/>
                    case 'delay':
                      return <DelayAudio audio={this.props.context} input={input} output={output} id={e.id} key={i} parent={this.props.parent}/>
                    case 'compressor':
                      return <CompressorAudio audio={this.props.context} input={input} output={output} id={e.id} key={i} parent={this.props.parent}/>
                    case 'sidechain-compressor':
                      return <CompressorAudio audio={this.props.context} input={input} mode="sidechain" sideChainInput={this.props.sideChainIn} output={output} id={e.id} key={i} parent={this.props.parent}/>
                    case 'reverb':
                      return <ReverbAudio audio={this.props.context} input={input} output={output} id={e.id} key={i} parent={this.props.parent}/>
                    case 'overdrive':
                      return <OverdriveAudio audio={this.props.context} input={input} output={output} id={e.id} key={i} parent={this.props.parent}/>
                    default:
                      return null
                  }
                })()
              )
          })
        }
      </div>
    )
  }
}
