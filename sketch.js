//Global variables

var dog,dogImg,happyDog,database,food,foodImg,foodStock;
var feed,addfood,feedtime,lastFed;
var foodObj
function preload()
{
  //loaded images
  dogImg=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png")
}

function setup() {
  database =firebase.database();
  createCanvas(500, 500);
  
  //creating sprite for dog
  dog=createSprite(250,250,150,150);
  dog.addImage(dogImg);
  dog.scale=0.1;

  foodObj=new Food(300,300,50,50)
  
  //reading food stock from database
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
 
  feed=createButton("Feed the Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addfood=createButton("Add Food")
  addfood.position(800,95)
  addfood.mousePressed(addfood)
  feedtime=database.ref('Feedtime')
  feedtime.on("value",function(data){
    lastFed=data.val()
  })
}


function draw() {  
  background(46,139,87);
  drawSprites();
  text("Remaining food: "+food,400,200);
  textSize(13)
  text("Note:Up arrow key to give Drago milk",400,100);
}
function readStock(data){
  food=data.val();  
}

function writeStock(x){
  if(x<=0){
    x=0;
  }  
  else{
    x=x-1
  }
 database.ref('/').update({
  food:x
  })
 
fill(255,255,254)
textSize(15)
if(lastFed>=12){
  text("Last feed:"+lastFed%12+"PM",350,30)}
  else if(lastFed==0){
 text("Last Feed:12 AM",350,30)
  }
else{
  text("last Feed:"+lastFed+"AM",350,30)
}



}
function feedDog(){
dog.addImage(happyDog)

foodObj.updateFoodStock(foodObj.getFoodStock()-1)
database.ref('/').update({
 food:foodObj.getFoodStock(),
  feedtime:hour()
})
}
function addfood(){
  foodStock++;
  database.ref('/').update({
    Food:foodStock
  })
}  
