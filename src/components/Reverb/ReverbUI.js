import React, { Component } from 'react'
import { Grid, Cell } from 'react-mdl'
import { Knob } from '../Knob'
import { connect } from 'react-redux'
import { updateEffect, reorderEffects, removeEffect } from '../../actions'
import { reverbLabels } from '../../utils/audio'
import { EffectOptions } from '../EffectBank'
import { ErrorBoundary } from '../Errors'
import PropTypes from 'prop-types'

class ReverbUI extends Component{
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
        <div className="mdl-shadow--2dp mdl-color--yellow-500" id={'effect-'+effect.id}  message={this.props.parent + ' > ' + this.constructor.name + ' encountered an error'}>
          <Grid>
            <Cell col={12}>
              <p className="effect-label left">Reverb</p>
              <EffectOptions id={effect.id} active={effect.active} index={this.props.index} length={length} toggleEffect={this.toggleEffect} reOrder={this.reOrder} remove={this.props.remove} parent={this.props.parent}/>
            </Cell>
            <Cell col={6} phone={1} tablet={4} className='text-center'>
              <p className="effect-label">Amount</p>
              <Knob value={effect.effectLevel} type="radial" min={0} max={100} step={1} onChange={this.onChange} propName="effectLevel" disabled={!effect.active}/>
            </Cell>
            <Cell col={6} phone={1} tablet={4} className='text-center'>
              <p className="effect-label">Type</p>
              <Knob value={effect.reverbType} type="select" labels={reverbLabels} min={0} max={100} step={1} onChange={this.onChange} propName="reverbType" disabled/>
            </Cell>
            <Cell col={6} phone={1} tablet={4} className='text-center'>
              <p className="effect-label">High Cut</p>
              <Knob value={effect.highCut} type="radial" min={0} max={22050} step={1} onChange={this.onChange} propName="highCut" disabled/>
            </Cell>
            <Cell col={6} phone={1} tablet={4} className='text-center'>
              <p className="effect-label">Low Cut</p>
              <Knob value={effect.lowCut} type="radial" min={0} max={22050} step={1} onChange={this.onChange} propName="lowCut" disabled/>
            </Cell>
          </Grid>
        </div>
      </ErrorBoundary>
    )
  }
}
//<button onClick={ ()=>{this.props.reOrder(this.props.parent, effect.index, 0, effect.id)} }>re order</button>
ReverbUI.propTypes={
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


export default connect(mapStateToProps, mapDispatchToProps)(ReverbUI)
