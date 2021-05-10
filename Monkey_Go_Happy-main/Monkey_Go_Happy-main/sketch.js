var backImage,backgr;
var player, player_running;
var ground,ground_img;
var obstacle,obstaclesGroup,bananas,bananaGroup;
var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;
var obstacleImg,bananaImg;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  playerImg = loadAnimation("Monkey_01.png");
  obstacleImg = loadImage("stone.png");
  bananaImg = loadImage("banana.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,350,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,100);
  ground.x=ground.width/2;
  ground.visible=false;
  
  obstaclesGroup = new Group();
  bananaGroup = new Group();
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -20;
    }
    if(keyDown("DOWN_ARROW")){
      player.velocityY+=10;
    }
    player.velocityY = player.velocityY + 0.8;
    //if(player.velocityY>10){
      //player.bounceOff(ground);
    //}else{
      player.collide(ground);
    //}
    if(World.frameCount%83== 0){
      bananas = createSprite(800,250,10,10);
      bananas.addImage(bananaImg);
      bananas.scale = 0.1;
      bananas.lifetime = 300;
      bananaGroup.add(bananas);
      bananas.velocityX = -6;
    }
    if(player.isTouching(obstaclesGroup)){
      gameState = END;
      bananaGroup.destroyEach();
    }
    if(player.isTouching(bananaGroup)){
      score += 1;
      bananaGroup.destroyEach();
    }
    text("Score:"+score,750,20);
  }
  if(gameState === END){
    backgr.velocityX = 0;
    player.velocityX = 0;
    player.velocityY = 0;
    bananaGroup.destroyEach();
    bananaGroup.setLifetimeEach(0);
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    player.changeAnimation("ded",playerImg);
  }
  spawnEntities();
  drawSprites();
}

function spawnEntities(){
  if(World.frameCount%50 === 0){
    obstacle = createSprite(800,320,10,10);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.1;
    obstacle.lifetime = 300
    obstaclesGroup.add(obstacle);
    obstacle.velocityX = -6;
    }
}