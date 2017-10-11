import React, { Component } from 'react';
import { Drawer, Navigation } from 'react-mdl';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleDrums } from '../../actions';
import { Route } from 'react-router-dom';
import './NavDrawer.css';
import me1 from '../../assets/images/me1.jpg';

class NavDrawer extends Component{
  constructor(props){
    super(props)
    this.toggleDrums=this.toggleDrums.bind(this)
  }
  render(){
    return (
      <Drawer>
        <div className="header">
          <div className="profile">
            <img src={me1} width="64" height="64" style={{borderRadius:'50px', cursor:'pointer'}} alt=""></img>
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
            <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-color-text--green-A400 mdl-color--grey-200" onClick={()=>{this.toggleDrums(this.props.playing)}}>
              {
                this.props.playing?
                  (<i className="material-icons mdl-color-text--red-500">stop</i>) :
                  (<i className="material-icons mdl-color-text--green-A400" >play_arrow</i>)
              }
            </button>
          </a>
          <p className="name">Justin Stoner</p>
          <p className="email">justin@heyjust.in</p>
        </div>
        <Navigation>
            <Link to="/" className={this.props.location == '/' ? 'active' : ''}>About</Link>
            <Link to="/synth" className={this.props.location == '/synth' ? 'active' : ''}>Synth</Link>
            <Link to="/sequencer" className={this.props.location == '/sequencer' ? 'active' : ''}>Sequencer</Link>
            <Link to="/crypto" className={this.props.location == '/crypto' ? 'active' : ''}>Crypto Market Data</Link>
        </Navigation>
      </Drawer>
    )
  }
  toggleDrums(playing){
    this.props.toggleDrums(playing)
  }
}
NavDrawer.propTypes = {
  playing:PropTypes.bool
};

const mapStateToProps = state => ({
  playing: state.playing
});

const mapDispatchToProps = dispatch =>{
  return {
    toggleDrums: ( playing ) => {
      dispatch(toggleDrums( playing ))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavDrawer);
