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
            <MenuItem onClick={() => {this.props.onClick('visualizerType', 'off')}} className={this.props.visualizerType=='off' ? 'menu-item-active' : ''}>Off</MenuItem>
            <MenuItem onClick={() => {this.props.onClick('visualizerType', 'waveform')}} className={this.props.visualizerType=='waveform'  ? 'menu-item-active' : ''}>WaveForm</MenuItem>
            <MenuItem onClick={() => {this.props.onClick('visualizerType', 'webgl')}} className={this.props.visualizerType=='webgl'  ? 'menu-item-active' : ''}>WebGL</MenuItem>
            <MenuItem onClick={() => {this.props.onClick('visualizerType', 'fractal')}} className={this.props.visualizerType=='fractal'  ? 'menu-item-active' : ''}>Fractal</MenuItem>
        </Menu>
      </div>
    )
  }
}
