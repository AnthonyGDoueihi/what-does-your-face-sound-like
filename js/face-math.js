let warmedUp = false;
let facePoints = [];
let audioSetup = false;

const detection = async function(){
  // keep on loop
  setTimeout(detection, 0);

  // if the models and camera are not ready, return before the detections
  if(!warmedUp){
    if(modelsLoad === true && camLoad === true){
      warmedUp = true;
    }
    return;
  }

  if(firstFaceFound){
    if (!audioSetup){
      setupAudio();
      audioSetup = true;
    }
  }

  // Get results calculated earlier and pass them into the global variable
  const results = await getLandmarks();
  if ( results ){
    facePoints = results;
  }
}


// Object made to segment the face into pieces for easier use
const getFacePiece = {
  getJawOutline() {
    return facePoints.slice(0, 17);
  },

  getLeftEyeBrow() {
    return facePoints.slice(17, 22);
  },

  getRightEyeBrow() {
    return facePoints.slice(22, 27);
  },

  getNose() {
    return facePoints.slice(27, 36);
  },

  getLeftEye() {
    return facePoints.slice(36, 42);
  },

  getRightEye() {
    return facePoints.slice(42, 48);
  },

  getMouth() {
    return facePoints.slice(48, 68);
  }

}

// Object to do the calculations needed
const getValues = {
  averagePoints(points){
    return points.reduce((acc, pnt) => {
      return {
        x: (acc.x + pnt.x) /2,
        y: (acc.y + pnt.y) /2
      }
    }, {
      x: 0,
      y:0
    })
  },

  isSmile(){
    const mouth = getFacePiece.getMouth();
    const mouthAverage = this.averagePoints(mouth);
    console.log(mouthAverage.y);
    console.log(mouth.map((pnt) => pnt.y));

  }
}
