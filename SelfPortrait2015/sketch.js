//Declare a lot of variables and arrays and other things.
var mocap;
var modelXY=[];
var listXY=[];
var currentFrame = [];
var changeCurrFrame = [];
var changeRealFrame = [];
var prevCurrFrame = [];
var realFrame = [];
var prevRealFrame = [];
var countPoints;
var scaleFactor=0.2;
var nextX=0,nextY=0;
var realCount=0;
var fleshColA = [255,190,150];
var fleshColB = [235,160,130];
var bloodScheme = [[255,48,48],[238,44,44],[205,38,38]];
var fleshFrame = [];
var bloodFrame = [];
var zFactor;
var zCol;
var projX=4;
var magni=10;
var projY=3;
var together;
var destinationFrame = [];
var originFrame = [];
var newCol;
var song;
var zoom=1;
var instructButton, instructTime, alp;

function preload() {
  //Load Mocap Data.
  mocap = loadTable('MoClean.csv', 'csv', 'header');
  //Load song.
  song = loadSound("song2.m4a");
  console.log("locked and loaded");
}

function setup() {
  
  instructTime=0;
  instructButton = createButton("Help!");
  instructButton.position(1140,20);
  instructButton.mousePressed(instruct);
  
  countPoints = mocap.getColumnCount()/3;
  console.log(countPoints);
  
  //Make one frame to choose random blood tones and one to blend one flesh tone to the other going from core to extremities.
  var ind = 0;
  for (var m=0;m<10;m++){
    fleshFrame.push(1);
    bloodFrame.push(floor(random(bloodScheme.length)));
  }
  ind=0;
  for (var m=10;m<22;m++){
    fleshFrame.push(1-(ind*0.08));
    bloodFrame.push(floor(random(bloodScheme.length)));
    ind++;
  }
  ind=0;
  for (var m=22;m<33;m++){
    fleshFrame.push(1-(ind*0.08));
    bloodFrame.push(floor(random(bloodScheme.length)));
    ind++;
  }
  ind=0;
  for (var m=33;m<41;m++){
    fleshFrame.push(1-(ind*0.08));
    bloodFrame.push(floor(random(bloodScheme.length)));
    ind++;
  }
  ind=0;
  for (var m=41;m<49;m++){
    fleshFrame.push(1-(ind*0.08));
    bloodFrame.push(floor(random(bloodScheme.length)));
    ind++;
  }
  
  //Convert data to a list.
  listXY = convertCSVtoListXY(mocap);
  
  //Make a model.
  modelXY = createModel(listXY,countPoints);
  
  //Initialize the current, previous, and change in generated and real data frames.
  currentFrame = initialize(mocap,countPoints,0);
  realFrame = initialize(mocap,countPoints,0);
  prevCurrFrame = initialize(mocap,countPoints,0);
  prevRealFrame = initialize(mocap,countPoints,0);
  changeCurrFrame = initialize(mocap,countPoints,0);
  changeRealFrame = initialize(mocap,countPoints,0);
  
  //Make a canvas and control frameRate.
  createCanvas(1400, 760); 
  background(255,255,255);
  frameRate(45);
}

function draw() {
  //Start song.
  if (frameCount == 1) {
    song.play();
  }
  //Choose background.
  background(255,255,255);
  //Draw current frame.
  
  //Scale and translate according to mouse movements.
  zoom = 1-(0.003*(mouseY-height/1.65));
  push();
  scale(zoom);
  translate((width/2-mouseX),(mouseY-(height/2)));
  
  //Draw ellipses.
  drawBlood();
  drawFlesh();
  
  //Update frames.
  updateBlood();
  updateFlesh();
  
  pop();
  if (instructTime>0){
    drawInstruct();
    instructTime-=3;
    console.log(instructTime);
  }
}

function instruct(){
  instructTime=255;
  console.log('instruct');
}

function drawInstruct(){
  if (instructTime==255){
    alp=1;
  } else if (instructTime>200){
    alp+=17;
  } else if (instructTime<50){
    alp-=17;
  }
    noStroke();
    fill(150,160,160,alp);
    textSize(20);
    textAlign(LEFT);
    text("Move the mouse around to pan and zoom.",40,580);
    text("Try holding down and releasing the mouse.",40,600);
}

//Make a function to tell dots where to go when the mouse is pressed.
function mousePressed(){
  destinationFrame = initialize(mocap,countPoints,(frameCount%2885)+100);
  for (var m=0; m<countPoints; m++){
    originFrame[m] = currentFrame[m];
  }
  together=100;
}

//Make a function to tell dots where to go when the mouse is released.
function mouseReleased(){
  destinationFrame = initialize(mocap,countPoints,(frameCount%2885)+30);
  for (var m=0; m<countPoints; m++){
    originFrame[m] = currentFrame[m];
  }
  together=30;
}

