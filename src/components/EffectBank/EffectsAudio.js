import React, { Component } from 'react'
import { EqAudio } from '../Equalizer';
import { DelayAudio } from '../Delay';
import { CompressorAudio } from '../Compressor';
import { ReverbAudio } from '../Reverb';
import { OverdriveAudio } from '../Overdrive';

export class EffectsAudio extends Component{
  constructor(props){
    super(props)
    this.effectsChain=[]
  }

  componentWillMount(){
    this.updateEffectsChain()
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.effects!= this.props.effects){
      this.updateEffectsChain(nextProps)
    }
  }
  updateEffectsChain(nextProps = this.props){
    let arr = Object.values(nextProps.effects);
    if(arr.length){
      this.effectsChain = arr.map( ( e, i) => {
        if ( i === 0 ) return {input:this.props.effectsIn, output:this.props.context.createGain()}
        else if( i === arr.length-1) return {input:null, output:this.props.effectsOut}
        else return {input:null, output:this.props.context.createGain()}
      })
      this.effectsChain.forEach( ( e, i ) => {
        if( !e.input ) e.input = this.effectsChain[i-1].output;
      })
    }else{
      this.props.effectsIn.connect(this.props.effectsOut)
    }
  }
  render(){
    return (
      <div>
          {
            Object.values(this.props.effects).map( (e, i) => {
            return (
              (() => {
                switch (e.type) {
                  case 'eq':
                    return <EqAudio audio={this.props.context} input={this.effectsChain[i].input} output={this.effectsChain[i].output} id={e.id} key={i} parent={this.props.parent}/>
                  case 'delay':
                    return <DelayAudio audio={this.props.context} input={this.effectsChain[i].input} output={this.effectsChain[i].output} id={e.id} key={i} parent={this.props.parent}/>
                  case 'compressor':
                    return <CompressorAudio audio={this.props.context} input={this.effectsChain[i].input} output={this.effectsChain[i].output} id={e.id} key={i} parent={this.props.parent}/>
                  case 'sidechain-compressor':
                    return <CompressorAudio audio={this.props.context} input={this.effectsChain[i].input} mode="sidechain" sideChainInput={this.props.sideChainIn} output={this.effectsChain[i].output} id={e.id} key={i} parent={this.props.parent}/>
                  case 'reverb':
                    return <ReverbAudio audio={this.props.context} input={this.effectsChain[i].input} output={this.effectsChain[i].output} id={e.id} key={i} parent={this.props.parent}/>
                  case 'overdrive':
                    return <OverdriveAudio audio={this.props.context} input={this.effectsChain[i].input} output={this.effectsChain[i].output} id={e.id} key={i} parent={this.props.parent}/>
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
