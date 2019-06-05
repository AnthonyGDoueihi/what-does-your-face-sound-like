let warmedUp = false;
let facePoints = [];

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

  // Get results calculated earlier and pass them into the global variable
  const results = await getLandmarks();
  if ( results ){
    facePoints = results;
  }else{
    //TODO face can't be found let them know. Maybe put a time delay
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

const hypot = function(p1, p2){
    const a = p1.x -  p2.x;
    const b = p1.y -  p2.y;
    return Math.sqrt( a * a + b * b );

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
      y: 0
    })
  },

  // Check if the edges of the mouth are higher than the average distance of the mouth points to see if it is a smile
  isSmile(){
    const mouth = getFacePiece.getMouth();
    const mouthAverage = this.averagePoints(mouth);

    const leftDistance = hypot(mouth[0], mouthAverage) + hypot(mouth[12], mouthAverage);

    const rightDistance =  hypot(mouth[6], mouthAverage) +  + hypot(mouth[16], mouthAverage);

    console.log(leftDistance, 'left');
    console.log(rightDistance, 'right');

    const averageDistance = (leftDistance + rightDistance) / 4;

    // Make sure the head isn't tilted at this point or the data is invalid
    if( averageDistance > 0.12 && Math.abs(leftDistance - rightDistance) < 0.05 ){
      return true;
    }else{
      return false;
    }
  },

  // Use the eyebrows to see if the head is turned by getting the average height of both
  headTilt(){
    const leftAverage = this.averagePoints(getFacePiece.getLeftEyeBrow());
    const rightAverage = this.averagePoints(getFacePiece.getRightEyeBrow());

    console.log(leftAverage.y, 'left');
    console.log(rightAverage.y, 'right');

    if( Math.abs(leftAverage.y - rightAverage.y) < 0.05 ){
      return false;
    }

    return leftAverage.y < rightAverage.y ? 'right' : 'left';

  }
}
