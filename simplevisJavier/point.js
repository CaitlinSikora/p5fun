function Point(){
  //Write a method to calculate motion parameters and visualize them.
  this.stats = function(posX,posY,posZ){
    this.posX=posX;
    this.posY=posY;
    this.posZ=posZ;
  }
}

//Calculate the magnitude of a vector given its components.
function mag(X,Y,Z){
  return sqrt((X*X)+(Y*Y)+(Z*Z));
}