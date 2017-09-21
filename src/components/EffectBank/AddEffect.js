import React, { Component } from 'react';
import { Button, Menu, MenuItem } from 'react-mdl';
import uuid from 'uuid'
const addEffectID = uuid.v4()
export class AddEffect extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <p className="effect-label">Effects</p>
        <Button raised ripple className="mdl-color--green-A400 round-button text-white" id={addEffectID} >
          <i className="material-icons">add</i>
        </Button>
        <Menu target={addEffectID} ripple align="left">
            <MenuItem onClick={()=>{this.props.addEffect('compressor', this.props.parent)}}>Compressor</MenuItem>
            <MenuItem onClick={() => {this.props.addEffect('delay', this.props.parent)}}>Delay</MenuItem>
            <MenuItem onClick={() => {this.props.addEffect('eq', this.props.parent)}}>Equalizer</MenuItem>
            <MenuItem onClick={() => {this.props.addEffect('reverb', this.props.parent)}}>Reverb</MenuItem>
            <MenuItem onClick={() => {this.props.addEffect('overdrive', this.props.parent)}}>Overdrive</MenuItem>
        </Menu>
      </div>
    )
  }
}
