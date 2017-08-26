import {Service} from 'react-services-injector';
import frequency from './frequency';
import {injector} from 'react-services-injector';
export default class SynthService extends Service {
    constructor() {
        super();
        this.octaves=[-3,-2,-1,0,1,2,3];
        this.waves=['sine', 'sawtooth', 'square', 'triangle'];
        this.A4=440;
        this.synthOctave=0;
        this.masterVol=85;
        this.modMult=10;
        this.compressionOn=true;
        this.delayOn=true;
        this.eqOn=true;
        this.lpfCutoff = 10;
        this.lpfQ = 10.0;
        this.lpfMod = 13;
        this.lpfEnv = 50;

        this.envA = 20;
        this.envD = 65;
        this.envS = 65;
        this.envR = 50;

        this.lpfA = 65;
        this.lpfD = 30;
        this.lpfS = 30;
        this.lpfR = 50;

        this.reverbLevel=32;
        this.driveLevel=0;
        this.lfoData={
          wave:0,
          detune:50,
          osc1:4,
          osc2:8,
          osc3:12,
          freq:4,
          type:'Lfo',
          modType:0
        }
        this.oscPresets=[
          {
            wave:0,
            detune:45,
            octave:2,
            volume:100,
          },
          {
            wave:2,
            detune:50,
            octave:3,
            volume:100,
          },
          {
            wave:1,
            detune:55,
            octave:5,
            volume:100,
          }
        ];
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

        this.oscillators=this.createVoices();

        // window.addEventListener('keydown', this.play.bind(this));
        // window.addEventListener('keyup', this.stop.bind(this));
    }

