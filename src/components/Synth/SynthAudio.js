import React, { Component }  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { keyDown, keyUp } from '../../actions';
import { getContext } from '../../selectors';
import { EffectsAudio } from '../EffectBank';

const octaves=[-3,-2,-1,0,1,2,3];
const waves=['sine', 'sawtooth', 'square', 'triangle'];
const notes={
  'a':{note:'c' ,hz:60, color:true, key:'a', isPlaying:false},
  'w':{note:'c#' ,hz:61, color:false, key:'w', isPlaying:false},
  's':{note:'d' ,hz:62, color:true, key:'s', isPlaying:false},
  'e':{note:'d#' ,hz:63, color:false, key:'e', isPlaying:false},
  'd':{note:'e' ,hz:64, color:true, key:'d', isPlaying:false},
  'f':{note:'f' ,hz:65, color:true, key:'f', isPlaying:false},
  't':{note:'f#' ,hz:66 ,color:false, key:'t', isPlaying:false},
  'g':{note:'g' ,hz:67 ,color:true, key:'g', isPlaying:false},
  'y':{note:'g#' ,hz:68 ,color:false, key:'y', isPlaying:false},
  'h':{note:'a' ,hz:69 ,color:true, key:'h', isPlaying:false},
  'u':{note:'a#' ,hz:70 ,color:false, key:'u', isPlaying:false},
  'j':{note:'b' ,hz:71 ,color:true, key:'j', isPlaying:false},
  'k':{note:'c' ,hz:72 ,color:true, key:'k', isPlaying:false},
  'o':{note:'c#' ,hz:73 ,color:false, key:'o', isPlaying:false},
  'l':{note:'d' ,hz:74 ,color:true, key:'l', isPlaying:false},
  'p':{note:'d#' ,hz:75 ,color:false, key:'p', isPlaying:false},
  ';':{note:'e' ,hz:76 ,color:true, key:';', isPlaying:false},
  "'":{note:'f' ,hz:77 ,color:true, key:"'", isPlaying:false}
}

export class SynthAudio extends Component{
  constructor(props){
    super(props);
    this.props=props;
    this.playKey=this.playKey.bind(this);
    this.stopKey=this.stopKey.bind(this);
    this.effectsChain=[];
  }

  componentWillMount(){
    this.createNodes()
    let arr = Object.values(this.props.effects);
    console.log(this.props.effects);
    this.effectsChain = arr.map( ( e, i) => {
      if ( i === 0 ) return {input:this.props.audio.effectsIn, output:this.props.context.createGain()}
      else if( i === arr.length-1) return {input:null, output:this.props.audio.effectsOut}
      else return {input:null, output:this.props.context.createGain()}
    })
    this.effectsChain.forEach( ( e, i ) => {
      if( !e.input ) e.input = this.effectsChain[i-1].output;
    })
  }
  componentDidUpdate(){

  }
  shouldComponentUpdate(nextProps){
    const props = this.props;
    if(nextProps.oscillators != props.oscillators) return true
    if(nextProps.synthFilter != props.synthFilter) return true
    if(nextProps.synthOutput != props.synthOutput) return true
    if(nextProps.effects != props.effects) return true
    return false
  }
  componentWillReceiveProps(nextProps){
    const oscillators=nextProps.oscillators;
    const lfo = nextProps.lfo;
    const filter  = nextProps.synthFilter;
    const output = nextProps.synthOutput;
    if(lfo != this.props.lfo){
      this.lfo.type = lfo.wave;
      this.lfo.frequency.value = lfo.freq;
      this.lfo.detune.value = lfo.detune;
    }
    if(nextProps.effects!= this.props.effects){
      let arr = Object.values(nextProps.effects);
      this.effectsChain = arr.map( ( e, i) => {
        if ( i === 0 ) return {input:this.props.audio.effectsIn, output:this.props.context.createGain()}
        else if( i === arr.length-1) return {input:null, output:this.props.audio.effectsOut}
        else return {input:null, output:this.props.context.createGain()}
      })
      this.effectsChain.forEach( ( e, i ) => {
        if( !e.input ) e.input = this.effectsChain[i-1].output;
      })
    }
    if(filter != this.props.synthFilter){
      Object.values(notes).forEach( note =>{
        try{
          note.modfilterGain.gain.value = filter.lpfMod*24;
          note.f1.frequency.value = filter.lpfCutoff * 100;
          note.f1.Q.value = filter.lpfQ;
          note.f2.frequency.value = filter.lpfCutoff * 100;
          note.f2.Q.value = filter.lpfQ;
        }catch(e){}
      })
    }
    if(oscillators != this.props.oscillators){
      Object.values(notes).forEach( note =>{
        try{
          for(var i = 0; i<3; i++){
            this.updateOsc(note['o'+i], note.hz, note['g'+i], oscillators[i])
          }
        }catch(e){}
      })
    }
  }
  render(){
    return (
      <EffectsAudio effects={this.props.effects} context={this.props.context} effectsIn={this.props.audio.effectsIn} effectsOut={this.props.audio.effectsOut} parent="synth"/>
    )
  }
  updateOsc(osc, hz, gain, newProps) {
    osc.type = newProps.wave;
    osc.detune.value = newProps.detune;
    gain.gain.value = 0.0005*newProps.volume;
    osc.frequency.value = this.frequency(hz, newProps.octave, this.props.synthOutput.synthOctave);
  }
  changeSynthOctave(dir){
    if(dir==='up'){
      this.synthOctave++;
    }else{
      this.synthOctave--;
    }
    // for(var i=0;i<this.notes.length;i++){
    //   try{
    //     this.notes[i].o0.frequency.value=this.frequency(this.notes[i].hz, this.oscillators[0].octave-3)
    //     this.notes[i].o1.frequency.value=this.frequency(this.notes[i].hz, this.oscillators[1].octave-3)
    //     this.notes[i].o2.frequency.value=this.frequency(this.notes[i].hz, this.oscillators[2].octave-3)
    //   }catch(e){
    //
    //   }
    // }
  }
  frequency(note, octave){
    var freq;
    if(this.props.synthOutput.synthOctave!=0){
      note=note+(this.props.synthOutput.synthOctave*12);
    }
    if(octave===0){
      freq = 440*Math.pow(2,(note-69)/12);
    }else{
      note=note+(octave*12)
      freq = 440*Math.pow(2,(note-69)/12);
    }
    return freq//(freq*Math.pow(2, octave));

  }
  createNodes(){
    this.props.audio.effectsOut.gain.value=this.props.synthOutput.masterVol/50;
    //this.sideChain=this.props.context.createGain();
    this.lfo=this.props.context.createOscillator();
    this.lfo.type=this.props.lfo.wave;
    this.lfo.frequency.value=this.props.lfo.freq;
    this.lfo.detune.value=this.props.lfo.detune;

    this.lfo.start(0);
    this.connect();
    window.addEventListener('keydown', this.play.bind(this));
    window.addEventListener('keyup', this.stop.bind(this));
    window.addEventListener('mock-keydown', this.playFromClick.bind(this));
    window.addEventListener('mock-keyup', this.stopFromClick.bind(this));

    window.addEventListener('stop-synth', () => {
      window.removeEventListener('keydown', this.play.bind(this))
      window.removeEventListener('keyup', this.stop.bind(this))
    })
    window.addEventListener('start-synth', () => {
      window.addEventListener('keydown', this.play.bind(this))
      window.addEventListener('keyup', this.stop.bind(this))
    })
  }

