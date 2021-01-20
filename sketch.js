var Dog,happydog,foodS,foodStock,database;
var fedTime,Lastfed,foodObj;

function preload()
{
  DogImage=loadImage("Dog.png")
  happydog=loadImage("happydog.png")
}

function setup() {
  createCanvas(500,500);
  database=firebase.database()
  Dog=createSprite(250,200,5,5)
  Dog.scale=0.2
  Dog.addImage(DogImage)
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)
 
  feed=createButton("Feed the Dog")
  feed.position(700,95);
  feed.mousePresssed(FeedDog);

  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePresssed(addFoods)

  foodObj=new Food();




  
}


function draw() { 
  background(46,139,87)
  
  drawSprites();
  textSize(12)
  fill("red")
  stroke("black")
  text("Milk Bottles remaining:"+ foodS,150,100)
  text("Note:Press the UP_ARROW key to feed Drago Milk",150,50)
console.log(foodS)

fill(255,255,254)
textSize(15)
if(Lastfed>=12){
text("Last Fed:"+Lastfed%12+ "PM",350,30)
}
else if (Lastfed==0){
text("Last Fed :12 AM",350,30)
}else{
  text("Last Fed:"+Lastfed+"AM",350,30)
}

fedTime=database.ref('fedTime');
fedTime.on("value",function(data){
Lastfed=data.val();
});



if(foodS<0){
  foodS=20;
}

foodObj.display();

}
function readStock(data){
  foodS=data.val()
}
function writeStock(x){
  x=x-1
database.ref('/').update({
  Food:x
})
}

function FeedDog(){
  Dog.addImage(happydog)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    fedTime:hour()
  })
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}

 

