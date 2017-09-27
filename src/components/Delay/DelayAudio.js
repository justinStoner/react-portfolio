import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class DelayAudio extends Component{
  constructor(props){
    super(props)
  }
  componentWillMount(){
    this.props.input.disconnect();
    const effect=this.props.effects[this.props.parent][this.props.id];
    this.dInput=this.props.audio.createGain();
    this.dOutput=this.props.audio.createGain();
    this.delay = this.props.audio.createDelay(5.0);
    this.feedback = this.props.audio.createGain();
    this.wetLevel = this.props.audio.createGain();
    this.delay.delayTime.value = (60 / this.props.tempo) * effect.delayTime;
    this.feedback.gain.value = effect.feedback / 100;
    this.wetLevel.gain.value = effect.wetLevel / 100;

    this.dInput.connect(this.delay);
    this.dInput.connect(this.dOutput);
    this.delay.connect(this.feedback);
    this.delay.connect(this.wetLevel);
    this.feedback.connect(this.delay);
    this.wetLevel.connect(this.dOutput);

    if(effect.active){
      this.props.input.connect(this.dInput);
      this.dOutput.connect(this.props.output);
    }else{
      this.props.input.connect(this.props.output);
    }
  }
  componentWillUnmount(){
    this.props.input.disconnect();
    this.dOutput.disconnect();
    this.props.input.connect(this.props.output)
  }
  componentWillReceiveProps(nextProps){
    const nextActive=nextProps.effects[nextProps.parent][nextProps.id].active;
    if(nextActive){
      this.props.input.disconnect();
      this.props.input.connect(this.dInput);
      this.dOutput.connect(this.props.output);
    }else{
      this.props.input.disconnect();
      this.dOutput.disconnect();
      this.props.input.connect(this.props.output)
    }
  }
  render(){
    const effect=this.props.effects[this.props.parent][this.props.id];
    this.delay.delayTime.value = (60 / this.props.tempo) * effect.delayTime;
    this.feedback.gain.value = effect.feedback / 100;
    this.wetLevel.gain.value = effect.wetLevel / 100;
    return null
  }
}

DelayAudio.propTypes={
  effects: PropTypes.object.isRequired,
  tempo: PropTypes.number.isRequired
}
const mapStateToProps = state => ({
  effects: state.effects,
  tempo: state.tempo

});


export default connect(mapStateToProps, undefined)(DelayAudio)