//Make a function to draw the flesh-colored real frame.
function drawFlesh(){
  var col0,col1,col2;
  //Loop through the points in the body.
  for (var k=0; k < realFrame.length;k++){
    
    //Move origin to a good place.
    push();
    rotate(PI);
    translate(-800,-680);
    noStroke();
    
    //Choose colors fading according to z.
    col0=lerp(fleshColA[0],fleshColB[0],0.10+currentFrame[k][2]*0.0001);
    col1=lerp(fleshColA[1],fleshColB[1],0.10+currentFrame[k][2]*0.0001);
    col2=lerp(fleshColA[2],fleshColB[2],0.10+currentFrame[k][2]*0.0001);
    zCol = -1*(8-floor(currentFrame[k][2]*0.02));
    fill(zCol+col0,zCol+col1,zCol+col2);
    
    //Choose scale factor and projections according to z coordinate of position and velocity.
    if (realFrame[k][2]<2000&&realFrame[k][2]>-2000){
      zFactor = 1 + (realFrame[k][2]*0.0001);
      magni = sqrt((changeRealFrame[k][0]*changeRealFrame[k][0])+(changeRealFrame[k][1]*changeRealFrame[k][1])+(changeRealFrame[k][2]*changeRealFrame[k][2]));
      projX = 0.25+(23*cos(asin(changeRealFrame[k][2]/magni)));
      projY = 0.25+(10*cos(asin(changeRealFrame[k][2]/magni)));
    }
    else {
      zFactor = 1 + (700*0.0003);
      projX=17;
      projY=9;
    }
    
    //Move to the specific point.
    translate(scaleFactor*realFrame[k][0],scaleFactor*realFrame[k][1]-(0.25*scaleFactor*realFrame[k][2]));
    //Rotate according to velocity in xy plane.
    if (magni>6 || magni<-6){
      rotate(atan(changeRealFrame[k][1]/changeRealFrame[k][0]));
    }
    //Scale according to z-coordinate.
    scale(zFactor);
    //Draw Ellipse
    ellipse(0,0,projX,projY);
    pop();
  }
}

function drawBlood(){
  //Loops through the body points.
  for (var k=0; k < currentFrame.length;k++){
    push();
    //Move origin to a good place.
    rotate(PI);
    translate(-800,-680);
    noStroke();
    
    //Calculate scale and projections according to z and velocity data.
    if (realFrame[k][2]<2000&&realFrame[k][2]>-2000){
      zFactor = 1 + floor(currentFrame[k][2]*0.0003);
      magni = sqrt((changeCurrFrame[k][0]*changeCurrFrame[k][0])+(changeCurrFrame[k][1]*changeCurrFrame[k][1])+(changeCurrFrame[k][2]*changeCurrFrame[k][2]));
      projX = 0.25+(8*cos(asin(changeCurrFrame[k][2]/magni)));
      projY = 0.25+(5*cos(asin(changeCurrFrame[k][2]/magni)));
    } else {
      zFactor = 1 + floor(700*0.0005);
      projX = 7;
      projY = 4;
    }
    
    //Choose color.
    zCol = -1*(10-floor(currentFrame[k][2]*0.02));
    fill(zCol+bloodScheme[bloodFrame[k]][0],zCol+bloodScheme[bloodFrame[k]][1],zCol+bloodScheme[bloodFrame[k]][2]);
    
    //Move to center and rotate according to velocity in xy plane.
    translate(scaleFactor*currentFrame[k][0],scaleFactor*currentFrame[k][1]-(0.25*scaleFactor*currentFrame[k][2]));
    if (magni>0 || magni<0){
      rotate(atan(changeCurrFrame[k][1]/changeCurrFrame[k][0]));    
    }
    
    //Scale ellipse according to z position and draw.
    scale(zFactor);
    ellipse(0,0,projX,projY);
    pop();
  }
}

//Make a function to update flesh toned points.
function updateFlesh(){
  //Assign previous real frame, call data from the csv file for next frame, calculate change in position.
  for (var m=0; m<countPoints; m++){
    prevRealFrame[m]=[realFrame[m][0],realFrame[m][1],realFrame[m][2]];
    realFrame[m]=([mocap.get(frameCount%2885,m*3),mocap.get(frameCount%2885,(m*3)+1),mocap.get(frameCount%2885,(m*3)+2)]);
    changeRealFrame[m]=[realFrame[m][0]-prevRealFrame[m][0],realFrame[m][1]-prevRealFrame[m][1],realFrame[m][2]-prevRealFrame[m][2]];
  }
}

//Make a function to update generated red points.
function updateBlood(){
  //Loop through body points.
  for (var m=0; m<countPoints; m++){
    //Update previous frame.
    prevCurrFrame[m]=[currentFrame[m][0],currentFrame[m][1],currentFrame[m][2]];
  }
  //Update current frame if mouse is held down.
  if(mouseIsPressed){
    for (var m=0; m<countPoints; m++){
      currentFrame[m][0]+= (destinationFrame[m][0]-originFrame[m][0])/40;
      currentFrame[m][1]+= (destinationFrame[m][1]-originFrame[m][1])/40;
      currentFrame[m][2]+= (destinationFrame[m][2]-originFrame[m][2])/40;
    }
    //Update current frame if mouse as just released.
  } else if (together>30){
    for (var m=0; m<countPoints; m++){
      currentFrame[m][0]+= (destinationFrame[m][0]-originFrame[m][0])/20;
      currentFrame[m][1]+= (destinationFrame[m][1]-originFrame[m][1])/20;
      currentFrame[m][2]+= (destinationFrame[m][2]-originFrame[m][2])/20;
    }
    together--;
    //Slow points down until they reach destination.
  } else if (together>1){
    for (var m=0; m<countPoints; m++){
      currentFrame[m][0]+= (destinationFrame[m][0]-originFrame[m][0])/10;
      currentFrame[m][1]+= (destinationFrame[m][1]-originFrame[m][1])/10;
      currentFrame[m][2]+= (destinationFrame[m][2]-originFrame[m][2])/10;
    }
    together--;
    //Snap frames together at the right moment.
  } else if (together == 1){
    currentFrame = destinationFrame;
    together--;
    //Generate new data when left alone.
  } else {
    currentFrame = generate(modelXY,currentFrame);
  }
  //Calculate and update the change between current and previous frames.
  for (var m=0; m<countPoints; m++){
    changeCurrFrame[m]=[currentFrame[m][0]-prevCurrFrame[m][0],currentFrame[m][1]-prevCurrFrame[m][1],currentFrame[m][2]-prevCurrFrame[m][2]];
  }
}