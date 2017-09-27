import React, { Component } from 'react';
import { Grid, Cell, Button, Tooltip, Menu, MenuItem } from 'react-mdl'
import { Knob } from '../Knob';
import { AudioVisualizer } from '../AudioVisualizer';
import { AvModeSelector } from '../AudioVisualizer/AvModeSelector'
import { connect } from 'react-redux';
import { updateSynthOutput, addEffect } from '../../actions';
import * as selectors from '../../selectors';
import PropTypes from 'prop-types';
import { AddEffect } from '../EffectBank'
import './synthoutput.css';

class SynthOutput extends Component{
  constructor(props){
    super(props);

  }

  render(){
    console.log(this.props.output);
    return(
      <div className="mdl-shadow--2dp mdl-color--blue-500 text-white has-visualiser fractal" id='synthoutput'>
        <Grid>
          <Cell col={12} >
            <p className="effect-label">Synth</p>
          </Cell>
          <Cell col={3} phone={1} tablet={2} className="text-center">
            <p className="effect-label">Octave</p>
            <Knob value={this.props.output.synthOctave} type="radial" min={-3} max={3} step={1} onChange={this.props.onChange} propName="synthOctave" color="green"/>
          </Cell>
          <Cell col={3} phone={1} tablet={2} className="text-center">
            <p className="effect-label">Volume</p>
            <Knob value={this.props.output.masterVol} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="masterVol" color="green"/>
          </Cell>
          <Cell col={3} phone={1} tablet={2} className="text-center">
            <AddEffect addEffect={this.props.addEffect} parent="synth"/>
          </Cell>
          <Cell col={3} phone={1} tablet={2} className="text-center">
            <p className="effect-label">Visualizer</p>
            <AvModeSelector visualizerType={this.props.output.visualizerType} onClick={ this.props.onChange } />
          </Cell>
          <Cell col={3} phone={1} tablet={2} className="text-center">
            <p className="effect-label">Attack</p>
            <Knob value={this.props.output.envA} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="envA" color="green"/>
          </Cell>
          <Cell col={3} phone={1} tablet={2} className="text-center">
            <p className="effect-label">Decay</p>
            <Knob value={this.props.output.envD} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="envD" color="green"/>
          </Cell>
          <Cell col={3} phone={1} tablet={2} className="text-center">
            <p className="effect-label">Sustain</p>
            <Knob value={this.props.output.envS} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="envS" color="green"/>
          </Cell>
          <Cell col={3} phone={1} tablet={2} className="text-center">
            <p className="effect-label">Release</p>
            <Knob value={this.props.output.envR} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="envR" color="green"/>
          </Cell>
        </Grid>
        <AudioVisualizer visualizerType={this.props.output.visualizerType} containerId='synthoutput' audio={this.props.audio} visualizerOn={this.props.output.visualizerOn}/>
      </div>
    )
  }
}
SynthOutput.propTypes={
  output: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  output:state.synthOutput

});

const mapDispatchToProps = dispatch =>{
  return {
    onChange: ( key, value ) => {
      dispatch(updateSynthOutput( key, value ))
    },
    addEffect: ( type, parent ) => {
      dispatch(addEffect( type, parent ))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SynthOutput)
