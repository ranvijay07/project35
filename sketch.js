var balloon,balloonImage;
var background,backgroundImage;
var database;
var position;

function preload(){
  backgroundImage=loadImage("Hot Air Ballon-01.png")
  balloonImage=loadImage("Hot Air Ballon-02.png")
}

function setup() {
  database=firebase.database()

  createCanvas(1300,800);

  balloon=createSprite(250,250)
  balloon.addImage("ballonImage",balloonImage)

  var balloonPosition=database.ref("balloon/position")
  balloonPosition.on("value",readPosition,showError)
  
}

function draw() {
  background(backgroundImage); 
  if(position!==undefined){
    
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
  } 
    drawSprites();
}

function changePosition(x,y){
  database.ref("balloon/position").set({
    x: position.x+x,
    y: position.y+y
  })
}

function readPosition(data){
  position=data.val();
  balloon.x=position.x
  balloon.y=position.y
}

function showError(){
  console.log("show error")
}
