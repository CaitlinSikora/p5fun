function setup() {
  createCanvas(1200, 650, WEBGL);
  
}

function draw(){
  background(255);
  push();
  rotate(radians(PI));
  translate(-1000,0,0);
  torus();
  pop();
  translate(-200+600*cos(frameCount/200),200*sin(frameCount/200),300*sin(frameCount/100));
  rotateX(radians(frameCount));
  //torus();
}
