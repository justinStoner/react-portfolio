import React, {Component} from 'react';
import { ErrorBoundary } from '../Errors'
import Effect from '../EffectBank/Effect';

class DelayAudio extends Component{
  constructor(props){
    super(props)
  }
  componentWillMount(){
    const effect=this.props.effect;
    this.delay = this.props.context.createDelay(5);
    this.feedback = this.props.context.createGain();
    this.output = this.props.context.createGain();
    this.delay.connect(this.feedback);
    this.delay.connect(this.output);
    this.feedback.connect(this.delay);
    this.delay.delayTime.value = (60 / this.props.tempo) * effect.delayTime;
    this.feedback.gain.value = effect.feedback / 100;

    this.props.wire(this.props, undefined, this.delay, this.output);
    this.props.applySettings(this.props.effect)
  }
  componentWillUnmount(){

  }
  componentWillReceiveProps(nextProps){
    if (this.props) {
      this.props.wire(nextProps, this.props, this.delay, this.output);
      this.props.applySettings(nextProps.effect, this.props.effect)
    }
  }
  render(){
    const effect=this.props.effect;
    this.delay.delayTime.value = (60 / this.props.tempo) * effect.delayTime;
    this.feedback.gain.value = effect.feedback / 100;
    return <ErrorBoundary id={this.props.id} idType="effect-" message={this.props.parent + ' > ' + this.constructor.name + ' encountered an error'}/>
  }
}

export default Effect(DelayAudio)
