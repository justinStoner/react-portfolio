import React, { Component } from 'react';
import { Grid, Cell, IconButton, Menu, MenuItem } from 'react-mdl'
import {Knob} from '../Knob';
import { connect } from 'react-redux';
import { updateEffect, reorderEffects, removeEffect } from '../../actions';
import PropTypes from 'prop-types';

class OverdriveUI extends Component{
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
      <div className="mdl-shadow--2dp mdl-color--green-A400 text-white">
        <Grid>
          <Cell col={12} style={{position:'relative'}}>
            <p className="effect-label left">Overdrive</p>
            <IconButton className="right" ripple name="more_vert" id={effect.id} style={{marginTop:'-8px', marginRight:'-8px'}}/>
            <Menu target={effect.id} ripple align="right">
                <MenuItem onClick={this.toggleEffect}>{effect.active?'Deactivate':'Activate'}</MenuItem>
                <MenuItem onClick={() => {this.reOrder(false)}} disabled={this.props.index === 0}>Move Left</MenuItem>
                <MenuItem onClick={() => {this.reOrder(true)}} disabled={length === this.props.index}>Move Right</MenuItem>
                <MenuItem onClick={() => {this.props.remove( this.props.parent, effect.id )}}>Remove</MenuItem>
            </Menu>
          </Cell>
          <Cell col={6} phone={1} tablet={4} className='text-center'>
            <p className="effect-label">Gain</p>
            <Knob value={effect.gain} type="radial" min={0} max={100} step={1} onChange={this.onChange} propName="gain" disabled={!effect.active}/>
          </Cell>
          <Cell col={6} phone={1} tablet={4} className='text-center'>
            <p className="effect-label">Type</p>
            <Knob value={effect.mode} type="radial" min={0} max={5} step={1} onChange={this.onChange} propName="mode" disabled={!effect.active}/>
          </Cell>
          <Cell col={6} phone={1} tablet={4} className='text-center'>
            <p className="effect-label">Drive</p>
            <Knob value={effect.drive} type="radial" min={0} max={100} step={1} onChange={this.onChange} propName="drive" disabled={!effect.active}/>
          </Cell>
          <Cell col={6} phone={1} tablet={4} className='text-center'>
            <p className="effect-label">Curve</p>
            <Knob value={effect.curve} type="radial" min={0} max={100} step={1} onChange={this.onChange} propName="curve" disabled={!effect.active}/>
          </Cell>
        </Grid>
      </div>
    )
  }
}
//<button onClick={ ()=>{this.props.reOrder(this.props.parent, effect.index, 0, effect.id)} }>re order</button>
OverdriveUI.propTypes={
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


export default connect(mapStateToProps, mapDispatchToProps)(OverdriveUI)
