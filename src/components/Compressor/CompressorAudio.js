import React, {Component} from 'react';
import { ErrorBoundary } from '../Errors';
import Effect from '../EffectBank/Effect';

class CompressorAudio extends Component{
  constructor(props){
    super(props)
  }
  componentWillMount(){
    const effect=this.props.effect;

    this.compressor=this.props.context.createDynamicsCompressor();
    this.compressor.threshold.value = effect.threshold;
    this.compressor.knee.value = effect.knee;
    this.compressor.ratio.value = effect.ratio;
    this.compressor.attack.value = effect.attack;
    this.compressor.release.value = effect.release;

    this.props.wire(this.props, undefined, this.compressor);
  }
  componentWillReceiveProps(nextProps){
      if (this.props) {
        this.props.wire(nextProps, this.props, this.compressor);
        this.props.applySettings(nextProps.effect, this.props.effect)
      }
  }
  componentWillUnmount(){

  }
  render(){
    const effect=this.props.effect;
    this.compressor.threshold.value = effect.threshold;
    this.compressor.knee.value = effect.knee;
    this.compressor.ratio.value = effect.ratio;
    this.compressor.attack.value = effect.attack;
    this.compressor.release.value = effect.release;
    return <ErrorBoundary id={this.props.id} idType="effect-" message={this.props.parent + ' > ' + this.constructor.name + ' encountered an error'}/>
  }
}

export default Effect(CompressorAudio)
