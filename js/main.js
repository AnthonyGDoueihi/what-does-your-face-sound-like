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
  scale(-1, 1);
  translate(-width ,0);
  if(capture && canvas && resizedResults){
    image(capture, 0, 0, width, width * capture.height / capture.width);
    faceapi.draw.drawFaceLandmarks(canvas, resizedResults);
  }
}
