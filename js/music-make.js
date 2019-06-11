// Keeping the longer array somewhere neater
const steps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63];

// The notes that are edited and played
const music = {
  drum: {
    kick: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    clap: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    openHat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    closedHat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },

  melodyLeft: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],

  melodyRight: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],

  chords: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]

}

// The combinations to play chords out of
const chordCombinations = {
    0: [0, 1, 2],
    1: [0, 1, 3],
    2: [0, 1, 4],
    3: [0, 2, 3],
    4: [0, 2, 4],
    5: [0, 3, 4],
    6: [1, 2, 3],
    7: [1, 2, 4],
    8: [1, 3, 4],
    9: [2, 3, 4]
  }

// Keep count in the loop
let timelineCount = 0;

// TODO make do thing
let isRecording = false;

// Stuff to get the notes to play
let isGetScale = false;
let musicScale;
let isGetKey = false;
let key;

// Array of notes to play
let noteArray;
let chordNoteArray;

// Full loop
let sequence;

// Noise makers varaibles
let clap;
let kick;
let openHat;
let closedHat;
let melody;
let chord;

//Recording Melody variables
let leftEyeStore = "";
let rightEyeStore = "";

//Recording Chords variables
let lastDirection = "";
let currentChord = "";

const setupAudio = function(){
  // Setup drum samples
  clap = new Tone.Player('./assets/CLAP.mp3').toMaster();
  kick = new Tone.Player('./assets/KICK.mp3').toMaster();
  openHat = new Tone.Player('./assets/OPENHIHAT.mp3').toMaster();
  closedHat = new Tone.Player('./assets/CLOSEDHAT.mp3').toMaster();

  // Melody Synth to play only one or two notes at a time
  melody = new Tone.PolySynth(2, Tone.Synth).toMaster();

  // Chord Synth to play 3 notes at a time
  chord = new Tone.PolySynth(3, Tone.Synth).toMaster();

  // The loop
  sequence = new Tone.Sequence( (time, col) => {

    if( col === 0){
      // Increment time in loop
      timelineCount += 1;

      // If on final loop end
      if( timelineCount === 12 ){
        chord.releaseAll();
        sequence.stop();
        Tone.Transport.toggle();
      }

      if ( timelineCount === 8 ){
        chord.releaseAll();
      }
    }

    // The constant beat through it all
    if ( music.drum.kick[col] === 1 ){
      kick.start(time);
    }
    if ( music.drum.clap[col] === 1 ){
      clap.start(time);
    }

    // Get the notes that the melody and chords can play
    if ( timelineCount === 4 && !noteArray ){
      if (key === null){
        const randNotes = "ABCDEFG".split("");
        key = randNotes[Math.floor( Math.random() * randNotes.length)];
      }

      noteArray = Tonal.scale(musicScale).map(Tonal.transpose( key + "4")).concat(Tonal.scale(musicScale).map(Tonal.transpose( key + "5")));

      chordNoteArray = Tonal.scale(musicScale).map(Tonal.transpose( key + "3"));

    }

    // Record the highhat and play it
    if ( timelineCount === 5 ){
      const headTilt = getValues.headTilt();
      //TODO Throttle this
      if( headTilt === 'left' ){
        music.drum.openHat[col] = 1;
      }else if ( headTilt === 'right' ){
        music.drum.closedHat[col] = 1;
      }

      playDrum(col);

    }

    // Record the chords and play it
    if ( timelineCount === 7 ){
      let currentDirection = "";

      if( nosePointKey.x < averageJawX ){
        currentDirection = "left";
      }else{
        currentDirection = "right";
      }

      if ( lastDirection !== currentDirection ){
        lastDirection = currentDirection;
        const prevCurrent = currentChord;
        while( currentChord === prevCurrent ){
          currentChord = Math.floor(random(0, Object.keys(chordCombinations).length));
        }
      }

      music.chords[col] = currentChord;

      playChord(col);
    }

    // Record the melody and play it
    if ( timelineCount === 9 ){
      // TODO send this to do a check rather than grab what is there

      removeParticle(col);

      playMelody(col);
    }

    // Play the final song
    if ( timelineCount === 11 ){
      //TODO record all and keep in a blob

      playMelody(col);
      playChord(col);
      playDrum(col);


    }

    if( [1, 2, 3, 4, 6, 8, 10].includes(timelineCount) ){
      if( col === (steps.length/2) - 1){

        if ( timelineCount === 2 ){
          musicScale = getValues.isSmile() ? 'major pentatonic' : "minor pentatonic";
        }

        sequence.stop();
        sequence.start('+16n');
      }

    }


  }, steps, '16n');
}

const playDrum = function(col){
  if ( music.drum.openHat[col] === 1 ){
    openHat.start();
  }

  if ( music.drum.closedHat[col] === 1 ){
    closedHat.start();
  }

}

let lastPlayed = -1;

const playChord = function(col){
  const notes = music.chords[col];

  if ( lastPlayed !== notes && notes !== -1){
    lastPlayed = notes;
    const toPlay = chordCombinations[notes];
    chord.triggerAttack(chordNoteArray[toPlay[0]]);
    chord.triggerAttack(chordNoteArray[toPlay[1]]);
    chord.triggerAttack(chordNoteArray[toPlay[2]]);
  }

}

const playMelody = function(col){
  const leftPlay = music.melodyLeft[col];
  const rightPlay = music.melodyRight[col];

  if( leftPlay !== -1 ){
    melody.triggerAttackRelease( noteArray[leftPlay],'16n');
  }

  if( rightPlay !== -1 ){
    melody.triggerAttackRelease( noteArray[rightPlay],'16n');
  }
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
