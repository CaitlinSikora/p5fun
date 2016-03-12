//Load Mocap Data.

var mocap;

function preload() {
  mocap = loadTable(
    'MoCleanhalf.csv',
    'csv',
    'header');
  song = loadSound("song.m4a");
}

function setup() {
  createCanvas(1400, 800); 
  background(0,0,0);
  frameRate(40);
}

//Make color variables to play with.
var RR=30;
var GG=40;
var BB=60;

//Create and initialize values for objects of class point for every marker in data.
var a = new Point();
a.initialize();

var b = new Point();
b.initialize();

var c = new Point();
c.initialize();

var d = new Point();
d.initialize();

var e = new Point();
e.initialize();

var f = new Point();
f.initialize();

var g = new Point();
g.initialize();

var h = new Point();
h.initialize();

var i = new Point();
i.initialize();

var j = new Point();
j.initialize();

var k = new Point();
k.initialize();

var l = new Point();
l.initialize();

var m = new Point();
m.initialize();

var n = new Point();
n.initialize();

var o = new Point();
o.initialize();

var p = new Point();
p.initialize();

var q = new Point();
q.initialize();

var r = new Point();
r.initialize();

var s = new Point();
s.initialize();

var t = new Point();
t.initialize();

var u = new Point();
u.initialize();

var v = new Point();
v.initialize();

var w = new Point();
w.initialize();

var x = new Point();
x.initialize();

var y = new Point();
y.initialize();

var z = new Point();
z.initialize();

var aa = new Point();
aa.initialize();

var bb = new Point();
bb.initialize();

var cc = new Point();
cc.initialize();

var dd = new Point();
dd.initialize();

var ee = new Point();
ee.initialize();

var ff = new Point();
ff.initialize();

var gg = new Point();
gg.initialize();

var hh = new Point();
hh.initialize();

var ii = new Point();
ii.initialize();

var jj = new Point();
jj.initialize();

var kk = new Point();
kk.initialize();

var ll = new Point();
ll.initialize();

var mm = new Point();
mm.initialize();

var nn = new Point();
nn.initialize();

var oo = new Point();
oo.initialize();

var pp = new Point();
pp.initialize();

var qq = new Point();
qq.initialize();

var rr = new Point();
rr.initialize();

var ss = new Point();
ss.initialize();

var tt = new Point();
tt.initialize();

var uu = new Point();
uu.initialize();

