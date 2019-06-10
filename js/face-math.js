// Object made to segment the face into pieces for easier use
const getFacePiece = {
  getJawOutline(relative = false) {
    return relative ? facePoints.relativePositions.slice(0, 17) : facePoints.positions.slice(0, 17);
  },

  getLeftEyeBrow(relative = false) {
    return relative ? facePoints.relativePositions.slice(17, 22) : facePoints.positions.slice(17, 22);
  },

  getRightEyeBrow(relative = false) {
    return relative ? facePoints.relativePositions.slice(22, 27) : facePoints.positions.slice(22, 27);
  },

  getNose(relative = false) {
    return relative ? facePoints.relativePositions.slice(27, 36) : facePoints.positions.slice(27, 36);
  },

  getLeftEye(relative = false) {
    return relative ? facePoints.relativePositions.slice(36, 42) : facePoints.positions.slice(36, 42);
  },

  getRightEye(relative = false) {
    return relative ? facePoints.relativePositions.slice(42, 48) : facePoints.positions.slice(42, 48);
  },

  getMouth(relative = false) {
    return relative ? facePoints.relativePositions.slice(48, 68) : facePoints.positions.slice(48, 68);
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
    const sum = points.reduce((acc, pnt) => {
      return {
        x: acc.x + pnt.x,
        y: acc.y + pnt.y
      }
    })
    return {
      x: sum.x / points.length,
      y: sum.y / points.length
    }
  },

  // Check if the edges of the mouth are higher than the average distance of the mouth points to see if it is a smile
  isSmile(){
    const mouth = getFacePiece.getMouth(true);
    const mouthAverage = this.averagePoints(mouth);

    const leftDistance = hypot(mouth[0], mouthAverage) + hypot(mouth[12], mouthAverage);

    const rightDistance =  hypot(mouth[6], mouthAverage) +  + hypot(mouth[16], mouthAverage);

    const averageDistance = (leftDistance + rightDistance) / 4;
//TODO check for head tilt down and turning head to side needs to be tweaked
    // Make sure the head isn't tilted at this point or the data is invalid
    if( averageDistance > 0.12 && Math.abs(leftDistance - rightDistance) < 0.05 ){
      return true;
    }else{
      return false;
    }
  },

  // Use the eyebrows to see if the head is turned by getting the average height of both
  headTilt(){
    const leftAverage = this.averagePoints(getFacePiece.getLeftEyeBrow(true));
    const rightAverage = this.averagePoints(getFacePiece.getRightEyeBrow(true));

    if( Math.abs(leftAverage.y - rightAverage.y) < 0.05 ){
      return false;
    }

    return leftAverage.y < rightAverage.y ? 'right' : 'left';

  },

  //Get the tip of the nose on canvas position to be able to use it to point to things on screen
  nosePointer(){
    const nose = getFacePiece.getNose();
    return nose[3];
  },

}
