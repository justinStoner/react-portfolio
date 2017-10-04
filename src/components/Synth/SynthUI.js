import React, { Component } from 'react';
import {Grid, Cell} from 'react-mdl'
import Oscillator from '../Oscillator';
import Lfo from '../Lfo';
import SynthOutput from '../SynthOutput';
import SynthFilter from '../SynthFilter';
import { EffectsUI } from '../EffectBank';
import Keyboard from '../Keyboard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './synth.css';


class SynthUI extends Component{
  constructor(props){
    super(props);
    // this.updateOscillator=this.updateOscillator.bind(this);
    // this.changeValue=this.changeValue.bind(this);
  }
  componentWillMount(){
    //this.createNodes();
  }
  componentDidUpdate(){
    //Perf.stop()
    // console.log('S updated ' + window.performance.now('SynthAudio'))
    // window.performance.mark('SynthAudio');
  }
  componentWillReceiveProps(){
    //Perf.start();
    // console.log('S props ' + window.performance.now('SynthAudio'))
    // window.performance.mark('SynthAudio');
  }
  shouldComponentUpdate(nextProps){
    const props = this.props;
    console.log(nextProps.effects != props.effects);
    if(nextProps.oscillators != props.oscillators) return true
    if(nextProps.synthFilter != props.synthFilter) return true
    if(nextProps.synthOutput != props.synthOutput) return true
    if(nextProps.effects != props.effects) return true
    return false
  }
  render(){

    return(
      <div>
        <div className="synth-container">
          <div>
            <Grid>
              <Cell col={3} phone={4} tablet={4}>
                <Lfo/>
              </Cell>
              {
                this.props.oscillators.map((o, i)=>{
                  return (
                    <Cell col={2} phone={4} tablet={2} key={i}>
                      <Oscillator index={i} />
                    </Cell>
                  )
                })
              }
              <Cell col={3} phone={4} tablet={4}>
                <SynthOutput audio={this.props.audio}/>
              </Cell>
              <Cell col={3} phone={4} tablet={4}>
                <SynthFilter/>
              </Cell>
              <EffectsUI parent="synth" effects={this.props.effects}/>
            </Grid>
          </div>
        </div>
        <Keyboard playNote={()=>{}} stopNote={()=>{}}/>
      </div>
    )
  }
}
SynthUI.propTypes={
  synth:PropTypes.object.isRequired,
  oscillators: PropTypes.array.isRequired,
  lfo: PropTypes.object.isRequired,
  effects: PropTypes.object.isRequired,
  audio:PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  synth:state.synth,
  oscillators:state.oscillators,
  lfo:state.lfo,
  effects:state.effects.synth,
  audio:state.audio.synth
});

export default connect(mapStateToProps, undefined)(SynthUI)
