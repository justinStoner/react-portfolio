import React, { Component } from 'react';
let audio, analyzer, dataArray, context, animId, fragCanvas, vertexShaderSrc, fragmentShaderSrc,
fragShader, fragPosition, fragResolution, fragSpectrum;

export class Webgl extends Component{
  constructor(props){
    super(props);
    this.state={
      width:0,
      height:0,
    }
    audio=this.props.audio;
    console.log(this.props);
    analyzer=audio.analyser;
    dataArray=new Uint8Array(analyzer.fftSize);
  }
  render(){
    return(
      <canvas width={this.state.width} height={this.state.height} id='webgl' style={{position:'absolute', zIndex:0, marginTop:this.props.marginTop}}></canvas>
    )
  }
  componentDidMount(){
    let container=document.getElementById(this.props.containerId);
    //context=document.getElementById('waveform').getContext('2d')
    this.setState({width: container.clientWidth, height: container.clientHeight});
    this.draw();
    window.addEventListener('resize', ()=>{
      let container=document.getElementById(this.props.containerId)
      this.setState({width: container.clientWidth, height: container.clientHeight});
      this.draw();
    })
  }
  draw(){
    this.spectrum = new Uint8Array(analyzer.frequencyBinCount)
     fragCanvas = document.getElementById('webgl');
    this.gl = fragCanvas.getContext('webgl') || fragCanvas.getContext('experimental-webgl')
     vertexShaderSrc = 'attribute vec2 position; void main(void) { gl_Position = vec4(position, 0, 1);}';
     fragmentShaderSrc = "precision mediump float;uniform float time;uniform vec2 resolution;uniform sampler2D spectrum;void main(void) {vec3 c;float z = 0.1 * time;vec2 uv = gl_FragCoord.xy / resolution;vec2 p = uv - 0.5;p.x *= resolution.x / resolution.y;float l = 0.2 * length(p);for (int i = 0; i < 3; i++) {z += 0.07;uv += p / l * (sin(z) + 1.0) * abs(sin(l * 9.0 - z * 2.0));c[i] = 0.01 / length(abs(mod(uv, 1.0) - 0.5));}float intensity = texture2D(spectrum, vec2(l, 0.5)).x;gl_FragColor = vec4(c / l * intensity, time);}";
    //this.gl.clearColor(1,1,1,1);
    //this.gl.clear(this.gl.COLOR_BUFFER_BIT);
     fragShader = this.createShader(this.gl, vertexShaderSrc, fragmentShaderSrc)
    this.gl.colorMask(true, true, true, false)
     fragPosition = this.gl.getAttribLocation(fragShader, 'position')
    this.gl.enableVertexAttribArray(fragPosition)
    this.fragTime = this.gl.getUniformLocation(fragShader, 'time')
    this.gl.uniform1f(this.fragTime, audio.input.context.currentTime)
     fragResolution = this.gl.getUniformLocation(fragShader, 'resolution')
    this.gl.uniform2f(fragResolution, this.state.width, this.state.height)
    this.fragSpectrumArray = new Uint8Array(4 * this.spectrum.length)
     fragSpectrum = this.createTexture(this.gl)

    this.initQuad(this.gl);
    this.renderFragment();
  }
  componentWillUnmount(){
    cancelAnimationFrame(animId);
  }
  renderFragment() {
    animId=requestAnimationFrame(this.renderFragment.bind(this))
    analyzer.getByteFrequencyData(this.spectrum);
    this.gl.uniform1f(this.fragTime, audio.input.context.currentTime)
    this.copyAudioDataToTexture(this.gl, this.spectrum, this.fragSpectrumArray)
    this.renderQuad(this.gl)
  }
  initQuad(gl) {
    const vbo = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
  }

   renderQuad(gl) {
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
  createShader(gl, vertexShaderSrc, fragmentShaderSrc) {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, vertexShaderSrc)
    gl.compileShader(vertexShader)
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(vertexShader))
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, fragmentShaderSrc)
    gl.compileShader(fragmentShader)
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(fragmentShader))
    }

    const shader = gl.createProgram()
    gl.attachShader(shader, vertexShader)
    gl.attachShader(shader, fragmentShader)
    gl.linkProgram(shader)
    gl.useProgram(shader)

    return shader
  }

  createTexture(gl) {
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    return texture
  }

  copyAudioDataToTexture(gl, audioData, textureArray) {
    for (let i = 0; i < audioData.length; i++) {
      textureArray[4 * i + 0] = audioData[i] // R
      textureArray[4 * i + 1] = audioData[i] // G
      textureArray[4 * i + 2] = audioData[i] // B
      textureArray[4 * i + 3] = 255          // A
    }
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, audioData.length, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, textureArray)
  }
}
