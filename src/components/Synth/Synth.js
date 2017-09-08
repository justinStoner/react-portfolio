import React, { Component } from 'react';
import {Grid, Cell} from 'react-mdl'
import Oscillator from '../Oscillator';
import Lfo from '../Lfo';
import SynthOutput from '../SynthOutput';
import SynthFilter from '../SynthFilter';
import Equalizer from '../Equalizer';
import Delay from '../Delay';
import Compressor from '../Compressor';
import Keyboard from '../Keyboard';
import {AudioVisualizer} from '../AudioVisualizer';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import PropTypes from 'prop-types';
import { getContext } from '../../selectors';
import './synth.css';


class Synth extends Component{
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
              <Cell col={3} phone={4} tablet={3}>
                <Lfo/>
              </Cell>
              {
                this.props.oscillators.map((o, i)=>{
                  return (
                    <Cell col={2} phone={4} tablet={3} key={i}>
                      <Oscillator index={i} />
                    </Cell>
                  )
                })
              }
              <Cell col={3} phone={4} tablet={3}>
                <SynthOutput audio={this.props.audio}/>
              </Cell>
              <Cell col={3} phone={4} tablet={3}>
                <SynthFilter/>
              </Cell>
              {
                Object.values(this.props.effects).map( (e, i) => {
                  return (
                    <Cell col={e.col} phone={4} tablet={3} key={i}>
                      {
                        (() => {
                          switch (e.type) {
                            case 'eq':
                              return <Equalizer parent="synth" id={e.id}/>
                              break;
                            case 'delay':
                              return <Delay parent="synth" id={e.id}/>
                              break;
                            case 'compressor':
                              return <Compressor parent="synth" id={e.id}/>
                              break;
                            case 'sidechain-compressor':
                              return <Compressor parent="synth" id={e.id} mode='sidechain-compressor'/>
                              break;
                            default:
                              return null
                          }
                        })()
                      }
                    </Cell>
                  )
                })
              }
            </Grid>
          </div>
        </div>
        <Keyboard playNote={()=>{}} stopNote={()=>{}}/>
      </div>
    )
  }
  // changeValue(key, value, index){
  //   var state;
  //   switch (key) {
  //     case 'lpfCutoff':
  //     state=Object.assign({}, this.state.synthFilter);
  //     state.lpfCutoff=value;
  //     this.setState({synthFilter:state});
  //     for(var i=0;i<this.notes.length;i++){
  //       try {
  //         this.notes[i]['f1'].frequency.value = value*100;
  //         this.notes[i]['f2'].frequency.value = value*100;
  //       } catch (e) {
  //
  //       }
  //     }
  //       break;
  //     case 'lpfMod':
  //     state=Object.assign({}, this.state.synthFilter);
  //     state.lpfMod=value;
  //     this.setState({synthFilter:state});
  //       for(var i=0;i<this.notes.length;i++){
  //         try {
  //           this.notes[i].modfilterGain.gain.value=value*24;
  //         } catch (e) {
  //
  //         }
  //       }
  //       break;
  //     case 'lpfEnv':
  //     state=Object.assign({}, this.state.synthFilter);
  //     state.lpfEnv=value;
  //     this.setState({synthFilter:state});
  //       break;
  //     case 'lpfQ':
  //     state=Object.assign({}, this.state.synthFilter);
  //     state.lpfQ=value;
  //     this.setState({synthFilter:state});
  //       for(var i=0;i<this.notes.length;i++){
  //         try {
  //           this.notes[i]['f1'].Q.value = value;
  //           this.notes[i]['f2'].Q.value = value;
  //         } catch (e) {
  //
  //         }
  //       }
  //       break;
  //     case 'masterVol':
  //     state=Object.assign({}, this.state.synthOutput);
  //     state.masterVol=value;
  //     this.setState({synthOutput:state});
  //       this.effectsOut.gain.value=value/50;
  //       break;
  //     case 'synthOctave':
  //     state=Object.assign({}, this.state.synthOutput);
  //     state.synthOctave=value;
  //     this.setState({synthOutput:state});
  //       break;
  //     case 'lpfS':
  //     state=Object.assign({}, this.state.synthFilter);
  //     state.lpfS=value;
  //     this.setState({synthFilter:state});
  //       break;
  //     case 'lpfR':
  //     state=Object.assign({}, this.state.synthFilter);
  //     state.lpfR=value;
  //     this.setState({synthFilter:state});
  //       break;
  //     case 'lpfA':
  //     state=Object.assign({}, this.state.synthFilter);
  //     state.lpfA=value;
  //     this.setState({synthFilter:state});
  //       break;
  //     case 'lpfD':
  //     state=Object.assign({}, this.state.synthFilter);
  //     state.lpfD=value;
  //     this.setState({synthFilter:state});
  //       break;
  //     case 'envS':
  //     state=Object.assign({}, this.state.synthOutput);
  //     state.envS=value;
  //     this.setState({synthOutput:state});
  //       break;
  //     case 'envR':
  //     state=Object.assign({}, this.state.synthOutput);
  //     state.envR=value;
  //     this.setState({synthOutput:state});
  //       break;
  //     case 'envA':
  //     state=Object.assign({}, this.state.synthOutput);
  //     state.envA=value;
  //     this.setState({synthOutput:state});
  //       break;
  //     case 'envD':
  //     state=Object.assign({}, this.state.synthOutput);
  //     state.envD=value;
  //     this.setState({synthOutput:state});
  //       break;
  //     default:
  //
  //   }
  // }
  // updateOscillator(key, value, index){
  //   var state;
  //   switch (key) {
  //     case 'lfoWave':
  //       state=Object.assign({}, this.state.lfo);
  //       state.wave=value;
  //       this.setState({lfo:state});
  //       for(var i=0;i<this.notes.length;i++){
  //         try {
  //           this.notes[i].lfo.type=waves[value];
  //         } catch (e) {
  //
  //         }
  //       }
  //       break;
  //     case 'lfoFreq':
  //     state=Object.assign({}, this.state.lfo);
  //     state.freq=value;
  //     this.setState({lfo:state});
  //       for(var i=0;i<this.notes.length;i++){
  //         try {
  //           this.notes[i].lfo.frequency.value=value;
  //         } catch (e) {
  //
  //         }
  //       }
  //       break;
  //     case 'lfoOsc':
  //       console.log(value);
  //       break;
  //     case 'oscVol':
  //     console.log(value);
  //       state=Object.assign({}, this.state['osc'+index]);
  //       state.volume=value;
  //       this.setState({['osc'+index]:state});
  //       for(var i=0;i<this.notes.length;i++){
  //         try {
  //           this.notes[i]['g'+index].gain.value=0.0005*value;
  //         } catch (e) {
  //
  //         }
  //       }
  //       break;
  //     case 'oscWave':
  //     console.log(value);
  //       state=Object.assign({}, this.state['osc'+index]);
  //       state.wave=value;
  //       this.setState({['osc'+index]:state});
  //       for(var i=0;i<this.notes.length;i++){
  //         try {
  //           this.notes[i]['o'+index].type=waves[state.wave];
  //         } catch (e) {
  //
  //         }
  //       }
  //       break;
  //     case 'oscOctave':
  //     console.log(value);
  //       state=Object.assign({}, this.state['osc'+index]);
  //       state.octave=value;
  //       this.setState({['osc'+index]:state});
  //       for(var i=0;i<this.notes.length;i++){
  //         try {
  //           this.notes[i]['o'+index].frequency.value=this.frequency(this.notes[i].hz, this.state['osc'+index].octave, this.state.synthOutput.synthOctave);
  //         } catch (e) {
  //
  //         }
  //       }
  //       break;
  //     case 'oscDetune':
  //     console.log(value);
  //       state=Object.assign({}, this.state['osc'+index]);
  //       state.detune=value;
  //       this.setState({['osc'+index]:state});
  //       for(var i=0;i<this.notes.length;i++){
  //         try {
  //           this.notes[i]['o'+index].detune.value=value-50
  //         } catch (e) {
  //
  //         }
  //       }
  //       break;
  //     default:
  //
  //   }
  // }
  // createVoices(){
  //   var arr=[];
  //   var voice;
  //   for(var i=0;i<3;i++){
  //     voice={
  //       volume:oscPresets[i].volume,
  //       wave:oscPresets[i].wave,
  //       octave:oscPresets[i].octave,
  //       type:'Oscillator',
  //       detune:oscPresets[i].detune
  //     }
  //     arr.push(voice);
  //   }
  //   return arr;
  // }

}
Synth.propTypes={
  context: PropTypes.object.isRequired,
  synth:PropTypes.object.isRequired,
  oscillators: PropTypes.array.isRequired,
  lfo: PropTypes.object.isRequired,
  effects: PropTypes.object.isRequired
  //hasMounted:PropTypes.bool.isRequired,
  //mount:PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  //hasMounted: state.hasMounted,
  //mount: state.mount,
  synth:state.synth,
  context: getContext(state),
  oscillators:state.oscillators,
  lfo:state.lfo,
  effects:state.effects.synth
});

export default connect(mapStateToProps, undefined)(Synth)
