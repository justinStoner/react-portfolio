export const filterTypes = [
  {name:'lowpass', value:'lowpass'},
  {name:'highpass', value:'highpass'},
  {name:'bandpass', value:'bandpass'},
  {name:'lowshelf', value:'lowshelf'},
  {name:'highshelf', value:'highshelf'},
  {name:'peaking', value:'peaking'},
  {name:'notch', value:'notch'},
  {name:'allpass', value:'allpass'}
];

const octave = [
  'C',
  'C#',
  'D',
  'Eb',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'Bb',
  'B'
];

export const waveShapes = ['sine', 'square', 'sawtooth', 'triangle'];

export const waveLabels = [
  {name:'sine', value:'sine', btnValue:'sine'},
  {name:'square', value:'square', btnValue:'sqr'},
  {name:'sawtooth', value:'sawtooth', btnValue:'saw'},
  {name:'triangle', value:'triangle', btnValue:'tri'}
];

export const reverbLabels = [
  {name:'hall', value:'hall'},
  {name:'room', value:'room'},
  {name:'plate', value:'plate'},
  {name:'spring', value:'spring'}
];

export const delayLabels = [
  {name:'1/1', value:4},
  {name:'1/2', value:2},
  {name:'1/4', value:1},
  {name:'1/8', value:0.5},
  {name:'1/8t', value:0.33},
  {name:'1/16', value:0.25}
];

export const defaultEffectSettings = {
  overdrive:{
    type:'overdrive',
    effectLevelMode:'none',
    gain:50,
    mode:0,
    curve:50,
    drive:50,
    col:2,
    tablet:2,
    phone:4,
    id:null,
    active:true,
    index:0
  },
  reverb:{
    type:'reverb',
    effectLevel:66,
    effectLevelMode:'blend',
    active:true,
    col:2,
    tablet:2,
    phone:4,
    highCut:22050,
    lowCut:20,
    id:null,
    reverbType:'hall',
    index:1
  },
  eq:{
    type:'eq',
    effectLevelMode:'none',
    id:null,
    eq80:24,
    eq350:22,
    eq720:21,
    eq16k:-14,
    eq5k:-20,
    eq10k:0,
    active:true,
    col:2,
    tablet:3,
    phone:4,
    index:2
  },
  delay:{
    type:'delay',
    id:null,
    delayTime:1,
    feedback:15,
    effectLevel:15,
    effectLevelMode:'wet',
    active:true,
    col:2,
    tablet:2,
    phone:4,
    index:3
  },
  compressor:{
    type:'compressor',
    effectLevelMode:'none',
    id:null,
    threshold:-50,
    knee:8,
    ratio:10,
    attack:0.1,
    release:0.1,
    active:true,
    col:2,
    tablet:3,
    phone:4,
    index:4
  },
  filter:{
    type:'filter',
    filterType:'lowshelf',
    effectLevelMode:'none',
    frequency:500,
    Q:10,
    gain:100,
    col:2,
    tablet:2,
    phone:4,
    id:null,
    index:null,
    active:true
  },
  chorus:{
    type:'chorus',
    effectLevelMode:'none',
    rate:1.5,
    feedback:0.2,
    delay:0.0045,
    col:2,
    tablet:2,
    phone:4,
    id:null,
    index:null,
    active:true
  },
  phaser:{
    type:'phaser',
    effectLevelMode:'none',
    rate: 1.2,                     //0.01 to 8 is a decent range, but higher values are possible
    depth: 0.3,                    //0 to 1
    feedback: 0.2,                 //0 to 1+
    stereoPhase: 30,               //0 to 180
    baseModulationFrequency: 700,  //500 to 1500
    col:2,
    tablet:3,
    phone:4,
    id:null,
    index:null,
    active:true
  },
  tremolo:{
    type:'tremolo',
    effectLevelMode:'none',
    intensity: 0.3,    //0 to 1
    rate: 4,         //0.001 to 8
    stereoPhase: 0,    //0 to 180
    col:2,
    tablet:2,
    phone:4,
    id:null,
    index:null,
    active:true
  },
  wahwah:{
    type:'wahwah',
    effectLevelMode:'none',
    automode: true,                //true/false
    baseFrequency: 0.5,            //0 to 1
    excursionOctaves: 2,           //1 to 6
    sweep: 0.2,                    //0 to 1
    resonance: 10,                 //1 to 100
    sensitivity: 0.5,              //-1 to 1
    col:2,
    tablet:3,
    phone:4,
    id:null,
    index:null,
    active:true
  },
  bitcrusher:{
    type:'bitcrusher',
    effectLevelMode:'none',
    bits: 4,          //1 to 16
    normfreq: 0.1,    //0 to 1
    bufferSize: 4096,  //256 to 16384
    col:2,
    tablet:2,
    phone:4,
    id:null,
    index:null,
    active:true
  },
  moogfilter:{
    type:'moogfilter',
    effectLevelMode:'none',
    cutoff: 0.065,    //0 to 1
    resonance: 3.5,   //0 to 4
    bufferSize: 4096,  //256 to 16384
    col:2,
    tablet:2,
    phone:4,
    id:null,
    index:null,
    active:true
  },
  pingpongdelay:{
    type:'pingpongdelay',
    effectLevelMode:'none',
    wetLevel: 0.5, //0 to 1
    feedback: 0.3, //0 to 1
    delayTimeLeft: 150, //1 to 10000 (milliseconds)
    delayTimeRight: 200, //1 to 10000 (milliseconds)
    col:2,
    tablet:2,
    phone:4,
    id:null,
    index:null,
    active:true
  }
}

