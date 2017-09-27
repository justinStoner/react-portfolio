import React, { Component } from 'react';
import { Button, Menu, MenuItem } from 'react-mdl'
import RadialSlider from './radial-slider';
import uuid from 'uuid'
import './knob.css';

export class Knob extends Component{
  constructor(props){
    super(props);
    this.state={
      isToggled:false,
      value:this.props.value,
      id: this.props.type === 'select' ? uuid.v4() : null
    }

    this.toggleInput=this.toggleInput.bind(this);
  }
  toggleInput(){
    this.setState(prevState=>({
      isToggled:!prevState.isToggled
    }))
  }
  render(){
    const isToggled=this.state.isToggled;
    let label;
    if(this.props.type === 'select') label = this.props.labels.filter( label => label.value === this.props.value)[0]
    return(
      <div className="button-holder">
        {isToggled && this.props.type === 'radial'
          ?
          React.createElement(RadialSlider, {
            // default props
            defaultValue: this.props.value,
            maxRange: this.props.max,
            minRange: this.props.min,
            step: this.props.step,
            max:360,
            min:0,
            propName:this.props.propName,
            index:this.props.index,
            className: 'angle-input mdl-shadow--2dp',
            pivotClassName: 'angle-input-pivot',
            onChange: this.props.onChange,
            onInput: function(newAngle) {},
            toggleInput: this.toggleInput,
            labels:this.props.labels
          })
          :
          null
        }
        {isToggled && this.props.type === 'radial'
          ?
          React.createElement('div', {
            className:'radial-close',
            onClick:this.toggleInput
          })
          :
          null
        }
        {
          this.props.type === 'select'
          ?
          <div style={{position:'relative'}}>
            <Button id={this.state.id} raised ripple className={(this.props.color==='green'?"mdl-color--green-A400 ":"mdl-color--blue-500") + " round-button text-white"} disabled={this.props.disabled}>
              {
                label.btnValue ? label.btnValue : label.name
              }
            </Button>
            <Menu target={this.state.id} ripple align="left">
              {
                this.props.labels.map( label => {
                  return <MenuItem className={label.value === this.props.value ? 'menu-item-active' : ''} key={label.name} onClick={() => {this.props.onChange(this.props.propName, label.value, this.props.index || 0)}}>{label.name}</MenuItem>
                })
              }
            </Menu>
          </div>
          :
          <Button id={this.state.id} raised ripple className={(this.props.color==='green'?"mdl-color--green-A400 ":"mdl-color--blue-500") + " round-button text-white"} onClick={this.toggleInput} disabled={this.props.disabled}>
            {this.props.value}
          </Button>
        }
      </div>
    )
  }
}
