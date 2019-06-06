let input;
let displaySize;
let canvas;
let capture;
let resizedResults;
let facePoints = [];

let sideWidth;
let height8;
let width5;

async function setup(){
  canvas = createCanvas(windowWidth, windowHeight).elt;

  // load the models
  const MODEL_URL = './models';
  await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
  await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);

  // capture = await createCapture();
  capture = await createCapture(VIDEO);

  input = capture.elt;
  setTimeout(detection, 0);
  capture.hide();
  setupAudio();
  sideWidth = width / 5;
  height8 = height / 8;
  width5 = sideWidth / 5;
}

function draw(){
  if(capture && canvas && resizedResults){
    scale(-1, 1);
    translate(-width ,0);
    image(capture, 0, 0, width, width * capture.height / capture.width);
    faceapi.draw.drawFaceLandmarks(canvas, resizedResults);


    scale(-1, 1);
    translate(-width, 0);

    fill(124,88,105);
    rect(0, 0, sideWidth, height);
    rect(width - sideWidth, 0, sideWidth, height);

    fill(200);
    textSize(50);
    switch (timelineCount) {
      case 0:

      //Before the original play
        text('0', 50, 50);
        fill(157,150,184);
        rect(width5, height8, 3 * width5, height8);
        fill(255);
        triangle( 1.5 * width5, height8 + height8/10, 3.5 * width5, 1.5 * height8, 1.5 * width5, 2 * height8 - height8/10);
        break;

      case 1:
        //How to play
        text('1', width - 50, 50);
        text("Follow the Instructions", 50, 50);
        text("To Make Music", 50, 200);
        break;

      case 2:
        // Which Scale?
        text('2', width - 50, 50);
        text("Which Scale?", 50, 50);
        text("Smile for Major", 50, 200);
        text("Frown for Minor", 50, 350);
        break;

      case 3:
        // Which Key
        text('3', width - 50, 50);
        text("Which Key?", 50, 50);
        text("Point with your nose", 50, 200);
        break;

      case 4:
        //How to do the hats
        text('4', width - 50, 50);
        text("Get ready to play the high hats", 50, 50);
        text("Tilt your head to play", 50, 200);
        break;

      case 5:
        //Record the hats
        text('5', width - 50, 50);
        text("Recording Hats", 50, 50);
        break;

      case 6:
        //Well done & How to do the chords
        text('6', width - 50, 50);
        text("The Hats have been recorded", 50, 50);
        text("Time to play some chords", 50, 200);
        text("Bob Your Head Up and Down To Play a Chord", 50, 350);
        break;

      case 7:
        //Record the chords
        text('7', width - 50, 50);
        text("Recording Chords", 50, 50);
        break;

      case 8:
        // Well done & How to do the melody
        text('8', width - 50, 50);
        text("The Chords have been recorded", 50, 50);
        text("Time to play the melody", 50, 200);
        text("Move your head across the screen To Play the Melody", 50, 350);
        break;

      case 9:
        // Record the Melody
        text('9', width - 50, 50);
        text("Recording Melody", 50, 50);
        break;

      case 10:
        // Congradulations!!!!
        text('10', width - 50, 50);
        text("The Melody have been recorded", 50, 50);
        break;

      case 11:
        text('11', width - 50, 50);
        text("This is the final song")
        break;

      case 12:
        text('12', width - 50, 50);
        text("THE END")
        break;

      default:
        return;

      }


  }
}

function mousePressed() {
  if ( timelineCount === 0 && mouseX < 4 * width5 && mouseX > width5 && mouseY < 2 * height8 && mouseY > height8){
    playButton();
  }
}
