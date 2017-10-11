import React, {Component} from 'react';
import { ErrorBoundary } from '../Errors'
import fetch from 'isomorphic-fetch';
import Effect from '../EffectBank/Effect';
import reverb from '../../assets/audio/reverb/room.wav';

class ReverbAudio extends Component{
  constructor(props){
    super(props)
  }
  componentWillMount(){
    const effect=this.props.effect;
    this.reverbNode = this.props.context.createConvolver();
    this.props.wire(this.props, undefined, this.reverbNode);
    this.props.applySettings(this.props.effect)
    fetch(reverb)
    .then((res)=>res.arrayBuffer())
    .then((buffer)=>{
      this.props.context.decodeAudioData(buffer, (decodedData)=>{
        this.reverbNode.buffer=decodedData
      })
    })
  }
  componentWillUnmount(){

  }
  componentWillReceiveProps(nextProps){
    if(this.props){
      this.props.wire(nextProps, undefined, this.reverbNode);
      this.props.applySettings(nextProps.effect, this.props.effect)
    }
  }
  render(){
    return <ErrorBoundary id={this.props.id} idType="effect-" message={this.props.parent + ' > ' + this.constructor.name + ' encountered an error'}/>
  }
}
export default Effect(ReverbAudio)
