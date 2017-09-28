import React, { Component } from 'react';
let audio, analyzer, dataArray, context, x, y, v, animId, barHeight, container;
export class FreqBarGraph extends Component{
  constructor(props){
    super(props);
    this.state={
      width:0,
      height:0,
      marginTop:0,
      barWidth:0
    }
    audio=this.props.audio;
    console.log(this.props);
    analyzer=audio.analyser;
    dataArray=new Uint8Array(analyzer.fftSize);
  }
  render(){
    return(
      <canvas width={this.state.width} height={this.state.height} id='freqgraph' style={{position:'absolute', zIndex:0, marginTop:this.state.marginTop}}></canvas>
    )
  }
  componentDidMount(){
    container=document.getElementById(this.props.containerId);
    context=document.getElementById('freqgraph').getContext('2d')
    this.setState({width: container.clientWidth, height: container.clientHeight, marginTop:-container.clientHeight, barWidth:(container.clientWidth / (analyzer.frequencyBinCount / 10)) * 2.5});
    this.draw();
    window.addEventListener('resize', this.onResize.bind(this))
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this.onResize)
    cancelAnimationFrame(animId);
  }
  onResize(){
    container=document.getElementById(this.props.containerId)
    cancelAnimationFrame(animId);
    if(container){
      this.setState({width: container.clientWidth, height: container.clientHeight, marginTop:-container.clientHeight, barWidth:(container.clientWidth / (analyzer.frequencyBinCount / 10)) * 2.5});
      this.draw();
    }
  }
  draw(){
    analyzer.getByteTimeDomainData(dataArray);
    context.fillStyle = "#2196f3";
    context.fillRect(0, 0, this.state.width, this.state.height);
    context.lineWidth = 2;
    context.strokeStyle = '#69f0ae';
    x = 0;
    for(var i = 0; i < analyzer.frequencyBinCount; i+=10) {
      barHeight = (dataArray[i] - 128 ) * this.state.height / 30
      // console.log(this.state.height / barHeight);
      context.fillStyle = "#69f0ae";
      context.fillRect( x, this.state.height-barHeight, this.state.barWidth, barHeight );
      x += this.state.barWidth + 1;
    }
    animId = requestAnimationFrame(this.draw.bind(this));
  }
}
