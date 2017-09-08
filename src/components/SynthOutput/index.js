import React, { Component } from 'react';
import { Grid, Cell, Button } from 'react-mdl'
import { Knob } from '../Knob';
import { AudioVisualizer } from '../AudioVisualizer';
import { AvModeSelector } from '../AudioVisualizer/AvModeSelector'
import { connect } from 'react-redux';
import { updateSynthOutput } from '../../actions';
import * as selectors from '../../selectors';
import PropTypes from 'prop-types';
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
          <Cell col={3} className="text-center">
           <p className="effect-label">Drive</p>
            <Knob value={this.props.output.drive} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="drive" color="green"/>
          </Cell>
          <Cell col={3} className="text-center">
            <p className="effect-label">Reverb</p>
            <Knob value={this.props.output.reverb} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="reverb" color="green"/>
          </Cell>
          <Cell col={3} className="text-center">
            <p className="effect-label">Volume</p>
            <Knob value={this.props.output.masterVol} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="masterVol" color="green"/>
          </Cell>
          <Cell col={3} className="text-center">
            <p className="effect-label">Visualizer</p>
            <AvModeSelector visualizerType={this.props.output.visualizerType} visualizerOn={this.props.output.visualizerOn} onClick={ this.props.onChange } />
          </Cell>
          <Cell col={3} phone={1} tablet={4} className="text-center">
            <p className="effect-label">Attack</p>
            <Knob value={this.props.output.envA} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="envA" color="green"/>
          </Cell>
          <Cell col={3} phone={1} tablet={4} className="text-center">
            <p className="effect-label">Decay</p>
            <Knob value={this.props.output.envD} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="envD" color="green"/>
          </Cell>
          <Cell col={3} phone={1} tablet={4} className="text-center">
            <p className="effect-label">Sustain</p>
            <Knob value={this.props.output.envS} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="envS" color="green"/>
          </Cell>
          <Cell col={3} phone={1} tablet={4} className="text-center">
            <p className="effect-label">Release</p>
            <Knob value={this.props.output.envR} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="envR" color="green"/>
          </Cell>
        </Grid>
        <AudioVisualizer visualizerType={this.props.output.visualizerType} containerId='synthoutput' audio={this.props.audio} visualizerOn={this.props.output.visualizerOn}></AudioVisualizer>
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SynthOutput)
