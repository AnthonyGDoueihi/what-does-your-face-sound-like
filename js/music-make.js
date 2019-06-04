// When the DOM is loaded get the face tracking models ready
document.addEventListener("DOMContentLoaded", function(event) {
  faceTrackStart();
  setTimeout(detection, 0);
})

const setupAudio = function(){
  const clap = new Tone.Player('./assets/CLAP.mp3').toMaster();
  const kick = new Tone.Player('./assets/KICK.mp3').toMaster();
  const openHat = new Tone.Player('./assets/OPENHIHAT.mp3').toMaster();
  const closedHat = new Tone.Player('./assets/CLOSEDHAT.mp3').toMaster();
  // const major =
  const melody = new Tone.Synth().toMaster();

  Tone.Transport.scheduleRepeat(time => {
    kick.start(time);
  }, '4n');

  // Tone.Transport.scheduleRepeat(time => {
  //   console.log(time);
  //   const val = getValues.averagePoints(facePoints);
  //   let note = "";
  //   console.log(val);
  //   if (val.x > 0.68){
  //     note += 'B';
  //   }else if (val.x > 0.6){
  //     note += 'A';
  //   }else if (val.x > 0.52){
  //     note += 'G';
  //   }else if (val.x > 0.44){
  //     note += 'F';
  //   }else if (val.x > 0.36){
  //     note += 'E';
  //   }else if (val.x > 0.28){
  //     note += 'D';
  //   }else{
  //     note += 'C';
  //   }
  //
  //   if (val.y > 0.66){
  //     note += '5';
  //   }else if (val.y > 0.33){
  //     note += '4';
  //   }else{
  //     note += '3';
  //   }
  //
  //   synth.triggerAttack(note);
  //
  // }, '4n');

  Tone.Transport.scheduleRepeat(time => {
    clap.start(time);
  }, '2n');

  // Tone.Transport.start();

}

// console.log(clap);

//For testing remove later
document.addEventListener('keypress', (e) => {

  console.log(getValues.isSmile());
  // differences.push(getFacePiece.getJawOutline());
  // console.log(differences);
})
