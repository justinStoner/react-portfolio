export default function frequency(note, octave, synthOctave){
  var freq;
  if(synthOctave!=0){
    note=note+(synthOctave*12);
  }
  if(octave===0){
    freq = 440*Math.pow(2,(note-69)/12);
  }else{
    note=note+(octave*12)
    freq = 440*Math.pow(2,(note-69)/12);
  }
  console.log(freq);
  return freq//(freq*Math.pow(2, octave));

}
