import React, { Component } from 'react';
let WJulia;
let HJulia;
let Wloop, Hloop;
let cx = 0, cy = 0, kat1 = 0, kat2 = 1;
let context;
let pixJulia;
let imgdJulia;
let animID;
let frame = 0;
let dataArray, analyzer, audio;
let iteration=0;
let container
//http://www.wiktorzychla.com/2014/02/animated-javascript-julia-fractals.html
//https://stackoverflow.com/questions/19671543/js-canvas-implementation-of-julia-set
export class Fractal extends Component{
  constructor(props){
    super(props);
    this.state={
      width:0,
      height:0,
      marginTop:0
    }
    audio=this.props.audio;
    console.log(this.props);
    analyzer=audio.analyser;
    dataArray=new Uint8Array(analyzer.fftSize);
  }
  render(){
    return(
      <canvas width={this.state.width} height={this.state.height} id='fractal' style={{position:'absolute', zIndex:0, marginTop:this.state.marginTop}}></canvas>
    )
  }
  componentDidMount(){
    let container=document.getElementById(this.props.containerId)
    WJulia=container.clientWidth;
    Wloop=WJulia*3
    HJulia=container.clientHeight;
    Hloop=HJulia*3
    this.setState({width:WJulia, height:HJulia, marginTop:-container.clientHeight});
    init();
    window.addEventListener('resize', ()=>{
      let container=document.getElementById(this.props.containerId)
      WJulia=container.clientWidth;
      Wloop=WJulia*3
      HJulia=container.clientHeight;
      Hloop=HJulia*3
      this.setState({width:WJulia, height:HJulia, marginTop: -container.clientHeight});
      init();
    })
  }
}
function init(){
    clearInterval( animID );

    var elemJulia = document.getElementById('fractal');
    if (elemJulia && elemJulia.getContext)
    {
        context = elemJulia.getContext('2d');
        if (context)
        {
            if (context.createImageData)
                imgdJulia = context.createImageData(WJulia, HJulia);
            else
                imgdJulia = context.getImageData(0, 0, WJulia, HJulia);

            pixJulia = imgdJulia.data;
        }
    }

    animID = setInterval(animate, 3);
}

function animate(){
    if(iteration > analyzer.fftSize-1) iteration = 0;
    analyzer.getByteTimeDomainData(dataArray);
    kat1 += 0.003;
    kat2 += 0.007;
    cx =  (853 + dataArray[iteration]*4) * Math.sin(kat1);
    cy = (855 + dataArray[iteration]*4) * Math.cos(kat2);
    //frame++;
    //console.log(dataArray);
    iteration++;
    draw();

    context.putImageData(imgdJulia, 0, 0);
    //context.font = "bold 12px sans-serif";
    //context.fillStyle = 0;
    //context.fillText( frame, 20, 20 );
}
function maptoSlot(value, length, min, max){
  var val=(value - min) * (length - 0) / (max - min) + min;

  return val;
}

function draw(audio, analyser){
    var px = 0;
    for (var i = -Wloop; i < Wloop; i+=6){
        var py = 0;
        for (var j = -Wloop; j < Wloop; j+=6){
            //console.log(dataArray[maptoSlot(j, analyzer.fftSize, -Hloop, Hloop)]);
            var c = 0;
            var x =  i//+dataArray[maptoSlot(i, analyzer.fftSize, -Wloop, Wloop)];
            var y = j//+dataArray[maptoSlot(j, analyzer.fftSize, -Hloop, Hloop)];
            var x2 = x * x;
            var y2 = y * y;
            while (((x2 + y2) < 2500000) && (c < 31)){
                c++;
                y  = ((x * y) >> 9) + cy;
                x  = ((x2 - y2) >> 10) + cx;
                x2 = x * x;
                y2 = y * y;
            }
            setPixelColor( pixJulia, (py * WJulia + px) << 2,
              255, 255-(7*c), 255 - (4 * c), 255 - (0.5*c));
            py++;
        }
        px++;
    }
}

function setPixelColor(pix,offs, a, r, g, b){
    pix[offs++] = r;
    pix[offs++] = g;
    pix[offs++] = b;
    pix[offs] = a;
}
