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

    if( col === 0){
      timelineCount += 1;
    }

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

    if( [1, 2, 3, 4, 6, 8, 10].includes(timelineCount) ){
      if( col === (steps.length/2) - 1){

        if ( timelineCount === 2 ){
          musicScale = getValues.isSmile() ? 'major-pentatonic' : "minor-pentatonic";
        }

        if ( timelineCount === 3 ){
          // key = getValues
          // key = key + '4';
        }

        sequence.stop();
        sequence.start('+16n');
      }

    }

    if( timelineCount === 11 ){
      if( col === steps.length - 1){
        sequence.stop();
        Tone.Transport.toggle();
      }
    }


  }, steps, '16n');
}

const playButton = function(){
  sequence.start();
  Tone.Transport.toggle();
}

// 0: Before the original play
//1: How to play
//2: Which Scale?
//3: Which Key?
//4: How to do the hats
//5: Record the hats - full
//6: Well Done
// 6.5: How to do the chords
//7: Record the Chords - full
//8: Well Done
// 8.5: How to do the melody
//9: Record the Melody - full
//10: You done did it!
//11: Full playback and record
//12: The end, stop playing

//For testing remove later
document.addEventListener('keypress', (e) => {

})
