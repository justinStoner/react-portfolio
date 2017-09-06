import React, {Component} from 'react';
import {Grid, Cell} from 'react-mdl';
import './sequencer.css';
import {Knob} from '../Knob';
import {Compressor} from '../Compressor';
function generateTH(notePlaying){
  var arr=[];
  for(var i=0;i<16;i++){
    arr.push(
      <td key={i}>
        <div className={`${notePlaying-1==i?'mdl-color--blue-300':'mdl-color--grey-400'} indicator`}></div>
      </td>
    )
  }
  return arr;
}
function generateTD(drum, service, index, toggleNote){
  var arr=[];
  for(var i=0;i<16;i++){
    arr.push(<td key={i} style={tdStyle} key={`${index} ${i}`} data-sample={`${index}`} data-noteindex={`${i}`} className={`${service.scheduled[index][i]?'mdl-color--blue-500':'mdl-color--green-A400'}`} onClick={toggleNote}></td>)
  }
  return arr;
}
const theadStyle={
  borderBottom:'0'
}
const thStyle={
  width:'5.88%'
}
const tdLabelStyle={
  width:'5.88%',
  cursor:'pointer',
  height:'36px'
}
const tdStyle={
  width:'5.88%',
  borderLeft:'1px solid #fff',
  borderBottom:'1px solid #fff',
  minHeight:'36px',
  cursor:'pointer'
}
const tableStyle={
  width:'100%'
}
export class Sequencer extends React.Component{
  constructor(props){
    super(props);
    console.log(this.props);
    this.state={
      volume:85,
      playing:this.props.service.playing,
      notePlaying:-1,
      mixer:false
    }
    this.props.service.loadInit(this.props.context, this.props.audio, this.props.tempo, this.setState.bind(this));
    this.onChange=this.onChange.bind(this);
    this.toggleDrums=this.toggleDrums.bind(this);
    this.toggleNote=this.toggleNote.bind(this);
    this.playSample=this.playSample.bind(this);
    this.toggleMixer=this.toggleMixer.bind(this);
  }
  onChange(key, value, index){
    switch (key) {
      case 'volume':

        break;
      case 'tempo':

        break;
      case 'pitch':

        break;
      case 'high':

        break;
      case 'highFreq':

        break;
      case 'mid':

        break;
      case 'midFreq':

        break;
      case 'low':

        break;
      case 'lowFreq':

        break;
      case 'reverbLevel':

        break;
      case 'cutoff':

        break;
      case 'Q':

        break;
      default:

    }
  }
  toggleDrums(){
    this.props.service.handlePlay();
    this.setState({playing:!this.state.playing});
  }
  toggleNote(e){
    this.props.service.addNote(e)
  }
  toggleMixer(){
    this.setState({mixer:!this.state.mixer});
  }
  playSample(e){
    this.props.service.playSample(e.target.getAttribute('data-index'));
  }
  render(){
    return(
      <Grid>
        <Cell col={12} className="mdl-color--blue-500 mdl-shadow--2dp">
          <Grid>
            <Cell col={2}>
                <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-color-text--green-A400 mdl-color--grey-200" onClick={this.toggleDrums}>
                  {
                    this.state.playing?
                      (<i className="material-icons mdl-color-text--red-500">stop</i>) :
                      (<i className="material-icons mdl-color-text--green-A400" >play_arrow</i>)
                  }
                </button>
                <button className={`mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect ${!this.state.mixer?'mdl-color-text--grey-400':'mdl-color-text--green-A400'} mdl-color--grey-200`} onClick={this.toggleMixer}>
                  <i className="material-icons">equalizer</i>
                </button>
            </Cell>
            <Cell col={1}>
              <p className="effect-label mdl-color-text--white">Volume</p>
              <Knob value={this.state.volume} type="radial" min={0} max={100} step={1} onChange={this.onChange} propName="volume" color="green"/>
            </Cell>
            <Cell col={2} className="mdl-color-text--white">
              <p className="effect-label">Tempo</p>
              <Knob value={this.props.tempo} type="radial" min={1} max={240} step={0.2} onChange={this.onChange} propName="tempo" color="green"/>
            </Cell>
          </Grid>
        </Cell>
        <Cell col={12}>
          {
            !this.state.mixer ?
                <table className="striped" style={tableStyle}>
                  <thead style={theadStyle}>
                    <tr>
                      <td style={thStyle}></td>
                      {generateTH(this.props.service.notePlaying)}
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.props.service.drums.map((drum, index)=>{
                        return (
                          <tr key={drum.name}>
                            <td style={tdLabelStyle} className="mdl-color-text--blue-500" data-index={index} onClick={this.playSample}>{drum.name}</td>
                            {generateTD(drum, this.props.service, index, this.toggleNote)}
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
                :
                <ul>
                  {
                    this.props.service.drums.map((drum, index)=>{
                      return (
                        <li key={index} className='mixer-item'>
                          <div className="input-field inline no-top-margin">
                            <p className="effect-label">Volume</p>
                            <Knob value={drum.volume} type="radial" min={0} max={100} step={1} onChange={this.onChange} propName="volume" index={index}/>
                          </div>
                          <div className="input-field inline no-top-margin">
                            <p className="effect-label">Pitch</p>
                            <Knob value={drum.pitch} type="radial" min={0} max={100} step={1} onChange={this.onChange} propName="pitch" index={index}/>
                          </div>
                          <div className="input-field inline no-top-margin">
                            <p className="effect-label">High</p>
                            <Knob value={drum.high} type="radial" min={0} max={80} step={1} onChange={this.onChange} propName="high" index={index}/>
                          </div>
                          <div className="input-field inline no-top-margin">
                            <p className="effect-label">High Freq</p>
                            <Knob value={drum.highFreq} type="radial" min={drum.range.high[0]} max={drum.range.high[1]} step={1} onChange={this.onChange} propName="highFreq" index={index}/>
                          </div>
                          <div className="input-field inline no-top-margin">
                            <p className="effect-label">Mid</p>
                            <Knob value={drum.mid} type="radial" min={0} max={80} step={1} onChange={this.onChange} propName="mid" index={index}/>
                          </div>
                          <div className="input-field inline no-top-margin">
                            <p className="effect-label">Mid Freq</p>
                            <Knob value={drum.midFreq} type="radial" min={drum.range.mid[0]} max={drum.range.mid[1]} step={1} onChange={this.onChange} propName="midFreq" index={index}/>
                          </div>
                          <div className="input-field inline no-top-margin">
                            <p className="effect-label">Low</p>
                            <Knob value={drum.low} type="radial" min={0} max={80} step={1} onChange={this.onChange} propName="low" index={index}/>
                          </div>
                          <div className="input-field inline no-top-margin">
                            <p className="effect-label">Low Freq</p>
                            <Knob value={drum.lowFreq} type="radial" min={drum.range.low[0]} max={drum.range.low[1]} step={1} onChange={this.onChange} propName="lowFreq" index={index}/>
                          </div>
                          <div className="input-field inline no-top-margin">
                            <p className="effect-label">Reverb</p>
                            <Knob value={drum.reverbLevel} type="radial" min={0} max={100} step={1} onChange={this.onChange} propName="reverbLevel" index={index}/>
                          </div>
                          <div className="input-field inline no-top-margin">
                            <p className="effect-label">Cutoff</p>
                            <Knob value={drum.cutoff} type="radial" min={0} max={200} step={1} onChange={this.onChange} propName="cutoff" index={index}/>
                          </div>
                          <div className="input-field inline no-top-margin">
                            <p className="effect-label">Q</p>
                            <Knob value={drum.Q} type="radial" min={0} max={20} step={1} onChange={this.onChange} propName="Q" index={index}/>
                          </div>
                          <div className="input-field inline no-top-margin">
                            <p className="effect-label">Filter Type</p>
                              <select name="filterType" id="" className="browser-default" value={drum.filterType} onChange={this.onChange} data-index={index}>
                                <option value="lowpass">lowpass</option>
                                <option value="highpass">highpass</option>
                                <option value="bandpass">bandpass</option>
                                <option value="lowshelf">lowshelf</option>
                                <option value="highshelf">highshelf</option>
                                <option value="peaking">peaking</option>
                                <option value="notch">notch</option>
                                <option value="allpass">allpass</option>
                              </select>
                          </div>
                        </li>
                      )
                    })
                  }
                </ul>
          }
        </Cell>

      </Grid>
    )
  }
}

// <Cell col={6}>
//   <Compressor audio={this.props.context} input={this.props.service.effectsIn} output={this.props.service.effectsOut} preset={{
//     type:'compressor',
//     id:'',
//     threshold:-20,
//     knee:20,
//     ratio:5,
//     attack:0.1,
//     release:0.1,
//     active:false,
//     col:2
//   }}/>
// </Cell>
