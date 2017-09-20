import React, { Component } from 'react';
import {Key} from './key';
import './keyboard.css';
import { connect } from 'react-redux';
import { keyDown, keyUp } from '../../actions';
import * as selectors from '../../selectors';
import PropTypes from 'prop-types';

class Keyboard extends Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){

  }
  componentDidUpdate(){
    // window.performance.mark('keyboard')
    // console.log(window.performance.now('keyboard'));
  }
  shouldComponentUpdate(nextProps){
    // window.performance.mark('keyboard')
    // console.log(window.performance.now('keyboard'));
    return nextProps.keys != this.props.keys
  }
  render(){

    return(
      <ul className="key-container">
        {Object.values(this.props.keys).map((note, index)=>{
          return (
            <Key note={note} key={index} index={index} playNote={this.props.playNote} stopNote={this.props.stopNote}/>
          )
        })}
      </ul>
    )
  }

}
Keyboard.propTypes={
  keys: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  keys:state.keys

});

const mapDispatchToProps = dispatch =>{
  return {
    playNote: ( note ) => {
      dispatch(keyDown( note ))
    },
    stopNote: ( note ) => {
      dispatch(keyUp( note ))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Keyboard)
