import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl'
import {Knob} from '../Knob';
import { connect } from 'react-redux';
import { updateEffect, reorderEffects, removeEffect } from '../../actions';
import { EffectOptions } from '../EffectBank';
import { ErrorBoundary } from '../Errors'
import PropTypes from 'prop-types';
import { filterTypes } from '../../utils/audio';

class FilterUI extends Component{
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
  render(){
    const effect=this.props.effects[this.props.parent][this.props.id];
    const length=Object.keys(this.props.effects[this.props.parent]).length -1;
    return(
      <ErrorBoundary message={this.props.parent + ' > ' + this.constructor.name + ' encountered an error'}>
        <div className="mdl-shadow--2dp mdl-color--amber-500" id={'effect-'+effect.id}>
          <Grid>
            <Cell col={12}>
              <p className="effect-label left">Filter</p>
              <EffectOptions id={effect.id} active={effect.active} index={this.props.index} length={length} toggleEffect={this.toggleEffect} reOrder={this.reOrder} remove={this.props.remove} parent={this.props.parent}/>
            </Cell>
            <Cell col={6} phone={1} tablet={4} className="text-center">
              <p className="effect-label">Type</p>
              <Knob value={effect.filterType} type="select" labels={filterTypes} onChange={this.onChange} propName="filterType" disabled={!effect.active}/>
            </Cell>
            <Cell col={6} phone={1} tablet={4} className="text-center">
              <p className="effect-label">Frequency</p>
              <Knob value={effect.frequency} type="radial" min={0} max={22050} step={1} onChange={this.onChange} propName="frequency" disabled={!effect.active}/>
            </Cell>
            <Cell col={6} phone={1} tablet={4} className="text-center">
              <p className="effect-label">Q</p>
              <Knob value={effect.Q} type="radial" min={0} max={20} step={1} onChange={this.onChange} propName="Q" disabled={!effect.active}/>
            </Cell>
            <Cell col={6} phone={1} tablet={4} className="text-center">
              <p className="effect-label">Gain</p>
              <Knob value={effect.gain} type="radial" min={0} max={100} step={1} onChange={this.onChange} propName="gain" disabled={!effect.active} flat square={true}/>
            </Cell>
          </Grid>
        </div>
      </ErrorBoundary>
    )
  }
}
FilterUI.propTypes={
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


export default connect(mapStateToProps, mapDispatchToProps)(FilterUI)
