let input;
let canvas;
let capture;
let canSeeFace = false;

async function setup(){
  angleMode(DEGREES);

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

let shiftDown;
let camHeight;

let nosePointKey = { x:0, y:0 };

function draw(){
  sideWidth = width / 5;
  height8 = height / 8;
  sideWidth5 = sideWidth / 5;
  textAlign(LEFT, TOP)

  if(capture && canvas){
    // Background colour for above and below camera
    noStroke();
    colorMode(RGB, 255);
    fill(124, 88, 105);
    rect(0, 0, width, height);

    // Flip the camera dimensions and print camera to screen
    scale(-1, 1);
    translate(-width ,0);
    camHeight = width * capture.height / capture.width
    shiftDown = (height - camHeight) / 2;
    image(capture, 0, shiftDown, width, camHeight);

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
    rect(sideWidth, shiftDown, width - 2 * sideWidth, camHeight);


    noStroke();
    fill(200);
    textSize(20);


    if (canSeeFace){

    }else{

    }

    // All potential things to change and animate over the timeline
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
        drawSmile();
        if( getValues.isSmile() ){
          text("Smile", width - 100, 200);
        }else{
          text("Frown", width - 100, 200);
        }
        break;

      case 3:
        // Which Key
        text('3', width - 50, 50);
        text("Which Key?", 50, 50);
        text("Point with your nose", 50, 200);

        keySelection();

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

        drawHeadTiltMeasures();
        break;

      case 6:
        //Well done & How to do the chords
        text('6', width - 50, 50);
        text("The Hats have been recorded", 50, 50);
        text("Time to play some chords", 50, 200);
        text("Turn Your Head Side to Side To Change the Chord", 50, 350);
        break;

      case 7:
        //Record the chords
        text('7', width - 50, 50);
        text("Recording Chords", 50, 50);
        drawChords();
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
        drawMelody();
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

let particles = [];

function drawMelody(){
  // TODO change this so it works better in tune with the music-make
  colorMode(HSL, 360);
  const leftEyePos = inversePoints(getValues.averagePoints(getFacePiece.getLeftEye()));
  const rightEyePos = inversePoints(getValues.averagePoints(getFacePiece.getRightEye()));

  const addParticle = function(){
    const randomIndex = random(0, noteArray.length);
    particles.push({
      x: random(sideWidth, width - sideWidth),
      y: random(shiftDown, height - shiftDown),
      hue: randomIndex * 360 / noteArray.length,
      size: random(50, 150),
      note: Math.floor(randomIndex)
    })
  }

  if ( frameCount % 60 === 0 ){
    particles = [];
    addParticle();
    addParticle();
    addParticle();
    addParticle();
    addParticle();
    addParticle();
    addParticle();
    addParticle();
    addParticle();
    addParticle();
    addParticle();
    addParticle();
    addParticle();
    addParticle();
    addParticle();
    addParticle();
  }

  for ( let i = particles.length - 1; i >= 0; i-- ){
    const p = particles[i];

    if( dist( p.x, p.y, leftEyePos.x, leftEyePos.y ) < p.size/2 ){
      leftEyeStore = p.note;
      fill(p.hue, 200, 200, 350)
    }else if( dist( p.x, p.y, rightEyePos.x, rightEyePos.y ) < p.size/2 ){
      rightEyeStore = p.note;
      fill(p.hue, 200, 200, 350);
    }else{
      fill(p.hue, 200, 200, 100)
    }

    stroke( p.hue, 200, 200 );
    circle( p.x, p.y, p.size );

    noStroke();
    fill(p.hue, 200, 200);
    textAlign(CENTER, CENTER);
    text(noteArray[p.note], p.x, p.y);
  }

  colorMode(RGB, 255);

  fill(255, 0, 0);
  circle( leftEyePos.x, leftEyePos.y, 20 );
  circle( rightEyePos.x, rightEyePos.y, 20 );

}

let averageJawX = 0;

function drawChords(){
  if(facePoints){

    const jaw = getFacePiece.getJawOutline();
    averageJawX = inversePoints(getValues.averagePoints(jaw)).x;

    stroke(0, 0, 255);
    line(averageJawX, shiftDown, averageJawX, height - shiftDown);

    nosePointKey = inversePoints(getValues.nosePointer());

    if( nosePointKey.x < averageJawX ){
      fill(255, 0, 0, 0.5);
      rect(sideWidth, shiftDown, averageJawX - sideWidth, height - (2 * shiftDown));
    }else{
      fill(255, 0, 0, 0.5);
      rect(averageJawX, shiftDown, averageJawX - sideWidth, height - (2 * shiftDown));
    }

    fill(255, 255, 255);
    circle(nosePointKey.x, nosePointKey.y, 20);

  }
  noStroke();
}

function drawSmile(){
  if(facePoints){
    const mouth = getFacePiece.getMouth();
    noFill();
    if( getValues.isSmile() ){
      stroke(0, 0, 255);
    }else{
      stroke(255, 0, 0);
    }

    beginShape();

    let convertedPoint = inversePoints(mouth[mouth.length - 1]);
    curveVertex(convertedPoint.x, convertedPoint.y);

    for ( let i = 0; i < mouth.length; i ++){
      const convertedPoint = inversePoints(mouth[i]);
      curveVertex(convertedPoint.x, convertedPoint.y);
    }

    convertedPoint = inversePoints(mouth[0]);
    curveVertex(convertedPoint.x, convertedPoint.y);
    convertedPoint = inversePoints(mouth[1]);
    curveVertex(convertedPoint.x, convertedPoint.y);

    endShape();
  }
  noStroke();
}

function angleBetweenVectors(x1, y1, x2, y2){
  const dot = x1 * x2 + y1 * y2;
  // console.log('d', dot);
  const lengths = hypot({ x:0, y:0 },{ x:x1, y:y1 } ) * hypot({ x:0, y:0 },{ x:x2, y:y2 } );
  // console.log('l', lengths);

  return acos(dot/lengths);
}

function drawHeadTiltMeasures(){
  colorMode(RGB, 255);
  const leftAverage = inversePoints(getValues.averagePoints(getFacePiece.getLeftEyeBrow()));
  const rightAverage = inversePoints(getValues.averagePoints(getFacePiece.getRightEyeBrow()));
  textAlign(CENTER, CENTER);
  //left and right are swapped due to camera flip
  if( getValues.headTilt() === 'left' ){
    fill(255, 255, 0, 200);
    circle(leftAverage.x, leftAverage.y, 100);

    fill(255, 255, 0, 100);
    circle(rightAverage.x, rightAverage.y, 100);

    fill(10);
    text('right', leftAverage.x, leftAverage.y);

  }else if ( getValues.headTilt() === 'right' ){
    fill(255, 255, 0, 100);
    circle(leftAverage.x, leftAverage.y, 100);

    fill(255, 255, 0, 200);
    circle(rightAverage.x, rightAverage.y, 100);

    fill(10);
    text('left', rightAverage.x, rightAverage.y);
  }else{
    fill(255, 255, 0, 100);
    circle(leftAverage.x, leftAverage.y, 100);

    fill(255, 255, 0, 100);
    circle(rightAverage.x, rightAverage.y, 100);
  }

}

function keySelection(){

  // To Point with the Nose
  if(facePoints){
    nosePointKey = inversePoints(getValues.nosePointer());
  }

  stroke(255, 255, 255);

  colorMode(HSB, 360);
  const diameter = height - (2 * shiftDown) - 5;
  const centreWidth = width/2;
  const centreHeight = height/2
  let angleOfNose = angleBetweenVectors( centreWidth + camHeight / 3 - width/2, centreHeight - height/2, nosePointKey.x - width/2, nosePointKey.y - height/2);
  angleOfNose = nosePointKey.y < centreHeight ? 360 - angleOfNose : angleOfNose;

  if( (angleOfNose < 22.5 && angleOfNose > 0) || (angleOfNose < 360 && angleOfNose > 337.5 )){
    fill(0, 300, 300, 300);
    key = "D";
  }else{
    fill(0, 300, 300, 150);
  }
  arc(width/2, height/2, diameter, diameter, -22.5, 22.5,  PIE);

  if( angleOfNose < 67.5 && angleOfNose > 22.5){
    fill(45, 300, 300, 300);
    key = "E";
  }else{
    fill(45, 300, 300, 150);
  }
  arc(width/2, height/2, diameter, diameter, 22.5, 67.5,  PIE);


  if( angleOfNose < 112.5 && angleOfNose > 67.5){
    fill(90, 300, 300, 300);
    key = "F";
  }else{
    fill(90, 300, 300, 150);
  }
  arc(width/2, height/2, diameter, diameter, 67.5, 112.5,  PIE);

  if( angleOfNose < 157.5 && angleOfNose > 112.5){
    fill(135, 300, 300, 300);
    key = "G";
  }else{
    fill(135, 300, 300, 150);
  }
  arc(width/2, height/2, diameter, diameter, 112.5, 157.5,  PIE);

  if( angleOfNose < 202.5 && angleOfNose > 157.5){
    fill(180, 300, 300, 300);
    key = null;
  }else{
    fill(180, 300, 300, 150);
  }
  arc(width/2, height/2, diameter, diameter, 157.5, 202.5,  PIE);


  if( angleOfNose < 247.5 && angleOfNose > 202.5){
    fill(225, 300, 300, 300);
    key = "A";
  }else{
    fill(225, 300, 300, 150);
  }
  arc(width/2, height/2, diameter, diameter, 202.5, 247.5,  PIE);

  if( angleOfNose < 292.5 && angleOfNose > 247.5){
    fill(270, 300, 300, 300);
    key = "B";
  }else{
    fill(270, 300, 300, 150);
  }
  arc(width/2, height/2, diameter, diameter, 247.5, 292.5,  PIE);

  if( angleOfNose < 337.5 && angleOfNose > 292.5){
    fill(315, 300, 300, 300);
    key = "C";
  }else{
    fill(315, 300, 300, 150);
  }
  arc(width/2, height/2, diameter, diameter, 292.5, 337.5,  PIE);

  colorMode(RGB, 255);


  fill(0);
  textSize(50);
  textAlign(CENTER, CENTER);

  const corner = Math.sqrt(camHeight/3 * camHeight/3 / 2);

  text('A', centreWidth - corner, centreHeight - corner);
  text('B', centreWidth, centreHeight - camHeight / 3);
  text('C', centreWidth + corner, centreHeight - corner);
  text('D', centreWidth + camHeight / 3, centreHeight);
  text('E' , centreWidth + corner, centreHeight + corner);
  text('F' , centreWidth, centreHeight + camHeight / 3);
  text('G' , centreWidth - corner, centreHeight + corner);
  textSize(20);
  text('Random', centreWidth - camHeight / 3, centreHeight);


  circle(nosePointKey.x, nosePointKey.y, 20);
}

function mousePressed() {
  if ( timelineCount === 0 && mouseX < 4 * sideWidth5 && mouseX > sideWidth5 && mouseY < 2 * height8 && mouseY > height8){
    playButton();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  displaySize = { width: windowWidth, height: windowWidth * (input.height / input.width) };
}

function inversePoints(point){
  return{
    x: width - point.x,
    y: point.y + shiftDown
  }
}
