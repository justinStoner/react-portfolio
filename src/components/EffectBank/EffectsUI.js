import React, { Component } from 'react'
import { Cell } from 'react-mdl';
import { EqUI } from '../Equalizer';
import { DelayUI } from '../Delay';
import { CompressorUI } from '../Compressor';
import { ReverbUI } from '../Reverb';
import { OverdriveUI } from '../Overdrive';
import { FilterUI } from '../Filter';

export class EffectsUI extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return Object.values(this.props.effects).map( (e, i) => {
      return (
        <Cell col={e.col} phone={e.phone} tablet={e.tablet} key={i}>
          {cellChild(e, i, this.props.parent)}
        </Cell>
      )
    })
  }
}

const cellChild = (e, i, parent) => {
  switch (e.type) {
    case 'eq':
      return <EqUI parent={parent} id={e.id} index={i}/>
    case 'delay':
      return <DelayUI parent={parent} id={e.id} index={i}/>
    case 'compressor':
      return <CompressorUI parent={parent} id={e.id} index={i}/>
    case 'sidechain-compressor':
      return <CompressorUI parent={parent} id={e.id} mode='sidechain-compressor' index={i}/>
    case 'reverb':
      return <ReverbUI parent={parent} id={e.id} index={i}/>
    case 'overdrive':
      return <OverdriveUI parent={parent} id={e.id} index={i}/>
    case 'filter':
      return <FilterUI parent={parent} id={e.id} index={i}/>
    default:
      return null
  }
}
