import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl'
import { Knob } from '../Knob';
import { connect } from 'react-redux';
import { updateEffect, reorderEffects, removeEffect } from '../../actions';
import { delayLabels } from '../../utils/audio';
import { EffectOptions } from '../EffectBank';
import { ErrorBoundary } from '../Errors'
import PropTypes from 'prop-types';

class DelayUI extends Component{
  constructor(props){
    super(props);
    this.toggleEffect=this.toggleEffect.bind(this);
    this.onChange=this.onChange.bind(this);
    this.reOrder=this.reOrder.bind(this);
    //this.reOrder=this.reOrder.bind(this);
  }
  toggleEffect(){
    const active=this.props.effects[this.props.parent][this.props.id].active;
    this.props.onChange('active', !active, this.props.parent, this.props.id);
  }
  onChange(key, value){
    this.props.onChange(key, value, this.props.parent, this.props.id);
  }
  reOrder(dir){
    this.props.reOrder(this.props.parent, dir, this.props.id)
  }
  //<Switch className="right effect-switch" ripple id={effect.id} checked={effect.active} onChange={this.toggleEffect}>On</Switch>
  render(){
    const effect=this.props.effects[this.props.parent][this.props.id];
    const length=Object.keys(this.props.effects[this.props.parent]).length -1;
    return(
      <ErrorBoundary message={this.props.parent + ' > ' + this.constructor.name + ' encountered an error'}>
        <div className='mdl-shadow--2dp mdl-color--orange-500 text-white' id={'effect-'+effect.id}>
          <Grid>
            <Cell col={12}>
              <p className="effect-label left">Delay</p>
              <EffectOptions id={effect.id} active={effect.active} index={this.props.index} length={length} toggleEffect={this.toggleEffect} reOrder={this.reOrder} remove={this.props.remove} parent={this.props.parent}/>
            </Cell>
            <Cell col={6} phone={1} tablet={4} className='text-center'>
              <p className="effect-label">Time</p>
              <Knob value={effect.delayTime} type="select" labels={delayLabels} onChange={this.onChange} propName="delayTime" disabled={!effect.active}/>
            </Cell>
            <Cell col={6} phone={1} tablet={4} className='text-center'>
              <p className="effect-label">Feedback</p>
              <Knob value={effect.feedback} type="radial" min={0} max={100} step={1} onChange={this.onChange} propName="feedback" disabled={!effect.active}/>
            </Cell>
            <Cell col={6} phone={1} tablet={4} className='text-center'>
              <p className="effect-label">Wet/Dry</p>
              <Knob value={effect.effectLevel} type="radial" min={0} max={100} step={1} onChange={this.onChange} propName="effectLevel" disabled={!effect.active}/>
            </Cell>
            <Cell col={6} phone={1} tablet={4} phone={1} tablet={4} className='text-center'>

            </Cell>
          </Grid>
        </div>
      </ErrorBoundary>
    )
  }
}
DelayUI.propTypes={
  effects: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  effects:state.effects

});
const mapDispatchToProps = dispatch =>{
  return {
    onChange: ( key, value, parent, id ) => {
      dispatch(updateEffect( key, value, parent, id ))
    },
    reOrder: ( parent, up, id ) => {
      dispatch(reorderEffects( parent, up, id ))
    },
    remove: ( parent, id ) => {
      dispatch(removeEffect( parent, id ))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DelayUI)
