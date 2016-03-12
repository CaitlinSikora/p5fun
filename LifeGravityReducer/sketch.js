var inputConcern, conWeight, conUrgency, conPartSpeech, conButton, inputJoy, joyWeight, joyUrgency, joyPartSpeech, joyButton;
var listConcerns = [];
var listJoys = [];
var numWords = [];
var num=0, SeussInd=0;
var posIndVar = "";
var SeussNum;
var explodeArray = [];
var lexicon = new RiLexicon();
var seussString;
var exPos = [];
var exPosS = [];
var myVoice;
var instructButton, instructTime, alp;

//var Seuss = {};
//Seuss["ANA"] = {stuff};


var Seuss = 
  [{posIndVar:	"ANA",	P1:	"Today you are ",	B1:	"A",	P2:	"! That is truer than ",	B2:	"N",	P3:	"! There is no one alive who is you-er than ",	B3:	"A",	P4:	"!"},
  {posIndVar:	"VVV",	P1:	"The more that you read, the more you will ",	B1:	"V",	P2:	". The more that you know, the more places you'll ",	B2:	"V",	P3:	". ",	B3:	"W",	P4:	" "},
  {posIndVar:	"VAV",	P1:	"Don't ",	B1:	"V",	P2:	" because it's ",	B2:	"A",	P3:	".  ",	B3:	"V",	P4:	" because it happened."},
  {posIndVar:	"NNV",	P1:	"You have ",	B1:	"N",	P2:	" in your head. You have ",	B2:	"N",	P3:	" in your shoes. You can ",	B3:	"V",	P4:	" yourself any direction you choose."},
  {posIndVar:	"NNN",	P1:	"Sometimes the ",	B1:	"N",	P2:	" is complicated and the ",	B2:	"N",	P3:	" is ",	B3:	"N",	P4:	"."},
  {posIndVar:	"VAA",	P1:	"Unless someone like you ",	B1:	"V",	P2:	" s a whole ",	B2:	"N", P3:	", nothing is going to get ",	B3:	"A",	P4:	"."},
  {posIndVar:	"ANV",	P1:	"Be who you are and say what you feel, because those who mind don't matter and those who matter don't mind.",	B1:	"W",	P2:"",		B2: "W",		P3:	"",	B3:	"W",	P4:	" "},
  {posIndVar:	"NVA",	P1:	"", 	B1:	"N",	P2:	" is a necessary ingredient in living. It's a way of ",	B2:	"V",	P3:	"-ing at life through the ",	B3:	"A",	P4:	" end of a telescope."},
  {posIndVar:	"AVN",	P1:	"You know you're ",	B1:	"A",	P2:	" when you can't ",	B2:	"V",	P3:	" because reality is finally better than your ",	B3:	"N",	P4:	"."},
  {posIndVar:	"NNA",	P1:	"A ",	B1:	"N",	P2:	" is a ",	B2:	"N",	P3:	", no matter how ",	B3:	"A",	P4:	"."}];

function preload() {
  seussIm1 = loadImage("seussIm1.png");
  seussIm2 = loadImage("seussIm2.png");
  seussIm3 = loadImage("seussIm3.png");
  seussIm4 = loadImage("seussIm4.png");
  seussIm5 = loadImage("seussIm5.png");
  //song = loadSound("song.m4a");
}

function setup() {
  instructTime=0;
  instructButton = createButton("Help!");
  instructButton.position(1140,20);
  instructButton.mousePressed(instruct);

  createCanvas(1200, 600);
  frameRate(30);

  inputConcern = createInput();
  conWeight = createInput();
  conUrgency = createInput();
  conPartSpeech = createInput();
  conPartSpeech.position(410, height-25);
  conUrgency.position(280, height-25);
  conWeight.position(150, height-25);
  inputConcern.position(20, height-25);

  conButton = createButton('Submit Concern');
  conButton.position(540, height-25);
  conButton.mousePressed(addConcern);

  inputJoy = createInput();
  joyWeight = createInput();
  joyUrgency = createInput();
  joyPartSpeech = createInput();
  inputJoy.position(20, height-50);
  joyWeight.position(150, height-50);
  joyUrgency.position(280, height-50);
  joyPartSpeech.position(410, height-50);

  joyButton = createButton('Submit Joy');
  joyButton.position(540, height-50);
  joyButton.mousePressed(addJoy);

  textAlign(CENTER)
  textSize(50);
  
  myVoice = new p5.Speech();
  myVoice.listVoices();
  myVoice.speak("hi there");
}

