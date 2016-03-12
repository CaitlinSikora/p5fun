var instructButton, instructTime, alp;

function setup() {
  //Create blank canvas;
  createCanvas(1200,800);
  frameRate(60);
  background(0,0,0);
  instructTime=0;
  fill(100,100,100);
  instructButton = createButton("Help!");
  instructButton.position(1140,20);
  instructButton.mousePressed(instruct);
}

function draw() {
  //Draw rectangle to cover canvas with small alpha value to fade stuff out.
  noStroke();
  fill(0,0,0,12.56);
  rect(0,0,width,height);
  
  //Use for loop to make three ellipses.
  for(var i = 0; i < 3; i++){
    //Choose colors that vary over time.
    fill(160+155*sin((i+1)*frameCount/1000), 160+155*sin(2*(i+1)*frameCount/1000), 160+155*sin(3*(i+1)*frameCount/1000));
    noStroke();
    //Create the x and y position of each falling ellipse.
    var Xfall=(600+200*sin(frameCount*(i+1)/100));
    var Yfall=(1.1*frameCount/2);
    //Calculate distance from mouse position.
    var diffX=mouseX-Xfall;
    var diffY=mouseY-Yfall;
    var r=mag(diffX,diffY);
    //Accelerate ellipses according to inverse square force related to mouse and steady downward gravitational force.
    Xfall= Xfall+(frameCount*frameCount/4)*(0.4*diffX/(r*r));
    Yfall= Yfall+(frameCount*frameCount/4)*(0.001+(0.4*diffY)/(r*r));
    //If mouse is pressed, make the size of the ellipses vary according to the velocity of the mouse.
    if (mouseIsPressed) {
      var velX = (mouseX-pmouseX);
      var velY = (mouseY-pmouseY);
      var speed = mag(velX, velY)/20;
      ellipse(Xfall%width,Yfall%height, 30*speed + (20 * sin(frameCount*(i+1)/200)), 50*speed);
    }
    else {
      ellipse(Xfall%width,Yfall%height, 30 + (20 * sin(frameCount*(i+1)/100)), 50);
    }
  }
  if (instructTime>0){
    drawInstruct();
    instructTime-=5;
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
    alp+=20;
  } else if (instructTime<50){
    alp-=20;
  }
    noStroke();
    fill(150,160,160,alp);
    textSize(20);
    text("Move the mouse around near the ellipses.",20,40);
    text("Try holding the mouse down while moving it.",20,60);
}

//Make a function to calculate the magnitude of a vector quantity with X and Y components.
function mag(X,Y) {
  return sqrt((X*X)+(Y*Y));
}