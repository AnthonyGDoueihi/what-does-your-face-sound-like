let input;
let canvas;
let capture;
let canSeeFace = false;

async function setup(){
  angleMode(DEGREES);
  textFont('Georgia');

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


    textSize(Math.floor(textSize() / textWidth('What Sound Does Your Face Make?') * ( width - sideWidth5 - sideWidth5 )));
    // All potential things to change and animate over the timeline
    switch (timelineCount) {
      case 0:
      //Before the original play
        // Title
        textAlign(LEFT, BOTTOM);
        const heading = 'What Sound Does Your Face Make?';
        fill(0);
        text(heading, sideWidth5 + 4, height - height8/2 + 4, width - sideWidth5 + 4);
        fill(88,124,107);
        text(heading, sideWidth5, height - height8/2, width - sideWidth5);

        // Play Button functionality below
        fill(157,150,184);
        rect(sideWidth5, height8, 3 * sideWidth5, height8);
        fill(255);
        triangle( 1.5 * sideWidth5, height8 + height8/10, 3.5 * sideWidth5, 1.5 * height8, 1.5 * sideWidth5, 2 * height8 - height8/10);

        break;

      case 1:
        //How to play

        textAlign(CENTER, BOTTOM);
        const fti = 'Follow the Instructions!';
        fill(0);
        text(fti, sideWidth5 + 4, height - 3 * height8/2 + 4, width - sideWidth5 + 4);
        fill(88,124,107);
        text(fti, sideWidth5, height - 3 * height8/2, width - sideWidth5);

        const tmm = 'To Make Music';
        fill(0);
        text(tmm, sideWidth5 + 4, height - height8/2 + 4, width - sideWidth5 + 4);
        fill(88,124,107);
        text(tmm, sideWidth5, height - height8/2, width - sideWidth5);
        break;

      case 2:
        // Which Scale?
        textAlign(CENTER, BOTTOM);
        const ws = 'Which Scale?';
        fill(0);
        text(ws, sideWidth5 + 4, height - 3 * height8/2 + 4, width - sideWidth5 + 4);
        fill(88,124,107);
        text(ws, sideWidth5, height - 3 * height8/2, width - sideWidth5);

        const sfmffm = 'Smile for Major Frown for Minor';
        fill(0);
        text(sfmffm, sideWidth5 + 4, height - height8/2 + 4, width - sideWidth5 + 4);
        fill(88,124,107);
        text(sfmffm, sideWidth5, height - height8/2, width - sideWidth5);

        drawSmile();
        break;

      case 3:
        // Which Key
        keySelection();

        textAlign(CENTER, BOTTOM);
        const wk = 'Which Key? Use Your Nose';
        fill(0);
        text(wk, sideWidth5 + 4, height - height8/2 + 4, width - sideWidth5 + 4);
        fill(88,124,107);
        text(wk, sideWidth5, height - height8/2, width - sideWidth5);


        break;

      case 4:
        //How to do the hats
        textAlign(CENTER, BOTTOM);

        countdownTimer();

        const tyh = 'Tilt Your Head.';
        fill(0);
        text(tyh, sideWidth5 + 4, height - 3 * height8/2 + 4, width - sideWidth5 + 4);
        fill(88,124,107);
        text(tyh, sideWidth5, height - 3 * height8/2, width - sideWidth5);

        const tptd = 'To Play the Drums';
        fill(0);
        text(tptd, sideWidth5 + 4, height - height8/2 + 4, width - sideWidth5 + 4);
        fill(88,124,107);
        text(tptd, sideWidth5, height - height8/2, width - sideWidth5);


        break;

      case 5:
        //Record the drums
        textAlign(CENTER, BOTTOM);

        const rd = 'Recording';
        fill(0);
        text(rd, sideWidth5 + 4, height - height8/2 + 4, width - sideWidth5 + 4);
        fill(88,124,107);
        text(rd, sideWidth5, height - height8/2, width - sideWidth5);

        drawHeadTiltMeasures();
        break;

      case 6:
        //Well done & How to do the chords
        textAlign(CENTER, BOTTOM);
        countdownTimer();

        const syhsts = 'Shake Your Head Side to Side.';
        fill(0);
        text(syhsts, sideWidth5 + 4, height - 3 * height8/2 + 4, width - sideWidth5 + 4);
        fill(88,124,107);
        text(syhsts, sideWidth5, height - 3 * height8/2, width - sideWidth5);

        const tctc = 'To Change the Chord';
        fill(0);
        text(tctc, sideWidth5 + 4, height - height8/2 + 4, width - sideWidth5 + 4);
        fill(88,124,107);
        text(tctc, sideWidth5, height - height8/2, width - sideWidth5);


        break;

      case 7:
        //Record the chords
        textAlign(CENTER, BOTTOM);

        const rc = 'Recording';
        fill(0);
        text(rc, sideWidth5 + 4, height - height8/2 + 4, width - sideWidth5 + 4);
        fill(88,124,107);
        text(rc, sideWidth5, height - height8/2, width - sideWidth5);

        drawChords();
        break;

      case 8:
        // Well done & How to do the melody
        textAlign(CENTER, BOTTOM);
        countdownTimer();

        const myhats = 'Move Your Head Around the Screen';
        fill(0);
        text(myhats, sideWidth5 + 4, height - 3 * height8/2 + 4, width - sideWidth5 + 4);
        fill(88,124,107);
        text(myhats, sideWidth5, height - 3 * height8/2, width - sideWidth5);

        const tptm = 'To Play the Melody';
        fill(0);
        text(tptm, sideWidth5 + 4, height - height8/2 + 4, width - sideWidth5 + 4);
        fill(88,124,107);
        text(tptm, sideWidth5, height - height8/2, width - sideWidth5);


        break;

      case 9:
        // Record the Melody
        textAlign(CENTER, BOTTOM);

        const rm = 'Recording';
        fill(0);
        text(rm, sideWidth5 + 4, height - height8/2 + 4, width - sideWidth5 + 4);
        fill(88,124,107);
        text(rm, sideWidth5, height - height8/2, width - sideWidth5);

        drawMelody();
        break;

      case 10:
        // Congradulations!!!!
        countdownTimer();

        textAlign(CENTER, BOTTOM);

        const rftfs = 'Ready for the Final Song?';
        fill(0);
        text(rftfs, sideWidth5 + 4, height - height8/2 + 4, width - sideWidth5 + 4);
        fill(88,124,107);
        text(rftfs, sideWidth5, height - height8/2, width - sideWidth5);

        break;

      case 11:
        flowersOfLife();
        break;

      case 12:
      //TODO dont know tf to do here
        text('12', width - 50, 50);
        text("THE END")
        break;

      default:
        return;

      }
  }
}

