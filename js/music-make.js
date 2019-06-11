// Keeping the longer array somewhere neater
const steps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63];

// The notes that are edited and played
const music = {
  drum: {
    kick: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    clap: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    rimshot: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    snare: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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

// Keep track of how many times the sequence has played
let timelineCount = 0;

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
let rimshot;
let snare;
let melody;
let chord;

//Recording Melody variables
let leftEyeStore = "";
let rightEyeStore = "";

//Recording Chords variables
let lastDirection = "";
let currentChord = "";

//WEB AUDIO Recorder for saving the music
const actx = Tone.context;
const dest = actx.createMediaStreamDestination();
const recorder = new MediaRecorder(dest.stream);
const chunks = [];
const audio = document.querySelector('audio');


const setupAudio = function(){
  // Setup drum samples
  clap = new Tone.Player('./assets/CLAP.mp3').connect(dest).toMaster();
  clap.volume.value = -6;
  kick = new Tone.Player('./assets/KICK.mp3').connect(dest).toMaster();
  kick.volume.value = -6;
  rimshot = new Tone.Player('./assets/RIMSHOT.mp3').connect(dest).toMaster();
  rimshot.volume.value = -6;
  snare = new Tone.Player('./assets/SNARE.mp3').connect(dest).toMaster();
  snare.volume.value = -6;

  // Melody Synth to play only one or two notes at a time
  melody = new Tone.PolySynth(2, Tone.Synth).connect(dest).toMaster();
  melody.volume.value = -6;

  // Chord Synth to play 3 notes at a time
  chord = new Tone.PolySynth(3, Tone.Synth, {
    envelope  : {
        attack  : 0.2,
        decay  : 0.5,
        sustain  : 0,
        release  : 0.4
    }
  }).connect(dest).toMaster();
  chord.volume.value = -6;

  // The loop
  sequence = new Tone.Sequence( (time, col) => {

    if( col === 0){
      // Increment times in loop
      timelineCount += 1;

      if ( timelineCount === 8 ){
        // Need to stop the chords from playing since they are attacked but not released (started but not stopped)
        chord.releaseAll();
      }

      if ( timelineCount === 9 ){
        // Calls the p5 function
        startMelody();
      }

      if( timelineCount === 11 ){
        // Start the Web Audio recorder
        recorder.start();
      }

      // If on final loop end
      if( timelineCount === 12 ){
        chord.releaseAll();
        sequence.stop();
        Tone.Transport.toggle();
      }

      if ( [4, 6, 8, 10].includes(timelineCount) ){
        // Calls the p5 function to reset the timer
        newTimer();
      }

    }

    if ( [4, 6, 8, 10].includes(timelineCount) ){
      // Calls the p5 function make the timer in time with the music
      timerTick();
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

    // Record the drums and play it
    if ( timelineCount === 5 ){
      const headTilt = getValues.headTilt();
      if( headTilt === 'left' ){
        music.drum.rimshot[col] = 1;
      }else if ( headTilt === 'right' ){
        music.drum.snare[col] = 1;
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
      // If the direction changed, play a new chord
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
      // p5 function that checks where the nose is compared to the circles
      removeParticle(col);
      playMelody(col);
    }

    // Play the final song
    if ( timelineCount === 11 ){
      playMelody(col);
      playChord(col);
      playDrum(col);
      if( col === steps.length - 1){
        //Stop the Web Audio recorder
        recorder.stop();
      }

    }

    // Check if this needs to be a half-sequence rather than the full sequence
    if( [1, 2, 3, 4, 6, 8, 10].includes(timelineCount) ){
      if( col === (steps.length/2) - 1){

        // Record the smile value for the scale
        if ( timelineCount === 2 ){
          musicScale = getValues.isSmile() ? 'major pentatonic' : "minor pentatonic";
        }

        sequence.stop();
        sequence.start('+16n');
      }

    }


  }, steps, '16n');
}

// play the sample if the music object above says to 1 is play, 0 is not play
const playDrum = function(col){
  if ( music.drum.rimshot[col] === 1 ){
    rimshot.start();
  }

  if ( music.drum.snare[col] === 1 ){
    snare.start();
  }
}

// play a new chord if the lastPlayed is different to the one to play in this index of the music object. -1 is to not play at all, otherwise check the note array to find what to play
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

// play the melody, -1 is to not play, otherwise check the note array
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

// The play button that starts everything
const playButton = function(){
  sequence.start();
  Tone.Transport.toggle();
}

// Event listeners that record the music data and puts it in an audio element when completed
recorder.ondataavailable = event => chunks.push(event.data);
recorder.onstop = event => {
  let blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
  audio.src = URL.createObjectURL(blob);
  audio.className = "";
}
