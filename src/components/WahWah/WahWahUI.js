import React, { Component } from 'react';
import { Grid, Cell, Switch } from 'react-mdl'
import {Knob} from '../Knob';
import { connect } from 'react-redux';
import { updateEffect, reorderEffects, removeEffect } from '../../actions';
import { EffectOptions } from '../EffectBank';
import { ErrorBoundary } from '../Errors'
import PropTypes from 'prop-types';

class WahWahUI extends Component{
  constructor(props){
    super(props);
    this.toggleEffect=this.toggleEffect.bind(this);
    this.onChange=this.onChange.bind(this);
    this.reOrder=this.reOrder.bind(this);
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
        <div className="mdl-shadow--2dp mdl-color--green-A400 text-white" id={'effect-'+effect.id}>
          <Grid>
            <Cell col={12}>
              <p className="effect-label left">Wah Wah</p>
              <EffectOptions id={effect.id} active={effect.active} index={this.props.index} length={length} toggleEffect={this.toggleEffect} reOrder={this.reOrder} remove={this.props.remove} parent={this.props.parent}/>
            </Cell>
            <Cell col={4} phone={1} tablet={4} className='text-center'>
              <p className="effect-label">Auto</p>
              <Switch className="right effect-switch" ripple id={effect.id} checked={effect.automode} onChange={() => {this.onChange('automode', !effect.automode)}}>On</Switch>
            </Cell>
            <Cell col={4} phone={1} tablet={4} className='text-center'>
              <p className="effect-label">Base Freq</p>
              <Knob value={effect.baseFrequency} type="radial" min={0} max={100} step={1} onChange={this.onChange} propName="baseFrequency" disabled={!effect.active}/>
            </Cell>
            <Cell col={4} phone={1} tablet={4} className='text-center'>
              <p className="effect-label">Octaves</p>
              <Knob value={effect.excursionOctaves} type="radial" min={0} max={6} step={1} onChange={this.onChange} propName="excursionOctaves" disabled={!effect.active}/>
            </Cell>
            <Cell col={4} phone={1} tablet={4} className='text-center'>
              <p className="effect-label">Sweep</p>
              <Knob value={effect.sweep} type="radial" min={0} max={100} step={1} onChange={this.onChange} propName="sweep" disabled={!effect.active}/>
            </Cell>
            <Cell col={4} phone={1} tablet={4} className='text-center'>
              <p className="effect-label">Resonance</p>
              <Knob value={effect.resonance} type="radial" min={0} max={100} step={1} onChange={this.onChange} propName="resonance" disabled={!effect.active}/>
            </Cell>
            <Cell col={4} phone={1} tablet={4} className='text-center'>
              <p className="effect-label">Sensitivity</p>
              <Knob value={effect.sensitivity} type="radial" min={-10} max={10} step={1} onChange={this.onChange} propName="sensitivity" disabled={!effect.active}/>
            </Cell>
          </Grid>
        </div>
      </ErrorBoundary>
    )
  }
}
//<button onClick={ ()=>{this.props.reOrder(this.props.parent, effect.index, 0, effect.id)} }>re order</button>
WahWahUI.propTypes={
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
    reOrder: ( parent, toIndex, fromIndex ) => {
      dispatch(reorderEffects( parent, toIndex, fromIndex ))
    },
    remove: ( parent, id ) => {
      dispatch(removeEffect( parent, id ))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(WahWahUI)
