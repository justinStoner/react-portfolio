import React, { Component } from 'react';
import { Grid, Cell, Menu, MenuItem, IconButton } from 'react-mdl'
import { Knob } from '../Knob';
import { connect } from 'react-redux';
import { updateEffect, reorderEffects, removeEffect } from '../../actions';
import PropTypes from 'prop-types';

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
    return(
      <div className="mdl-shadow--2dp mdl-color--yellow-500">
        <Grid>
          <Cell col={12}>
            <p className="effect-label left">Reverb</p>
            <IconButton className="right" ripple name="more_vert" id={effect.id} style={{marginTop:'-8px', marginRight:'-8px'}}/>
            <Menu target={effect.id} ripple align="left">
                <MenuItem onClick={this.toggleEffect}>{effect.active?'Deactivate':'Activate'}</MenuItem>
                <MenuItem onClick={() => {this.reOrder(false)}}>Move Left</MenuItem>
                <MenuItem onClick={() => {this.reOrder(true)}}>Move Right</MenuItem>
                <MenuItem onClick={() => {this.props.remove( this.props.parent, effect.id )}}>Remove</MenuItem>
            </Menu>
          </Cell>
          <Cell col={6} phone={1} tablet={4} className='text-center'>
            <p className="effect-label">Amount</p>
            <Knob value={effect.amount} type="radial" min={0} max={100} step={1} onChange={this.onChange} propName="amount" disabled={!effect.active}/>
          </Cell>
          <Cell col={6} phone={1} tablet={4} className='text-center'>
            <p className="effect-label">Type</p>
            <Knob value={effect.reverbType} type="select" labels={['hall', 'room', 'plate', 'spring']} min={0} max={100} step={1} onChange={this.onChange} propName="reverbType" disabled/>
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
