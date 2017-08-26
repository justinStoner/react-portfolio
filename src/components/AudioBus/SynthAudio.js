import React, { Component }  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getContext } from '../../selectors';
export class SynthAudio extends Component{
  constructor(props){
    super(props);
    this.props=props;
  }

  componentWillMount(){

  }
  render(){

    return null
  }
}
SynthAudio.propTypes={
  context: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  context: getContext(state)
});

export default connect(mapStateToProps, undefined)(SynthAudio)
