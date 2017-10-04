import React, {Component} from 'react';
import { ErrorBoundary } from '../Errors'
import Effect from '../EffectBank/Effect';

class EqAudio extends Component{
  constructor(props){
    super(props)
  }
  componentWillMount(){
    const effect=this.props.effect;
    this.eq80=this.props.context.createBiquadFilter();
    this.eq350=this.props.context.createBiquadFilter();
    this.eq720=this.props.context.createBiquadFilter();
    this.eq16k=this.props.context.createBiquadFilter();
    this.eq5k=this.props.context.createBiquadFilter();
    this.eq10k=this.props.context.createBiquadFilter();
    this.eq80.frequency.value=80;
    this.eq80.type="lowshelf";
    this.eq80.gain.value=effect.eq80;
    this.eq350.frequency.value=350;
    this.eq350.type="peaking";
    this.eq350.gain.value=effect.eq350;
    this.eq720.frequency.value=720;
    this.eq720.type="peaking";
    this.eq720.gain.value=effect.eq720;
    this.eq16k.frequency.value=1600;
    this.eq16k.type="peaking";
    this.eq16k.gain.value=effect.eq16k;
    this.eq5k.frequency.value=5000;
    this.eq5k.type="peaking";
    this.eq5k.gain.value=effect.eq5k;
    this.eq10k.frequency.value=10000;
    this.eq10k.type="highshelf";
    this.eq10k.gain.value=effect.eq10k;

    this.eq80.connect(this.eq350);
    this.eq350.connect(this.eq720);
    this.eq720.connect(this.eq16k);
    this.eq16k.connect(this.eq5k);
    this.eq5k.connect(this.eq10k);
    this.props.wire(this.props, undefined, this.eq80, this.eq10k);
    this.props.applySettings(this.props.effect)

  }
  componentWillReceiveProps(nextProps){
    if(this.props){
      this.props.wire(nextProps, undefined, this.eq80, this.eq10k);
      this.props.applySettings(nextProps.effect, this.props.effect)
    }
  }
  componentWillUnmount(){

  }
  render(){
    const effect=this.props.effect;
    this.eq80.gain.value=effect.eq80;
    this.eq350.gain.value=effect.eq350;
    this.eq720.gain.value=effect.eq720;
    this.eq16k.gain.value=effect.eq16k;
    this.eq5k.gain.value=effect.eq5k;
    this.eq10k.gain.value=effect.eq10k;
    return <ErrorBoundary id={this.props.id} idType="effect-" message={this.props.parent + ' > ' + this.constructor.name + ' encountered an error'}/>
  }
}


export default Effect(EqAudio)