function draw() {
  //Fade out the previous stuff.
  noStroke();
  fill(0, 0, 0, 20);
  rect(0, 0, width-1, height-1);
  //Start song.
  if (frameCount == 1) {
    song.play();
  }
  //Create and initialize scaleFactor.
  var scaleFactor = 150;
  push();
  //Move origin to a good place.
  rotate(PI);
  translate(-700,-600);
  //Call point.stats method, which calculates and draws graphics based on the position data for each point.
  a.stats((mocap.getNum(frameCount, "ax")+1)*scaleFactor, (mocap.getNum(frameCount, "ay")+1)*scaleFactor);
  b.stats((mocap.getNum(frameCount, "bx")+1)*scaleFactor, (mocap.getNum(frameCount, "by")+1)*scaleFactor);
  c.stats((mocap.getNum(frameCount, "cx")+1)*scaleFactor, (mocap.getNum(frameCount, "cy")+1)*scaleFactor);
  d.stats((mocap.getNum(frameCount, "dx")+1)*scaleFactor, (mocap.getNum(frameCount, "dy")+1)*scaleFactor);
  e.stats((mocap.getNum(frameCount, "ex")+1)*scaleFactor, (mocap.getNum(frameCount, "ey")+1)*scaleFactor);
  f.stats((mocap.getNum(frameCount, "fx")+1)*scaleFactor, (mocap.getNum(frameCount, "fy")+1)*scaleFactor);
  g.stats((mocap.getNum(frameCount, "gx")+1)*scaleFactor, (mocap.getNum(frameCount, "gy")+1)*scaleFactor);
  h.stats((mocap.getNum(frameCount, "hx")+1)*scaleFactor, (mocap.getNum(frameCount, "hy")+1)*scaleFactor);
  i.stats((mocap.getNum(frameCount, "ix")+1)*scaleFactor, (mocap.getNum(frameCount, "iy")+1)*scaleFactor);
  j.stats((mocap.getNum(frameCount, "jx")+1)*scaleFactor, (mocap.getNum(frameCount, "jy")+1)*scaleFactor);
  k.stats((mocap.getNum(frameCount, "kx")+1)*scaleFactor, (mocap.getNum(frameCount, "ky")+1)*scaleFactor);
  l.stats((mocap.getNum(frameCount, "lx")+1)*scaleFactor, (mocap.getNum(frameCount, "ly")+1)*scaleFactor);
  m.stats((mocap.getNum(frameCount, "mx")+1)*scaleFactor, (mocap.getNum(frameCount, "my")+1)*scaleFactor);
  n.stats((mocap.getNum(frameCount, "nx")+1)*scaleFactor, (mocap.getNum(frameCount, "ny")+1)*scaleFactor);
  o.stats((mocap.getNum(frameCount, "ox")+1)*scaleFactor, (mocap.getNum(frameCount, "oy")+1)*scaleFactor);
  p.stats((mocap.getNum(frameCount, "px")+1)*scaleFactor, (mocap.getNum(frameCount, "py")+1)*scaleFactor);
  q.stats((mocap.getNum(frameCount, "qx")+1)*scaleFactor, (mocap.getNum(frameCount, "qy")+1)*scaleFactor);
  r.stats((mocap.getNum(frameCount, "rx")+1)*scaleFactor, (mocap.getNum(frameCount, "ry")+1)*scaleFactor);
  s.stats((mocap.getNum(frameCount, "sx")+1)*scaleFactor, (mocap.getNum(frameCount, "sy")+1)*scaleFactor);
  t.stats((mocap.getNum(frameCount, "tx")+1)*scaleFactor, (mocap.getNum(frameCount, "ty")+1)*scaleFactor);
  u.stats((mocap.getNum(frameCount, "ux")+1)*scaleFactor, (mocap.getNum(frameCount, "uy")+1)*scaleFactor);
  v.stats((mocap.getNum(frameCount, "vx")+1)*scaleFactor, (mocap.getNum(frameCount, "vy")+1)*scaleFactor);
  w.stats((mocap.getNum(frameCount, "wx")+1)*scaleFactor, (mocap.getNum(frameCount, "wy")+1)*scaleFactor);
  x.stats((mocap.getNum(frameCount, "xx")+1)*scaleFactor, (mocap.getNum(frameCount, "xy")+1)*scaleFactor);
  y.stats((mocap.getNum(frameCount, "yx")+1)*scaleFactor, (mocap.getNum(frameCount, "yy")+1)*scaleFactor);
  z.stats((mocap.getNum(frameCount, "zx")+1)*scaleFactor, (mocap.getNum(frameCount, "zy")+1)*scaleFactor);
  aa.stats((mocap.getNum(frameCount, "aax")+1)*scaleFactor, (mocap.getNum(frameCount, "aay")+1)*scaleFactor);
  bb.stats((mocap.getNum(frameCount, "bbx")+1)*scaleFactor, (mocap.getNum(frameCount, "bby")+1)*scaleFactor);
  cc.stats((mocap.getNum(frameCount, "ccx")+1)*scaleFactor, (mocap.getNum(frameCount, "ccy")+1)*scaleFactor);
  dd.stats((mocap.getNum(frameCount, "ddx")+1)*scaleFactor, (mocap.getNum(frameCount, "ddy")+1)*scaleFactor);
  ee.stats((mocap.getNum(frameCount, "eex")+1)*scaleFactor, (mocap.getNum(frameCount, "eey")+1)*scaleFactor);
  ff.stats((mocap.getNum(frameCount, "ffx")+1)*scaleFactor, (mocap.getNum(frameCount, "ffy")+1)*scaleFactor);
  gg.stats((mocap.getNum(frameCount, "ggx")+1)*scaleFactor, (mocap.getNum(frameCount, "ggy")+1)*scaleFactor);
  hh.stats((mocap.getNum(frameCount, "hhx")+1)*scaleFactor, (mocap.getNum(frameCount, "hhy")+1)*scaleFactor);
  ii.stats((mocap.getNum(frameCount, "iix")+1)*scaleFactor, (mocap.getNum(frameCount, "iiy")+1)*scaleFactor);
  jj.stats((mocap.getNum(frameCount, "jjx")+1)*scaleFactor, (mocap.getNum(frameCount, "jjy")+1)*scaleFactor);
  kk.stats((mocap.getNum(frameCount, "kkx")+1)*scaleFactor, (mocap.getNum(frameCount, "kky")+1)*scaleFactor);
  //ll.stats((mocap.getNum(frameCount, "llx")+1)*scaleFactor, (mocap.getNum(frameCount, "lly")+1)*scaleFactor);
  mm.stats((mocap.getNum(frameCount, "mmx")+1)*scaleFactor, (mocap.getNum(frameCount, "mmy")+1)*scaleFactor);
  nn.stats((mocap.getNum(frameCount, "nnx")+1)*scaleFactor, (mocap.getNum(frameCount, "nny")+1)*scaleFactor);
  oo.stats((mocap.getNum(frameCount, "oox")+1)*scaleFactor, (mocap.getNum(frameCount, "ooy")+1)*scaleFactor);
  pp.stats((mocap.getNum(frameCount, "ppx")+1)*scaleFactor, (mocap.getNum(frameCount, "ppy")+1)*scaleFactor);
  qq.stats((mocap.getNum(frameCount, "qqx")+1)*scaleFactor, (mocap.getNum(frameCount, "qqy")+1)*scaleFactor);
  rr.stats((mocap.getNum(frameCount, "rrx")+1)*scaleFactor, (mocap.getNum(frameCount, "rry")+1)*scaleFactor);
  ss.stats((mocap.getNum(frameCount, "ssx")+1)*scaleFactor, (mocap.getNum(frameCount, "ssy")+1)*scaleFactor);
  tt.stats((mocap.getNum(frameCount, "ttx")+1)*scaleFactor, (mocap.getNum(frameCount, "tty")+1)*scaleFactor);
  uu.stats((mocap.getNum(frameCount, "uux")+1)*scaleFactor, (mocap.getNum(frameCount, "uuy")+1)*scaleFactor);
  console.log(mocap.getNum(frameCount, "ax"));
  pop();
}  

