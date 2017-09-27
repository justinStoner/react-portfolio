import React from 'react';


//modified from: https://github.com/andrejewski/angle-input/blob/master/dist/angle-input.react.js
//https://github.com/eskimoblood/jim-knopf/blob/master/dist/knob.js
//https://github.com/brigade/react-simple-pie-chart/blob/master/src/pie_chart.jsx

var r = React.createElement;
const size=75;
const center=size/2;
const radCircumference = Math.PI * 2;
const radius = center - 1; // padding to prevent clipping
function degToPercent(value, min, max){
  var val=(value - 0) * (100 - 0) / (360 - 0) + 0;
  //console.log(value, val);
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

    return <path d={d} fill={color} key={index}/>;
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
const RadialSlider = React.createClass({
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
  normalize: function(degree) {
    var max = this.props.max;
    var min = this.props.min;
    var step = this.props.step || 1;
    var n = Math.max(min, Math.min(degree, max));
    var s = n - (n % step);
    var high = Math.ceil(n / step);
    var low = Math.round(n / step);
    return high >= (n / step)
      ? (high * step == 360) ? 359 : (high * step)
      : low * step;
  },
  _onFocus: function(e) {
    this.beginKeyboardInput();
  },
  _onBlur: function(e) {
    this.endKeyboardInput();
  },
  _onKeyDown: function(e) {
    //console.log('down');
    var max = this.props.max;
    var min = this.props.min;
    var step = this.props.step || 1;
    var value = this.state.value;

    var LEFT_ARROW  = 37;
    var UP_ARROW    = 38;
    var RIGHT_ARROW = 39;
    var DOWN_ARROW  = 40;

    var dir = 0;
    //console.log(e);
    switch(e.keyCode) {
      case UP_ARROW:
      case RIGHT_ARROW:
        dir = 1;
        break;
      case DOWN_ARROW:
      case LEFT_ARROW:
        dir = -1;
        break;
      case 13:
        this.endTracking()
        this.props.toggleInput();
        break;
    }
    var val = value + (dir * step);
    if(val === max + 1) val = min;
    if(val === min - 1) val = max - 1;
    val = this.normalize(val);
    e.preventDefault();
    if(dir && e.keyCode !=13) {
      this.setState({value: val});
      if(this.props.onChange) {
        this.props.onChange(val);
      }
    }
  },
  _onMouseDown: function(e) {
    this.beginTracking();
  },
  _onMouseMove: function(e) {
    this.updateWithEvent(e, true);
  },
  _onMouseUp: function(e) {
    this.updateWithEvent(e, true);
    this.endTracking();
  },
  _handleWheelEvents: function(e) {
    e.preventDefault();
    var deltaX = -e.detail || e.wheelDeltaX;
    var deltaY = -e.detail || e.wheelDeltaY;
    var val = deltaX > 0 || deltaY > 0 ? 1 : deltaX < 0 || deltaY < 0 ? -1 : 0;
    if(val>0){
      if(val>359) val=359;
      val=this.state.value+this.props.step||1
      this.setState({value: val, displayValue:this.degreeToValue(val)})
    }else if(val<0){
      if(val < 0) val=0;
      val=this.state.value-this.props.step||1
      this.setState({value: val, displayValue:this.degreeToValue(val)})
    }
  },
  beginTracking: function() {
    $all.addEventListener('mousemove', this._onMouseMove, false);
    $all.addEventListener('mouseup', this._onMouseUp, false);

    $all.addEventListener('touchmove', this._onMouseMove, false);
    $all.addEventListener('touchend', this._onMouseUp, false);

    $all.addEventListener('mousewheel', this._handleWheelEvents, false);
    $all.addEventListener('DOMMouseScroll', this._handleWheelEvents, false);
    //this.beginKeyboardInput();
    if( !window.isMobile ) this.refs.input.focus();
    this.tracking = true;
  },
  endTracking: function() {
    $all.removeEventListener('mousemove', this._onMouseMove, false);
    $all.removeEventListener('mouseup', this._onMouseUp, false);

    $all.removeEventListener('touchmove', this._onMouseMove, false);
    $all.removeEventListener('touchend', this._onMouseUp, false);


    $all.removeEventListener('mousewheel', this._handleWheelEvents, false);
    $all.removeEventListener('DOMMouseScroll', this._handleWheelEvents, false);
    //this.endKeyboardInput();
    this.tracking = false;
  },
  updateWithEvent: function(event, done) {
    console.log(event);
    if(event.srcElement.tagName != 'INPUT'){
      var $dom = this.refs.container;
      var vector = [event.x || event.changedTouches[0].pageX, event.y || event.changedTouches[0].pageY];
      var deg = angle(vector, $dom);
      var value = this.normalize(deg);
      if(this.state.value<=10){
        if(value>=180){
          value=this.state.value;
        }
      }else if(this.state.value >=350){
        if(value<=180){
          value=this.state.value;
        }
      }
      var displayValue=this.degreeToValue(value)
      if( this.props.minRange < 0 ) displayValue = displayValue + this.props.minRange
      this.setState({value: value, displayValue:displayValue});
      //var fx = done
      this.props.onChange(this.props.propName, displayValue, this.props.index || 0)
        //: this.props.onInput;
      //if(fx) fx(value);
    }
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
  beginKeyboardInput: function() {
    $all.addEventListener('keydown', this._onKeyDown, false);
    this.refs.container.click();
    this.keyboardInput = true;
  },
  endKeyboardInput: function() {
    $all.removeEventListener('keydown', this._onKeyDown, false);
    this.keyboardInput = false;
  },
  inputChanged: function(event){
    //console.log(event);
    if(!isNaN(event.target.value)){
      var displayValue=parseFloat(event.target.value);
      var value=this.valueToDegree(displayValue);
      //console.log(value, displayValue);
      if(displayValue<=this.props.maxRange && displayValue >= this.props.minRange){
        this.setState({value: value, displayValue:displayValue});
        this.props.onChange(this.props.propName, displayValue, this.props.index || 0)
      }else if(event.target.value==""){
        this.setState({displayValue:""});
        //this.props.onChange(this.props.propName, '', this.props.index || 0)
      }
    }
  },
  componentDidMount: function(){
    if( !window.isMobile ) this.refs.input.focus();
  },

  //<rect x={`${(size/2)-2.5}`} y="1" width="5" height={`${(size/2)}`} className="pointer"
  //  transform={`rotate(${94+degToPercent(this.state.value)*240} ${center} ${center})`} fill='#616161' rx="0" ry="2"></rect>

  render:function(){
    var active=degToPercent(this.state.value)*100*0.66;
    var inactive=Math.abs(active-66);
    return(
      <div className="svg-holder" onMouseDown={this._onMouseDown} onTouchStart={this._onMouseDown} ref="container" tabIndex="0" >
        <svg viewBox={`0 0 ${size} ${size}`} filter={(navigator.userAgent.indexOf('Safari')>-1 && navigator.userAgent.indexOf('Chrome') < 0 ) ?'':"url(#shadow-4dp)"} className="knob-svg" xmlns="http://www.w3.org/2000/svg">
          <g transform={`rotate(150 ${center} ${center})`} >
            {renderPaths([{color:'#ddd', value:33},{color:'#fff', value:inactive},{color:'#2196f3', value:active}])}
            <path d={`M ${center},${center} ${30},${74} ${center},${74} z`} fill="#00e676" transform={`rotate(${-94+degToPercent(this.state.value)*240} ${center} ${center})`} />
          </g>
        </svg>
        <input type="number" className="no-spin knob-input" min={`${this.props.minRange-1}`} max={`${this.props.maxRange}`} value={this.state.displayValue} ref="input" onChange={this.inputChanged} step={`${this.props.step || 1}`}></input>
      </div>
    )
  }
})


export default RadialSlider;
