//Load Mocap Data.

var dirtyMocap, mocap;
var points = [];
var numPoints = 55;
var scaleFactor = 0.5;

function preload() {
  dirtyMocap = loadTable(
    '2-stepScorpion.csv',
    'csv',
    'header');
}

function setup() {
  mocap = cleanCSV(dirtyMocap);
  createCanvas(1200, 650, WEBGL);
  for (var k=0; k<numPoints;k++){
    points.push(new Point());
  }
  background(0);
}

//Create and initialize values for objects of class point for every marker in data.

function draw() {
  background(0,0,0,8);
  //Move origin to a good place.
  rotateZ(PI);
  translate(0,-200,0);
  
  rotateY(3*PI/2);
  noStroke();
  scale(0.5);
  //Call point.stats method, which calculates and draws graphics based on the position data for each point.
  if (frameCount>20){
    for (var k=0; k<numPoints;k++){
      points[k].stats((mocap[(k*3)+2][frameCount]+1)*scaleFactor, (mocap[(k*3)+1][frameCount]+1)*scaleFactor,(mocap[(k*3)+0][frameCount]+1)*scaleFactor);
      if (points[k].posX<1300&&points[k].posY<1300&&points[k].posZ<1300){
        //fill(255, 255-(50*points[k].jerk), 255-(50*points[k].accel));
        push();
        translate(points[k].posX, points[k].posY,points[k].posZ);
        sphere(10,10,15);
        //ellipse(0,0,5*points[k].vel,10*points[k].jerk);
        pop();
      }
    }
  }
}  

