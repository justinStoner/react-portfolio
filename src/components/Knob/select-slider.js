import React from 'react';


//modified from: https://github.com/andrejewski/angle-input/blob/master/dist/angle-input.react.js
//https://github.com/eskimoblood/jim-knopf/blob/master/dist/knob.js
//https://github.com/brigade/react-simple-pie-chart/blob/master/src/pie_chart.jsx

var r = React.createElement;
const waves=['sine', 'saw', 'sqr', 'tri'];
const waveTypes=['sine', 'sawtooth', 'square', 'triangle'];
const size=75;
const center=size/2;
const radCircumference = Math.PI * 2;
const radius = center - 1; // padding to prevent clipping
function degToPercent(value, min, max){
  var val=(value - 0) * (100 - 0) / (360 - 0) + 0;
  console.log(value, val);
  return val/100;
}
function renderPaths(slices) {
  const total = slices.reduce((totalValue, { value }) => totalValue + value, 0);

  let radSegment = 0;
  let lastX = radius;
  let lastY = 0;

  return slices.map(({ color, value }, index) => {

    const valuePercentage = value / total;

    // Should the arc go the long way round?
    const longArc = (valuePercentage <= 0.5) ? 0 : 1;

    radSegment += valuePercentage * radCircumference;
    const nextX = Math.cos(radSegment) * radius;
    const nextY = Math.sin(radSegment) * radius;

    // d is a string that describes the path of the slice.
    // The weirdly placed minus signs [eg, (-(lastY))] are due to the fact
    // that our calculations are for a graph with positive Y values going up,
    // but on the screen positive Y values go down.
    const d = [
      `M ${center},${center}`,
      `l ${lastX},${-lastY}`,
      `a${radius},${radius}`,
      '0',
      `${longArc},0`,
      `${nextX - lastX},${-(nextY - lastY)}`,
      'z',
    ].join(' ');

    lastX = nextX;
    lastY = nextY;

    return <path d={d} fill={color} key={index} stroke="#868686"/>;
  });
}
var rad = function(a) {
  return Math.PI * a / 180
}
var rx = function(r, a, c=34.5) {
  return c + r * Math.cos(rad(a))
}
var ry = function(r, a, c=34.5) {
  return c + r * Math.sin(rad(a))
}
function radToDeg(rad) {
  return rad * (180/Math.PI);
}

function getCenter(element) {
  var rect = element.getBoundingClientRect();
  return [
    rect.left + (rect.width / 2),
    rect.top + (rect.height / 2),
  ];
}

function angle(vector, element) {
  var center = getCenter(element);
  var x = vector[0] - center[0];
  var y = vector[1] - center[1];
  var deg = radToDeg(Math.atan2(y, x));
  deg -= 90;
  if(deg < 0) deg += 360;
  return deg;
}

