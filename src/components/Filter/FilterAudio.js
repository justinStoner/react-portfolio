import React, {Component} from 'react';
import { ErrorBoundary } from '../Errors'
import Effect from '../EffectBank/Effect';

class FilterAudio extends Component{
  constructor(props){
    super(props)
  }
  componentWillMount(){
    const effect = this.props.effect;
    this.filter = this.props.context.createBiquadFilter();
    this.filter.frequency.value = effect.frequency;
    this.filter.type = effect.filterType;
    this.filter.Q.value = effect.Q;
    this.filter.gain.value = effect.gain/100;

    this.props.wire(this.props, undefined, this.filter);
    this.props.applySettings(this.props.effect)

  }
  componentWillReceiveProps(nextProps){
    if(this.props){
      this.props.wire(nextProps, undefined, this.filter);
      this.props.applySettings(nextProps.effect, this.props.effect)
    }
  }
  componentWillUnmount(){

  }
  render(){
    const effect=this.props.effect;
    this.filter.frequency.value = effect.frequency;
    this.filter.type = effect.filterType;
    this.filter.Q.value = effect.Q;
    this.filter.gain.value = effect.gain/100;
    return <ErrorBoundary id={this.props.id} idType="effect-" message={this.props.parent + ' > ' + this.constructor.name + ' encountered an error'}/>
  }
}


export default Effect(FilterAudio)
