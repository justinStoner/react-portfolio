import React, { Component } from 'react';
import {Grid, Cell} from 'react-mdl';
import {Knob} from '../Knob';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import PropTypes from 'prop-types';

class Oscillator extends Component{
  constructor(props){
    super(props);
    console.log(props);
  }
  render(){
    console.log(this.props.synth);
    return(
      <div className="mdl-shadow--2dp mdl-color--blue-grey-100">
        <Grid>
          <Cell col={12} >
            <p className="effect-label">Oscillator {this.props.index+1}</p>
          </Cell>
          <Cell col={6} className="text-center">
           <p className="effect-label">Mix</p>
            <Knob value={this.props.preset.volume} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="oscVol" index={this.props.index}/>
          </Cell>
          <Cell col={6} className="text-center">
            <p className="effect-label">Octave</p>
            <Knob value={this.props.preset.octave} type="radial" min={-5} max={5} step={1} onChange={this.props.onChange} propName="oscOctave" index={this.props.index}/>
          </Cell>
          <Cell col={6} className="text-center">
            <p className="effect-label">Wave</p>
            <Knob value={this.props.preset.wave} type="radial" min={0} max={3} step={1} onChange={this.props.onChange} propName="oscWave" type="select" index={this.props.index}/>
          </Cell>
          <Cell col={6} phone={1} tablet={4} className="text-center">
            <p className="effect-label">Detune</p>
            <Knob value={this.props.preset.detune} type="radial" min={-100} max={100} step={1} onChange={this.props.onChange} propName="oscDetune" index={this.props.index}/>
          </Cell>
        </Grid>
      </div>
    )
  }
}
Oscillator.propTypes={
  synth: PropTypes.object.isRequired,
  //hasMounted:PropTypes.bool.isRequired,
  //mount:PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  synth:state.synth

});

export default connect(mapStateToProps, undefined)(Oscillator)
