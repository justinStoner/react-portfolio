import React, { Component } from 'react';
import {Grid, Cell, Switch} from 'react-mdl'
import {Knob} from '../Knob';
export class Delay extends Component{
  constructor(props){
    super(props);
    console.log(props);
    this.dInput=this.props.audio.createGain();
    this.dOutput=this.props.audio.createGain();
    this.delay = this.props.audio.createDelay(5.0);
    this.feedback = this.props.audio.createGain();
    this.wetLevel = this.props.audio.createGain();
    this.delay.delayTime.value = 1;
    this.feedback.gain.value = 0.15;
    this.wetLevel.gain.value = 0.15;

    this.props.input.connect(this.dInput);
    this.dInput.connect(this.delay);
    this.dInput.connect(this.dOutput);
    this.delay.connect(this.feedback);
    this.delay.connect(this.wetLevel);
    this.feedback.connect(this.delay);
    this.wetLevel.connect(this.dOutput);
    this.dOutput.connect(this.props.output);
    this.onChange=this.onChange.bind(this);
    this.state={
      delayTime:100,
      feedback:15,
      wetLevel:15,
      active:true
    }
    this.toggleEffect=this.toggleEffect.bind(this);
  }
  onChange(key, value, index){
    if(key=='delayTime'){
      this.setState({[key]:value});
      this.delay.delayTime.value=value/100;
    }else{
      this.setState({[key]:value});
      this[key].gain.value=value/100;
    }
  }
  toggleEffect(){
    this.setState({active:!this.state.active});
    this.props.input.disconnect();
    if(this.state.active){
      this.dOutput.disconnect();
      this.props.input.connect(this.props.output);
    }else{
      this.props.input.connect(this.dInput);

      this.dOutput.connect(this.props.output);
    }
  }
  render(){
    return(
      <div className="mdl-shadow--2dp mdl-color--lime-400">
        <Grid>
          <Cell col={12} >
            <p className="effect-label">Delay <Switch className="right effect-switch" ripple id="switch1" defaultChecked onClick={this.toggleEffect}>On</Switch></p>
          </Cell>
          <Cell col={6} className='text-center'>
            <p className="effect-label">Time</p>
            <Knob value={this.state.delayTime} type="radial" min={0} max={100} step={1} onChange={this.onChange} propName="delayTime"/>
          </Cell>
          <Cell col={6} className='text-center'>
            <p className="effect-label">Feedback</p>
            <Knob value={this.state.feedback} type="radial" min={0} max={100} step={1} onChange={this.onChange} propName="feedback"/>
          </Cell>
          <Cell col={6} className='text-center'>
            <p className="effect-label">Wet/Dry</p>
            <Knob value={this.state.wetLevel} type="radial" min={0} max={100} step={1} onChange={this.onChange} propName="wetLevel"/>
          </Cell>
          <Cell col={6} phone={1} tablet={4} className='text-center'>

          </Cell>
        </Grid>
      </div>
    )
  }
}