    createVoices(){
      var arr=[];
      var voice;
      for(var i=0;i<3;i++){
        voice={
          volume:this.oscPresets[i].volume,
          wave:this.oscPresets[i].wave,
          octave:this.oscPresets[i].octave,
          type:'Oscillator',
          detune:this.oscPresets[i].detune
        }
        arr.push(voice);
      }
      return arr;
    }
    createNodes(ab){
      this.effectsIn = ab.audio.createGain();
      this.effectsIn.gain.value=1;
      this.effectsOut = ab.audio.createGain();
      this.effectsOut.gain.value=this.masterVol/50;
      this.ab=ab;
      this.createEq();
      this.createDelay();
      this.compressor=this.ab.audio.createDynamicsCompressor();
      this.compressor.threshold.value = 80-100;
      this.compressor.knee.value = 20;
      this.compressor.ratio.value = 10;
      this.compressor.attack.value = 1;
      this.compressor.release.value = 1;
      console.log(this.compressor);
      this.connect();
      window.addEventListener('keydown', this.play.bind(this));
      window.addEventListener('keyup', this.stop.bind(this));
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
      if(this.synthOctave!=0){
        note=note+(this.synthOctave*12);
      }
      if(octave===0){
        freq = this.A4*Math.pow(2,(note-69)/12);
      }else{
        note=note+(octave*12)
        freq = this.A4*Math.pow(2,(note-69)/12);
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
         this.notes[i].lfo=this.ab.audio.createOscillator();
         this.notes[i].lfo.type=this.waves[this.lfoData.wave | 0];
         this.notes[i].lfo.frequency.value=this.lfoData.freq;
         this.notes[i].lfo.detune.value=this.lfoData.detune;

         //create filters
         this.notes[i]['f1'] = this.ab.audio.createBiquadFilter();
         this.notes[i]['f1'].type = "lowpass";
         this.notes[i]['f1'].Q.value = this.lpfQ;
         this.notes[i]['f1'].frequency.value = this.lpfCutoff*100;
         this.notes[i]['f2'] = this.ab.audio.createBiquadFilter();
         this.notes[i]['f2'].type = "lowpass";
         this.notes[i]['f2'].Q.value = this.lpfQ;
         this.notes[i]['f2'].frequency.value = this.lpfCutoff*100;

         for(var ii=0;ii<this.oscillators.length;ii++){
           //create lfo gain, connect lfo to it
           this.notes[i]['lfoOscGain'+ii]=this.ab.audio.createGain();
           this.notes[i]['lfoOscGain'+ii].gain.value=this.lfoData['osc'+(ii+1)]/100;
           this.notes[i].lfo.connect(this.notes[i]['lfoOscGain'+ii]);

           //create oscillator
           this.notes[i]['o'+ii]=this.ab.audio.createOscillator();
           this.notes[i]['o'+ii].detune.value=this.oscillators[ii].detune-50;
           console.log(this.frequency(this.notes[i].hz, this.oscillators[ii].octave-3));
           this.notes[i]['o'+ii].frequency.value=frequency(this.notes[i].hz, this.oscillators[ii].octave-3, this.synthOctave);
          //  if(this.oscillators[ii].octave-3==0){
          //    this.notes[i]['o'+ii].frequency.value=this.notes[i].hz;
          //  }else if (this.oscillators[ii].octave-3>0){
          //    this.notes[i]['o'+ii].frequency.value=this.notes[i].hz * 2*(this.oscillators[ii].octave-3);
          //  }else{
          //    this.notes[i]['o'+ii].frequency.value=this.notes[i].hz * 2/Math.abs(this.oscillators[ii].octave-3);
          //  }
           this.notes[i]['o'+ii].type=this.waves[this.oscillators[ii].wave | 0];

           //connect lfo gain to osc frequency
           this.notes[i]['lfoOscGain'+ii].connect(this.notes[i]['o'+ii].frequency);

           //create oscillator gain
           this.notes[i]['g'+ii]=this.ab.audio.createGain();
           this.notes[i]['g'+ii].gain.value=0.0005*this.oscillators[ii].volume;

           //connect oscillator to osc gain
           this.notes[i]['o'+ii].connect(this.notes[i]['g'+ii]);
           //connect osc gain to filter1
           this.notes[i]['g'+ii].connect( this.notes[i]['f1'] );
         }

         this.notes[i].modfilterGain=this.ab.audio.createGain();
         this.notes[i].modfilterGain.gain.value=this.lpfMod*24;
         this.notes[i].modfilterGain.connect( this.notes[i]['f1'].detune );	// filter tremolo
         this.notes[i].modfilterGain.connect( this.notes[i]['f2'].detune );	// filter tremolo
         this.notes[i].lfo.connect(this.notes[i].modfilterGain);

         this.notes[i]['f1'].connect( this.notes[i]['f2'] );
         this.notes[i]['e']=this.ab.audio.createGain();
         this.notes[i]['f2'].connect(this.notes[i]['e']);
         this.notes[i]['e'].connect(this.effectsIn);
         //this.notes[i]['e'].connect(this.reverbBypassGain);
         var now = this.ab.audio.currentTime;
         var atkEnd=now + (this.envA/100.0);
         this.notes[i]['e'].gain.value = 0.0;
         this.notes[i]['e'].gain.setValueAtTime( 0.0, now );
         this.notes[i]['e'].gain.linearRampToValueAtTime( 1.0, atkEnd );
         this.notes[i]['e'].gain.setTargetAtTime( (this.envS/100.0), atkEnd, (this.envD/100.0)+0.001 );

         var filterAttackLevel = this.lpfEnv*72;
         var filterSustainLevel = filterAttackLevel* this.lpfS / 100.0;
         var filterAttackEnd = (this.lpfA/100.0);

         if (!filterAttackEnd){
           filterAttackEnd=0.05;
         }

         this.notes[i]['f1'].detune.setValueAtTime( 0, now );
         this.notes[i]['f1'].detune.linearRampToValueAtTime( filterAttackLevel, now+filterAttackEnd );
         this.notes[i]['f2'].detune.setValueAtTime( 0, now );
         this.notes[i]['f2'].detune.linearRampToValueAtTime( filterAttackLevel, now+filterAttackEnd );
         this.notes[i]['f1'].detune.setTargetAtTime( filterSustainLevel, now+filterAttackEnd, (this.lpfD/100.0)+0.001 );
         this.notes[i]['f2'].detune.setTargetAtTime( filterSustainLevel, now+filterAttackEnd, (this.lpfD/100.0)+0.001 );

         this.notes[i].lfo.start(0);
         for(var ii=0;ii<this.oscillators.length;ii++){
           this.notes[i]['o'+ii].start(0);
         }

           this.notes[i].isPlaying=true;

        }
    }

