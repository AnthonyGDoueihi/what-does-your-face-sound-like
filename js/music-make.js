// When the DOM is loaded get the face tracking models ready
document.addEventListener("DOMContentLoaded", function(event) {
  faceTrackStart();
  setTimeout(detection, 0);
})

const setupAudio = function(){
  // Setup drum samples
  const clap = new Tone.Player('./assets/CLAP.mp3').toMaster();
  const kick = new Tone.Player('./assets/KICK.mp3').toMaster();
  const openHat = new Tone.Player('./assets/OPENHIHAT.mp3').toMaster();
  const closedHat = new Tone.Player('./assets/CLOSEDHAT.mp3').toMaster();

  // Melody Synth to play only one at a time
  const melody = new Tone.Synth().toMaster();

  // Chord Synth to play 3 notes at a time
  const chord = new Tone.PolySynth(3, Tone.Synth).toMaster();


  const scale = getValues.isSmile() ? 'major' : 'minor';


  Tone.Transport.scheduleRepeat(time => {
    kick.start(time);
  }, '4n');

  // Tone.Transport.scheduleRepeat(time => {
    // console.log(time);
    // const val = getValues.averagePoints(facePoints);
    // let note = "";
    // console.log(val);
    // if (val.x > 0.68){
      // note += 'B';
    // }else if (val.x > 0.6){
      // note += 'A';
    // }else if (val.x > 0.52){
      // note += 'G';
    // }else if (val.x > 0.44){
      // note += 'F';
    // }else if (val.x > 0.36){
      // note += 'E';
    // }else if (val.x > 0.28){
      // note += 'D';
    // }else{
      // note += 'C';
    // }

    // if (val.y > 0.66){
      // note += '5';
    // }else if (val.y > 0.33){
      // note += '4';
    // }else{
      // note += '3';
    // }

    // melody.triggerAttack(note);

  // }, '4n');

  Tone.Transport.scheduleRepeat(time => {
    clap.start(time);
  }, '2n');

  // Tone.Transport.start();

}

// console.log(clap);

//For testing remove later
document.addEventListener('keypress', (e) => {

  console.log(getValues.headTilt());
  // differences.push(getFacePiece.getJawOutline());
  // console.log(differences);
})
