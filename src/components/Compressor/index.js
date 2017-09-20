import React, { Component } from 'react';
import {Grid, Cell, Switch} from 'react-mdl'
import {Knob} from '../Knob';
import { connect } from 'react-redux';
import { updateEffect } from '../../actions';
import PropTypes from 'prop-types';

class Compressor extends Component{
  constructor(props){
    super(props);
    this.toggleEffect=this.toggleEffect.bind(this);
    this.onChange=this.onChange.bind(this);
  }
  toggleEffect(){
    const active=this.props.effects[this.props.parent][this.props.id].active;
    this.props.onChange('active', !active, this.props.parent, this.props.id);
  }
  onChange(key, value){
    this.props.onChange(key, value, this.props.parent, this.props.id);
  }
  render(){
    const effect=this.props.effects[this.props.parent][this.props.id];
    return(
      <div className="mdl-shadow--2dp mdl-color--light-green-A200">
        <Grid>
          <Cell col={12} >
            <p className="effect-label">Compressor <Switch className="right effect-switch" ripple id="switch1" checked={effect.active} onChange={this.toggleEffect}>On</Switch></p>
          </Cell>
          <Cell col={4} phone={1} tablet={4} className="text-center">
            <p className="effect-label">Attack</p>
            <Knob value={effect.attack} type="radial" min={0} max={1} step={0.01} onChange={this.onChange} propName="attack"/>
          </Cell>
          <Cell col={4} phone={1} tablet={4} className="text-center">
            <p className="effect-label">Thresh.</p>
            <Knob value={effect.threshold} type="radial" min={-100} max={0} step={1} onChange={this.onChange} propName="threshold"/>
          </Cell>
          <Cell col={4} phone={1} tablet={4} className="text-center">
            <p className="effect-label">Ratio</p>
            <Knob value={effect.ratio} type="radial" min={1} max={20} step={1} onChange={this.onChange} propName="ratio"/>
          </Cell>
          <Cell col={4} phone={1} tablet={4} className="text-center">
            <p className="effect-label">Release</p>
            <Knob value={effect.release} type="radial" min={0} max={1} step={0.01} onChange={this.onChange} propName="release"/>
          </Cell>
          <Cell col={4} phone={1} tablet={4} className="text-center">
            <p className="effect-label">Knee</p>
            <Knob value={effect.knee} type="radial" min={0} max={40} step={1} onChange={this.onChange} propName="knee"/>
          </Cell>
        </Grid>
      </div>
    )
  }
}

Compressor.propTypes={
  effects: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  effects:state.effects

});
const mapDispatchToProps = dispatch =>{
  return {
    onChange: ( key, value, parent, id ) => {
      dispatch(updateEffect( key, value, parent, id ))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Compressor)