function draw() {
  background(255,255,255,30);
  fill(0);
  textSize(50);
  text("Life Gravity Reducer",width/2,50);
  textSize(10);
  text("Concern/Source of Joy:",20, height-67,130,80);
  text("Weight (0-10):",150, height-67,130,80);
  text("Urgency (0-10):",280, height-67,130,80);
  text("Part of Speech (N/A/V):",410, height-67,130,80);
  textSize(14);
  text("Click on your concerns or sources of joy! \nYou choose how to divide your attention!",width-350, height-50,350,50);
  push();
  translate(width/2,height/2);
  displayAndUpConcerns();
  displayAndUpJoys();
  pop();
  explodeWordsDisplay();
  explodeSeussDisplay();
  
  if (instructTime>0){
    drawInstruct();
    instructTime-=5;
  }
}

function instruct(){
  instructTime=255;
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
    fill(100,110,110,alp);
    textSize(20);
    textAlign(LEFT);
    text("Enter sources of concern or joy below.",15,100);
    text("Give each a weight, urgency, and part of speech.",15,120);
}


function addConcern() {
  var concern = inputConcern.value();
  var concernWeight = 5*conWeight.value();
  var radius = (11-conUrgency.value())*40;
  var vt = (120*(100+concernWeight)/(concernWeight*radius));
  var partSpeechvar = conPartSpeech.value();
  listConcerns.push({word:concern,weight:concernWeight,radius:radius,vt:vt,xpos:100,ypos:300,start:frameCount,RED:random(170),GREEN:random(100),BLUE:random(150),reduce:0,partSpeech:partSpeechvar});
  inputConcern.value('');
  conWeight.value('');
  conUrgency.value('');
  conPartSpeech.value('');
}

function addJoy() {
  var joy = inputJoy.value();
  var joyWeightvar = 5*joyWeight.value();
  var radius = (11-joyUrgency.value())*(random(40,45));
  var vt = (120*(100+joyWeightvar)/(joyWeightvar*radius));
  var partSpeechvar = joyPartSpeech.value();
  listJoys.push({word:joy,weight:joyWeightvar,radius:radius,vt:vt,xpos:100,ypos:300,start:frameCount,RED:random(100,255),GREEN:random(100,255),BLUE:random(100,255),grow:0,partSpeech:partSpeechvar});
  inputJoy.value('');
  joyWeight.value('');
  joyUrgency.value('');
  joyPartSpeech.value('');
}

