var dog, database, foodS, foodStock,dogImg,happyDogImg,milkImg,FeedTime,lastFed;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
	happyDogImg = loadImage("images/dogImg1.png");
 
}

function setup() {
	createCanvas(1000, 500);
  dog = createSprite(800,300,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  database = firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value",readStock,showError);
 
  feed = createButton("FEED THE DOG");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("ADD FOOD");
  addFood.position(800,95);
  addFood.mousePressed(addFoodS);

  food1=new Food;
}


function draw() {  
  background(46, 139, 87);
  // if(keyWentDown(UP_ARROW)){
  //   foodS -= 1;
  // }
  // if(keyWentDown(UP_ARROW)){
  //   addFood(foodS);
    
  // }
  drawSprites();
  
  food1.display();

  fedTime=database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255);
  text("food left: "+ foodS,200,100);

  if(lastFed>=12){
    text("Last Feed: "+ lastFed%12+"PM",350,30);
  }else if(lastFed == 0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed: "+ lastFed+ " AM",350,30);
  }
}

function readStock(data){
  foodS=data.val();
  food1.updateFoodStock(foodS);
}

// function writeStock(x){

// if(x<=0){
//   x=0
 
// }else{
//   x=x-1;
// }

//   database.ref('/').update({
//     food:x
//   })
// }

function showError(){
  console.log("error");
}

function feedDog(){
  dog.addImage(happyDogImg);
  food1.updateFoodStock(food1.getFoodStock()-1);
  database.ref("/").update({
    food:food1.getFoodStock(),
    FeedTime:hour()
  })

}

function addFoodS(){
  foodS++;
  database.ref("/").update({food:foodS});

}