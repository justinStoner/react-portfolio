import React, { Component } from 'react';
import {Grid, Cell} from 'react-mdl';
import {Knob} from '../Knob';
import { connect } from 'react-redux';
import { updateOscillator } from '../../actions';
import * as selectors from '../../selectors';
import PropTypes from 'prop-types';
const waves=['sine', 'sawtooth', 'square', 'triangle'];
class Oscillator extends Component{
  constructor(props){
    super(props);
    console.log(props);
  }
  shouldComponentUpdate(nextProps){
    const props = this.props;
    if(nextProps.oscillators != props.oscillators) return true
    return false
  }
  render(){
    return(
      <div className="mdl-shadow--2dp mdl-color--blue-grey-100">
        <Grid>
          <Cell col={12} >
            <p className="effect-label">Oscillator {this.props.index+1}</p>
          </Cell>
          <Cell col={6} className="text-center">
           <p className="effect-label">Mix</p>
            <Knob value={this.props.oscillators[this.props.index].volume} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="volume" index={this.props.index}/>
          </Cell>
          <Cell col={6} className="text-center">
            <p className="effect-label">Octave</p>
            <Knob value={this.props.oscillators[this.props.index].octave} type="radial" min={-5} max={5} step={1} onChange={this.props.onChange} propName="octave" index={this.props.index}/>
          </Cell>
          <Cell col={6} className="text-center">
            <p className="effect-label">Wave</p>
            <Knob value={waves.indexOf(this.props.oscillators[this.props.index].wave)} type="radial" min={0} max={3} step={1} onChange={this.props.onChange} propName="wave" type="select" index={this.props.index}/>
          </Cell>
          <Cell col={6} phone={1} tablet={4} className="text-center">
            <p className="effect-label">Detune</p>
            <Knob value={this.props.oscillators[this.props.index].detune} type="radial" min={-100} max={100} step={1} onChange={this.props.onChange} propName="detune" index={this.props.index}/>
          </Cell>
        </Grid>
      </div>
    )
  }
}
Oscillator.propTypes={
  oscillators: PropTypes.array.isRequired
}
const mapStateToProps = state => ({
  oscillators:state.oscillators

});

const mapDispatchToProps = dispatch =>{
  return {
    onChange: ( key, value, index ) => {
      dispatch(updateOscillator( key, index, value ))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Oscillator)
