import React, { Component } from 'react';
let audio, analyzer, dataArray, context, x, y, v, animId, sliceWidth;
export class Waveform extends Component{
  constructor(props){
    super(props);
    this.state={
      width:0,
      height:0,
    }
    audio=this.props.audio;
    console.log(this.props);
    analyzer=audio.analyser;
    dataArray=new Uint8Array(analyzer.fftSize);
  }
  render(){
    return(
      <canvas width={this.state.width} height={this.state.height} id='waveform' style={{position:'absolute', zIndex:0, marginTop:this.props.marginTop}}></canvas>
    )
  }
  componentDidMount(){
    let container=document.getElementById(this.props.containerId);
    context=document.getElementById('waveform').getContext('2d')
    this.setState({width: container.clientWidth, height: container.clientHeight});
    this.draw();
    window.addEventListener('resize', this.onResize.bind(this))
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this.onResize)
    cancelAnimationFrame(animId);
  }
  onResize(){
    let container=document.getElementById(this.props.containerId)
    cancelAnimationFrame(animId);
    if(container){
      this.setState({width: container.clientWidth, height: container.clientHeight});
      this.draw();
    }
  }
  draw(){
    analyzer.getByteTimeDomainData(dataArray);
    context.fillStyle = "#2196f3";
    context.fillRect(0, 0, this.state.width, this.state.height);
    context.lineWidth = 2;
    context.strokeStyle = '#69f0ae';
    context.beginPath();
    sliceWidth = this.state.width * 1.0 / analyzer.fftSize;
    x = 0;
    for(var i = 0; i < analyzer.fftSize; i++) {
      v = dataArray[i] / 128.0;
      y = v * this.state.height/2;
      if(i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
      x += sliceWidth;
    }
    context.lineTo(this.state.width, this.state.height/2);
    context.stroke();
    animId = requestAnimationFrame(this.draw.bind(this));
  }
}
