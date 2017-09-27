import React, { Component }  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getContext } from '../../selectors';
import { EffectsAudio } from '../EffectBank';
import fetch from 'isomorphic-fetch';

let sampleNames=[];
export class DrumsAudio extends Component{
  constructor(props){
    super(props);
    this.props=props;
    this.samples={};
    this.notePlaying=-1;
    this.reverbBuffer;
    this.volume=85;
    this.loopLength=16;
  }
  setCompressor(key, value){
    this.compressor[key].value=value;
  }
  componentWillMount(){
    const context = this.props.context;
    fetch("/audio/reverb/room.wav")
    .then((res)=>res.arrayBuffer())
    .then((buffer)=>{
      this.props.context.decodeAudioData(buffer, (decodedData)=>{
        this.reverbBuffer=decodedData
      })
    })
    this.gain=context.createGain();
    //this.gain.connect(this.props.audio.input)
    this.sideChainGain=context.createGain();
    this.props.audio.input.connect(this.props.audio.analyser)
    this.props.audio.analyser.fftSize=2048;
    Object.values(this.props.sequencer.drums).map( drum => {
      this.samples[drum.name] = {
        gain:context.createGain(),
        revNode:context.createConvolver(),
        revGain:context.createGain(),
        revBypassGain:context.createGain(),
        eq120:context.createBiquadFilter(),
        eq600:context.createBiquadFilter(),
        eq5k:context.createBiquadFilter(),
        filter1 : context.createBiquadFilter(),
        filter2 : context.createBiquadFilter(),
        name:drum.name
      }
      this.loadSample(drum.name);
      this.samples[drum.name].revNode.connect(this.samples[drum.name].revGain);
      this.samples[drum.name].revGain.connect(this.samples[drum.name].eq120);
      this.samples[drum.name].revBypassGain.connect(this.samples[drum.name].eq120);
      this.samples[drum.name].eq120.connect(this.samples[drum.name].eq600);
      this.samples[drum.name].eq600.connect(this.samples[drum.name].eq5k);
      this.samples[drum.name].eq5k.connect(this.samples[drum.name].filter1);
      this.samples[drum.name].filter1.connect(this.samples[drum.name].filter2);
      this.samples[drum.name].filter2.connect(this.samples[drum.name].gain);
      this.samples[drum.name].gain.connect(this.gain);
      sampleNames.push(drum.name);
    })
  }
  render(){
    return (
      <EffectsAudio effects={this.props.effects} context={this.props.context} effectsIn={this.gain} effectsOut={this.props.audio.input} parent="drums"/>
    )
  }
  loadSample(name){
    fetch("/audio/roland-tr-33/"+name+".wav")
    .then((res)=>res.arrayBuffer())
    .then((buffer)=>{
      this.props.context.decodeAudioData(buffer, (decodedData)=>{
      this.samples[name].sample = decodedData
      })
      .catch(e => console.log(e))
    })
  }
  updateReverb(val, sample){
    val=val/100;
    var gain1 = Math.cos(val * 0.5*Math.PI);
	  var gain2 = Math.cos((1.0-val) * 0.5*Math.PI);
    sample.revGain.gain.value=gain2;
    sample.revBypassGain.gain.value=gain1;
  }
  playSound(sample, time){
    var src=this.props.context.createBufferSource();
    const drumSettings = this.props.sequencer.drums[sample.name];
    src.buffer=sample.sample;
    try{
      src.detune.value=drumSettings.pitch;
    }catch(e){}

    sample.revNode.buffer=this.reverbBuffer;

    src.connect(sample.revNode);
    src.connect(sample.revBypassGain);

    this.updateReverb(drumSettings.reverbLevel, sample)

    sample.eq120.frequency.value=drumSettings.lowFreq;
    sample.eq120.type="lowshelf";
    sample.eq120.gain.value=drumSettings.low;

    sample.eq600.frequency.value=drumSettings.midFreq;
    sample.eq600.type="peaking";
    sample.eq600.gain.value=drumSettings.mid;

    sample.eq5k.frequency.value=drumSettings.highFreq;
    sample.eq5k.type="highshelf";
    sample.eq5k.gain.value=drumSettings.high;

    sample.filter1.type = drumSettings.filterType;
    sample.filter1.Q.value = drumSettings.Q;
    sample.filter1.frequency.value = drumSettings.cutoff*100;

    sample.filter2.type = drumSettings.filterType;
    sample.filter2.Q.value = drumSettings.Q;
    sample.filter2.frequency.value = drumSettings.cutoff*100;


    sample.gain.gain.value=drumSettings.volume/50;
    //if(sample.name==='kick' && this.audio.compressionOn){
      //this.scriptNode.disconnect();

      //sample.gain.connect(this.audio.compressor);

      // this.scriptNode=this.context.createScriptProcessor(4096,1,1);
      // this.scriptNode.onaudioprocess=(e)=>{
      //   this.audio.synthIn.gain.value=Math.pow(10, this.audio.compressor.reduction/20);
      // }
      //
      // this.scriptNode.connect(this.audio.compressor);
      //this.sideChainGain.connect(this.effectsIn);
      //this.gain.connect(this.effectsIn);
    //}else{
      //sample.filter2.connect(sample.gain);
      //sample.gain.connect(this.gain);
      //this.gain.connect(this.effectsIn);
    //}
    this.gain.gain.value=this.props.sequencer.volume/50;
    this.sideChainGain.gain.value=this.props.sequencer.volume/50;
    src.start(time);
  }
  playSample(sample){
    var src=this.props.context.createBufferSource();
    src.buffer=sample.sound;
    src.connect(this.gain);
    this.gain.gain.value=this.props.sequencer.volume/50;
    src.start(0);
  }
  handlePlay() {
    if(!this.props.playing){
      this.noteTime = 0.0;
      this.startTime = this.context.currentTime + 0.005;
      this.rhythmIndex = 0;
      this.notePlaying=0;
      this.setState({notePlaying:this.notePlaying})
      this.hasPlayed=true;
      this.schedule();
      this.playing=true;
    }else{
      this.playing=false;
      cancelAnimationFrame(this.timeoutId);
      this.notePlaying=-1;
      this.setState({notePlaying:this.notePlaying})
    }
  }


