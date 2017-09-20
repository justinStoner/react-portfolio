import React, { Component } from 'react';
import { Button, Menu, MenuItem } from 'react-mdl';
import uuid from 'uuid';

export class AvModeSelector extends Component{
  constructor(props){
    super(props);
    this.state={
      id:uuid.v4()
    }
  }
  shouldComponentUpdate(nextProps){
    return true
  }
  render(){
    return(
      <div style={{position:'relative'}}>
        <Button raised ripple id={this.state.id} className={(this.props.visualizerType != 'off'?"mdl-color--white mdl-color-text--green-A400 green-border":"mdl-color--green-A400 text-white") + " round-button"}>
          <i className="material-icons">graphic_eq</i>
        </Button>
        <Menu target={this.state.id} ripple align="right">
            <MenuItem onClick={() => {this.props.onClick('visualizerType', 'off')}} disabled={this.props.visualizerType=='off'}>Off</MenuItem>
            <MenuItem onClick={() => {this.props.onClick('visualizerType', 'waveform')}} disabled={this.props.visualizerType=='waveform'}>WaveForm</MenuItem>
            <MenuItem onClick={() => {this.props.onClick('visualizerType', 'webgl')}} disabled={this.props.visualizerType=='webgl'}>WebGL</MenuItem>
            <MenuItem onClick={() => {this.props.onClick('visualizerType', 'fractal')}} disabled={this.props.visualizerType=='fractal'}>Fractal</MenuItem>
        </Menu>
      </div>
    )
  }
}
