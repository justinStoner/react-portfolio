import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { ErrorBoundary } from '../Errors'
import PropTypes from 'prop-types';

class AudioBus extends Component{
  constructor(props){
    super(props);
    this.props=props;
  }
  setCompressor(key, value){
    this.compressor[key].value=value;
  }
  componentWillMount(){
    //this.props.analyser.connect(this.props.context.destination);
    this.props.synth.analyser.connect(this.props.context.destination);
    this.props.drums.analyser.connect(this.props.context.destination)

    this.props.synth.input.connect(this.props.synth.analyser);
    this.props.drums.input.connect(this.props.drums.analyser)
    this.props.analyser.fftSize=2048;
  }
  render(){

    return null
  }
}
AudioBus.propTypes={
  context: PropTypes.object.isRequired,
  synth: PropTypes.object.isRequired,
  drums: PropTypes.object.isRequired,
  analyser: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  context: state.audio.context,
  synth:state.audio.synth,
  drums:state.audio.sequencer,
  analyser:state.audio.analyser
});
export default connect(mapStateToProps, undefined)(AudioBus)
