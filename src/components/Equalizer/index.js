import React, { Component } from 'react';
import {Grid, Cell, Switch} from 'react-mdl'
import {Knob} from '../Knob';
import { connect } from 'react-redux';
import { updateEffect } from '../../actions';
import PropTypes from 'prop-types';

class Equalizer extends Component{
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
      <div className="mdl-shadow--2dp mdl-color--red-300 text-white">
        <Grid>
          <Cell col={12} >
            <p className="effect-label">Equalizer <Switch className="right effect-switch" ripple id="switch1" checked={effect.active} onChange={this.toggleEffect}>On</Switch></p>
          </Cell>
          <Cell col={4} phone={1} tablet={4} className="text-center">
            <p className="effect-label">80hz</p>
            <Knob value={effect.eq80} type="radial" min={-40} max={40} step={1} onChange={this.onChange} propName="eq80"/>
          </Cell>
          <Cell col={4} phone={1} tablet={4} className="text-center">
            <p className="effect-label">350hz</p>
            <Knob value={effect.eq350} type="radial" min={-40} max={40} step={1} onChange={this.onChange} propName="eq350"/>
          </Cell>
          <Cell col={4} phone={1} tablet={4} className="text-center">
            <p className="effect-label">720hz</p>
            <Knob value={effect.eq720} type="radial" min={-40} max={40} step={1} onChange={this.onChange} propName="eq720"/>
          </Cell>
          <Cell col={4} phone={1} tablet={4} className="text-center">
            <p className="effect-label">1.6khz</p>
            <Knob value={effect.eq16k} type="radial" min={-40} max={40} step={1} onChange={this.onChange} propName="eq16k"/>
          </Cell>
          <Cell col={4} phone={1} tablet={4} className="text-center">
            <p className="effect-label">5khz</p>
            <Knob value={effect.eq5k} type="radial" min={-40} max={40} step={1} onChange={this.onChange} propName="eq5k"/>
          </Cell>
          <Cell col={4} phone={1} tablet={4} className="text-center">
            <p className="effect-label">10khz</p>
            <Knob value={effect.eq10k} type="radial" min={-40} max={40} step={1} onChange={this.onChange} propName="eq10k"/>
          </Cell>
        </Grid>
      </div>
    )
  }
}
Equalizer.propTypes={
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


export default connect(mapStateToProps, mapDispatchToProps)(Equalizer)
