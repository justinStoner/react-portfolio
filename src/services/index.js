import AudioBus from './audio-bus';
import DrumService from './drum-service';
import SynthService from './synth-service';

export default [
  {
    name: 'audiobus',
    service: AudioBus
 },
 {
   name: 'drumservice',
   service: DrumService
},
{
  name: 'synthservice',
  service: SynthService
}
];
