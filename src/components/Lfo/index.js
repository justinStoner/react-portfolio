import React, { Component } from 'react';
import {Grid, Cell} from 'react-mdl';
import {Knob} from '../Knob';

export class Lfo extends Component{
  constructor(props){
    super(props);
    console.log(props);
  }
  render(){
    return(
      <div className="mdl-shadow--2dp mdl-color--deep-orange-400">
        <Grid>
          <Cell col={12} >
            <p className="effect-label">Lfo</p>
          </Cell>
          <Cell col={4} className="text-center">
           <p className="effect-label">Frequency</p>
            <Knob value={this.props.preset.freq} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="lfoFreq"/>
          </Cell>
          <Cell col={4} className="text-center">
            <p className="effect-label">Wave</p>
            <Knob value={this.props.preset.wave} type="radial" min={0} max={3} step={1} onChange={this.props.onChange} type="select" propName="lfoWave"/>
          </Cell>
          <Cell col={4} className="text-center">
            <p className="effect-label">Osc1</p>
            <Knob value={this.props.preset.osc0} type="radial" min={0} max={100} step={1} index={1} onChange={this.props.onChange} propName="lfoOsc"/>
          </Cell>
          <Cell col={4} phone={1} tablet={4} className="text-center">
            <p className="effect-label">Osc2</p>
            <Knob value={this.props.preset.osc1} type="radial" min={0} max={100} step={1} index={2} onChange={this.props.onChange} propName="lfoOsc"/>
          </Cell>
          <Cell col={4} phone={1} tablet={4} className="text-center">
            <p className="effect-label">Osc3</p>
            <Knob value={this.props.preset.osc2} type="radial" min={0} max={100} step={1} index={3} onChange={this.props.onChange} propName="lfoOsc"/>
          </Cell>
        </Grid>
      </div>
    )
  }
}
