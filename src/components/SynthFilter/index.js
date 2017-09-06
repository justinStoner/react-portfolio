import React, { Component } from 'react';
import {Grid, Cell} from 'react-mdl';
import {Knob} from '../Knob';
import { connect } from 'react-redux';
import { updateSynthFilter } from '../../actions';
import * as selectors from '../../selectors';
import PropTypes from 'prop-types';

class SynthFilter extends Component{
  constructor(props){
    super(props);
    console.log(props);
  }
  render(){
    return(
      <div className="mdl-shadow--2dp mdl-color--orange-300" >
        <Grid>
          <Cell col={12} >
            <p className="effect-label">Filter</p>
          </Cell>
          <Cell col={3} className="text-center">
           <p className="effect-label">Cutoff</p>
            <Knob value={this.props.filter.lpfCutoff} type="radial" min={0} max={200} step={1} onChange={this.props.onChange} propName="lpfCutoff"/>
          </Cell>
          <Cell col={3} className="text-center">
            <p className="effect-label">Q</p>
            <Knob value={this.props.filter.lpfQ} type="radial" min={0} max={20} step={1} onChange={this.props.onChange} propName="lpfQ"/>
          </Cell>
          <Cell col={3} className="text-center">
            <p className="effect-label">Mod</p>
            <Knob value={this.props.filter.lpfMod} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="lpfMod"/>
          </Cell>
          <Cell col={3} className="text-center">
            <p className="effect-label">Env</p>
            <Knob value={this.props.filter.lpfEnv} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="lpfEnv"/>
          </Cell>
          <Cell col={3} phone={1} tablet={4} className="text-center">
            <p className="effect-label">Attack</p>
            <Knob value={this.props.filter.lpfA} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="lpfA"/>
          </Cell>
          <Cell col={3} phone={1} tablet={4} className="text-center">
            <p className="effect-label">Decay</p>
            <Knob value={this.props.filter.lpfD} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="lpfD"/>
          </Cell>
          <Cell col={3} phone={1} tablet={4} className="text-center">
            <p className="effect-label">Sustain</p>
            <Knob value={this.props.filter.lpfS} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="lpfS"/>
          </Cell>
          <Cell col={3} phone={1} tablet={4} className="text-center">
            <p className="effect-label">Release</p>
            <Knob value={this.props.filter.lpfR} type="radial" min={0} max={100} step={1} onChange={this.props.onChange} propName="lpfR"/>
          </Cell>
        </Grid>

      </div>
    )
  }
}
SynthFilter.propTypes={
  filter: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  filter:state.synthFilter

});

const mapDispatchToProps = dispatch =>{
  return {
    onChange: ( key, value ) => {
      dispatch(updateSynthFilter( key, value ))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SynthFilter)
