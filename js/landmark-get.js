document.addEventListener("DOMContentLoaded", function(event) {
  run();
})

let mtcnnForwardParams;
let canvas;
let displaySize;
let input;

async function run(){

  const MODEL_URL = './models';
  // load the models
  // await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
  // await faceapi.loadMtcnnModel(MODEL_URL);
  await faceapi.loadFaceLandmarkModel(MODEL_URL);
  await faceapi.loadFaceRecognitionModel(MODEL_URL);

  // try to access users webcam and stream the images
  // to the video element
  input = document.getElementById('inputVideo');

  navigator.getUserMedia(
    { video: {} },
    stream => input.srcObject = stream,
    err => console.error(err)
  )


  mtcnnForwardParams = {
    // number of scaled versions of the input image passed through the CNN
    // of the first stage, lower numbers will result in lower inference time,
    // but will also be less accurate
    maxNumScales: 10,
    // scale factor used to calculate the scale steps of the image
    // pyramid used in stage 1
    scaleFactor: 0.709,
    // the score threshold values used to filter the bounding
    // boxes of stage 1, 2 and 3
    scoreThresholds: [0.6, 0.7, 0.7],
    // mininum face size to expect, the higher the faster processing will be,
    // but smaller faces won't be detected
    minFaceSize: 200
  }

}

const onFirstPlay = async function(){
  canvas = document.getElementById('overlay');
  displaySize = { width: input.videoWidth, height: input.videoHeight };
  faceapi.matchDimensions(canvas, displaySize);
  onPlay();
}

const onPlay = async function () {

  const faceDetection = await faceapi.detectSingleFace(input).withFaceLandmarks();

  if(faceDetection){
    const resizedResults = faceapi.resizeResults(faceDetection, displaySize);
    console.log(resizedResults.landmarks.positions[0]);

    // faceapi.draw.drawDetections(canvas, resizedResults);
    // faceapi.draw.drawFaceLandmarks(canvas, resizedResults);
  }else{
    setTimeout(() => onPlay())

  }

}
