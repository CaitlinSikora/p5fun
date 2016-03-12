
var myVoice = new p5.Speech();

function setUp(){
  createCanvas(400,400);
}

function draw(){
  
}

function mousePressed(){
  myVoice.setVolume(1);
  myVoice.setVoice(Math.floor(random(myVoice.voices.length)));
  myVoice.speak("Hello, there.");
}