function mousePressed(){
  var newword,pos;
  
  for(var i=0; i<listConcerns.length; i++){
    if ((mouseY<(height-60)&&mouseX-(width/2))>=(listConcerns[i].xpos-50) && (mouseX-(width/2))<=(listConcerns[i].xpos+100) && (mouseY-(height/2))<=(listConcerns[i].ypos+50) && (mouseY-(height/2))>=(listConcerns[i].ypos-100)){
      listConcerns[i].reduce = frameCount;
      num++;
      newword = listConcerns[i].word;
      pos = listConcerns[i].partSpeech;

      numWords.push({word:newword,partSpeech:pos,explodeTime:frameCount,centerX:mouseX,centerY:mouseY});

      explodeArray.push(lexicon.rhymes(listConcerns[i].word));

      posIndVar=posIndVar.concat(pos);

      if (posIndVar.length > 3){
        posIndVar=posIndVar.slice(1,4);
        numWords = numWords.slice(1,4);
        explodeArray = explodeArray.slice(1,4);
      }
    }
  }
  for(var j=0; j<listJoys.length; j++){
    if (mouseY<(height-60)&&(mouseX-(width/2))>=(listJoys[j].xpos-50) && (mouseX-(width/2))<=(listJoys[j].xpos+100) && (mouseY-(height/2))<=(listJoys[j].ypos+50) && (mouseY-(height/2))>=(listJoys[j].ypos-100)){
      listJoys[j].grow = frameCount;
      num++;
      newword = listJoys[j].word;
      pos = listJoys[j].partSpeech;

      // add the latest click to the stack of numWords:

      /*var dummy = []; 
      for (var m =0; m<7; m++){
        dummy.push(listJoys[j].word);
      }
      explodeArray.push(dummy);*/
      explodeArray.push(lexicon.rhymes(listJoys[j].word));

      numWords.push({word:newword,partSpeech:pos,explodeTime:frameCount,centerX:mouseX,centerY:mouseY});

      posIndVar=posIndVar.concat(pos);

      // hack off the first one if we have more than 3 letters:
      if (posIndVar.length > 3){
        posIndVar=posIndVar.slice(1,4);
        explodeArray = explodeArray.slice(1,4);
        numWords = numWords.slice(1,4);
      }
    }
  }
  
  
  // do the stuff:
  if (posIndVar.length >= 3){
    if (posIndVar=="ANA"||posIndVar=="VVV"||posIndVar=="VAV"||posIndVar=="NNV"||posIndVar=="NNN"||posIndVar=="VAA"||posIndVar=="ANV"||posIndVar=="NVA"||posIndVar=="AVN"||posIndVar=="NNA"){
      makeSeuss();
      readSeuss();
      explodeSeussMake();
    } else {
      explodeWordsMake();
    }
  //console.log(posIndVar+ " " + numWords[0].word+ "\n");
  }
}

function displayAndUpConcerns(){
  for(var i=0; i<listConcerns.length; i++){
    noStroke();
    fill(listConcerns[i].RED,listConcerns[i].GREEN,listConcerns[i].BLUE);
    textSize(10+(listConcerns[i].weight*(2+cos(listConcerns[i].vt*(frameCount-listConcerns[i].start)/216)/2)/2));
    text(listConcerns[i].word,listConcerns[i].xpos,listConcerns[i].ypos);
    listConcerns[i].xpos=(listConcerns[i].radius+listConcerns[i].vt)*sin(-listConcerns[i].vt*(frameCount-listConcerns[i].start)/216);
    listConcerns[i].ypos=0.6*(listConcerns[i].radius+listConcerns[i].vt)*cos(-listConcerns[i].vt*(frameCount-listConcerns[i].start)/216);
    if (listConcerns[i].reduce > 0 && frameCount<=(listConcerns[i].reduce+200)){
      listConcerns[i].weight-=0.05;
      listConcerns[i].radius+=0.2;
    }
    listConcerns[i].vt = (120*(100+listConcerns[i].weight)/(listConcerns[i].weight*listConcerns[i].radius));
  }
}

function displayAndUpJoys(){
  for(var j=0; j<listJoys.length; j++){
    noStroke();
    fill(listJoys[j].RED,listJoys[j].GREEN,listJoys[j].BLUE);
    //console.log(listJoys[j].weight + "  " +listJoys[j].radius + "  " + listJoys[j].vt);
    textSize(10+(listJoys[j].weight*(2+cos(listJoys[j].vt*(frameCount-listJoys[j].start)/216)/2)/2));
    text(listJoys[j].word,listJoys[j].xpos,listJoys[j].ypos);
    listJoys[j].xpos=(listJoys[j].radius+listJoys[j].vt)*sin(-listJoys[j].vt*(frameCount-listJoys[j].start)/216);
    listJoys[j].ypos=0.6*(listJoys[j].radius+listJoys[j].vt)*cos(-listJoys[j].vt*(frameCount-listJoys[j].start)/216);
    if (listJoys[j].grow > 0 && frameCount <= (listJoys[j].grow+100)){
      listJoys[j].weight+=0.05;
      listJoys[j].radius-=0.2;
    }
    listJoys[j].vt = (120*(100+listJoys[j].weight)/(listJoys[j].weight*listJoys[j].radius));
  }
}

