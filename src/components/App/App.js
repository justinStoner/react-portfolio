import React, { Component } from 'react';
import {Layout, Header, Textfield, Navigation, Content } from 'react-mdl';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

import { SynthUI, SynthAudio } from '../Synth';
import { SequencerUI, SequencerAudio } from '../Sequencer';
import {About} from '../About';
import { Crypto } from '../Crypto';
import { MaterialShadowsSvg } from './material-shadows-svg';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getContext } from '../../selectors';
import { AudioBus } from '../AudioBus';
import NavDrawer from '../Nav/NavDrawer';
import { changeTempo } from '../../actions'
//import { actionCreators } from 'react-redux-webaudio';
var testExp = new RegExp('Android|webOS|iPhone|iPad|' + 'BlackBerry|Windows Phone|'  + 'Opera Mini|IEMobile|Mobile' , 'i');
window.isMobile=testExp.test(navigator.userAgent);
//material design svg shadow filters: https://codepen.io/hanger/pen/yOGvQp
let synthMounted=false;
const mountSynth=()=>{
  synthMounted=true;
}
const App=({playing, context, tempo, updateTempo})=>{
  let analyser=context.createAnalyser();
  let synthAudio={
    analyser:context.createAnalyser(),
    input:context.createGain(),
    effectsIn:context.createGain(),
    effectsOut:context.createGain()
  }
  let drumsAudio={
    analyser:context.createAnalyser(),
    input:context.createGain(),
    analyser:context.createAnalyser(),
    sideChainOutput:context.createGain()
  }
  console.log(drumsAudio.sideChainOutput);

  return (

        <BrowserRouter>
          <Layout fixedHeader fixedDrawer style={{background:'#e0e0e0'}}>
            <AudioBus synth={synthAudio} drums={drumsAudio} analyser={analyser} context={context} />
            <SynthAudio audio={synthAudio} sideChainIn={drumsAudio.sideChainOutput}/>
            <SequencerAudio audio={drumsAudio} />
            <Route children={(match)=>(
                <Header title={match.location.pathname == '/' ? 'About' : match.location.pathname.replace('/', '').replace('/', '').charAt(0).toUpperCase() + match.location.pathname.slice(2)} className="mdl-color--blue-500">
                  {
                    (match.location.pathname == '/synth' || match.location.pathname == '/sequencer')
                    ?
                    <div>
                      <span style={{paddingRight:'8px'}}>Tempo</span>
                      <Textfield
                          onChange={(e) => {updateTempo(e.target.value)}}
                          pattern="-?[0-9]*(\.[0-9]+)?"
                          error="number"
                          label="Tempo"
                          value={tempo}
                          className='nav-input'
                          style={{maxWidth:'45px'}}
                      />
                    </div>
                    :
                    null
                  }
                </Header>
              )}/>

            <Route children={(match) => (
                <NavDrawer location={match.location.pathname}/>
              )} />
            <Content>
              <Route exact path="/" component={About}/>
              <Route path="/synth" render={(props)=>(
                  <SynthUI audio={synthAudio} hasMounted={synthMounted} mount={mountSynth} />
                )}/>
              <Route path="/sequencer" render={(props)=>(
                  <SequencerUI audio={drumsAudio} context={context}/>
                )}/>
              <Route path="/crypto" render={(props)=>(
                  <Crypto />
                )}/>
            </Content>
            <MaterialShadowsSvg/>
          </Layout>
        </BrowserRouter>
  );
}
App.propTypes = {
  context:PropTypes.object.isRequired,
  tempo:PropTypes.number
};

const mapStateToProps = state => ({
  context: getContext(state),
  tempo:state.tempo
});

const mapDispatchToProps = dispatch =>{
  return {
    updateTempo: ( tempo ) => {
      dispatch(changeTempo( tempo ))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
