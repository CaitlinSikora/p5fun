function cleanCSV(csvobj) {
  var table = [];
  var rowInd =0;
  var column = [];
  var label;
  for (var j=2; j < 271;j++){
    label = csvobj.get(4,j);
    //console.log(label);
    //if (label[0]!="R"&&csvobj.get(2,j)!="Richard_LToe"&&csvobj.get(2,j)!="Richard_RToe"){
    if (label[0]!="R"&&csvobj.get(6,j)!=""){
      for (var i=7; i < csvobj.getRowCount();i++){
        //console.log(csvobj.get(i, j));
        if (csvobj.get(i,j)!=""&&csvobj.get(i,j)!=0&&csvobj.get(i,j)!=null){
          column.push(floor(1000*csvobj.getNum(i,j)));
          //console.log(column[rowInd]);
          rowInd++;
        } else {
          column.push(2000000);
          //console.log("fill");
          //console.log(column[rowInd]);
          rowInd++;
        }
      }
      table.push(column);
      column=[];
      //console.log(column[j]);
      rowInd=0;
    } else {
      //console.log("rotation");
    }
  }
  console.log("cleaning complete");
  return table;
}