    stopKey(i){
      if(this.notes[i].isPlaying===true){
        var now =  this.ab.audio.currentTime;
      	var release = now + (this.envR/100.0);
      	this.notes[i]['e'].gain.cancelScheduledValues(now);
      	this.notes[i]['e'].gain.setValueAtTime( this.notes[i]['e'].gain.value, now );
      	this.notes[i]['e'].gain.setTargetAtTime(0.0, now, (this.envR/100.0)+0.001);
      	this.notes[i]['f1'].detune.cancelScheduledValues(now);
      	this.notes[i]['f1'].detune.setTargetAtTime( 0, now, (this.lpfR/100.0) +0.001);
      	this.notes[i]['f2'].detune.cancelScheduledValues(now);
      	this.notes[i]['f2'].detune.setTargetAtTime( 0, now, (this.lpfR/100.0) +0.001);

        for(var ii=0;ii<this.oscillators.length;ii++){
          this.notes[i]['g'+ii].gain.cancelScheduledValues(now);
          this.notes[i]['g'+ii].gain.setTargetAtTime( 0, now, (this.envR/100.0) +0.001);
          this.notes[i]['o'+ii].stop(now+(this.envR/30.0));
        }
        this.notes[i].lfo.stop(now+(this.envR/30.0))
        this.notes[i].isPlaying=false;
      }
    }
    createEq(){
      this.eq80=this.ab.audio.createBiquadFilter();
      this.eq350=this.ab.audio.createBiquadFilter();
      this.eq720=this.ab.audio.createBiquadFilter();
      this.eq16k=this.ab.audio.createBiquadFilter();
      this.eq5k=this.ab.audio.createBiquadFilter();
      this.eq10k=this.ab.audio.createBiquadFilter();
      this.eq80.frequency.value=80;
      this.eq80.type="lowshelf";
      this.eq80.gain.value=0;
      this.eq350.frequency.value=350;
      this.eq350.type="peaking";
      this.eq350.gain.value=4;
      this.eq720.frequency.value=720;
      this.eq720.type="peaking";
      this.eq720.gain.value=-5;
      this.eq16k.frequency.value=1600;
      this.eq16k.type="peaking";
      this.eq16k.gain.value=-5;
      this.eq5k.frequency.value=5000;
      this.eq5k.type="peaking";
      this.eq5k.gain.value=-10;
      this.eq10k.frequency.value=10000;
      this.eq10k.type="highshelf";
      this.eq10k.gain.value=0;
    }

    createDelay(){
      this.dInput=this.ab.audio.createGain();
      this.dOutput=this.ab.audio.createGain();
      this.delay = this.ab.audio.createDelay(5.0);
      this.feedback = this.ab.audio.createGain();
      this.wetLevel = this.ab.audio.createGain();
      this.delay.delayTime.value = 0.50;
      this.feedback.gain.value = 0.15;
      this.wetLevel.gain.value = 0.25;
    }
    connect(){
      this.effectsIn.connect(this.eq80);
      this.eq80.connect(this.eq350);
      this.eq350.connect(this.eq720);
      this.eq720.connect(this.eq16k);
      this.eq16k.connect(this.eq5k);
      this.eq5k.connect(this.eq10k);
      this.eq10k.connect(this.dInput);

      this.dInput.connect(this.delay);
      this.dInput.connect(this.dOutput);
      this.delay.connect(this.feedback);
      this.delay.connect(this.wetLevel);
      this.feedback.connect(this.delay);
      this.wetLevel.connect(this.dOutput);
      this.dOutput.connect(this.compressor);
      this.compressor.connect(this.effectsOut);
      this.effectsOut.connect(this.ab.synthIn);
    }
}