function makeSeuss(){
  console.log("make a seuss");
  var currentSeuss = searchSeuss(posIndVar);

  var rhymeList, k;
  
  rhymeList = lexicon.rhymes(numWords[0].word);
  var N1 = [];
  var V1 = [];
  var A1 = [];
  for (k=0;k<rhymeList.length;k++){
    var tags = RiTa.getPosTags(rhymeList[k]);
    if (tags[0] == "nn"){
      N1.push(rhymeList[k]);
    } else if (tags[0] == "vb"){
      V1.push(rhymeList[k]);
    } else if (tags[0] == "rb" || tags[0] == "jj"){
      A1.push(rhymeList[k]);
    }
  }
  rhymeList = lexicon.rhymes(numWords[1].word);
  var N2 = [];
  var V2 = [];
  var A2 = [];
  for (k=0;k<rhymeList.length;k++){
    var tags = RiTa.getPosTags(rhymeList[k]);
    if (tags[0] == "nn"){
      N2.push(rhymeList[k]);
    } else if (tags[0] == "vb"){
      V2.push(rhymeList[k]);
    } else if (tags[0] == "rb" || tags[0] == "jj"){
      A2.push(rhymeList[k]);
    }
  }
  rhymeList = lexicon.rhymes(numWords[2].word);
  var N3 = [];
  var V3 = [];
  var A3 = [];
  for (k=0;k<rhymeList.length;k++){
    var tags = RiTa.getPosTags(rhymeList[k]);
    if (tags[0] == "nn"){
      N3.push(rhymeList[k]);
    } else if (tags[0] == "vb"){
      V3.push(rhymeList[k]);
    } else if (tags[0] == "rb" || tags[0] == "jj"){
      A3.push(rhymeList[k]);
    }
  }
  
  var BL1,BL2,BL3;
  
  console.log("substituting... " + currentSeuss.B1);
  switch (currentSeuss.B1){
    case "N": 
      if (N3.length>0){
        BL1 = N3[Math.floor(random(0,N1.length))];
      } else if (N1.length>0){
        BL1 = N1[Math.floor(random(0,N1.length))];
      } else{
        BL1 = numWords[0].word;
      }
    break;
    case "A": 
      if (A3.length>0){
        BL1 = A3[Math.floor(random(0,A1.length))];
      } else if (A1.length>0){
        BL1 = A1[Math.floor(random(0,A1.length))];
      } else {
        BL1 = numWords[0].word;
      }
    break;
    case "V": 
      if (V3.length>0){
        BL1 = V3[Math.floor(random(0,V1.length))];
      } else if (V1.length>0){
        BL1 = V1[Math.floor(random(0,V1.length))];
      } else{
        BL1 = numWords[0].word;
      }
    break;
    case "W": BL1 = "";
    break;
  }
        //console.log(BL1);
  
  switch (currentSeuss.B2){
    case "N": 
      if (N2.length>0){
        BL2 = N2[Math.floor(random(0,N2.length))];
      } else if (N3.length>0){
        BL2 = N3[Math.floor(random(0,N2.length))];
      } else{
        BL2 = numWords[1].word;
      }
    break;
    case "A": 
      if (A2.length>0){
        BL2 = A2[Math.floor(random(0,A2.length))];
      } else if (A3.length>0){
        BL2 = A3[Math.floor(random(0,A2.length))];
      } else {
        BL2 = numWords[1].word;
      }
    break;
    case "V": 
      if (V2.length>0){
        BL2 = V2[Math.floor(random(0,V2.length))];
      } else if (V3.length>0){
        BL2 = V3[Math.floor(random(0,V2.length))];
      } else {
        BL2 = numWords[1].word;
      }
    break;
    case "W": BL2 = "";
    break;
  }
  
  switch (currentSeuss.B3){
    case "N": 
      if (N3.length>0){
        BL3 = N3[Math.floor(random(0,N3.length))];
      } else {
        BL3 = numWords[2].word;
      }
    break;
    case "A": 
      if (A3.length>0){
        BL3 = A3[Math.floor(random(0,A3.length))];
      } else {
        BL3 = numWords[2].word;
      }
    break;
    case "V": 
      if (V3.length>0){
        BL3 = V3[Math.floor(random(0,V3.length))];
      } else {
        BL3 = numWords[2].word;
      }
    break;
    case "W": BL3 = "";
    break;
  }
  
  /*
  BL1 = rhymeList[Math.floor(random(0,rhymeList.length))];
  BL2 = rhymeList[Math.floor(random(0,rhymeList.length))];
  if (SeussNum == 1){
    BL3 = "";
  } else {
    BL3 = numWords[2].word;
  } */
  
  seussString = currentSeuss.P1 + BL1 + currentSeuss.P2 + BL2 + currentSeuss.P3 + BL3 + currentSeuss.P4;

  console.log(seussString);
}