var $all = document.body
const SelectSlider = React.createClass({
  displayName: 'AngleInput',
  propTypes: {
    defaultValue: React.PropTypes.number,
    max: React.PropTypes.number,
    min: React.PropTypes.number,
    step: React.PropTypes.number,
    onChange: React.PropTypes.func,
    onInput: React.PropTypes.func,

    className: React.PropTypes.string,
    pivotClassName: React.PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      defaultValue: 0,
      max: 360,
      min: 0,
      step: 1,

      className: 'angle-input',
      pivotClassName: 'angle-input-pivot',
    }
  },
  getInitialState: function() {
    return {value: this.valueToDegree(this.props.defaultValue) || 0, displayValue:this.props.defaultValue};
  },
  beginKeyboardInput: function() {
    $all.addEventListener('keydown', this._onKeyDown, false);
    //this.refs.container.click();
    this.keyboardInput = true;
  },
  endKeyboardInput: function() {
    $all.removeEventListener('keydown', this._onKeyDown, false);
    this.keyboardInput = false;
  },
  _onKeyDown: function(e) {
    //console.log('down');
    var max = this.props.max;
    var min = this.props.min;
    var step = this.props.step || 1;

    var LEFT_ARROW  = 37;
    var UP_ARROW    = 38;
    var RIGHT_ARROW = 39;
    var DOWN_ARROW  = 40;

    var val=this.state.displayValue;
    console.log(e);
    switch(e.keyCode) {
      case UP_ARROW:
      case RIGHT_ARROW:
        val--;
        break;
      case DOWN_ARROW:
      case LEFT_ARROW:
        val++;
        break;
      case 13:
        this.props.toggleInput();
        break;
    }
    if(val > 3) val = 0
    if(val < 0) val = 3;
    e.preventDefault();
    if(e.keyCode != 13){
      this.setState({displayValue: val});
      this.props.onChange(this.props.propName, waveTypes[val], this.props.index || 0);
    }
  },
  _handleWheelEvents: function(e) {
    e.preventDefault();
    var val=this.state.displayValue+1;
    if(val>3) val = 0;
    this.setState({displayValue:val});
    this.props.onChange(this.props.propName, waveTypes[val], this.props.index || 0);

  },
  selectItem(e){
    var val=e.target.getAttribute('data-value');
    this.setState({displayValue:val});
    this.props.onChange(this.props.propName, waveTypes[val], this.props.index || 0);
    this.props.toggleInput();
  },
  componentDidMount: function() {
  //  $all.addEventListener('mousemove', this._onMouseMove, false);
    $all.addEventListener('mouseup', this._onMouseUp, false);
    $all.addEventListener('mousewheel', this._handleWheelEvents, false);
    $all.addEventListener('DOMMouseScroll', this._handleWheelEvents, false);
    this.beginKeyboardInput();
    //this.refs.input.focus();
    this.tracking = true;
  },
  componentWillUnmount: function() {
    //$all.removeEventListener('mousemove', this._onMouseMove, false);
    $all.removeEventListener('mouseup', this._onMouseUp, false);
    $all.removeEventListener('mousewheel', this._handleWheelEvents, false);
    $all.removeEventListener('DOMMouseScroll', this._handleWheelEvents, false);
    this.endKeyboardInput();
    this.tracking = false;
  },
  _onMouseDown: function(e) {
    //this.beginTracking();
  },
  _onMouseMove: function(e) {
    //this.updateWithEvent(e, true);
  },
  _onMouseUp: function(e) {
    //this.updateWithEvent(e, true);
    //this.endTracking();
  },
  degreeToValue:function(value){
    var displayValue=(value - this.props.min) * (this.props.maxRange - this.props.minRange) / (this.props.max - this.props.min) + this.props.min;
    if(this.props.step===1){
      displayValue=Math.round(displayValue);
    }else{
      displayValue=Math.round10(displayValue, -1);
    }
    return displayValue;
  },
  valueToDegree(value){
    var degrees=(value - this.props.minRange) * (this.props.max - this.props.min) / (this.props.maxRange - this.props.minRange) + this.props.minRange;
    return degrees;
  },
  componentWillMount: function(){
    this.selectItem=this.selectItem.bind(this);
  },

  //<rect x={`${(size/2)-2.5}`} y="1" width="5" height={`${(size/2)}`} className="pointer"
  //  transform={`rotate(${94+degToPercent(this.state.value)*240} ${center} ${center})`} fill='#616161' rx="0" ry="2"></rect>

  render:function(){
    var x,y
    return(
      <div className="svg-holder" ref="container" tabIndex="0" >
        <svg viewBox={`0 0 ${size} ${size}`} filter="url(#shadow-4dp)">
          <g transform={`rotate(0 ${center} ${center})`} >
            {renderPaths([{color:this.props.defaultValue==0?'#ddd':'#fff', value:25},{color:this.props.defaultValue==1?'#ddd':'#fff', value:25},
            {color:this.props.defaultValue==2?'#ddd':'#fff', value:25}, {color:this.props.defaultValue==3?'#ddd':'#fff', value:25}])}
            {
              waves.map((wave, index)=>{
                switch (index) {
                  case 1:
                    x=center/2;
                    y=center-center/4;
                    break;
                  case 0:
                    x=center+center/2;
                    y=center-center/4;
                    break;
                  case 2:
                    x=center/2;
                    y=center+center/2;
                    break;
                  case 3:
                    x=center+center/2;
                    y=center+center/2;
                    break;
                  default:

                }
                return(
                  <text key={index} fill={this.props.defaultValue==index?'#2196f3':'rgba(0,0,0,0.87)'} transform={`translate (${x} ${y})`} data-value={index} onClick={this.selectItem}>{wave}</text>
                )
              })
            }
          </g>
        </svg>
      </div>
    )
  }
})


export default SelectSlider;
