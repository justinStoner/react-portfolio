const initialState={
  drums:{
    'Roland_TR-33_Kick':{name:'Roland_TR-33_Kick', type:'kick', displayName:'kick', volume:50, pitch:0, high:0, highFreq:3000, mid:0, midFreq:450, low:0,lowFreq:50,
    Q:10,  cutoff:200, filterType:'lowpass', reverbLevel:32},
    'Roland_TR-33_Snare':{name:'Roland_TR-33_Snare', type:'snare', displayName:'snare', volume:50, pitch:0, high:0, highFreq:3000, mid:0, midFreq:500, low:0,lowFreq:150,
    Q:10,  cutoff:200, filterType:'lowpass', reverbLevel:32},
    'Roland_TR-33_HH Op':{name:'Roland_TR-33_HH Op', type:'hh', displayName:'hh open', volume:50, pitch:0, high:0, highFreq:5000, mid:0, midFreq:500, low:0,lowFreq:200,
    Q:10,  cutoff:200, filterType:'lowpass', reverbLevel:32},
    'Roland_TR-33_HH Cl':{name:'Roland_TR-33_HH Cl', type:'hh', displayName:'hh close', volume:50, pitch:0, high:0, highFreq:5000, mid:0, midFreq:500, low:0,lowFreq:200,
    Q:10,  cutoff:200, filterType:'lowpass', reverbLevel:32},
    'Roland_TR-33_Tom Hi':{name:'Roland_TR-33_Tom Hi', type:'tom', displayName:'tom hi', volume:50, pitch:0, high:0, highFreq:5000, mid:0, midFreq:600, low:0,lowFreq:250,
    Q:10,  cutoff:200, filterType:'lowpass', reverbLevel:32},
    'Roland_TR-33_Tom Mi':{name:'Roland_TR-33_Tom Mi', type:'tom', displayName:'tom med', volume:50, pitch:0, high:0, highFreq:5000, mid:0, midFreq:600, low:0,lowFreq:250,
    Q:10,  cutoff:200, filterType:'lowpass', reverbLevel:32},
    'Roland_TR-33_Tom Lo':{name:'Roland_TR-33_Tom Lo', type:'tom', displayName:'tom low', volume:50, pitch:0, high:0, highFreq:5000, mid:0, midFreq:600, low:0,lowFreq:250,
    Q:10,  cutoff:200, filterType:'lowpass', reverbLevel:32},
    'Roland_TR-33_Bongo Hi':{name:'Roland_TR-33_Bongo Hi', type:'tom', displayName:'bongo hi', volume:50, pitch:0, high:0, highFreq:5000, mid:0, midFreq:600, low:0,lowFreq:250,
    Q:10,  cutoff:200, filterType:'lowpass', reverbLevel:32},
    'Roland_TR-33_Bongo Mi':{name:'Roland_TR-33_Bongo Mi', type:'tom', displayName:'bongo med', volume:50, pitch:0, high:0, highFreq:5000, mid:0, midFreq:600, low:0,lowFreq:250,
    Q:10,  cutoff:200, filterType:'lowpass', reverbLevel:32},
    'Roland_TR-33_Bongo Lo':{name:'Roland_TR-33_Bongo Lo', type:'tom', displayName:'bongo low', volume:50, pitch:0, high:0, highFreq:5000, mid:0, midFreq:600, low:0,lowFreq:250,
    Q:10,  cutoff:200, filterType:'lowpass', reverbLevel:32},
    'Roland_TR-33_Conga Hi':{name:'Roland_TR-33_Conga Hi', type:'tom', displayName:'conga hi', volume:50, pitch:0, high:0, highFreq:5000, mid:0, midFreq:600, low:0,lowFreq:250,
    Q:10,  cutoff:200, filterType:'lowpass', reverbLevel:32},
    'Roland_TR-33_Conga Mi':{name:'Roland_TR-33_Conga Mi', type:'tom', displayName:'conga med', volume:50, pitch:0, high:0, highFreq:5000, mid:0, midFreq:600, low:0,lowFreq:250,
    Q:10,  cutoff:200, filterType:'lowpass', reverbLevel:32},
    'Roland_TR-33_Conga Lo':{name:'Roland_TR-33_Conga Lo', type:'tom', displayName:'conga low', volume:50, pitch:0, high:0, highFreq:5000, mid:0, midFreq:600, low:0,lowFreq:250,
    Q:10,  cutoff:200, filterType:'lowpass', reverbLevel:32},
    'Roland_TR-33_Clave':{name:'Roland_TR-33_Clave', type:'tom', displayName:'clave', volume:50, pitch:0, high:0, highFreq:5000, mid:0, midFreq:600, low:0,lowFreq:250,
    Q:10,  cutoff:200, filterType:'lowpass', reverbLevel:32}
  },
  visualizerType:'waveform',
  loopLength:16,
  hasPlayed:false,
  volume:85,
  notePlaying:-1,
  rhythmIndex:0,
  eqFreqs:{
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
  },
  scheduled:[
    [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
    [false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, true, false, false, false, true, false, false, false, true, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
  ]
}
const sequencer = (state = initialState, action) => {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case "SCHEDULE_DRUM":
      newState.scheduled[action.payload.sampleIndex][action.payload.noteIndex] = !newState.scheduled[action.payload.sampleIndex][action.payload.noteIndex]
      return newState;
    case "MODIFY_DRUM":
      newState.drums[action.payload.index][action.payload.key] = action.payload.value
      return newState
    case 'CHANGE_VOLUME':
      newState.volume = action.payload
      return newState
    case 'UPDATE_SEQUENCER':
      newState[action.payload.key] = action.payload.value
      return newState
    default:
      return state
  }
}

export default sequencer