function Point(posX,posY){
  //Write a method to intialize variables to be calculated recursively.
  this.initialize = function(){
    this.posX=posX;
    this.posY=posY;
    this.pposX=0;
    this.pposY=0;
    this.pvelX=0;
    this.pvelY=0;
    this.paccelX=0;
    this.paccelY=0;
  }
  //Write a method to calculate motion parameters and visualize them.
  this.stats = function(){
    this.velX = (this.posX-this.pposX);
    this.velY = (this.posY-this.pposY);
    this.vel = mag(this.velX,this.velY);
    this.accelX = (this.velX-this.pvelX);
    this.accelY = (this.velY-this.pvelY);
    this.accel = mag(this.accelX,this.accelY);
    this.jerkX = (this.accelX-this.paccelX);
    this.jerkY = (this.accelY-this.paccelY);
    this.jerk = mag(this.jerkX,this.jerkY);
  }
  this.show = function() {
    //Filter out noise and then draw triangles to visualize velocity, acceleration, and jerk.
    if(this.posX > 1000 || this.posY > 700 || this.pposX > 700 || this.pposY > 700|| this.velX > 50 || this.velY > 50|| this.accelX > 10 || this.accelY > 10|| this.jerk > 10){
    } else {
      
      noStroke();
      //strokeWeight(2+this.jerk);
      fill(5*RR,5*BB,4*GG);
      //line(this.posX,this.posY,this.posX+20*this.jerkX,this.posY+20*this.jerkY);
      triangle(this.posX-(2+2.5*this.jerkX),this.posY-(2+2.5*this.jerkY),this.posX+(2+2.5*this.jerkX),this.posY+(2+2.5*this.jerkY),this.posX+30*this.jerkX,this.posY+30*this.jerkY);
      
      //strokeWeight(2+2*this.accel);
      fill(5*RR,6*GG,6*BB);
      //line(this.posX,this.posY,this.posX+20*this.accelX,this.posY+20*this.accelY);
      triangle(this.posX-(2+2.5*this.accelX),this.posY-(2+2.5*this.accelY),this.posX+(2+2.5*this.accelX),this.posY+(2+2.5*this.accelY),this.posX+25*this.accelX,this.posY+25*this.accelY);
      
      noStroke();
      //strokeWeight(2+3*this.vel);
      fill(3*RR,4*GG,5*BB);
      triangle(this.posX-(2+2.5*this.velX),this.posY-(2+2.5*this.velY),this.posX+(2+2.5*this.velX),this.posY+(2+2.5*this.velY),this.posX+15*this.velX,this.posY+15*this.velY);

    }
  }
  this.update = function(){
    //Update the values of the previous frame.
    this.pposX = this.posX;
    this.pposY = this.posY;
    this.pvelX = this.velX;
    this.pvelY = this.velY;
    this.paccelX = this.accelX;
    this.paccelY = this.accelY;
    this.posX = 
  }
}
//Calculate the magnitude of a vector given its components.
function mag(X,Y){
  return sqrt((X*X)+(Y*Y));
}