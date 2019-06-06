let input;
let displaySize;
let canvas;
let capture;
let resizedResults;
let facePoints = [];

async function setup(){
  canvas = createCanvas(windowWidth, windowHeight).elt;

  // load the models
  const MODEL_URL = './models';
  await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
  await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);

  capture = await createCapture(VIDEO);

  input = capture.elt;
  setTimeout(detection, 0);
  capture.hide();
  setupAudio();
}

function draw(){
  if(capture && canvas && resizedResults){
    scale(-1, 1);
    translate(-width ,0);
    image(capture, 0, 0, width, width * capture.height / capture.width);
    faceapi.draw.drawFaceLandmarks(canvas, resizedResults);


    fill(255);
    textSize(50);
    switch (timelineCount) {
      case 0:
      //Before the original play
        text('0', 50, 50);
        break;

      case 1:
        //How to play
        text('1', 50, 50);
        break;

      case 2:
        // Which Scale?
        text('2', 50, 50);
        break;

      case 3:
        // Which Key
        text('3', 50, 50);
        break;

      case 4:
        //How to do the hats
        text('4', 50, 50);
        break;

      case 5:
        //Record the hats
        text('5', 50, 50);
        break;

      case 6:
        //Well done & How to do the chords
        text('6', 50, 50);
        break;

      case 7:
        //Record the chords
        text('7', 50, 50);
        break;

      case 8:
        // Well done & How to do the melody
        text('8', 50, 50);
        break;

      case 9:
        // Record the Melody
        text('9', 50, 50);
        break;

      case 10:
        // Congradulations!!!!
        text('10', 50, 50);
        break;

      case 11:
        text('11', 50, 50);
        break;

      case 12:
        text('12', 50, 50);
        break;

      default:
        return;

      }


  }
}
