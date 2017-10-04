import { getContext } from '../utils/audio'

const context=getContext()

const initialState={
  synth:{
    analyser:context.createAnalyser(),
    input:context.createGain(),
    effectsIn:context.createGain(),
    effectsOut:context.createGain()
  },
  sequencer:{
    analyser:context.createAnalyser(),
    input:context.createGain(),
    sideChainOutput:context.createGain(),
    effectsIn:context.createGain(),
    effectsOut:context.createGain()
  },
  analyser:context.createAnalyser(),
  context:context
}
const audio = (state = initialState, action) => {
  return state
}

export default audio
