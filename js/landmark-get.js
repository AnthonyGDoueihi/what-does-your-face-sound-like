const useTinyModel = true;
let options;
let canvas;
let displaySize;
let input;
let camLoad = false;
let modelsLoad = false;

async function faceTrackStart(){
  const MODEL_URL = './models';
  // load the models
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


  options = new faceapi.TinyFaceDetectorOptions({
    inputSize: 128,
    scoreThreshold: 0.5
  })

  modelsLoad = true;
}

const onCamLoad = function(){
  canvas = document.getElementById('overlay');
  displaySize = { width: input.videoWidth, height: input.videoHeight };
  faceapi.matchDimensions(canvas, displaySize);
  camLoad = true;
}

const getLandmarks = async function () {

  const faceDetection = await faceapi.detectSingleFace(input, options).withFaceLandmarks(useTinyModel);

  if(faceDetection){
    const resizedResults = faceapi.resizeResults(faceDetection, displaySize);
    faceapi.draw.drawFaceLandmarks(canvas, resizedResults)
    return resizedResults.landmarks.positions.map((point) => {
      return {
        x: point.x/displaySize.width,
        y: point.y/displaySize.height
      }
    });
  }

  return null;
}
