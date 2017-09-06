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
    this.props.audio.input.connect(this.props.audio.analyser)
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