//Make an explosion of words.
function explodeWordsMake(){
  for (var s=0;s<explodeArray[2].length;s++){
    exPos.push({word:explodeArray[2][s],xpos:numWords[2].centerX,ypos:numWords[2].centerY,start: numWords[2].explodeTime, vx:random(-5,8),vy:random(-5,7),RED:random(255),GREEN:random(255),BLUE:random(255),size:random(20,40)});
    //console.log("explode");
  }
}

function explodeWordsDisplay(){
  //console.log("displayWords");
  for (var l=0;l<exPos.length;l++){
    if (frameCount < (exPos[l].start + 300)){
      textSize(exPos[l].size);
      fill(exPos[l].RED,exPos[l].GREEN,exPos[l].BLUE);
      noStroke();
      text(exPos[l].word, exPos[l].xpos, exPos[l].ypos);
        exPos[l].xpos += 2*exPos[l].vx;
        exPos[l].ypos += 2*exPos[l].vy; //+ 0.5*(frameCount-exPos[l].start)*(frameCount-exPos[l].start)
    }
  }
}

function explodeSeussMake(){
  for (var r=0;r<5;r++){
    exPosS.push({seussInd:Math.floor(random(0,5)),xpos:numWords[2].centerX,ypos:numWords[2].centerY,start:numWords[2].explodeTime, vx:random(-5,8),vy:random(-5,7),size:random(1,4)});
    //console.log("explodeSeuss");
  }
}
//Make an explosion of tiny seuss pngs.
function explodeSeussDisplay(){
  //console.log("displaySeuss");
  for (var l=0;l<exPosS.length;l++){
    if (frameCount < (exPosS[l].start + 300)){
      push();
      imageMode(CENTER);
      translate(exPosS[l].xpos, exPosS[l].ypos);
      scale(5*exPosS[l].size/100);
      switch(exPosS[l].seussInd){
        case 0: 
          image(seussIm1,0,0);
        break;
        case 1: 
          image(seussIm2,0,0);
        break;
        case 2: 
          image(seussIm3,0,0);
        break;
        case 3: 
          image(seussIm4,0,0);
        break;
        case 4: 
          image(seussIm5,0,0);
        break;
      }
      pop();
      exPosS[l].xpos += exPosS[l].vx;
      exPosS[l].ypos += exPosS[l].vy; // + 0.5*(frameCount-exPosS[l].start)*(frameCount-exPosS[l].start);
    }
  }
}

//Read the madlibs version of seuss aloud.
function readSeuss(){
  myVoice.setVoice("GoodNews");
  myVoice.speak(seussString);
}


function searchSeuss(_ttf) 
{
  var theresult = Seuss.filter(
    function(obj) {
      if(obj.posIndVar == _ttf) {
        return obj;
      }
    }
  )[0];
  
  return(theresult);
}
