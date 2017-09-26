import React, { Component } from 'react';
import { Grid, Cell, IconButton, Menu, MenuItem } from 'react-mdl'
import { Knob } from '../Knob';
import { connect } from 'react-redux';
import { updateEffect, reorderEffects, removeEffect } from '../../actions';
import PropTypes from 'prop-types';

class CompressorUI extends Component{
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
    if(effect){
      return(
        <div className="mdl-shadow--2dp mdl-color--deep-orange-500 text-white">
          <Grid>
            <Cell col={12} >
              <p className="effect-label left">Compressor</p>
              <IconButton className="right" ripple name="more_vert" id={effect.id} style={{marginTop:'-8px', marginRight:'-8px'}}/>
              <Menu target={effect.id} ripple align="left">
                  <MenuItem onClick={this.toggleEffect}>{effect.active?'Deactivate':'Activate'}</MenuItem>
                  <MenuItem onClick={() => {this.reOrder(false)}}>Move Left</MenuItem>
                  <MenuItem onClick={() => {this.reOrder(true)}}>Move Right</MenuItem>
                  <MenuItem onClick={() => {this.props.remove( this.props.parent, effect.id )}}>Remove</MenuItem>
              </Menu>
            </Cell>
            <Cell col={4} phone={1} tablet={4} className="text-center">
              <p className="effect-label">Attack</p>
              <Knob value={effect.attack} type="radial" min={0} max={1} step={0.01} onChange={this.onChange} propName="attack" disabled={!effect.active}/>
            </Cell>
            <Cell col={4} phone={1} tablet={4} className="text-center">
              <p className="effect-label">Thresh.</p>
              <Knob value={effect.threshold} type="radial" min={-100} max={0} step={1} onChange={this.onChange} propName="threshold" disabled={!effect.active}/>
            </Cell>
            <Cell col={4} phone={1} tablet={4} className="text-center">
              <p className="effect-label">Ratio</p>
              <Knob value={effect.ratio} type="radial" min={1} max={20} step={1} onChange={this.onChange} propName="ratio" disabled={!effect.active}/>
            </Cell>
            <Cell col={4} phone={1} tablet={4} className="text-center">
              <p className="effect-label">Release</p>
              <Knob value={effect.release} type="radial" min={0} max={1} step={0.01} onChange={this.onChange} propName="release" disabled={!effect.active}/>
            </Cell>
            <Cell col={4} phone={1} tablet={4} className="text-center">
              <p className="effect-label">Knee</p>
              <Knob value={effect.knee} type="radial" min={0} max={40} step={1} onChange={this.onChange} propName="knee" disabled={!effect.active}/>
            </Cell>
          </Grid>
        </div>
      )
    }else{
      return null
    }
  }
}

CompressorUI.propTypes={
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


export default connect(mapStateToProps, mapDispatchToProps)(CompressorUI)
