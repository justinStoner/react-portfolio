import React, { Component }  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getContext } from '../../selectors';

export class DrumsAudio extends Component{
  constructor(props){
    super(props);
    this.props=props;
  }
  setCompressor(key, value){
    this.compressor[key].value=value;
  }
  componentWillMount(){
    this.props.audio.analyser=this.props.context.createAnalyser();
    this.props.audio.synthAnalyser=this.props.context.createAnalyser();
    this.props.audio.drumsAnalyser=this.props.context.createAnalyser();
    this.props.audio.analyser.connect(this.props.context.destination);
    this.props.audio.synthAnalyser.connect(this.props.audio.analyser);
    this.props.audio.drumsAnalyser.connect(this.props.audio.analyser)

    this.props.audio.synthEffectsIn=this.props.context.createGain();
    this.props.audio.synthEffectsOut=this.props.context.createGain();
    this.props.audio.synthEq=this.props.context.createGain();
    this.props.audio.synthDelay=this.props.context.createGain()
    this.props.audio.synthCompressor=this.props.context.createGain()

    this.props.audio.synthIn=this.props.context.createGain();
    this.props.audio.drumsIn=this.props.context.createGain()

    this.props.audio.synthIn.connect(this.props.audio.synthAnalyser);
    this.props.audio.drumsIn.connect(this.props.audio.drumsAnalyser)
    this.props.audio.analyser.fftSize=2048;
  }
  render(){

    return null
  }
}
DrumsAudio.propTypes={
  context: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  context: getContext(state)
});

export default connect(mapStateToProps, undefined)(DrumsAudio)