/**
* Convert Note Number to Frequency
*/
export const convertNoteFrequency = note => {
  return Math.pow(2, (note - 69) / 12) * 440;
};

/**
 * Equal power curve for audio cross fading
 */
export const equalPower = (val = 0, second = false) => {
  return Math.pow(0.5 * (1 + Math.cos(Math.PI * val) * (second ? 1 : -1)), 0.5);
};
/**
* Generate key object
*/
export const generateKey = (i, velocity = 0) => {
  return {
    id: i,
    note: generateKeyNote(i + 3),
    octave: generateKeyOctave(i + 3),
    freq: convertNoteFrequency(i),
    active:false,
    velocity
  };
};
/**
 * Generate keys for oscillator bank
 */
export const generateKeys = (startPoint = 0, numKeys = 88) => {
  const keys = {};
  for (let i = startPoint; i < startPoint + numKeys; i++) {
    const key = generateKey(i);
    keys[key.id] = key;
  }
  return keys;
};
/**
* Return Key note in plain english (i.e. C#)
*/
const generateKeyNote = i => {
  return octave[(i + 9) % 12];
};
/**
* Generate octave # for key
*/
const generateKeyOctave = i => {
  return Math.floor((i + 9) / 12);
};
/**
 * Get Window Audio Context
 */
export const getContext = () => {
  window.AudioContext =
    window.AudioContext ||
    window.webkitAudioContext ||
    window.mozAudioContext ||
    window.oAudioContext;
  const context = new AudioContext();
  return context;
};
/**
 * Fetch Impulse Response from server
 */
export const getImpulseResponse = async (settings, effect, context) => {
  // Make sure we received a url to fetch
  if (!settings.irUrl.value) {
    // No url so just clear the IR
    settings.irUrl.value = null;
    settings.effectLevel = 0;
    effect.buffer = null;
  } else {
    // Received url so we will have to fetch
    // Get the IR file from the server
    const response = await fetch(settings.irUrl.value);
    const audioData = await response.arrayBuffer();
    context.decodeAudioData(audioData, buffer => {
      const source = context.createBufferSource();
      source.buffer = buffer;
      effect.buffer = buffer;
    });
  }
};
/**
 * Gets next index in arpeggiator note array based on
 * current - current index
 * previous - previous index
 * length - length of array
 * mode - arpeggiator direction (up, down, upDown)
 */
export const getNextIndex = (current, previous, length, mode) => {
  switch (mode) {
    case 'down':
      if (current - 1 >= 0) {
        return current - 1;
      } else {
        return length - 1;
      }
    case 'up':
      if (current + 1 < length) {
        return current + 1;
      } else {
        return 0;
      }
    case 'upDown':
      if (previous < current) {
        if (current + 1 < length) {
          return current + 1;
        } else {
          return current - 1;
        }
      } else {
        if (current - 1 >= 0) {
          return current - 1;
        } else {
          return current + 1;
        }
      }
  }
};