let particles = [];
let leftEyePos;
let rightEyePos;

let startFrame;


const removeParticle = function(col){
  for ( let i = particles.length - 1; i >= 0; i-- ){

    const p = particles[i];

    if( dist( p.x, p.y, leftEyePos.x, leftEyePos.y ) < p.size/2 ){
      music.melodyLeft[col] = p.note;
      particles.splice(i, 1);
      continue;
    }else if( dist( p.x, p.y, rightEyePos.x, rightEyePos.y ) < p.size/2 ){
      music.melodyRight[col] = p.note;
      particles.splice(i, 1);
      continue;
    }
  }
}

function startMelody(){
  startFrame = frameCount;
}

function drawMelody(){
  colorMode(HSL, 360);
  leftEyePos = inversePoints(getValues.averagePoints(getFacePiece.getLeftEye()));
  rightEyePos = inversePoints(getValues.averagePoints(getFacePiece.getRightEye()));


  const addParticle = function(index){
    particles.push({
      x: random(sideWidth + 2 * sideWidth5, width - sideWidth - 2 * sideWidth5),
      y: random(shiftDown + 2 * shiftDown / 5, height - shiftDown - 2 * shiftDown/5),
      hue: index * 360 / noteArray.length,
      size: random(50, 150),
      note: Math.floor(index)
    })
  }

  if ( (frameCount - startFrame) % 20 === 1 ){

    particles = [];
    for ( let i = 0; i < noteArray.length; i++ ){
      addParticle(i);
    }

    for ( let i = 0; i < noteArray.length; i++ ){
      addParticle(i);
    }

    for ( let i = 0; i < noteArray.length; i++ ){
      addParticle(i);
    }

    for ( let i = 0; i < noteArray.length; i++ ){
      addParticle(i);
    }

  }

  for ( let i = particles.length - 1; i >= 0; i-- ){
    const p = particles[i];

    if( dist( p.x, p.y, leftEyePos.x, leftEyePos.y ) < p.size/2 ){
      // leftEyeStore = p.note;
      fill(p.hue, 200, 200, 350)
    }else if( dist( p.x, p.y, rightEyePos.x, rightEyePos.y ) < p.size/2 ){
      // rightEyeStore = p.note;
      fill(p.hue, 200, 200, 350);
    }else{
      fill(p.hue, 200, 200, 100)
    }

    stroke( p.hue, 200, 200 );
    circle( p.x, p.y, p.size );

    noStroke();
    fill(p.hue, 200, 200);
    textAlign(CENTER, CENTER);
    textSize(30);
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
    // line(averageJawX, shiftDown, averageJawX, height - shiftDown);

    nosePointKey = inversePoints(getValues.nosePointer());

    if( nosePointKey.x < averageJawX ){
      fill(255, 0, 0, 155);
      rect(sideWidth, shiftDown, averageJawX - sideWidth, height - (2 * shiftDown));
    }else{
      fill(255, 0, 0, 155);
      rect(averageJawX, shiftDown, width - averageJawX - sideWidth, height - (2 * shiftDown));
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

    // \u1F600 smile
    // \u2639 frown

    if( getValues.isSmile() ){
      stroke(0, 0, 255);
      text('😀', 2 * sideWidth5, height/2);
      text('😀', width - sideWidth5, height/2);
    }else{
      stroke(255, 0, 0);
      text('\u2639', 2 * sideWidth5, height/2);
      text('\u2639', width - sideWidth5, height/2);
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
  const lengths = hypot({ x:0, y:0 },{ x:x1, y:y1 } ) * hypot({ x:0, y:0 },{ x:x2, y:y2 } );

  return acos(dot/lengths);
}

function drawHeadTiltMeasures(){
  colorMode(RGB, 255);
  let jaw = getFacePiece.getJawOutline();

  const leftAverage = inversePoints(getValues.averagePoints(jaw.slice(0, jaw.length/2)));
  const rightAverage = inversePoints(getValues.averagePoints(jaw.slice(jaw.length/2 ,jaw.length)));
  textAlign(CENTER, CENTER);
  textSize(50);
  //left and right are swapped due to camera flip
  if( getValues.headTilt() === 'left' ){
    fill(255, 255, 0, 200);
    circle(leftAverage.x, leftAverage.y, 150);

    fill(255, 255, 0, 100);
    circle(rightAverage.x, rightAverage.y, 150);

    fill(10);
    text('Right', leftAverage.x, leftAverage.y);

  }else if ( getValues.headTilt() === 'right' ){
    fill(255, 255, 0, 100);
    circle(leftAverage.x, leftAverage.y, 150);

    fill(255, 255, 0, 200);
    circle(rightAverage.x, rightAverage.y, 150);

    fill(10);
    text('Left', rightAverage.x, rightAverage.y);
  }else{
    fill(255, 255, 0, 100);
    circle(leftAverage.x, leftAverage.y, 150);

    fill(255, 255, 0, 100);
    circle(rightAverage.x, rightAverage.y, 150);
  }

}

function keySelection(){
  push();
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
  pop();
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

let timeLeft;

function newTimer(){
  timeLeft = 32;
  startFrame = frameCount;
}

function timerTick(){
  timeLeft --;
}

function countdownTimer(){
  push();
  stroke(0);
  fill(100, 0, 0, 100);
  circle(width/2, height/2, height - 2 * shiftDown);
  fill(0, 0, 100, 100);
  arc(width/2, height/2, height - 2 * shiftDown, height - 2 * shiftDown, -90, -90 + (45 * (timeLeft % 8)));

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(100);
  text(Math.floor(timeLeft/8), width/2, height/2);
  pop();
}

let c = 0
let angle = 0;
function flowersOfLife(){
  colorMode(HSB, 255);

	translate(width/2, height/2);
	fill(c, 90, 90, 20);
	ellipse(0, 0, 200);

	if(c>255){
		c = 0;
	}

	rotate(angle);

	for(var i=0; i<12; i++){

		push();
		ellipse(cos(30*i)*100, sin(30*i)*100, height - 2*shiftDown);
		pop();

		push();
		fill(255-c, 120, 150, 20);
		ellipse(sin(30*i)*100, cos(30*i)*100, (height - 2*shiftDown)/2);
		pop();

	}

	c += 2;
	angle += 0.5;
}
