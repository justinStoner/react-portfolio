import React, { Component } from 'react';
import {Grid, Cell} from 'react-mdl'
import Oscillator from '../Oscillator';
import {Lfo} from '../Lfo';
import {SynthOutput} from '../SynthOutput';
import {SynthFilter} from '../SynthFilter';
import {Equalizer} from '../Equalizer';
import {Delay} from '../Delay';
import {Compressor} from '../Compressor';
import {Keyboard} from '../Keyboard';
import {AudioVisualizer} from '../AudioVisualizer';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import PropTypes from 'prop-types';
import { getContext } from '../../selectors';
import './synth.css';
const lfoPreset=[
  {
    wave:0,
    detune:50,
    osc0:4,
    osc1:8,
    osc2:12,
    freq:13,
    type:'Lfo',
    modType:0
  }
]
const oscPresets=[
  {
    wave:0,
    detune:45,
    octave:-1,
    volume:100,
  },
  {
    wave:2,
    detune:50,
    octave:0,
    volume:100,
  },
  {
    wave:1,
    detune:55,
    octave:3,
    volume:100,
  }
];
const synthFilterPreset=[
  {
    lpfQ:10,
    lpfMod:13,
    lpfCutoff:7,
    lpfEnv:60,
    lpfA:50,
    lpfD:20,
    lpfS:30,
    lpfR:50
  }
]
const synthOutputPreset=[
  {
    masterVol:50,
    reverb:13,
    drive:10,
    visualizer:50,
    envA:20,
    envD:65,
    envS:65,
    envR:50,
    synthOctave:0
  }
]
const octaves=[-3,-2,-1,0,1,2,3];
const waves=['sine', 'sawtooth', 'square', 'triangle'];

