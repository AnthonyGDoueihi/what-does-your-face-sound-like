const useTinyModel = true;
let warmedUp = false;

const options = new faceapi.TinyFaceDetectorOptions({
    inputSize: 128,
    scoreThreshold: 0.5
})

const detection = async function(){
  setTimeout(detection, 0);

  if(!warmedUp){
    if (input.height){
      warmedUp = true;
      displaySize = { width: windowWidth, height: windowWidth * (input.height / input.width) };
    }
    return;
  }

  const results = await getLandmarks();
  if ( results ){
    facePoints = results;
  }else{
    //TODO face can't be found let them know. Maybe put a time delay
  }
}

const getLandmarks = async function () {

  // asynch function to get a single face and get its landmarks
  const faceDetection = await faceapi.detectSingleFace(input, options).withFaceLandmarks(useTinyModel);

  // If a face was found
  if(faceDetection){

    // resize according to the canvas
    resizedResults = faceapi.resizeResults(faceDetection, displaySize);
    return resizedResults.landmarks.relativePositions
  }

  // If no face was found return a null
  return null;

}
