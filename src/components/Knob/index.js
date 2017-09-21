import React, { Component } from 'react';
import {Button} from 'react-mdl'
import RadialSlider from './radial-slider';
import SelectSlider from './select-slider';
import './knob.css';
const waves=['sine','saw', 'sqr', 'tri'];
export class Knob extends Component{
  constructor(props){
    super(props);
    this.state={
      isToggled:false,
      value:this.props.value
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
    return(
      <div className="button-holder">
        {isToggled &&
          React.createElement((this.props.type==='select'?SelectSlider:RadialSlider), {
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
        }
        {isToggled &&
          React.createElement('div', {
            className:'radial-close',
            onClick:this.toggleInput
          })
        }
        <Button raised ripple className={(this.props.color==='green'?"mdl-color--green-A400 ":"mdl-color--blue-500") + " round-button text-white"} onClick={this.toggleInput} disabled={this.props.disabled}>
          {this.props.type==='select' && !this.props.labels?
          waves[this.props.value]
          :this.props.value}
        </Button>
      </div>
    )
  }
}