class Synth extends Component{
  constructor(props){
    super(props);
    console.log(props);
    this.state={
      synthOutput:synthOutputPreset[0],
      synthFilter:synthFilterPreset[0],
      lfo:lfoPreset[0],
      osc0:oscPresets[0],
      osc1:oscPresets[1],
      osc2:oscPresets[2],
    }

    this.updateOscillator=this.updateOscillator.bind(this);
    this.changeValue=this.changeValue.bind(this);
    this.playKey=this.playKey.bind(this);
    this.stopKey=this.stopKey.bind(this);
    this.notes=[
      {note:'c' ,hz:60, color:true, key:'a', isPlaying:false},
      {note:'c#' ,hz:61, color:false, key:'w', isPlaying:false},
      {note:'d' ,hz:62, color:true, key:'s', isPlaying:false},
      {note:'d#' ,hz:63, color:false, key:'e', isPlaying:false},
      {note:'e' ,hz:64, color:true, key:'d', isPlaying:false},
      {note:'f' ,hz:65, color:true, key:'f', isPlaying:false},
      {note:'f#' ,hz:66 ,color:false, key:'t', isPlaying:false},
      {note:'g' ,hz:67 ,color:true, key:'g', isPlaying:false},
      {note:'g#' ,hz:68 ,color:false, key:'y', isPlaying:false},
      {note:'a' ,hz:69 ,color:true, key:'h', isPlaying:false},
      {note:'a#' ,hz:70 ,color:false, key:'u', isPlaying:false},
      {note:'b' ,hz:71 ,color:true, key:'j', isPlaying:false},
      {note:'c' ,hz:72 ,color:true, key:'k', isPlaying:false},
      {note:'c#' ,hz:73 ,color:false, key:'o', isPlaying:false},
      {note:'d' ,hz:74 ,color:true, key:'l', isPlaying:false},
      {note:'d#' ,hz:75 ,color:false, key:'p', isPlaying:false},
      {note:'e' ,hz:76 ,color:true, key:';', isPlaying:false},
      {note:'f' ,hz:77 ,color:true, key:"'", isPlaying:false}
    ];
  }
  componentWillMount(){
    console.log(this.props);
    this.createNodes();
  }
  render(){

    return(
      <div>
        <div className="synth-container">
          <div>
            <Grid>
              <Cell col={3} phone={4} tablet={3}>
                <Lfo preset={this.props.synth.lfo} onChange={this.updateOscillator}/>
              </Cell>
              {
                this.props.synth.oscillators.map((o, i)=>{
                  return (
                    <Cell col={2} phone={4} tablet={3} key={i}>
                      <Oscillator preset={o} index={i} onChange={this.updateOscillator}/>
                    </Cell>
                  )
                })
              }
              <Cell col={3} phone={4} tablet={3}>
                <SynthOutput preset={this.state.synthOutput} onChange={this.changeValue} toggleVisualizer={this.props.toggleVisualizer} visualizerOn={false} audio={this.props.audio}/>
              </Cell>
              <Cell col={3} phone={4} tablet={3}>
                <SynthFilter preset={this.state.synthFilter} onChange={this.changeValue}/>
              </Cell>
              <Cell col={2} phone={4} tablet={3}>
                <Equalizer audio={this.props.context} input={this.props.audio.effectsIn} output={this.props.audio.eq}/>
              </Cell>
              <Cell col={2} phone={4} tablet={3}>
                <Delay audio={this.props.context} input={this.props.audio.eq} output={this.props.audio.delay}/>
              </Cell>
              <Cell col={2} phone={4} tablet={3}>
                <Compressor audio={this.props.context} input={this.props.audio.delay} output={this.props.audio.compressor}/>
              </Cell>
              <Cell col={3} phone={4} tablet={3}>
                <Compressor audio={this.props.context} onChange={this.props.audio.setCompressor} mode="sidechain" input={this.props.audio.compressor} output={this.props.audio.effectsOut} />
              </Cell>
            </Grid>
          </div>
        </div>
        <Keyboard notes={this.notes} playNote={this.playKey} stopNote={this.stopKey}/>
      </div>
    )
  }
  changeValue(key, value, index){
    var state;
    switch (key) {
      case 'lpfCutoff':
      state=Object.assign({}, this.state.synthFilter);
      state.lpfCutoff=value;
      this.setState({synthFilter:state});
      for(var i=0;i<this.notes.length;i++){
        try {
          this.notes[i]['f1'].frequency.value = value*100;
          this.notes[i]['f2'].frequency.value = value*100;
        } catch (e) {

        }
      }
        break;
      case 'lpfMod':
      state=Object.assign({}, this.state.synthFilter);
      state.lpfMod=value;
      this.setState({synthFilter:state});
        for(var i=0;i<this.notes.length;i++){
          try {
            this.notes[i].modfilterGain.gain.value=value*24;
          } catch (e) {

          }
        }
        break;
      case 'lpfEnv':
      state=Object.assign({}, this.state.synthFilter);
      state.lpfEnv=value;
      this.setState({synthFilter:state});
        break;
      case 'lpfQ':
      state=Object.assign({}, this.state.synthFilter);
      state.lpfQ=value;
      this.setState({synthFilter:state});
        for(var i=0;i<this.notes.length;i++){
          try {
            this.notes[i]['f1'].Q.value = value;
            this.notes[i]['f2'].Q.value = value;
          } catch (e) {

          }
        }
        break;
      case 'masterVol':
      state=Object.assign({}, this.state.synthOutput);
      state.masterVol=value;
      this.setState({synthOutput:state});
        this.effectsOut.gain.value=value/50;
        break;
      case 'synthOctave':
      state=Object.assign({}, this.state.synthOutput);
      state.synthOctave=value;
      this.setState({synthOutput:state});
        break;
      case 'lpfS':
      state=Object.assign({}, this.state.synthFilter);
      state.lpfS=value;
      this.setState({synthFilter:state});
        break;
      case 'lpfR':
      state=Object.assign({}, this.state.synthFilter);
      state.lpfR=value;
      this.setState({synthFilter:state});
        break;
      case 'lpfA':
      state=Object.assign({}, this.state.synthFilter);
      state.lpfA=value;
      this.setState({synthFilter:state});
        break;
      case 'lpfD':
      state=Object.assign({}, this.state.synthFilter);
      state.lpfD=value;
      this.setState({synthFilter:state});
        break;
      case 'envS':
      state=Object.assign({}, this.state.synthOutput);
      state.envS=value;
      this.setState({synthOutput:state});
        break;
      case 'envR':
      state=Object.assign({}, this.state.synthOutput);
      state.envR=value;
      this.setState({synthOutput:state});
        break;
      case 'envA':
      state=Object.assign({}, this.state.synthOutput);
      state.envA=value;
      this.setState({synthOutput:state});
        break;
      case 'envD':
      state=Object.assign({}, this.state.synthOutput);
      state.envD=value;
      this.setState({synthOutput:state});
        break;
      default:

    }
  }
  updateOscillator(key, value, index){
    var state;
    switch (key) {
      case 'lfoWave':
        state=Object.assign({}, this.state.lfo);
        state.wave=value;
        this.setState({lfo:state});
        for(var i=0;i<this.notes.length;i++){
          try {
            this.notes[i].lfo.type=waves[value];
          } catch (e) {

          }
        }
        break;
      case 'lfoFreq':
      state=Object.assign({}, this.state.lfo);
      state.freq=value;
      this.setState({lfo:state});
        for(var i=0;i<this.notes.length;i++){
          try {
            this.notes[i].lfo.frequency.value=value;
          } catch (e) {

          }
        }
        break;
      case 'lfoOsc':
        console.log(value);
        break;
      case 'oscVol':
      console.log(value);
        state=Object.assign({}, this.state['osc'+index]);
        state.volume=value;
        this.setState({['osc'+index]:state});
        for(var i=0;i<this.notes.length;i++){
          try {
            this.notes[i]['g'+index].gain.value=0.0005*value;
          } catch (e) {

          }
        }
        break;
      case 'oscWave':
      console.log(value);
        state=Object.assign({}, this.state['osc'+index]);
        state.wave=value;
        this.setState({['osc'+index]:state});
        for(var i=0;i<this.notes.length;i++){
          try {
            this.notes[i]['o'+index].type=waves[state.wave];
          } catch (e) {

          }
        }
        break;
      case 'oscOctave':
      console.log(value);
        state=Object.assign({}, this.state['osc'+index]);
        state.octave=value;
        this.setState({['osc'+index]:state});
        for(var i=0;i<this.notes.length;i++){
          try {
            this.notes[i]['o'+index].frequency.value=this.frequency(this.notes[i].hz, this.state['osc'+index].octave, this.state.synthOutput.synthOctave);
          } catch (e) {

          }
        }
        break;
      case 'oscDetune':
      console.log(value);
        state=Object.assign({}, this.state['osc'+index]);
        state.detune=value;
        this.setState({['osc'+index]:state});
        for(var i=0;i<this.notes.length;i++){
          try {
            this.notes[i]['o'+index].detune.value=value-50
          } catch (e) {

          }
        }
        break;
      default:

    }
  }
  createVoices(){
    var arr=[];
    var voice;
    for(var i=0;i<3;i++){
      voice={
        volume:oscPresets[i].volume,
        wave:oscPresets[i].wave,
        octave:oscPresets[i].octave,
        type:'Oscillator',
        detune:oscPresets[i].detune
      }
      arr.push(voice);
    }
    return arr;
  }
  createNodes(){
    console.log();
    if(!this.props.hasMounted){
      //this.effectsIn = this.props.context.createGain();
      //this.effectsIn.gain.value=1;
      //this.effectsOut = this.props.context.createGain();
      this.props.audio.effectsOut.gain.value=this.state.synthOutput.masterVol/50;
      //this.eq=this.props.context.createGain();
      //this.delay=this.props.context.createGain();
      //this.compressor=this.props.context.createGain();
      //this.sideChain=this.props.context.createGain();
      this.connect();
      window.addEventListener('keydown', this.play.bind(this));
      window.addEventListener('keyup', this.stop.bind(this));
      this.props.mount();
    }
  }

