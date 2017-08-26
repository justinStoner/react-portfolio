import React, { Component } from 'react';
import {Key} from './key';
import './keyboard.css';

export class Keyboard extends Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){

  }
  render(){

    return(
      <ul className="key-container">
        {this.props.notes.map((note, index)=>{
          return (
            <Key note={note} key={index} index={index} playNote={this.props.playNote} stopNote={this.props.stopNote} isPlaying={note.isPlaying}/>
          )
        })}
      </ul>
    )
  }

}
