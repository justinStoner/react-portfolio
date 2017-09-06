import React, { Component } from 'react';
import { Button } from 'react-mdl';

export class AvModeSelector extends Component{
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps){
    return true
  }
  render(){
    return(
      <div>
        <Button raised ripple id="av-selector" className={(this.props.visualizerType != 'off'?"mdl-color--white mdl-color-text--green-A400 green-border":"mdl-color--green-A400 text-white") + " round-button"}>
          <i className="material-icons">graphic_eq</i>
        </Button>
        <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect top-menu"
            data-mdl-for="av-selector">
          <li className="mdl-menu__item" onClick={() => {this.props.onClick('visualizerType', 'off')}} disabled={this.props.visualizerType=='off'}>Off</li>
          <li className="mdl-menu__item" onClick={() => {this.props.onClick('visualizerType', 'waveform')}} disabled={this.props.visualizerType=='waveform'}>WaveForm</li>
          <li className="mdl-menu__item" onClick={() => {this.props.onClick('visualizerType', 'webgl')}} disabled={this.props.visualizerType=='webgl'}>WebGL</li>
          <li className="mdl-menu__item" onClick={() => {this.props.onClick('visualizerType', 'fractal')}} disabled={this.props.visualizerType=='fractal'}>Fractal</li>
        </ul>
      </div>
    )
  }
}
