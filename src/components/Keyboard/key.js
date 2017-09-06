import React, { Component } from 'react';
import './keyboard.css';
export class Key extends Component{
  constructor(props){
    super(props);
    this.noteStart=this.noteStart.bind(this);
    this.noteEnd=this.noteEnd.bind(this);
  }
  componentWillMount(){

  }
  shouldComponentUpdate(nextProps){
    // console.log(nextProps.note.isPlaying != isPlaying);
    // console.log(nextProps.note.isPlaying, isPlaying);

    if(nextProps.note.isPlaying != this.props.isPlaying) return true
    return false
  }
  render(){
    return(
        <li className={"key " + (this.props.note.color?"white":"black")} key={this.props.index} onTouchStart={this.noteStart} onTouchEnd={this.noteEnd} onMouseDown={this.noteStart} onMouseUp={this.noteEnd}>
          <div className={(this.props.note.isPlaying?"mdl-shadow--2dp ":"mdl-shadow--4dp ")+(this.props.note.color?"mdl-color--white":"mdl-color--black text-white")}>
            <p className="mdl-cell--hide-phone mdl-cell--hide-tablet">{this.props.note.key}</p>
            <p className="mdl-cell--hide-desktop">{this.props.note.note}</p>
          </div>

        </li>
    )
  }
  noteStart(){
    this.props.playNote(this.props.index);
  }
  noteEnd(){
    this.props.stopNote(this.props.index);
  }

}
