import React, { Component } from 'react';
import {Layout, Header, Textfield, Drawer, Navigation, Content} from 'react-mdl';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

import {Synth} from '../Synth';
import {Sequencer} from '../Sequencer';
import {About} from '../About';
import { Crypto } from '../Crypto';
import { MaterialShadowsSvg } from './material-shadows-svg';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getContext } from '../../selectors';
import { AudioBus } from '../AudioBus';
import SynthAudio from '../AudioBus/SynthAudio';
import DrumsAudio from '../AudioBus/DrumsAudio';
import { DrumService } from '../../services/drum-service';
//import { actionCreators } from 'react-redux-webaudio';
let drumService = new DrumService();
var testExp = new RegExp('Android|webOS|iPhone|iPad|' + 'BlackBerry|Windows Phone|'  + 'Opera Mini|IEMobile|Mobile' , 'i');
const isMobile=testExp.test(navigator.userAgent);
//material design svg shadow filters: https://codepen.io/hanger/pen/yOGvQp
let synthMounted=false;
const mountSynth=()=>{
  synthMounted=true;
}
const App=({playing, context})=>{
  let analyser=context.createAnalyser();
  let synthAudio={
    analyser:context.createAnalyser(),
    input:context.createGain(),
    effectsIn:context.createGain(),
    effectsOut:context.createGain(),
    delay:context.createGain(),
    eq:context.createGain(),
    compressor:context.createGain()
  }
  let drumsAudio={
    input:context.createGain(),
    analyser:context.createAnalyser()
  }
  //<img src="images/me1.jpg" width="64" height="64" style={{borderRadius:'50px', cursor:'pointer'}} alt=""></img>
  return (

        <BrowserRouter>
          <Layout fixedHeader fixedDrawer style={{background:'#e0e0e0'}}>
            <AudioBus synth={synthAudio} drums={drumsAudio} analyser={analyser} context={context} />
            <SynthAudio audio={synthAudio} />
            <DrumsAudio audio={drumsAudio} />
            <Route exact path="/" render={(props)=>(
                <Header title="About" className="mdl-color--blue-500"></Header>
              )}/>
            <Route path="/synth" render={(props)=>(
                <Header title="Synth" className="mdl-color--blue-500">

                </Header>
              )}/>
            <Route path="/sequencer" render={(props)=>(
                <Header title="Sequencer" className="mdl-color--blue-500"></Header>
              )}/>
            <Route path="/crypto" render={(props)=>(
                  <Header title="Crypto Market Data" className="mdl-color--blue-500"></Header>
                )}/>
            <Drawer>
            <div className="header">
              <div className="profile">

                <a className="mdl-navigation__link" id="settings" style={{color:'#fff', cursor:'pointer'}}>
                  <i className="material-icons" style={{fontSize:'32px', marginRight:'0px'}}>info</i>
                </a>

                <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect top-menu"
                    data-mdl-for="settings">
                  <li className="mdl-menu__item" ><a href="https://www.linkedin.com/in/justin-stoner-95160487" target="_blank">LinkedIn</a></li>
                  <li className="mdl-menu__item"><a href="justin-stoner-resume.pdf" target="_blank">Resume</a></li>
                  <li className="mdl-menu__item"><a href="mailto:justin-stoner-resume.pdf" target="_blank">Contact</a></li>
                </ul>
              </div>
              <a className="mdl-navigation__link">
                <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-color-text--green-A400 mdl-color--grey-200">
                  {
                    !playing?
                      (<i className="material-icons mdl-color-text--red-500">stop</i>) :
                      (<i className="material-icons mdl-color-text--green-A400" >play_arrow</i>)
                  }
                </button>
              </a>
              <p className="name">Justin Stoner</p>
              <p className="email">justin@heyjust.in</p>
            </div>
                <Navigation>
                    <Link to="/">About</Link>
                    <Link to="/synth">Synth</Link>
                    <Link to="/sequencer">Sequencer</Link>
                    <Link to="/crypto">Crypto Market Data</Link>
                </Navigation>
            </Drawer>
            <Content>
              <Route exact path="/" component={About}/>
              <Route path="/synth" render={(props)=>(
                <Synth tempo={120} audio={synthAudio} hasMounted={synthMounted} mount={mountSynth} />
                )}/>
              <Route path="/sequencer" render={(props)=>(
                  <Sequencer tempo={120} audio={drumsAudio} service={drumService} context={context}/>
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
  tempo:PropTypes.number,
  playing:PropTypes.bool,
  context:PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  context: getContext(state)
});

export default connect(mapStateToProps, null)(App);
