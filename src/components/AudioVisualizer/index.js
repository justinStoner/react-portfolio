import React, { Component } from 'react';
import './audio-visualizer.css';
//import {Waveform} from './waveform';
//import {Webgl} from './webgl';
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
        return (<Webgl containerId={this.props.containerId} audio={this.props.audio}></Webgl>)
      case 'waveform':
        return (<Waveform containerId={this.props.containerId} audio={this.props.audio}></Waveform>)
      case 'fractal':
        return (<Fractal containerId={this.props.containerId} audio={this.props.audio}></Fractal>)
      default:
        return null
    }
  }
}
