import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as Tuna from "tunajs";
import PropTypes from 'prop-types';

class OverdriveAudio extends Component{
  constructor(props){
    super(props)
    this.tuna = new Tuna(this.props.audio)
  }
  componentWillMount(){
    const effect=this.props.effects[this.props.parent][this.props.id];

    this.drive = new this.tuna.Overdrive({
        outputGain: effect.amount/100,         //0 to 1+
        drive: effect.amount/100,              //0 to 1
        curveAmount: effect.amount/100,          //0 to 1
        algorithmIndex: effect.mode,       //0 to 5, selects one of our drive algorithms
        bypass: !effect.active
    });

      this.props.input.connect(this.drive);
      this.drive.connect(this.props.output)
  }
  componentWillReceiveProps(nextProps){
    //const active=this.props.effects[this.props.parent][this.props.id].active;
    const nextActive=nextProps.effects[nextProps.parent][nextProps.id].active;
    const effect=this.props.effects[this.props.parent][this.props.id];
    //console.log(active, nextActive);
    if(effect.active != nextActive){
      this.drive.bypass = !nextActive;
    }
  }
  render(){
    const effect=this.props.effects[this.props.parent][this.props.id];
    this.drive.outputGain = effect.amount/100
    this.drive.drive = effect.amount/100
    this.drive.curveAmount = effect.amount/100
    this.drive.algorithmIndex = effect.mode
    return null
  }
}

OverdriveAudio.propTypes={
  effects: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  effects:state.effects

});


export default connect(mapStateToProps, undefined)(OverdriveAudio)
