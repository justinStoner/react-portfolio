export class AudioBus {
    constructor(audioCtx){
        this.audioCtx=audioCtx;
        this.analyser=this.audioCtx.createAnalyser();
        this.synthAnalyser=this.audioCtx.createAnalyser();
        this.drumAnalyser=this.audioCtx.createAnalyser();
        this.analyser.fftSize=2048;
        this.bufferLength = this.analyser.fftSize;
        this.dataArray = new Uint8Array(this.bufferLength);
        this.showVisualizer=false;
        this.input=this.audioCtx.createGain();
        this.synthIn=this.audioCtx.createGain();
        this.drumsIn=this.audioCtx.createGain();
        this.sideChainIn=this.audioCtx.createGain();
        this.synthMounted=false;
        this.compSettings={
          synth:{
            attack:1,
            release:1,
            threshold:80,
            knee:20,
            ratio:10,
            active:true
          },
          sidechain:{
            attack:0.1,
            release:0.1,
            threshold:55,
            knee:2,
            ratio:40,
            active:true
          },
          drums:{
            attack:1,
            release:1,
            threshold:90,
            knee:40,
            ratio:2,
            active:true
          }
        };
        this.compressor=this.createCompressor('sidechain');
        this.connect();
        this.compressionOn=true;
        this.setCompressor=this.setCompressor.bind(this);
        this.setSynthMounted=this.setSynthMounted.bind(this);
    }

    createCompressor(mode){
      var comp=this.compSettings[mode];
      var compressor = this.audioCtx.createDynamicsCompressor();
      console.log(comp);
      compressor.threshold.value = comp.threshold-100;
      compressor.knee.value = comp.knee;
      compressor.ratio.value = comp.ratio;
      compressor.attack.value = comp.attack;
      compressor.release.value = comp.release;
      return compressor;
    }
    setCompressor(key, value){
      this.compressor[key].value=value;
    }
    setSynthMounted(val){
      this.synthMounted=val;
    }
    connect(){
      this.input.connect(this.analyser);

      //this.synthIn.connect(this.synthAnalyser);

      this.drumsIn.connect(this.drumAnalyser);
      //this.drumsIn.connect(this.drumAnalyser);

      //this.output.connect(this.analyser);
      this.synthIn.connect(this.compressor);
      //this.synthIn.connect(this.synthAnalyser);
      this.sideChainIn.gain.value=1;
      this.compressor.connect(this.sideChainIn);
      this.sideChainIn.connect(this.analyser);

      this.analyser.connect(this.audioCtx.destination);
      this.synthAnalyser.connect(this.analyser);
      this.drumAnalyser.connect(this.analyser);

      // var gain=this.audioCtx.createGain();
      // gain.gain.value=0.001;
      // this.compressor.connect(gain);
      // gain.connect(this.output);
    }

}