  connect(){

    //this.effectsIn.connect(this.eq);
    //this.eq.connect(this.delay);
    //this.delay.connect(this.compressor);
    //this.compressor.connect(this.sideChain);
    //this.sideChain.connect(this.effectsOut);
    this.props.audio.effectsOut.connect(this.props.audio.input);
  }
  changeSynthOctave(dir){
    if(dir==='up'){
      this.synthOctave++;
    }else{
      this.synthOctave--;
    }
    for(var i=0;i<this.notes.length;i++){
      try{
        this.notes[i].o0.frequency.value=this.frequency(this.notes[i].hz, this.oscillators[0].octave-3)
        this.notes[i].o1.frequency.value=this.frequency(this.notes[i].hz, this.oscillators[1].octave-3)
        this.notes[i].o2.frequency.value=this.frequency(this.notes[i].hz, this.oscillators[2].octave-3)
      }catch(e){

      }
    }
  }
  frequency(note, octave){
    var freq;
    if(this.state.synthOutput.synthOctave!=0){
      note=note+(this.state.synthOutput.synthOctave*12);
    }
    if(octave===0){
      freq = 440*Math.pow(2,(note-69)/12);
    }else{
      note=note+(octave*12)
      freq = 440*Math.pow(2,(note-69)/12);
    }
    console.log(freq);
    return freq//(freq*Math.pow(2, octave));

  }
  play(e){
    let s=e.key;
    for(let i in this.notes){
      if(!e.key){
        if(String.fromCharCode(e.keyCode)==this.notes[i].key){
          this.playKey(i);
        }
      }else{
        if(s.toLowerCase()==this.notes[i].key){
          this.playKey(i);
        }
      }
    }
  }
  stop(e){
    let s=e.key;
    for(let i in this.notes){
      if(!e.key){
        if(String.fromCharCode(e.keyCode)==this.notes[i].key||String.fromCharCode(e.keyCode)==this.notes[i].key.toUpperCase()){
          this.stopKey(i);
        }
      }else{
        if(s.toLowerCase()==this.notes[i].key){
          this.stopKey(i);
        }
      }
    }
  }
  playKey(i){

     if(this.notes[i].isPlaying===false){
       //create lfo
       this.notes[i].lfo=this.props.context.createOscillator();
       this.notes[i].lfo.type=waves[this.state.lfo.wave];
       this.notes[i].lfo.frequency.value=this.state.lfo.freq;
       this.notes[i].lfo.detune.value=this.state.lfo.detune;

       //create filters
       this.notes[i]['f1'] = this.props.context.createBiquadFilter();
       this.notes[i]['f1'].type = "lowpass";
       this.notes[i]['f1'].Q.value = this.state.synthFilter.lpfQ;
       this.notes[i]['f1'].frequency.value = this.state.synthFilter.lpfCutoff*100;
       this.notes[i]['f2'] = this.props.context.createBiquadFilter();
       this.notes[i]['f2'].type = "lowpass";
       this.notes[i]['f2'].Q.value = this.state.synthFilter.lpfQ;
       this.notes[i]['f2'].frequency.value = this.state.synthFilter.lpfCutoff*100;

       for(var ii=0;ii<3;ii++){
         //create lfo gain, connect lfo to it
         this.notes[i]['lfoOscGain'+ii]=this.props.context.createGain();
         this.notes[i]['lfoOscGain'+ii].gain.value=this.state.lfo['osc'+(ii)]/100;
         this.notes[i].lfo.connect(this.notes[i]['lfoOscGain'+ii]);

         //create oscillator
         this.notes[i]['o'+ii]=this.props.context.createOscillator();
         this.notes[i]['o'+ii].detune.value=this.state['osc'+ii].detune-50;
         this.notes[i]['o'+ii].frequency.value=this.frequency(this.notes[i].hz, this.state['osc'+ii].octave, this.state.synthOutput.synthOctave);
         this.notes[i]['o'+ii].type=waves[this.state['osc'+ii].wave];

         //connect lfo gain to osc frequency
         this.notes[i]['lfoOscGain'+ii].connect(this.notes[i]['o'+ii].frequency);

         //create oscillator gain
         this.notes[i]['g'+ii]=this.props.context.createGain();
         this.notes[i]['g'+ii].gain.value=0.0005*this.state['osc'+ii].volume;

         //connect oscillator to osc gain
         this.notes[i]['o'+ii].connect(this.notes[i]['g'+ii]);
         //connect osc gain to filter1
         this.notes[i]['g'+ii].connect( this.notes[i]['f1'] );
       }

       this.notes[i].modfilterGain=this.props.context.createGain();
       this.notes[i].modfilterGain.gain.value=this.state.synthFilter.lpfMod*24;
       this.notes[i].modfilterGain.connect( this.notes[i]['f1'].detune );	// filter tremolo
       this.notes[i].modfilterGain.connect( this.notes[i]['f2'].detune );	// filter tremolo
       this.notes[i].lfo.connect(this.notes[i].modfilterGain);

       this.notes[i]['f1'].connect( this.notes[i]['f2'] );
       this.notes[i]['e']=this.props.context.createGain();
       this.notes[i]['f2'].connect(this.notes[i]['e']);
       this.notes[i]['e'].connect(this.props.audio.effectsIn);
       //this.notes[i]['e'].connect(this.reverbBypassGain);
       var now = this.props.context.currentTime;
       var atkEnd=now + (this.state.synthOutput.envA/100.0);
       this.notes[i]['e'].gain.value = 0.0;
       this.notes[i]['e'].gain.setValueAtTime( 0.0, now );
       this.notes[i]['e'].gain.linearRampToValueAtTime( 1.0, atkEnd );
       this.notes[i]['e'].gain.setTargetAtTime( (this.state.synthOutput.envS/100.0), atkEnd, (this.state.synthOutput.envD/100.0)+0.001 );

       var filterAttackLevel = this.state.synthFilter.lpfEnv*72;
       var filterSustainLevel = filterAttackLevel* this.state.synthFilter.lpfS / 100.0;
       var filterAttackEnd = (this.state.synthFilter.lpfA/100.0);

       if (!filterAttackEnd){
         filterAttackEnd=0.05;
       }

       this.notes[i]['f1'].detune.setValueAtTime( 0, now );
       this.notes[i]['f1'].detune.linearRampToValueAtTime( filterAttackLevel, now+filterAttackEnd );
       this.notes[i]['f2'].detune.setValueAtTime( 0, now );
       this.notes[i]['f2'].detune.linearRampToValueAtTime( filterAttackLevel, now+filterAttackEnd );
       this.notes[i]['f1'].detune.setTargetAtTime( filterSustainLevel, now+filterAttackEnd, (this.state.synthFilter.lpfD/100.0)+0.001 );
       this.notes[i]['f2'].detune.setTargetAtTime( filterSustainLevel, now+filterAttackEnd, (this.state.synthFilter.lpfD/100.0)+0.001 );

       this.notes[i].lfo.start(0);
       for(var ii=0;ii<3;ii++){
         this.notes[i]['o'+ii].start(0);
       }

         this.notes[i].isPlaying=true;

      }
  }

