import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { equalPower } from '../../utils/audio';
import { checkPropChange } from '../../utils/effect';
import { connect } from 'react-redux';
/**
 * Effect
 *
 * WrappedComponent
 * * Effect Component that will be wrapped by this component
 * effectLevelMode
 * * If 'blend' then the wet and dry will be blended with the effect level slider
 * * If 'wet' then just the wet level will be effected by the effect level slider
 * * If 'none' then no blending will be done
 */
const Effect = (WrappedComponent, effectLevelMode = 'none') => {
  class EffectComponent extends Component {
    constructor(props) {
      super(props);

      this.effectGain = this.props.context.createGain();
      this.effectGain.gain.value = 1;

      this.applySettings = this.applySettings.bind(this);
      this.wire = this.wire.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      if (this.props) {
        console.log(this.props);
        //this.applySettings(nextProps.effects[this.props.parent][this.props.id], this.props.effects[this.props.parent][this.props.id]);
      }
    }

    componentWillUnmount(){

    }

    applySettings(next, prev) {
      let force=false;
      switch (next.effectLevelMode) {
        case 'blend':
          if (!this.bypassGain) {
            this.bypassGain = this.props.context.createGain();
            this.bypassGain.gain.value = 0;
            //nextProps.gain.connect(this.bypassGain);
            //this.bypassGain.disconnect();
            //this.bypassGain.connect(nextProps.output);
          }
          if (next.active) {
            // Cross Fade using equal power curve
            this.bypassGain.gain.value = equalPower(
              next.effectLevel / 100,
              true
            );
            this.effectGain.gain.value = equalPower(
              next.effectLevel / 100
            );
          } else {
            this.bypassGain.gain.value = 1;
            this.effectGain.gain.value = 0;
          }
          break;
        case 'wet':
          if (next.active) {
            this.effectGain.gain.value = equalPower(
              next.effectLevel / 100
            );
          } else {
            this.effectGain.gain.value = 0;
          }
          break;
        case 'none':
          console.log('here');
          if(next.active){
            this.effectGain.gain.value = 1
          }else{
            this.effectGain.gain.value = 0
          }
          break;
      }
    }

    wire(next, prev, input, output = null) {
      // Make sure we need to rewire everything
      if (
        !prev ||
        prev.input !== next.input ||
        prev.gain !== next.gain ||
        prev.output !== next.output
      ) {
        // Make sure we have already made gains
        if (!this.bypassGain && this.props.effectLevelMode === 'blend') {
          this.bypassGain = this.props.context.createGain();
          this.bypassGain.gain.value = 0;
        }
        // Connect Gain Stage Input if required
        if (next.input) {
          next.input.disconnect();
          next.input.connect(next.gain);
        }
        // Connect output
        next.gain.disconnect();
        next.gain.connect(this.effectGain);
        if(Array.isArray(input)){
          input.forEach( i => {
            this.effectGain.connect(i);
          })
        }else{
          this.effectGain.connect(input);
        }

        if (this.props.effectLevelMode === 'blend') {
          // Bypass Gain for blending
          next.gain.connect(this.bypassGain);
          this.bypassGain.disconnect();
          this.bypassGain.connect(next.output);
        } else {
          // Direct connect input
          next.gain.connect(next.output);
        }
        if(output){
          if(Array.isArray(output)){
            output.forEach( o => {
              o.disconnect()
              o.connect(next.output)
            })
          }
          else {
            output.disconnect()
            output.connect(next.output)
          }
        }else{
          if(Array.isArray(input)){
            input.forEach( i => {
              i.disconnect()
              i.connect(next.output)
            })
          }
          else {
            input.disconnect()
            input.connect(next.output)
          }
        }
      }
    }
    render() {
      return (
          <WrappedComponent
            {...this.props}
            effect={this.props.effects[this.props.parent][this.props.id]}
            bypass={this.bypass}
            applySettings={this.applySettings}
            wire={this.wire}
            tempo={this.props.tempo}
          />
      );
    }
  }
  EffectComponent.PropTypes={
    effects:PropTypes.object.isRequired,
    tempo:PropTypes.number.isRequired
  }
  const mapStateToProps = state => ({
    effects:state.effects,
    tempo:state.tempo
  });


  return connect(mapStateToProps, undefined)(EffectComponent)
};

export default Effect;
