import React, { Component } from 'react';
import {Grid, Cell} from 'react-mdl'
import Oscillator from '../Oscillator';
import Lfo from '../Lfo';
import SynthOutput from '../SynthOutput';
import SynthFilter from '../SynthFilter';
import Equalizer from '../Equalizer';
import Delay from '../Delay';
import Compressor from '../Compressor';
import { ReverbUI } from '../Reverb';
import { OverdriveUI } from '../Overdrive';
import Keyboard from '../Keyboard';
import {AudioVisualizer} from '../AudioVisualizer';
import { connect } from 'react-redux';
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
                              return <Equalizer parent="synth" id={e.id} />
                            case 'delay':
                              return <Delay parent="synth" id={e.id}/>
                            case 'compressor':
                              return <Compressor parent="synth" id={e.id}/>
                            case 'sidechain-compressor':
                              return <Compressor parent="synth" id={e.id} mode='sidechain-compressor'/>
                            case 'reverb':
                              return <ReverbUI parent="synth" id={e.id}/>
                            case 'overdrive':
                              return <OverdriveUI parent="synth" id={e.id}/>
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
