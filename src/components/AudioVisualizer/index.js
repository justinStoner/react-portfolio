import React, { Component } from 'react';
import './audio-visualizer.css';
//import {Waveform} from './waveform';
import { FreqBarGraph } from './FreqBarGraph';
import { Fractal } from './fractal';
import { Waveform } from './waveform';
import { Webgl } from './webgl';

export class AudioVisualizer extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const props=this.props;
    switch (props.visualizerType) {
      case 'webgl':
        return (<Webgl containerId={this.props.containerId} audio={this.props.audio}/>)
      case 'waveform':
        return (<Waveform containerId={this.props.containerId} audio={this.props.audio}/>)
      case 'fractal':
        return (<Fractal containerId={this.props.containerId} audio={this.props.audio}/>)
        case 'freqgraph':
          return (<FreqBarGraph containerId={this.props.containerId} audio={this.props.audio}/>)
      default:
        return null
    }
  }
}
