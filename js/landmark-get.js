const useTinyModel = true;
let options;
let canvas;
let displaySize;
let input;
let camLoad = false;
let modelsLoad = false;

async function faceTrackStart(){

  // load the models
  const MODEL_URL = './models';
  await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
  await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);

  // try to access users webcam and stream the images
  // to the video element
  input = document.getElementById('inputVideo');

  navigator.getUserMedia(
    { video: {} },
    stream => input.srcObject = stream,
    err => console.error(err)
  )

  // set the options for the tiny face detector
  options = new faceapi.TinyFaceDetectorOptions({
    inputSize: 128,
    scoreThreshold: 0.5
  })

  //Once loaded set true so other functions can start
  modelsLoad = true;
}

// When the canvas gets access to the webcam run this
const onCamLoad = function(){
  canvas = document.getElementById('overlay');
  displaySize = { width: input.videoWidth, height: input.videoHeight };

  faceapi.matchDimensions(canvas, displaySize);
  //Once loaded set true so other functions can start
  camLoad = true;
}

const getLandmarks = async function () {

  // asynch function to get a single face and get its landmarks
  const faceDetection = await faceapi.detectSingleFace(input, options).withFaceLandmarks(useTinyModel);

  faceapi.getContext2dOrThrow(canvas).clearRect(0,0, displaySize.width, displaySize.height);

  // If a face was found
  if(faceDetection){
    // resize according to the webcam
    const resizedResults = faceapi.resizeResults(faceDetection, displaySize);

    faceapi.draw.drawFaceLandmarks(canvas, resizedResults)
    return resizedResults.landmarks.relativePositions
  }
  // If no face was found return a null
  return null;
}
