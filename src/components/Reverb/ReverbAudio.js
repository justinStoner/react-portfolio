import React, {Component} from 'react';
import { connect } from 'react-redux';
//import { updateOscillator } from '../../actions';
import PropTypes from 'prop-types';

class ReverbAudio extends Component{
  constructor(props){
    super(props)
  }
  updateReverb(val){
    val=val/100;
    var gain1 = Math.cos(val * 0.5*Math.PI);
	  var gain2 = Math.cos((1.0-val) * 0.5*Math.PI);
    this.reverbGain.gain.value=gain2;
    this.reverbBypassGain.gain.value=gain1;
  }
  componentWillMount(){
    const effect=this.props.effects[this.props.parent][this.props.id];
    this.reverbNode = this.props.audio.createConvolver();
    this.reverbGain = this.props.audio.createGain();
    this.reverbBypassGain = this.props.audio.createGain();

    this.reverbNode.connect(this.reverbGain);

    const myRequest = new Request("/audio/reverb/room.wav");
    fetch(myRequest)
    .then((res)=>res.arrayBuffer())
    .then((buffer)=>{
      this.props.audio.decodeAudioData(buffer, (decodedData)=>{
        this.reverbNode.buffer=decodedData
      })
    })

    if(effect.active){
      this.props.input.connect(this.reverbNode);
      this.props.input.connect(this.reverbBypassGain);
      this.reverbGain.connect(this.props.output)
      this.reverbBypassGain.connect(this.props.output)
    }else{
      this.props.input.connect(this.props.output);
    }
  }
  componentWillUnmount(){
    this.props.input.disconnect();
    this.reverbGain.disconnect();
    this.reverbBypassGain.disconnect();
    this.props.input.connect(this.props.output)
  }
  componentWillReceiveProps(nextProps){
    //const active=this.props.effects[this.props.parent][this.props.id].active;
    const nextActive=nextProps.effects[nextProps.parent][nextProps.id].active;
    const effect=this.props.effects[this.props.parent][this.props.id];
    //console.log(active, nextActive);
    //if(active != nextActive){
      if(nextActive){
        this.props.input.disconnect();
        this.props.input.connect(this.reverbNode)
        this.props.input.connect(this.reverbBypassGain);

        this.reverbGain.connect(this.props.output);
        this.reverbBypassGain.connect(this.props.output)
      }else{
        this.props.input.disconnect();
        this.reverbGain.disconnect();
        this.reverbBypassGain.disconnect();
        this.props.input.connect(this.props.output)
      }
  //  }
  }
  render(){
    const effect=this.props.effects[this.props.parent][this.props.id];
    this.updateReverb(effect.amount);
    return null
  }
}

ReverbAudio.propTypes={
  effects: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  effects:state.effects

});


export default connect(mapStateToProps, undefined)(ReverbAudio)