  connect(){
    this.props.audio.effectsOut.connect(this.props.audio.input);
  }

  play(e){
    let s=e.key;
    let note;
    if(!e.key){
      note=notes[String.fromCharCode(e.keyCode)]
    }else{
      note=notes[s.toLowerCase()]
    }
    if(note){
      this.playKey(note);
      this.props.playNote(note)
    }
  }
  stop(e){
    let s=e.key;
    let note;
    if(!e.key){
      note=notes[String.fromCharCode(e.keyCode)]
    }else{
      note = notes[s.toLowerCase()]
    }
    if(note){
      this.stopKey(note);
      this.props.stopNote(note);
    }
  }
  playFromClick(e){
    this.playKey(notes[e.detail]);
  }
  stopFromClick(e){
    this.stopKey(notes[e.detail]);
  }
  playKey(note){
     if(!note) return
     if(note.isPlaying===false){
       if(!note.hasPlayed){
         note['f1'] = this.props.context.createBiquadFilter();
         note['f2'] = this.props.context.createBiquadFilter();

         note['f1'].connect( note['f2'] );
         note['e']=this.props.context.createGain();
         note['f2'].connect(note['e']);
         note['e'].connect(this.props.audio.effectsIn);

         note.modfilterGain=this.props.context.createGain();
         note.modfilterGain.gain.value=this.props.synthFilter.lpfMod*24;
         note.modfilterGain.connect( note['f1'].detune );	// filter tremolo
         note.modfilterGain.connect( note['f2'].detune );	// filter tremolo
         this.lfo.connect(note.modfilterGain);

         for(var ii=0; ii<3; ii++){
           note['lfoOscGain'+ii]=this.props.context.createGain();
           this.lfo.connect(note['lfoOscGain'+ii]);
           note['g'+ii]=this.props.context.createGain();
           note['g'+ii].connect( note['f1'] );

         }
       }else{
         for(var ii=0; ii<3; ii++){
           note['lfoOscGain'+ii].disconnect();
           note['o'+ii].disconnect();
           //delete note['o'+ii];
         }
       }
       this.props.audio.effectsOut.gain.value=this.props.synthOutput.masterVol/50;
       note['f1'].type = "lowpass";
       note['f1'].Q.value = this.props.synthFilter.lpfQ;
       note['f1'].frequency.value = this.props.synthFilter.lpfCutoff*100;

       note['f2'].type = "lowpass";
       note['f2'].Q.value = this.props.synthFilter.lpfQ;
       note['f2'].frequency.value = this.props.synthFilter.lpfCutoff*100;

       this.lfo.type=this.props.lfo.wave;
       this.lfo.frequency.value=this.props.lfo.freq;
       this.lfo.detune.value=this.props.lfo.detune;
       for(var ii=0;ii<3;ii++){
         note['lfoOscGain'+ii].gain.value=this.props.lfo['osc'+(ii)]/100;
         note['o'+ii]=this.props.context.createOscillator();
         note['o'+ii].detune.value=this.props.oscillators[ii].detune-50;
         note['o'+ii].frequency.value=this.frequency(note.hz, this.props.oscillators[ii].octave, this.props.synthOutput.synthOctave);
         note['o'+ii].type=this.props.oscillators[ii].wave;
         note['lfoOscGain'+ii].connect(note['o'+ii].frequency);
         note['g'+ii].gain.value=0.0005*this.props.oscillators[ii].volume;
         note['o'+ii].connect(note['g'+ii]);
       }

       //note['e'].connect(this.reverbBypassGain);
       var now = this.props.context.currentTime;
       var atkEnd=now + (this.props.synthOutput.envA/20.0);
       note['e'].gain.value = 0.0;
       note['e'].gain.setValueAtTime( 0.0, now );
       note['e'].gain.linearRampToValueAtTime( 1.0, atkEnd );
       note['e'].gain.setTargetAtTime( (this.props.synthOutput.envS/100.0), atkEnd, (this.props.synthOutput.envD/100.0)+0.001 );

       var filterAttackLevel = this.props.synthFilter.lpfEnv*72;
       var filterSustainLevel = filterAttackLevel* this.props.synthFilter.lpfS / 100.0;
       var filterAttackEnd = (this.props.synthFilter.lpfA/20.0);

       if (!filterAttackEnd){
         filterAttackEnd=0.05;
       }

       note['f1'].detune.setValueAtTime( 0, now );
       note['f1'].detune.linearRampToValueAtTime( filterAttackLevel, now+filterAttackEnd );
       note['f2'].detune.setValueAtTime( 0, now );
       note['f2'].detune.linearRampToValueAtTime( filterAttackLevel, now+filterAttackEnd );
       note['f1'].detune.setTargetAtTime( filterSustainLevel, now+filterAttackEnd, (this.props.synthFilter.lpfD/100.0) );
       note['f2'].detune.setTargetAtTime( filterSustainLevel, now+filterAttackEnd, (this.props.synthFilter.lpfD/100.0) );

       for(var ii=0;ii<3;ii++){
         note['o'+ii].start(0);
       }
       note.isPlaying=true;
       note.hasPlayed=true;
      }
  }

