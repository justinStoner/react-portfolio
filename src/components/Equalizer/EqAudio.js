import React, {Component} from 'react';
import { connect } from 'react-redux';
//import { updateOscillator } from '../../actions';
import PropTypes from 'prop-types';

class EqAudio extends Component{
  constructor(props){
    super(props)
  }
  componentWillMount(){
    const effect=this.props.effects[this.props.parent][this.props.id];
    this.eq80=this.props.audio.createBiquadFilter();
    this.eq350=this.props.audio.createBiquadFilter();
    this.eq720=this.props.audio.createBiquadFilter();
    this.eq16k=this.props.audio.createBiquadFilter();
    this.eq5k=this.props.audio.createBiquadFilter();
    this.eq10k=this.props.audio.createBiquadFilter();
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

    if(effect.active){
      this.props.input.connect(this.eq80);
      this.eq10k.connect(this.props.output);
    }else{
      this.props.input.connect(this.props.output);
    }
  }
  componentWillReceiveProps(nextProps){
    //const active=this.props.effects[this.props.parent][this.props.id].active;
    const nextActive=nextProps.effects[nextProps.parent][nextProps.id].active;
    //console.log(active, nextActive);
    //if(active != nextActive){
      if(nextActive){
        this.props.input.disconnect();
        this.props.input.connect(this.eq80);
        this.eq10k.connect(this.props.output);
      }else{
        this.props.input.disconnect();
        this.eq10k.disconnect();
        this.props.input.connect(this.props.output)
      }
  //  }
  }
  render(){
    const effect=this.props.effects[this.props.parent][this.props.id];
    this.eq80.gain.value=effect.eq80;
    this.eq350.gain.value=effect.eq350;
    this.eq720.gain.value=effect.eq720;
    this.eq16k.gain.value=effect.eq16k;
    this.eq5k.gain.value=effect.eq5k;
    this.eq10k.gain.value=effect.eq10k;
    return null
  }
}

EqAudio.propTypes={
  effects: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  effects:state.effects

});


export default connect(mapStateToProps, undefined)(EqAudio)
