import React, { Component } from 'react';
import './audio-visualizer.css';
//import {Waveform} from './waveform';
//import {Webgl} from './webgl';
import {Fractal} from './fractal';

export class AudioVisualizer extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Fractal containerId={this.props.containerId} audio={this.props.audio}></Fractal>
    )
  }
}
