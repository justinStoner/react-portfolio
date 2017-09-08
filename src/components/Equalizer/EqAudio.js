import React, {Component} from 'react';
import { connect } from 'react-redux';
//import { updateOscillator } from '../../actions';
import PropTypes from 'prop-types';

class EqAudio extends Component{
  constructor(props){
    super(props)
  }
  componentWillMount(){
    this.eq80=this.props.audio.createBiquadFilter();
    this.eq350=this.props.audio.createBiquadFilter();
    this.eq720=this.props.audio.createBiquadFilter();
    this.eq16k=this.props.audio.createBiquadFilter();
    this.eq5k=this.props.audio.createBiquadFilter();
    this.eq10k=this.props.audio.createBiquadFilter();
    this.eq80.frequency.value=80;
    this.eq80.type="lowshelf";
    this.eq80.gain.value=this.props.preset.eq80;
    this.eq350.frequency.value=350;
    this.eq350.type="peaking";
    this.eq350.gain.value=this.props.preset.eq350;
    this.eq720.frequency.value=720;
    this.eq720.type="peaking";
    this.eq720.gain.value=this.props.preset.eq720;
    this.eq16k.frequency.value=1600;
    this.eq16k.type="peaking";
    this.eq16k.gain.value=this.props.preset.eq16k;
    this.eq5k.frequency.value=5000;
    this.eq5k.type="peaking";
    this.eq5k.gain.value=this.props.preset.eq5k;
    this.eq10k.frequency.value=10000;
    this.eq10k.type="highshelf";
    this.eq10k.gain.value=this.props.preset.eq10k;

    this.props.input.connect(this.eq80);
    this.eq80.connect(this.eq350);
    this.eq350.connect(this.eq720);
    this.eq720.connect(this.eq16k);
    this.eq16k.connect(this.eq5k);
    this.eq5k.connect(this.eq10k);
    this.eq10k.connect(this.props.output);
  }

  render(){
    this.eq80.gain.value=this.props.preset.eq80;
    this.eq350.gain.value=this.props.preset.eq350;
    this.eq720.gain.value=this.props.preset.eq720;
    this.eq16k.gain.value=this.props.preset.eq16k;
    this.eq5k.gain.value=this.props.preset.eq5k;
    this.eq10k.gain.value=this.props.preset.eq10k;

    // if(this.props.preset.active){
    //   this.props.input.connect(this.eq80);
    //   this.eq10k.connect(this.props.output);
    // }else{
    //   this.props.input.disconnect(this.props.output);
    //   this.props.input.connect(this.eq80);
    //
    //   this.eq10k.connect(this.props.output);
    // }
    return null
  }
}

EqAudio.propTypes={
  effects: PropTypes.array.isRequired
}
const mapStateToProps = state => ({
  effects:state.synth.effects

});


export default connect(mapStateToProps, undefined)(EqAudio)
