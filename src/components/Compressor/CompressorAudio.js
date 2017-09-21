import React, {Component} from 'react';
import { connect } from 'react-redux';
//import { updateOscillator } from '../../actions';
import PropTypes from 'prop-types';

class CompressorAudio extends Component{
  constructor(props){
    super(props)
  }
  componentWillMount(){
    const effect=this.props.effects[this.props.parent][this.props.id];

    this.compressor=this.props.audio.createDynamicsCompressor();
    this.compressor.threshold.value = effect.threshold;
    this.compressor.knee.value = effect.knee;
    this.compressor.ratio.value = effect.ratio;
    this.compressor.attack.value = effect.attack;
    this.compressor.release.value = effect.release;

    if(effect.active){
      if(this.props.mode == 'sidechain') this.props.sideChainInput.connect(this.compressor);
      this.props.input.connect(this.compressor);

      this.compressor.connect(this.props.output);
    }else{
      this.props.input.connect(this.props.output);
    }
  }
  componentWillReceiveProps(nextProps){
    //const active=this.props.effects[this.props.parent][this.props.id].active;
    if(nextProps.effects[nextProps.parent][nextProps.id]){
      const nextActive=nextProps.effects[nextProps.parent][nextProps.id].active;
      if(nextActive){
        this.props.input.disconnect();
        this.props.input.connect(this.compressor);
        this.compressor.connect(this.props.output);
      }
    }else{
      this.props.input.disconnect();
      this.compressor.disconnect();
      this.props.input.connect(this.props.output)
    }
    //console.log(active, nextActive);
  }
  componentWillUnmount(){
    this.props.input.disconnect();
    this.compressor.disconnect();
    this.props.input.connect(this.props.output)
  }
  render(){
    const effect=this.props.effects[this.props.parent][this.props.id];
    this.compressor.threshold.value = effect.threshold;
    this.compressor.knee.value = effect.knee;
    this.compressor.ratio.value = effect.ratio;
    this.compressor.attack.value = effect.attack;
    this.compressor.release.value = effect.release;
    return null
  }
}

CompressorAudio.propTypes={
  effects: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  effects:state.effects

});


export default connect(mapStateToProps, undefined)(CompressorAudio)
