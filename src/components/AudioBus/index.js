import React, { Component }  from 'react';

export class AudioBus extends Component{
  constructor(props){
    super(props);
    this.props=props;
  }
  setCompressor(key, value){
    this.compressor[key].value=value;
  }
  componentWillMount(){
    this.props.analyser.connect(this.props.context.destination);
    this.props.synth.analyser.connect(this.props.analyser);
    this.props.drums.analyser.connect(this.props.analyser)

    this.props.synth.input.connect(this.props.synth.analyser);
    this.props.drums.input.connect(this.props.drums.analyser)
    this.props.analyser.fftSize=2048;
  }
  render(){

    return null
  }
}
