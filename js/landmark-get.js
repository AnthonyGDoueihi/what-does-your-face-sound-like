document.addEventListener("DOMContentLoaded", function(event) {
  run();
})

const useTinyModel = true;
let options;
let canvas;
let displaySize;
let input;

async function run(){
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


  options = new faceapi.TinyFaceDetectorOptions({ inputSize: 128, scoreThreshold: 0.5 })


}

const onFirstPlay = async function(){
  canvas = document.getElementById('overlay');
  displaySize = { width: input.videoWidth, height: input.videoHeight };
  faceapi.matchDimensions(canvas, displaySize);
  onPlay();
}

const onPlay = async function () {

  const faceDetection = await faceapi.detectSingleFace(input, options).withFaceLandmarks(useTinyModel);

  if(faceDetection){
    const resizedResults = faceapi.resizeResults(faceDetection, displaySize);
    console.log(resizedResults.landmarks.positions[0]);

    // faceapi.draw.drawDetections(canvas, resizedResults);
    // faceapi.draw.drawFaceLandmarks(canvas, resizedResults);
  }

  setTimeout(() => onPlay())


}
