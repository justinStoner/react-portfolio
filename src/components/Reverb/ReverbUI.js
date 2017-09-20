import React, { Component } from 'react';
import {Grid, Cell, Switch} from 'react-mdl'
import {Knob} from '../Knob';
import { connect } from 'react-redux';
import { updateEffect, reorderEffects } from '../../actions';
import PropTypes from 'prop-types';

class ReverbUI extends Component{
  constructor(props){
    super(props);
    this.toggleEffect=this.toggleEffect.bind(this);
    this.onChange=this.onChange.bind(this);
    //this.reOrder=this.reOrder.bind(this);
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
      <div className="mdl-shadow--2dp mdl-color--lime-300">
        <Grid style={{paddingBottom:'0'}}>
          <Cell col={12} style={{marginBottom:'0'}}>
            <p className="effect-label">Reverb <Switch className="right effect-switch" ripple id={effect.id} checked={effect.active} onChange={this.toggleEffect}></Switch></p>
          </Cell>
          <Cell col={12} phone={1} tablet={4} className='text-center' style={{marginTop:'0'}}>
            <p className="effect-label">Amount</p>
            <Knob value={effect.amount} type="radial" min={0} max={100} step={1} onChange={this.onChange} propName="amount"/>
          </Cell>
          <Cell col={12} phone={1} tablet={4} className='text-center'>
            <p className="effect-label">Type</p>
            <Knob value={effect.reverbType} type="select" min={0} max={100} step={1} onChange={this.onChange} propName="reverbType"/>
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
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ReverbUI)
