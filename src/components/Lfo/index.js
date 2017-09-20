import React, { Component } from 'react';
import {Grid, Cell} from 'react-mdl';
import {Knob} from '../Knob';
import { connect } from 'react-redux';
import { updateLfo } from '../../actions';
import PropTypes from 'prop-types';
const waves=['sine', 'sawtooth', 'square', 'triangle'];

class Lfo extends Component{
  constructor(props){
    super(props);
    console.log(props);
  }
  render(){
    return(
      <div className="mdl-shadow--2dp mdl-color--deep-orange-400 text-white">
        <Grid>
          <Cell col={12} >
            <p className="effect-label">Lfo</p>
          </Cell>
          <Cell col={4} phone={1} tablet={4} className="text-center">
           <p className="effect-label">Frequency</p>
            <Knob value={this.props.lfo.freq} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="freq"/>
          </Cell>
          <Cell col={4} phone={1} tablet={4} className="text-center">
            <p className="effect-label">Wave</p>
            <Knob value={waves.indexOf(this.props.lfo.wave)} type="radial" min={0} max={3} step={1} onChange={this.props.onChange} type="select" propName="wave"/>
          </Cell>
          <Cell col={4} phone={1} tablet={4} className="text-center">
            <p className="effect-label">Osc1</p>
            <Knob value={this.props.lfo.osc0} type="radial" min={0} max={100} step={1} index={1} onChange={this.props.onChange} propName="osc" index={0}/>
          </Cell>
          <Cell col={4} phone={1} tablet={4} className="text-center">
            <p className="effect-label">Osc2</p>
            <Knob value={this.props.lfo.osc1} type="radial" min={0} max={100} step={1} index={2} onChange={this.props.onChange} propName="osc" index={1}/>
          </Cell>
          <Cell col={4} phone={1} tablet={4} className="text-center">
            <p className="effect-label">Osc3</p>
            <Knob value={this.props.lfo.osc2} type="radial" min={0} max={100} step={1} index={3} onChange={this.props.onChange} propName="osc" index={2}/>
          </Cell>
        </Grid>
      </div>
    )
  }
}
Lfo.propTypes = {
  lfo:PropTypes.object.isRequired
}
const mapDispatchToProps = dispatch =>{
  return {
    onChange: ( key, value, index ) => {
      dispatch(updateLfo( key, index, value ))
    }
  }
}

const mapStateToProps = state => {
  return{
    lfo:state.lfo
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lfo)
