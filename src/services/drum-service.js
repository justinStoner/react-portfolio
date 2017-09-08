import 'whatwg-fetch';
export class DrumService{
    constructor() {
        this.samples=[
          {name:'kick',sample:'Roland_TR-33_Kick', type:'kick'},
          {name:'snare',sample:'Roland_TR-33_Snare', type:'snare'},
          {name:'hh open',sample:'Roland_TR-33_HH Op', type:'hh'},
          {name:'hh close',sample:'Roland_TR-33_HH Cl', type:'hh'},
          {name:'tom hi',sample:'Roland_TR-33_Tom Hi', type:'tom'},
          {name:'tom med',sample:'Roland_TR-33_Tom Mi', type:'tom'},
          {name:'tom low',sample:'Roland_TR-33_Tom Lo', type:'tom'},
          {name:'bongo hi',sample:'Roland_TR-33_Bongo Hi', type:'tom'},
          {name:'bongo med',sample:'Roland_TR-33_Bongo Mi', type:'tom'},
          {name:'bongo low',sample:'Roland_TR-33_Bongo Lo', type:'tom'},
          {name:'conga hi',sample:'Roland_TR-33_Conga Hi', type:'tom'},
          {name:'conga med',sample:'Roland_TR-33_Conga Mi', type:'tom'},
          {name:'conga low',sample:'Roland_TR-33_Conga Lo', type:'tom'},
          {name:'clave',sample:'Roland_TR-33_Clave', type:'tom'}
        ];

        this.compressionOn=false;
        this.reverbBuffer;
        this.drums=[];
        this.scheduled=new Array(14);
        this.volume=85;
        this.notePlaying=-1;
        this.playing=false;
        this.hasPlayed=false;
        this.loaded=false;
        this.loopLength=16;
        this.eqFreqs={
          kick:[50, 450, 3000, 150],
          kickRange:{
            low:[50, 100],
            mid:[300, 600],
            high:[2000, 4000],
            lowmid:[150, 250]
          },
          snare:[150, 500, 3000],
          snareRange:{
            low:[50, 200],
            mid:[300, 600],
            high:[2000, 4000]
          },
          hh:[200, 500, 5000],
          hhRange:{
            low:[100, 300],
            mid:[300, 900],
            high:[4000, 7000]
          },
          tom:[250, 600, 5000],
          tomRange:{
            low:[80, 250],
            mid:[300, 900],
            high:[5000, 7000]
          }
        }
    }
    loadInit(context, audio, tempo, setState){
      this.audio=audio;
      this.context=context;
      this.setState=setState
      this.tempo=tempo;

      if(!this.loaded){
        //this.compressor=this.audio.createCompressor('drums');
        var myRequest = new Request("/audio/reverb/room.wav");
          fetch(myRequest)
          .then((res)=>res.arrayBuffer())
          .then((buffer)=>{
            this.context.decodeAudioData(buffer, (decodedData)=>{
              this.reverbBuffer=decodedData
            })
          })
        for(var i=0; i<14; i++){
          this.scheduled[i]=new Array(16);
          for(var ii=0; ii<16; ii++){
            this.scheduled[i][ii]=false;
          }
        }
        for(var i=0; i<14; i++){
          if(i==0){
            this.scheduled[i][0]=true;
            this.scheduled[i][4]=true;
            this.scheduled[i][8]=true;
            this.scheduled[i][12]=true;
            //this.scheduled[i][14]=true;
          }else if(i==1){
            this.scheduled[i][4]=true;
            this.scheduled[i][12]=true;
          }else if (i==2) {
            this.scheduled[i][2]=true;
          }else if(i==3){
            this.scheduled[i][6]=true;
            this.scheduled[i][10]=true;
            this.scheduled[i][14]=true;
          }
          // else if (i==10) {
          //   this.scheduled[i][4]=true;
          //   this.scheduled[i][6]=true;
          //   this.scheduled[i][12]=true;
          // }
        }
        this.gain=this.context.createGain();
        for(var i=0;i<this.samples.length;i++){

          var obj={
            name:this.samples[i].name,
            sound:this.loadSample(this.samples[i].sample, i),
            type:this.samples[i].type,
            scheduled:[],
            volume:50,
            pitch:0,
            high:40,
            highFreq:this.eqFreqs[this.samples[i].type][2],
            mid:40,
            midFreq:this.eqFreqs[this.samples[i].type][1],
            low:40,
            lowFreq:this.eqFreqs[this.samples[i].type][0],
            range:this.eqFreqs[this.samples[i].type+'Range'],
            Q:10,
            cutoff:200,
            filterType:'lowpass',
            gain:this.context.createGain(),
            reverbLevel:32,
            revNode:this.context.createConvolver(),
            revGain:this.context.createGain(),
            revBypassGain:this.context.createGain(),
            eq120:this.context.createBiquadFilter(),
            eq600:this.context.createBiquadFilter(),
            eq5k:this.context.createBiquadFilter(),
            filter1 : this.context.createBiquadFilter(),
            filter2 : this.context.createBiquadFilter()
          }
          if(obj.type==='kick'){
            obj.lowmid=this.eqFreqs[this.samples[i].type][3];
          }
          this.drums.push(obj);
          this.drums[i].revNode.connect(this.drums[i].revGain);
          this.drums[i].revGain.connect(this.drums[i].eq120);
          this.drums[i].revBypassGain.connect(this.drums[i].eq120);
          this.drums[i].eq120.connect(this.drums[i].eq600);
          this.drums[i].eq600.connect(this.drums[i].eq5k);
          this.drums[i].eq5k.connect(this.drums[i].filter1);
          this.drums[i].filter1.connect(this.drums[i].filter2);
          this.drums[i].filter2.connect(this.drums[i].gain);
          this.drums[i].gain.connect(this.gain);
          if(this.drums[i].name==='kick'){
            this.drums[i].gain.connect(this.audio.sideChainOutput)
            //this.scriptNode.disconnect();
            //this.drums[i].gain.connect(this.audio.compressor);
            //this.audio.synthIn.connect(this.audio.compressor);


            // this.scriptNode=this.audioCtx.createScriptProcessor(4096,1,1);
            // this.scriptNode.onaudioprocess=(e)=>{
            //   this.audio.synthIn.gain.value=Math.pow(10, this.audio.compressor.reduction/20);
            // }
            //
            // this.scriptNode.connect(this.audio.compressor);
            //this.sideChainGain.connect(this.effectsIn);
            //this.gain.connect(this.effectsIn);
          }
          console.log(obj);
        }

        this.sideChainGain=this.context.createGain();
        //this.sideChainGain.gain.value=0.001;
        this.effectsIn=this.context.createGain();
        this.effectsIn.gain.value=1;
        this.effectsOut=this.context.createGain();
        //this.compressor=this.context.createGain();
        //this.gain.gain.value=1;
        this.gain.connect(this.audio.input);
        //this.effectsIn.connect(this.effectsOut);
        //this.sideChainGain.connect(this.audio.compressor);
          //this.sideChainGain.connect(this.audio.drumsIn);

        //this.effectsIn.connect(this.compressor);
        //this.compressor.connect(this.effectsOut)
        //this.effectsOut.connect(this.audio.input);
        // this.scriptNode=this.context.createScriptProcessor(4096,1,1);
        // this.scriptNode.onaudioprocess=(e)=>{
        //   this.audio.synthIn.gain.value=Math.pow(10, this.audio.compressor.reduction/20);
        // };
        //this.sideChainGain.connect(this.audio.compressor);
        //this.audio.compressor.connect(this.scriptNode);
        //this.scriptNode.connect(this.audio.sideChainIn);
        this.loaded=true;
      }
    }
    loadSample(type, i){
      //var source = this.context.createBufferSource();
      var myRequest = new Request("/audio/roland-tr-33/"+type+".wav");
        fetch(myRequest)
        .then((res)=>res.arrayBuffer())
        .then((buffer)=>{
          this.context.decodeAudioData(buffer, (decodedData)=>{
            //source.buffer=decodedData;
            //console.log(source);
            this.drums[i].sound=decodedData
          })
        })
    }
    playSound(buffer, time, name, i){
      var src=this.context.createBufferSource();
      src.buffer=buffer;

      src.detune.value=this.drums[i].pitch-100;
      this.drums[i].revNode.buffer=this.reverbBuffer;


      src.connect(this.drums[i].revNode);
      src.connect(this.drums[i].revBypassGain);

      this.drums[i].eq120.frequency.value=this.drums[i].lowFreq;
      this.drums[i].eq120.type="lowshelf";
      this.drums[i].eq120.gain.value=this.drums[i].low-40;

      this.drums[i].eq600.frequency.value=this.drums[i].midFreq;
      this.drums[i].eq600.type="peaking";
      this.drums[i].eq600.gain.value=this.drums[i].mid-40;

      this.drums[i].eq5k.frequency.value=this.drums[i].highFreq;
      this.drums[i].eq5k.type="highshelf";
      this.drums[i].eq5k.gain.value=this.drums[i].high-40;

      this.drums[i].filter1.type = this.drums[i].filterType;
      this.drums[i].filter1.Q.value = this.drums[i].Q;
      this.drums[i].filter1.frequency.value = this.drums[i].cutoff*100;

      this.drums[i].filter2.type = this.drums[i].filterType;
      this.drums[i].filter2.Q.value = this.drums[i].Q;
      this.drums[i].filter2.frequency.value = this.drums[i].cutoff*100;


      this.drums[i].gain.gain.value=this.drums[i].volume/50;
      if(name==='kick' && this.audio.compressionOn){
        //this.scriptNode.disconnect();

        //this.drums[i].gain.connect(this.audio.compressor);

        // this.scriptNode=this.context.createScriptProcessor(4096,1,1);
        // this.scriptNode.onaudioprocess=(e)=>{
        //   this.audio.synthIn.gain.value=Math.pow(10, this.audio.compressor.reduction/20);
        // }
        //
        // this.scriptNode.connect(this.audio.compressor);
        //this.sideChainGain.connect(this.effectsIn);
        //this.gain.connect(this.effectsIn);
      }else{
        //this.drums[i].filter2.connect(this.drums[i].gain);
        //this.drums[i].gain.connect(this.gain);
        //this.gain.connect(this.effectsIn);
      }
      this.gain.gain.value=this.volume/50;
      this.sideChainGain.gain.value=this.volume/50;
      src.start(time);
    }
    playSample(i){
      var src=this.context.createBufferSource();
      src.buffer=this.drums[i].sound;
      src.connect(this.gain);
      this.gain.connect(this.audio.drumsIn);
      this.gain.gain.value=this.volume/50;
      src.start(0);
    }
    handlePlay() {
      if(!this.playing){
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
    addNote(e){
      var sampleIndex=e.target.getAttribute('data-sample');
      var noteIndex=e.target.getAttribute('data-noteindex')
      if(this.scheduled[sampleIndex][noteIndex]==true){
        this.scheduled[sampleIndex][noteIndex]=false
        e.target.classList.remove('mdl-color--blue-500');
        e.target.classList.add('mdl-color--green-A400');
      }else{
        this.scheduled[sampleIndex][noteIndex]=true;
        e.target.classList.remove('mdl-color--green-A400');
        e.target.classList.add('mdl-color--blue-500');
      }

    }
    clearNote(i, ii){

    }
    handleStop() {

    }

    schedule() {
      var currentTime = this.context.currentTime;
      // The sequence starts at startTime, so normalize currentTime so that it's 0 at the start of the sequence.
      currentTime -= this.startTime;
      while (this.noteTime < currentTime + 0.200) {
        for(var i=0;i<this.scheduled.length;i++){
          if(this.scheduled[i][this.rhythmIndex]===true){
            this.playSound(this.drums[i].sound, (this.noteTime + this.startTime), this.drums[i].name, i);
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
        this.setState({notePlaying:this.notePlaying})

        this.noteTime += 0.25 * (60.0 / this.tempo);
    }
}
