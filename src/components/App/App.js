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
import AudioBus from '../AudioBus';
import NavDrawer from '../Nav/NavDrawer';
import { changeTempo } from '../../actions';
import { ErrorBoundary } from '../Errors'
//import { actionCreators } from 'react-redux-webaudio';
var testExp = new RegExp('Android|webOS|iPhone|iPad|' + 'BlackBerry|Windows Phone|'  + 'Opera Mini|IEMobile|Mobile' , 'i');
window.isMobile=testExp.test(navigator.userAgent);
//material design svg shadow filters: https://codepen.io/hanger/pen/yOGvQp
let synthMounted=false;
const mountSynth=()=>{
  synthMounted=true;
}
const App=({playing, context, tempo, updateTempo})=>{
  return (
        <ErrorBoundary>
          <BrowserRouter>
            <Layout fixedHeader fixedDrawer style={{background:'#e0e0e0'}}>
              <AudioBus/>
              <SynthAudio/>
              <SequencerAudio/>
              <Route children={(match)=>(
                  <Header title={match.location.pathname == '/' ? 'About' : match.location.pathname.replace('/', '').charAt(0).toUpperCase() + match.location.pathname.slice(2)} className="mdl-color--blue-500">
                    {
                      (match.location.pathname.indexOf('synth') > -1  || match.location.pathname.indexOf('sequencer') > -1)
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
                    <SynthUI/>
                  )}/>
                <Route path="/sequencer" render={(props)=>(
                    <SequencerUI/>
                  )}/>
                <Route path="/crypto" render={(props)=>(
                    <Crypto />
                  )}/>
              </Content>
              <MaterialShadowsSvg/>
            </Layout>
          </BrowserRouter>
        </ErrorBoundary>
  );
}
App.propTypes = {
  tempo:PropTypes.number
};

const mapStateToProps = state => ({
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