  stopKey(i){
    if(this.notes[i].isPlaying===true){
      var now =  this.props.context.currentTime;
      var release = now + (this.state.envR/100.0);
      this.notes[i]['e'].gain.cancelScheduledValues(now);
      this.notes[i]['e'].gain.setValueAtTime( this.notes[i]['e'].gain.value, now );
      this.notes[i]['e'].gain.setTargetAtTime(0.0, now, (this.state.synthOutput.envR/100.0)+0.001);
      this.notes[i]['f1'].detune.cancelScheduledValues(now);
      this.notes[i]['f1'].detune.setTargetAtTime( 0, now, (this.state.synthFilter.lpfR/100.0) +0.001);
      this.notes[i]['f2'].detune.cancelScheduledValues(now);
      this.notes[i]['f2'].detune.setTargetAtTime( 0, now, (this.state.synthFilter.lpfR/100.0) +0.001);

      for(var ii=0;ii<3;ii++){
        this.notes[i]['g'+ii].gain.cancelScheduledValues(now);
        this.notes[i]['g'+ii].gain.setTargetAtTime( 0, now, (this.state.synthOutput.envR/100.0) +0.001);
        this.notes[i]['o'+ii].stop(now+(this.state.synthOutput.envR/30.0));
      }
      this.notes[i].lfo.stop(now+(this.state.synthOutput.envR/30.0))
      this.notes[i].isPlaying=false;
    }
  }
}
Synth.propTypes={
  context: PropTypes.object.isRequired,
  synth:PropTypes.object.isRequired
  //hasMounted:PropTypes.bool.isRequired,
  //mount:PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  //hasMounted: state.hasMounted,
  //mount: state.mount,
  synth:state.synth,
  context: getContext(state)
});

export default connect(mapStateToProps, undefined)(Synth)