  componentWillReceiveProps(newProps){
    console.log(newProps.playing, this.props.playing);
    if(newProps.playing && !this.props.playing){
      this.noteTime = 0.0;
      this.startTime = this.props.context.currentTime + 0.005;
      this.rhythmIndex = 0;
      this.notePlaying=0;
      //this.setState({notePlaying:this.notePlaying})
      this.hasPlayed=true;
      this.schedule();
      this.playing=true;
    }else if(!newProps.playing){
      cancelAnimationFrame(this.timeoutId);
      this.notePlaying=-1;
      this.setState({notePlaying:this.notePlaying})
    }
  }

  schedule() {
    var currentTime = this.props.context.currentTime;
    // The sequence starts at startTime, so normalize currentTime so that it's 0 at the start of the sequence.
    currentTime -= this.startTime;
    const scheduled = this.props.sequencer.scheduled;
    while (this.noteTime < currentTime + 0.200) {
      for(var i=0;i<sampleNames.length;i++){
        if(scheduled[i][this.rhythmIndex]===true){
          this.playSound(this.samples[sampleNames[i]], (this.noteTime + this.startTime));
        }
      }
      this.advanceNote();
    }
    this.timeoutId=requestAnimationFrame(this.schedule.bind(this));
  }

  advanceNote() {
      this.rhythmIndex++;
      if (this.rhythmIndex == this.loopLength) {
          this.rhythmIndex = 0;
          this.notePlaying++;
      }else{
        this.notePlaying=this.rhythmIndex;
      }
      //this.setState({notePlaying:this.notePlaying})

      this.noteTime += 0.25 * (60.0 / this.props.tempo);
  }
}
DrumsAudio.propTypes={
  context: PropTypes.object.isRequired,
  tempo: PropTypes.number,
  sequencer:PropTypes.object,
  playing: PropTypes.bool.isRequired,
  effects: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  context: getContext(state),
  tempo:state.tempo,
  sequencer:state.sequencer,
  playing: state.playing,
  effects: state.effects.drums
});

export default connect(mapStateToProps, undefined)(DrumsAudio)
