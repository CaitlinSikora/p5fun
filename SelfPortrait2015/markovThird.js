//Use a function to convert the csv data to lists that can be easily turned into models.
function convertCSVtoListXY(csvobj) {
  var list = [];
  var listInd =0;
  var pointList = [];
  for (var j=0; j < csvobj.getColumnCount();j+=3){
    for (var i=0; i < csvobj.getRowCount()-3;i+=1){
      //console.log(csvobj.get(i, j));
      if (csvobj.getNum(i,j)<10000&&csvobj.getNum(i,j)>-10000&&csvobj.getNum(i+1,j)<10000&&csvobj.getNum(i+1,j)>-10000&&csvobj.getNum(i+1,j)>-10000&&csvobj.get(i,j)!=null&&csvobj.get(i+1,j)!=null&&csvobj.getNum(i+2,j)<10000&&csvobj.getNum(i+2,j)>-10000&&csvobj.get(i+2,j)!=null){
        pointList.push([csvobj.getNum(i,j),csvobj.getNum(i,j+1),csvobj.getNum(i,j+2),csvobj.getNum(i+1,j),csvobj.getNum(i+1,j+1),csvobj.getNum(i+1,j+2),csvobj.getNum(i+2,j),csvobj.getNum(i+2,j+1),csvobj.getNum(i+2,j+2)]);
        //console.log(list[listInd]);
        listInd++;
      }
    }
    list.push(pointList);
    pointList=[];
    //console.log(list[j]);
    listInd=0;
  }
  console.log("listXYZ complete");
  return list;
}

//Create a model using the datalist. X and Y are coupled and this is a third order model.
function createModel(datalist,countPoints) {
  var model = [];
  var value;
  var modelInd=0;
  var pointModel=[];
  for (var j=0;j<countPoints;j++){
    for (var i=0;i<((datalist[j].length)-30);i++){
      value = datalist[j][i];
      //console.log(value);
      if (i==0) {
        pointModel.push({val:value,nextVal:[]});
        pointModel[modelInd].nextVal.push(datalist[j][i+1]);
        //console.log(pointModel[modelInd]);
        modelInd++;
      }
      var row = findModelRow(pointModel,value[0],value[1],value[2],value[3],value[4],value[5],value[6],value[7],value[8]);
      if (row == 0.5) {
        pointModel.push({val:value,nextVal:[]});
        pointModel[modelInd].nextVal.push(datalist[j][i+1]);
        modelInd++;
      }
      else if (/*!matchVal(pointModel[row].nextVal,datalist[j][i+1])&&datalist[j][i]!=datalist[j][i+1]&&*/datalist[j][i+1]!=null){
        pointModel[row].nextVal.push(datalist[j][i+1]);
        //console.log(pointModel[row].val+ "  " + pointModel[row].nextVal);
      }
    }
    model.push(pointModel);
    //console.log(pointModel);
    pointModel=[];
    modelInd=0;
  }
  console.log("made your model");
  return model;
}

//Initialize a frame based on the frameCount.
function initialize(csvobj,countPoints,frame) {
  var currentFrame=[];
  for (var m=0; m<countPoints; m++){
    currentFrame.push([csvobj.getNum(frame,m*3),csvobj.getNum(frame,(m*3)+1),csvobj.getNum(frame,(m*3)+2),csvobj.getNum(frame+1,m*3),csvobj.getNum(frame+1,(m*3)+1),csvobj.getNum(frame+1,(m*3)+2),csvobj.getNum(frame+2,m*3),csvobj.getNum(frame+2,(m*3)+1),csvobj.getNum(frame+2,(m*3)+2)]);
  }
  //console.log(currentFrame);
  return currentFrame;
}

//Use the model to make new data depending on the previous 3 frames. X and Y are coupled.
function generate(modelXY,currentFrame) {
  var valX,valY,valZ,valX2,valY2,valZ2,valX3,valY3,valZ3,rowValXY,chooseXY,chooseY;
  var nextPoints = [];
  for (var m=0; m < currentFrame.length;m++){
    valX = currentFrame[m][0];
    valY = currentFrame[m][1];
    valZ = currentFrame[m][2];
    valX2 = currentFrame[m][3];
    valY2 = currentFrame[m][4];
    valZ2 = currentFrame[m][5];
    valX3 = currentFrame[m][6];
    valY3 = currentFrame[m][7];
    valZ3 = currentFrame[m][8];
    //console.log(valX + " " + valY);
    rowValXY = searchModel(modelXY[m],valX,valY,valX2,valY2,valX3,valY3);
    chooseXY = floor(random(rowValXY.nextVal.length));
    //console.log(rowValX.val + "  " + rowValY.val);
    //console.log(rowValX.nextVal + "  " + rowValY.nextVal);
    //console.log(chooseX + "  " + chooseY);
    //console.log(rowValX.nextVal[chooseX]+ "  " +rowValY.nextVal[chooseY]);
    nextPoints.push([rowValXY.nextVal[chooseXY][0],rowValXY.nextVal[chooseXY][1],rowValXY.nextVal[chooseXY][2],rowValXY.nextVal[chooseXY][3],rowValXY.nextVal[chooseXY][4],rowValXY.nextVal[chooseXY][5],rowValXY.nextVal[chooseXY][6],rowValXY.nextVal[chooseXY][7],rowValXY.nextVal[chooseXY][8]]);;
  }
  return nextPoints;
}

//Make a function to find a row that matches and return its location.
function findModelRow(model,valX,valY,valZ,valX2,valY2,valZ2,valX3,valY3,valZ3) {
  var row=0.5;
  for (var n=0;n<model.length;n++){
    if (model[n].val[0]==valX && model[n].val[1]==valY && model[n].val[3]==valX2 && model[n].val[4]==valY2 && model[n].val[6]==valX3 && model[n].val[7]==valY3){
      row = n;
    }
  } 
  //if (row != 0.5){
  //  console.log(row);
  //}
  return row;
}

//Make a function to search the model for incoming data and return the whole entry for that value.
function searchModel(model,valX,valY,valX2,valY2,valX3,valY3) 
{
  var theresult = model.filter(
    function(obj) {
      if(obj.val[0]==valX && obj.val[1]==valY && obj.val[3]==valX2 && obj.val[4]==valY2 && obj.val[6]==valX3 && obj.val[7]==valY3) {
        //console.log("check");
        return obj;
      }
    }
  )[0];
  if (theresult==null){
    console.log("not");
    //theresult = model[floor(random(model.length))];
    theresult = model[0];
  }
  return(theresult);
}

//Test if a value exists in an array.
function matchVal(array,value){
  var dum = false;
  for (w=0;w<array.length;w++){
    if (array[w]==value){
      dum = true;
    }
  }
  return dum;
}