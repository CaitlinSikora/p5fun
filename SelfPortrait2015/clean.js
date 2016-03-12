function cleanCSV(csvobj) {
  var table = [];
  var rowInd =0;
  var column = [];
  for (var j=2; j < csvobj.getColumnCount();j++){
    if (csvobj.get(5,j)!="Rotation"){
      for (var i=7; i < csvobj.getRowCount();i++){
        //console.log(csvobj.get(i, j));
        if (csvobj.getNum(i,j)!=0){
          column.push(floor(10000*csvobj.getNum(i,j)));
          console.log(column[rowInd]);
          rowInd++;
        } else {
          column.push(2000000);
          //console.log(column[rowInd]);
          rowInd++;
        }
      }
      table.push(column);
      column=[];
      //console.log(list[j]);
      rowInd=0;
    }
  }
  console.log("clean complete");
  return table;
}