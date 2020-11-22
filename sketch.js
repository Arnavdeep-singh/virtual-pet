var dog, happyDog, database, foodS, foodStock,dogImg,happyDogImg;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
	happyDogImg = loadImage("images/dogImg1.png");
  
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,300,10,10);
  dog.addImage("dog",dogImg);
  dog.scale = 0.5;

  database = firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value",readStock,showError);
 
}


function draw() {  
  background(46, 139, 87);
  // if(keyWentDown(UP_ARROW)){
  //   foodS -= 1;
  // }
  drawSprites();
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  fill(255);
  text("food left: "+ foodS,200,100);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

if(x<=0){
  x=0
}else{
  x=x-1;
}

  database.ref('/').update({
    food:x
  })
}

function showError(){
  console.log("error");
}