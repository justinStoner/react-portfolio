import React, {Component} from 'react';
import * as Tuna from "tunajs";
import { ErrorBoundary } from '../Errors'
import Effect from '../EffectBank/Effect';

class OverdriveAudio extends Component{
  constructor(props){
    super(props)
    this.tuna = new Tuna(this.props.context)
  }
  componentWillMount(){
    const effect=this.props.effects[this.props.parent][this.props.id];

    this.drive = new this.tuna.Overdrive({
        outputGain: effect.gain/100,         //0 to 1+
        drive: effect.drive/100,              //0 to 1
        curveAmount: effect.curve/100,          //0 to 1
        algorithmIndex: effect.mode,       //0 to 5, selects one of our drive algorithms
        bypass: false
    });
    this.props.wire(this.props, undefined, this.drive);
    this.props.applySettings(this.props.effect)
  }
  componentWillUnmount(){

  }
  componentWillReceiveProps(nextProps){
    if(this.props){
      this.props.wire(nextProps, undefined, this.drive);
      this.props.applySettings(nextProps.effect, this.props.effect)
    }
  }
  render(){
    const effect=this.props.effect;
    this.drive.outputGain = effect.gain/100
    this.drive.drive = effect.drive/100
    this.drive.curveAmount = effect.curve/100
    this.drive.algorithmIndex = effect.mode
    return <ErrorBoundary id={this.props.id} idType="effect-" message={this.props.parent + ' > ' + this.constructor.name + ' encountered an error'}/>
  }
}

export default Effect(OverdriveAudio)
