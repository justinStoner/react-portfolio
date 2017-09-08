import React, { Component } from 'react';
import {Grid, Cell, Switch} from 'react-mdl'
import {Knob} from '../Knob';
import { connect } from 'react-redux';
import { updateEffect } from '../../actions';
import PropTypes from 'prop-types';

class Equalizer extends Component{
  constructor(props){
    super(props);
    console.log(props);
    this.state={
      eq80:this.props.preset.eq80,
      eq350:this.props.preset.eq350,
      eq720:this.props.preset.eq720,
      eq16k:this.props.preset.eq16k,
      eq5k:this.props.preset.eq5k,
      eq10k:this.props.preset.eq10k,
      active:this.props.preset.active
    }
    this.createNodes()
    this.toggleEffect=this.toggleEffect.bind(this);
  }
  toggleEffect(){
    this.setState({active:!this.state.active});

    if(this.state.active){
      this.props.input.disconnect(this.eq80);
      this.eq10k.disconnect();
      this.props.input.connect(this.props.output);
    }else{
      this.props.input.disconnect(this.props.output);
      this.props.input.connect(this.eq80);

      this.eq10k.connect(this.props.output);
    }
  }
  createNodes(){
    // this.eq80=this.props.audio.createBiquadFilter();
    // this.eq350=this.props.audio.createBiquadFilter();
    // this.eq720=this.props.audio.createBiquadFilter();
    // this.eq16k=this.props.audio.createBiquadFilter();
    // this.eq5k=this.props.audio.createBiquadFilter();
    // this.eq10k=this.props.audio.createBiquadFilter();
    // this.eq80.frequency.value=80;
    // this.eq80.type="lowshelf";
    // this.eq80.gain.value=this.state.eq80;
    // this.eq350.frequency.value=350;
    // this.eq350.type="peaking";
    // this.eq350.gain.value=this.state.eq350;
    // this.eq720.frequency.value=720;
    // this.eq720.type="peaking";
    // this.eq720.gain.value=this.state.eq720;
    // this.eq16k.frequency.value=1600;
    // this.eq16k.type="peaking";
    // this.eq16k.gain.value=this.state.eq16k;
    // this.eq5k.frequency.value=5000;
    // this.eq5k.type="peaking";
    // this.eq5k.gain.value=this.state.eq5k;
    // this.eq10k.frequency.value=10000;
    // this.eq10k.type="highshelf";
    // this.eq10k.gain.value=this.state.eq10k;
    // this.props.input.connect(this.eq80);
    // this.eq80.connect(this.eq350);
    // this.eq350.connect(this.eq720);
    // this.eq720.connect(this.eq16k);
    // this.eq16k.connect(this.eq5k);
    // this.eq5k.connect(this.eq10k);
    // this.eq10k.connect(this.props.output);
  }
  render(){
    return(
      <div className="mdl-shadow--2dp mdl-color--red-300 text-white">
        <Grid>
          <Cell col={12} >
            <p className="effect-label">Equalizer <Switch className="right effect-switch" ripple id="switch1" defaultChecked onClick={this.toggleEffect}>On</Switch></p>
          </Cell>
          <Cell col={4} className="text-center">
            <p className="effect-label">80hz</p>
            <Knob value={this.state.eq80} type="radial" min={-40} max={40} step={1} onChange={this.onChange} propName="eq80"/>
          </Cell>
          <Cell col={4} className="text-center">
            <p className="effect-label">350hz</p>
            <Knob value={this.state.eq350} type="radial" min={-40} max={40} step={1} onChange={this.onChange} propName="eq350"/>
          </Cell>
          <Cell col={4} className="text-center">
            <p className="effect-label">720hz</p>
            <Knob value={this.state.eq720} type="radial" min={-40} max={40} step={1} onChange={this.onChange} propName="eq720"/>
          </Cell>
          <Cell col={4} className="text-center">
            <p className="effect-label">1.6khz</p>
            <Knob value={this.state.eq16k} type="radial" min={-40} max={40} step={1} onChange={this.onChange} propName="eq16k"/>
          </Cell>
          <Cell col={4} className="text-center">
            <p className="effect-label">5khz</p>
            <Knob value={this.state.eq5k} type="radial" min={-40} max={40} step={1} onChange={this.onChange} propName="eq5k"/>
          </Cell>
          <Cell col={4} className="text-center">
            <p className="effect-label">10khz</p>
            <Knob value={this.state.eq10k} type="radial" min={-40} max={40} step={1} onChange={this.onChange} propName="eq10k"/>
          </Cell>
        </Grid>
      </div>
    )
  }
}
Equalizer.propTypes={
  effects: PropTypes.array.isRequired
}
const mapStateToProps = state => ({
  effects:state.synth.effects

});
const mapDispatchToProps = dispatch =>{
  return {
    onChange: ( key, value, index ) => {
      dispatch(updateEffect( key, index, value ))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Equalizer)
