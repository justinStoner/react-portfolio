import React, {Component} from 'react';
import * as Tuna from "tunajs";
import { ErrorBoundary } from '../Errors'
import Effect from '../EffectBank/Effect';

class WahWahAudio extends Component{
  constructor(props){
    super(props)
    this.tuna = new Tuna(this.props.context)
  }
  componentWillMount(){
    const effect = this.props.effect

    this.wah = new this.tuna.Overdrive({
      automode: effect.automode,                //true/false
      baseFrequency: effect.baseFrequency/100,            //0 to 1
      excursionOctaves: effect.excursionOctaves,           //1 to 6
      sweep: effect.sweep/100,                    //0 to 1
      resonance: 10,                 //1 to 100
      sensitivity: effect.sensitivity/10,              //-1 to 1
      bypass: !effect.active
    });
    this.props.wire(this.props, undefined, this.wah);
    //this.props.applySettings(this.props.effect)
  }
  componentWillUnmount(){

  }
  componentWillReceiveProps(nextProps){
    if(this.props){
      this.props.wire(nextProps, undefined, this.wah);
      //this.props.applySettings(nextProps.effect, this.props.effect)
    }
  }
  render(){
    const effect=this.props.effect;
    this.wah.automode = effect.automode
    this.wah.baseFrequency = effect.baseFrequency/100
    this.wah.excursionOctaves = effect.excursionOctaves
    this.wah.sweep = effect.sweep/100
    this.wah.resonance = effect.resonance
    this.wah.sensitivity = effect.sensitivity/10
    this.wah.bypass = !effect.active
    return <ErrorBoundary id={this.props.id} idType="effect-" message={this.props.parent + ' > ' + this.constructor.name + ' encountered an error'}/>
  }
}

export default Effect(WahWahAudio)
