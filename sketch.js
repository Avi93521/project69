var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

//var heart1, heart2, heart3;
//var heart1Img, heart2Img, heart3Img;
 var topGround
 var bottomGround

var zombieGroup;


var gameState = "play"
var life=3;
 var score=0;
 var bullets=20;
//var sound
//var sound1
var sound2
var button
var buttonImg
var b1
var b
var c
var play
var playImg
function preload(){
  
 
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")

sound2=loadSound("assets/explosion.mp3")
buttonImg=loadImage("assets/restart.png")
b1=loadImage("assets/pic1.jpg")
c=loadImage("assets/pic2.png")
playImg=loadImage("assets/pic3.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1



 // play=createSprite(950,170,80,60)
//play.addImage(playImg)
//play.scale=0.4

bottomGround=createSprite(width/2,height-10,width,10)
bottomGround.visible=false
topGround=createSprite(width/2,height/2-452,width,20)
topGround.visible=false
//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   //player.debug = true
   player.setCollider("rectangle",0,0,280,420)


   //creating sprites to depict lives remaining
   //heart1 = createSprite(displayWidth-150,40,20,20)
   //heart1.visible = false
    //heart1.addImage("heart1",heart1Img)
   // heart1.scale = 0.4

   // heart2 = createSprite(displayWidth-100,40,20,20)
    //heart2.visible = false
    //heart2.addImage("heart2",heart2Img)
    //heart2.scale = 0.4

    //heart3 = createSprite(displayWidth-150,40,20,20)
    //heart3.addImage("heart3",heart3Img)
    //heart3.scale = 0.4
   

    //creating groups for zombies and bullets
    bulletGroup = new Group()
    zombieGroup = new Group()



}

function draw() {
  background(b1); 


if(gameState === "play"){

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
if(keyDown("LEFT_ARROW")||touches.length>0){
  player.x = player.x-30
}
if(keyDown("RIGHT_ARROW")||touches.length>0){
  player.x = player.x+30
}
//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1150,player.y-30,20,10)
  bullet.addImage(c)
  bullet.velocityX = 20
  bullet.scale=0.3
  bulletGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth+2
  player.addImage(shooter_shooting)
  bullets = bullets-1
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

//go to gameState "bullet" when player runs out of bullets


//destroy the zombie when bullet touches it
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){     
      
   if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
        score=score+1;
        sound2.play();
       
        } 
  
  }
}
if(bulletGroup.velocityX<1){
  
       bullets=bullets-1;
        
}
if(player.isTouching(bottomGround)){
  
  textSize(100)
  fill("red")
  text("You Lost ",600,400)
  bg.visible=false
  zombieGroup.destroyEach();
  player.destroy();
  button.visible=true
   
}
if(player.isTouching(topGround)){
  
  textSize(100)
  fill("red")
  text("You Lost ",600,400)
  bg.visible=false
  zombieGroup.destroyEach();
  player.destroy();
  button.visible=true
   
}


//destroy zombie when player touches it
if(zombieGroup.isTouching(player)){

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
       life=life-1;

       
       } 
 
 }
}

//calling the function to spawn zombies
enemy();
}


  if(life ===0 ){
   //gameState=end
    textSize(100)
    fill("red")
    text("You Lost ",600,400)
    text("Score:"+score,100,70)
    bg.visible=false
    zombieGroup.destroyEach();
    player.destroy();
    button.visible=true
  //sound.play();
  }
  
  //destroy zombie and player and display a message in gameState "won"
   if(score === 10){
    //gameState=end
   textSize(100)
    fill("yellow")
    text("You Won ",600,400)
    text("Score:"+score,100,70)
    zombieGroup.destroyEach();
    player.destroy();
    bg.visible=false
    button.visible=true
  //sound1.play();
  }
  
  //destroy zombie, player and bullets and display a message in gameState "bullet"
   if(bullets===0){
   //gameState=end
    textSize(50)
    fill("white")
    text("You ran out of bullets!!!",600,400)
    text("Score:"+score,100,70)
    zombieGroup.destroyEach();
    player.destroy();
    bulletGroup.destroyEach();
   bg.visible=false
   button.visible=true
  sound.play();
  }
  
//button.visible=false


textSize(30)
fill("white")
text("Bullets: "+bullets,1700,50)

textSize(30)
fill("white")
text("Score: "+score,100,50)

////Start();

//if(keyWentDown("enter")){
  //gameState="play"
  //bg.visible=true
  //player.visible=true
  //play.visible=false
 //zombieGroup.setVisibleEach(true)
 //zombieGroup.setVelocityXEach(-3)
 enemy();
//}
drawSprites();
textSize(30)
fill("white")
text("Lives: "+life,1400,50)





//destroy zombie and player and display a message in gameState "lost"

}
//zombie.debug= true
//zombie.setCollider("rectangle",0,0,500,400)
//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(width,width-10),random(height-60,height/2+50),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -15;
   // zombie.debug= true
   zombie.setCollider("rectangle",0,0,350,950)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}
//function Start(){
 //bg.visible=false
  //player.visible=false
  //zombieGroup.setVisibleEach(false)
  //zombieGroup.setVelocityXEach(0)
  //play.visible=true
  //textSize(50)
   // fill("black")
    //text("ZOMBIE KILLER GAME",730,100)
    //textSize(30)
    //text("Press Enter Key To START",800,170)
    
//}
