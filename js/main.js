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

let sideWidth;
let height8;
let sideWidth5;

function draw(){
  sideWidth = width / 5;
  height8 = height / 8;
  sideWidth5 = sideWidth / 5;

  if(capture && canvas && resizedResults){
    // Background colour for above and below camera
    noStroke();
    fill(124, 88, 105);
    rect(0, 0, width, height);

    // Flip the camera dimensions and print camera to screen
    scale(-1, 1);
    translate(-width ,0);
    const camHeight = width * capture.height / capture.width
    const topAndBot = (height - camHeight) / 2;
    image(capture, 0, topAndBot, width, camHeight);

    // Reflip the camera
    scale(-1, 1);
    translate(-width, 0);

    // Side bars same colour as background to put webcam in a box
    fill(124, 88, 105);
    rect(0, 0, sideWidth, height);
    rect(width - sideWidth, 0, sideWidth, height);

    // Webcam Frame
    noFill();
    stroke(0);
    strokeWeight(4);
    rect(sideWidth, topAndBot, width - 2 * sideWidth, camHeight);


    noStroke();
    fill(200);
    textSize(20);

    // All potential things to change and animate over the lifecycle
    switch (timelineCount) {
      case 0:
      //Before the original play
        text('0', width - 50, 50);

        // Title
        const heading = 'What Sound Does Your Face Make?';
        textSize(Math.floor(textSize() / textWidth(heading) * ( width - sideWidth5 - sideWidth5 )));

        fill(243, 242, 235);
        text(heading, sideWidth5 + 4, height - height8 + 4, width - sideWidth5 + 4);
        fill(57, 80, 54);
        text(heading, sideWidth5, height - height8, width - sideWidth5);


        // Play Button functionality below
        fill(157,150,184);
        rect(sideWidth5, height8, 3 * sideWidth5, height8);
        fill(255);
        triangle( 1.5 * sideWidth5, height8 + height8/10, 3.5 * sideWidth5, 1.5 * height8, 1.5 * sideWidth5, 2 * height8 - height8/10);

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
  if ( timelineCount === 0 && mouseX < 4 * sideWidth5 && mouseX > sideWidth5 && mouseY < 2 * height8 && mouseY > height8){
    playButton();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
