import React, { Component } from 'react';
import {Grid, Cell, Switch} from 'react-mdl'
import {Knob} from '../Knob';
export class Compressor extends Component{
  constructor(props){
    super(props);
    console.log(props);
    if(this.props.mode!='sidechain'){
      this.compressor=this.props.audio.createDynamicsCompressor();
      this.compressor.threshold.value = this.props.preset.threshold;
      this.compressor.knee.value = this.props.preset.knee;
      this.compressor.ratio.value = this.props.preset.ratio;
      this.compressor.attack.value = this.props.preset.attack;
      this.compressor.release.value = this.props.preset.release;
      this.props.input.connect(this.compressor);
      this.compressor.connect(this.props.output);
    }else{
      this.props.input.connect(this.props.output);
    }

    this.toggleEffect=this.toggleEffect.bind(this);
    this.onChange=this.onChange.bind(this);
    this.state={
      threshold:this.props.preset.threshold,
      knee:this.props.preset.knee,
      ratio:this.props.preset.ratio,
      attack:this.props.preset.attack,
      release:this.props.preset.release,
      active:this.props.preset.active
    }
  }
  onChange(key, value, index){
    this.setState({[key]:value});
    if(this.props.mode==='sidechain'){
      this.props.onChange(key, value);
    }else{
      this.compressor[key].value=value;
    }
  }
  toggleEffect(){
    this.setState({active:!this.state.active});
    this.props.input.disconnect();
    if(this.state.active){
      this.compressor.disconnect();
      this.props.input.connect(this.props.output);
    }else{
      this.props.input.connect(this.compressor);
      this.compressor.connect(this.props.output)
    }
  }
  render(){
    return(
      <div className="mdl-shadow--2dp mdl-color--blue-grey-100">
        <Grid>
          <Cell col={12} >
            <p className="effect-label">Compressor <Switch className="right effect-switch" ripple id="switch1" defaultChecked onClick={this.toggleEffect}>On</Switch></p>
          </Cell>
          <Cell col={4} className="text-center">
            <p className="effect-label">Attack</p>
            <Knob value={this.state.attack} type="radial" min={0} max={1} step={0.01} onChange={this.onChange} propName="attack"/>
          </Cell>
          <Cell col={4} className="text-center">
            <p className="effect-label">Thresh.</p>
            <Knob value={this.state.threshold} type="radial" min={-100} max={0} step={1} onChange={this.onChange} propName="threshold"/>
          </Cell>
          <Cell col={4} className="text-center">
            <p className="effect-label">Ratio</p>
            <Knob value={this.state.ratio} type="radial" min={1} max={20} step={1} onChange={this.onChange} propName="ratio"/>
          </Cell>
          <Cell col={4} className="text-center">
            <p className="effect-label">Release</p>
            <Knob value={this.state.release} type="radial" min={0} max={1} step={0.01} onChange={this.onChange} propName="release"/>
          </Cell>
          <Cell col={4} className="text-center">
            <p className="effect-label">Knee</p>
            <Knob value={this.state.knee} type="radial" min={0} max={40} step={1} onChange={this.onChange} propName="knee"/>
          </Cell>
        </Grid>
      </div>
    )
  }
}
