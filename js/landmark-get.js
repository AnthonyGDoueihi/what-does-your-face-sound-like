// settings for the model
const useTinyModel = true;
const options = new faceapi.TinyFaceDetectorOptions({
  inputSize: 128,
  scoreThreshold: 0.5
})

// Checks if everything is ready to do its work
let warmedUp = false;

// Variables that can change and is needed in many places
let displaySize;
let facePoints;


const detection = async function(){
  // Adds this to the callstack to run after this is finished
  setTimeout(detection, 0);

  // If not ready, check if ready then set the necessary variables
  if(!warmedUp){
    if (input.height){
      warmedUp = true;
      displaySize = { width: windowWidth, height: windowWidth * (input.height / input.width) };
    }
    return;
  }

  // Async dunction to get the face landmarks and store it in a global variable
  const results = await getLandmarks();
  if ( results ){
    facePoints = results;
    canSeeFace = true;
  }else{
    canSeeFace = false;
  }
}

const getLandmarks = async function () {

  // asynch function to get a single face and get its landmarks
  const faceDetection = await faceapi.detectSingleFace(input, options).withFaceLandmarks(useTinyModel);

  // If a face was found
  if(faceDetection){

    // resize according to the canvas
    const resizedResults = faceapi.resizeResults(faceDetection, displaySize);
    return resizedResults.landmarks;
  }

  // If no face was found return a null
  return null;

}