  stopKey(note){
    if(!note) return
    if(note.isPlaying===true){
      var now =  this.props.context.currentTime;
      var release = now + (this.props.synthOutput.envR/10.0);
      note['e'].gain.cancelScheduledValues(now);
      note['e'].gain.setValueAtTime( note['e'].gain.value, now );
      note['e'].gain.setTargetAtTime(0.0, now, (this.props.synthOutput.envR/100));
      note['f1'].detune.cancelScheduledValues(now);
      note['f1'].detune.setValueAtTime( note['f1'].detune.value, now );
      note['f1'].detune.setTargetAtTime( 0, now, (this.props.synthFilter.lpfR/100.0) );
      note['f2'].detune.cancelScheduledValues(now);
      note['f2'].detune.setValueAtTime( note['f2'].detune.value, now );
      note['f2'].detune.setTargetAtTime( 0, now, (this.props.synthFilter.lpfR/100.0));

      for(var ii=0;ii<3;ii++){
        //note['g'+ii].gain.cancelScheduledValues(now);
        //note['g'+ii].gain.setTargetAtTime( 0, now, (this.props.synthOutput.envR/100.0) +0.001);
        note['o'+ii].stop(release);
      }
    //note.lfo.stop(now+(this.props.synthOutput.envR/30.0))
      note.isPlaying=false;
    }
  }
}

SynthAudio.propTypes={
  context: PropTypes.object.isRequired,
  synth: PropTypes.object.isRequired,
  synthFilter: PropTypes.object.isRequired,
  synthOutput: PropTypes.object.isRequired,
  oscillators: PropTypes.array.isRequired,
  lfo: PropTypes.object.isRequired,
  effects: PropTypes.object.isRequired,
  keys:PropTypes.object.isRequired

}
const mapStateToProps = state => ({
  context: getContext(state),
  synth: state.synth,
  synthFilter: state.synthFilter,
  synthOutput: state.synthOutput,
  oscillators:state.oscillators,
  lfo:state.lfo,
  effects:state.effects.synth,
  keys:state.keys
});

const mapDispatchToProps = dispatch =>{
  return {
    playNote: ( index ) => {
      dispatch(keyDown( index ))
    },
    stopNote: ( index ) => {
      dispatch(keyUp( index ))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SynthAudio)
