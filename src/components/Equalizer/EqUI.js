import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl'
import {Knob} from '../Knob';
import { connect } from 'react-redux';
import { updateEffect, reorderEffects, removeEffect } from '../../actions';
import { EffectOptions } from '../EffectBank';
import { ErrorBoundary } from '../Errors'
import PropTypes from 'prop-types';

class EqUI extends Component{
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
  shouldComponentUpdate(next){
    if(next.effects[this.props.parent][this.props.id] != this.props.effects[this.props.parent][this.props.id]) return true
    console.log('test');
    return false;
  }
  render(){
    const effect=this.props.effects[this.props.parent][this.props.id];
    const length=Object.keys(this.props.effects[this.props.parent]).length -1;
    return(
      <ErrorBoundary message={this.props.parent + ' > ' + this.constructor.name + ' encountered an error'}>
        <div className="mdl-shadow--2dp mdl-color--amber-500" id={'effect-'+effect.id}>
          <Grid>
            <Cell col={12}>
              <p className="effect-label left">Equalizer</p>
              <EffectOptions id={effect.id} active={effect.active} index={this.props.index} length={length} toggleEffect={this.toggleEffect} reOrder={this.reOrder} remove={this.props.remove} parent={this.props.parent}/>
            </Cell>
            <Cell col={4} phone={1} tablet={2} className="text-center">
              <p className="effect-label">80hz</p>
              <Knob value={effect.eq80} type="radial" min={-40} max={40} step={1} onChange={this.onChange} propName="eq80" disabled={!effect.active}/>
            </Cell>
            <Cell col={4} phone={1} tablet={2} className="text-center">
              <p className="effect-label">350hz</p>
              <Knob value={effect.eq350} type="radial" min={-40} max={40} step={1} onChange={this.onChange} propName="eq350" disabled={!effect.active}/>
            </Cell>
            <Cell col={4} phone={1} tablet={2} className="text-center">
              <p className="effect-label">720hz</p>
              <Knob value={effect.eq720} type="radial" min={-40} max={40} step={1} onChange={this.onChange} propName="eq720" disabled={!effect.active}/>
            </Cell>
            <Cell col={4} phone={1} tablet={2} className="text-center">
              <p className="effect-label">1.6khz</p>
              <Knob value={effect.eq16k} type="radial" min={-40} max={40} step={1} onChange={this.onChange} propName="eq16k" disabled={!effect.active}/>
            </Cell>
            <Cell col={4} phone={1} tablet={2} className="text-center">
              <p className="effect-label">5khz</p>
              <Knob value={effect.eq5k} type="radial" min={-40} max={40} step={1} onChange={this.onChange} propName="eq5k" disabled={!effect.active}/>
            </Cell>
            <Cell col={4} phone={1} tablet={2} className="text-center">
              <p className="effect-label">10khz</p>
              <Knob value={effect.eq10k} type="radial" min={-40} max={40} step={1} onChange={this.onChange} propName="eq10k" disabled={!effect.active}/>
            </Cell>
          </Grid>
        </div>
      </ErrorBoundary>
    )
  }
}
EqUI.propTypes={
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


export default connect(mapStateToProps, mapDispatchToProps)(EqUI)
