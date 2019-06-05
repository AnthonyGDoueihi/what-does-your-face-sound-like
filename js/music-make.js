// When the DOM is loaded get the face tracking models ready
document.addEventListener("DOMContentLoaded", function(event) {
  faceTrackStart();
  setTimeout(detection, 0);
  setupAudio();

  document.getElementById('playButton').addEventListener('click', playButton);
})

const steps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64];

const music = {
  drum: {
    kick: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    clap: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    openHat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    closedHat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },

  melody: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

  //TODO chords with proper indexes to something
  chords: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

}

let isRecord = false;
let playDrum = false;
let playChords = false;
let playMelody = false;

let sequence;
let ready;

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

  sequence = new Tone.Sequence( (time, col) => {

    if ( music.drum.kick[col] === 1 ){
      kick.start(time);
    }

    if ( music.drum.clap[col] === 1 ){
      clap.start(time);
    }

    if( playDrum ){

      const headTilt = getValues.headTilt();

      if ( isRecord ){
        if( headTilt === 'left' ){
          music.drum.openHat[col] = 1;
        }else if ( headTilt === 'right' ){
          music.drum.closedHat[col] = 1;
        }
      }

      if ( music.drum.openHat[col] === 1 ){
        openHat.start(time);
      }

      if ( music.drum.closedHat[col] === 1 ){
        closedHat.start(time);
      }
    }

    if( playChords ){

    }

    if( playMelody ){

    }

    Tone.Draw.schedule( () => {

    }, time);

  }, steps, '16n');

  const switchToSequence = function(){
    ready.stop();
    sequence.start();
  }

  ready = new Tone.Sequence( (time, col) => {
    console.log('ready');
    if ( music.drum.kick[col] === 1 ){
      kick.start(time);
    }

    if ( music.drum.clap[col] === 1 ){
      clap.start(time);
    }

    if( col === 7 ){
      switchToSequence();
    }

    Tone.Draw.schedule( () => {

    }, time);

  }, steps.slice(0, 32), '16n');

}


const playButton = function(event){
  event.preventDefault();
  ready.start();
  Tone.Transport.toggle();


}


// const scale = getValues.isSmile() ? 'major' : 'minor';


//For testing remove later
document.addEventListener('keypress', (e) => {

  console.log(getValues.headTilt());
  // differences.push(getFacePiece.getJawOutline());
  // console.log(differences);
})

// Octives will be hard coded

// After play,
// Intro how to appears
// Choose Scale, Major or Minor, smile!
// Choose Key, use nose to point at correct area
// ClosedHat right, OpenHat left
// Record the Closed and Open hats
// Well done!
// Chords on head nod
// Record the chords
// Well done!
// Melody is position of eyes up, down, left, right
// Record melody
