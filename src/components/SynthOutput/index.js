import React, { Component } from 'react';
import {Grid, Cell, Button} from 'react-mdl'
import {Knob} from '../Knob';
import {AudioVisualizer} from '../AudioVisualizer';

export class SynthOutput extends Component{
  constructor(props){
    super(props);

  }
  render(){
    return(
      <div className="mdl-shadow--2dp mdl-color--blue-500 text-white has-visualiser fractal" id='synthoutput'>
        <Grid>
          <Cell col={12} >
            <p className="effect-label">Synth</p>
          </Cell>
          <Cell col={3} className="text-center">
           <p className="effect-label">Drive</p>
            <Knob value={this.props.preset.drive} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="drive" color="green"/>
          </Cell>
          <Cell col={3} className="text-center">
            <p className="effect-label">Reverb</p>
            <Knob value={this.props.preset.reverb} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="reverb" color="green"/>
          </Cell>
          <Cell col={3} className="text-center">
            <p className="effect-label">Volume</p>
            <Knob value={this.props.preset.masterVol} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="masterVol" color="green"/>
          </Cell>
          <Cell col={3} className="text-center">
            <p className="effect-label">Visualizer</p>
              <Button raised ripple className={(this.props.visualizerOn?"mdl-color--white mdl-color-text--green-A400 green-border":"mdl-color--green-A400 text-white") + " round-button"} onClick={this.props.toggleVisualizer}>
                <i className="material-icons">graphic_eq</i>
              </Button>
          </Cell>
          <Cell col={3} phone={1} tablet={4} className="text-center">
            <p className="effect-label">Attack</p>
            <Knob value={this.props.preset.envA} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="envA" color="green"/>
          </Cell>
          <Cell col={3} phone={1} tablet={4} className="text-center">
            <p className="effect-label">Decay</p>
            <Knob value={this.props.preset.envD} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="envD" color="green"/>
          </Cell>
          <Cell col={3} phone={1} tablet={4} className="text-center">
            <p className="effect-label">Sustain</p>
            <Knob value={this.props.preset.envS} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="envS" color="green"/>
          </Cell>
          <Cell col={3} phone={1} tablet={4} className="text-center">
            <p className="effect-label">Release</p>
            <Knob value={this.props.preset.envR} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="envR" color="green"/>
          </Cell>
        </Grid>
        <AudioVisualizer mode='fractal' containerId='synthoutput' audio={this.props.audio}></AudioVisualizer>
      </div>
    )
  }
}
