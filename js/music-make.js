const steps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63];

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

let timelineCount = 0;

let playDrum = false;
let playChords = false;
let playMelody = false;
let isRecording = false;

let isGetScale = false;
let musicScale;
let isGetKey = false;
let key;
let noteArray;

let sequence;
let halfSequence;

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

      if ( timelineCount === 5 ){
        const headTilt = getValues.headTilt();

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
      if ( timelineCount === 7 ){

      }
    }

    if( playMelody ){
      if ( timelineCount === 9 ){

      }
    }

    Tone.Draw.schedule( () => {

    }, time);

    if( col === steps.length - 1){
      timelineCount += 1;
      sequence.stop();
      setTimeout(()=>{
        sequenceCheck();
      }, 0)
    }

  }, steps, '16n');

  halfSequence = new Tone.Sequence( (time, col) => {
    if ( music.drum.kick[col] === 1 ){
      kick.start(time);
    }

    if ( music.drum.clap[col] === 1 ){
      clap.start(time);
    }

    if( col === (steps.length/2) - 1){
      if ( timelineCount === 2 ){
        musicScale = getValues.isSmile() ? 'major-pentatonic' : "minor-pentatonic";
      }

      if ( timelineCount === 3 ){
        // key = getValues
        // key = key + '4';
      }

      timelineCount += 1;
      halfSequence.stop();
      setTimeout(()=>{
        sequenceCheck();
      }, 0)
    }

  }, steps.slice(0, steps.length/2), '16n');

}

const playButton = function(){
  timelineCount += 1;
  sequenceCheck();
}

const sequenceCheck = function(){
  console.log(timelineCount);
  switch (timelineCount) {
    case 0:
    //Before the original play
      break;

    case 1:
      //How to play
      halfSequence.start();
      Tone.Transport.toggle();
      break;

    case 2:
      // Which Scale?
      halfSequence.start();
      break;

    case 3:
      // Which Key
      halfSequence.start();
      break;

    case 4:
      //How to do the hats
      // noteArray = Tonal.scale(musicScale).map(transpose(key));
      halfSequence.start();
      break;

    case 5:
      //Record the hats
      playDrum = true;
      sequence.start();
      break;

    case 6:
      //Well done & How to do the chords
      playDrum = false;
      halfSequence.start();
      break;

    case 7:
      //Record the chords
      playChords = true;
      sequence.start();
      break;

    case 8:
      // Well done & How to do the melody
      playChords = false;
      halfSequence.start();
      break;

    case 9:
      // Record the Melody
      playMelody = true;
      sequence.start();
      break;

    case 10:
      // Congradulations!!!!
      playMelody = false;
      halfSequence.start();
      break;

    case 11:
      isRecording = true;
      playDrum = true;
      playMelody = true;
      playChords = true;
      sequence.start();
      break;

    case 12:
      isRecording = false;
      playDrum = false;
      playMelody = false;
      playChords = false;
      Tone.Transport.toggle();
      break;

    default:
      console.log("How did you even do this?");
      return;

  }
}


//For testing remove later
document.addEventListener('keypress', (e) => {

  playButton();
  // differences.push(getFacePiece.getJawOutline());
  // console.log(differences);
})
