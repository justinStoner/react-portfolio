import React, { Component } from 'react';
import {Grid, Cell, Switch} from 'react-mdl'
import {Knob} from '../Knob';
import { connect } from 'react-redux';
import { updateEffect } from '../../actions';
import PropTypes from 'prop-types';

class Delay extends Component{
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
      <div className="mdl-shadow--2dp mdl-color--lime-400">
        <Grid>
          <Cell col={12} >
            <p className="effect-label">Delay <Switch className="right effect-switch" ripple id={effect.id} checked={effect.active} onChange={this.toggleEffect}>On</Switch></p>
          </Cell>
          <Cell col={6} className='text-center'>
            <p className="effect-label">Time</p>
            <Knob value={effect.delayTime} type="radial" min={0} max={100} step={1} onChange={this.onChange} propName="delayTime"/>
          </Cell>
          <Cell col={6} className='text-center'>
            <p className="effect-label">Feedback</p>
            <Knob value={effect.feedback} type="radial" min={0} max={100} step={1} onChange={this.onChange} propName="feedback"/>
          </Cell>
          <Cell col={6} className='text-center'>
            <p className="effect-label">Wet/Dry</p>
            <Knob value={effect.wetLevel} type="radial" min={0} max={100} step={1} onChange={this.onChange} propName="wetLevel"/>
          </Cell>
          <Cell col={6} phone={1} tablet={4} className='text-center'>

          </Cell>
        </Grid>
      </div>
    )
  }
}
Delay.propTypes={
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


export default connect(mapStateToProps, mapDispatchToProps)(Delay)
