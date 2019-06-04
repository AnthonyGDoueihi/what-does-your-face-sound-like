document.addEventListener("DOMContentLoaded", function(event) {
  faceTrackStart();
})

let started = false;
let facePoints = [];
const differences = [];

const detection = async function(){

  setTimeout(detection, 0);

  if(!started){
    if(modelsLoad === true && camLoad === true){
      started = true;
    }
    return;
  }

  const results = await getLandmarks();
  if ( results ){
    facePoints = results;
  }
}

document.addEventListener('keypress', (e) => {
  console.log("hello");
  differences.push(getJawOutline());
  console.log(differences);
})

const getJawOutline = function () {
    return facePoints.slice(0, 17);
};
const getLeftEyeBrow = function () {
    return facePoints.slice(17, 22);
};
const getRightEyeBrow = function () {
    return facePoints.slice(22, 27);
};
const getNose = function () {
    return facePoints.slice(27, 36);
};
const getLeftEye = function () {
    return facePoints.slice(36, 42);
};
const getRightEye = function () {
    return facePoints.slice(42, 48);
};
const getMouth = function () {
    return facePoints.slice(48, 68);
};

detection();
