var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
}

function draw() {
  background(200);
  if (gameState === "play") {
    if (tower.y > 400) {
      tower.y = 300;
    }
    //controles do jogo
    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    }

    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }

    if (keyDown("space")) {
      ghost.velocityY = -10;
    }
    //gravidade do jogo
    ghost.velocityY = ghost.velocityY + 8;

    //janelas
    spawjanelas();

    if(climbersGroup.isTouching(ghost)){ ghost.velocityY = 0; } if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){ ghost.destroy(); gameState = "end" }
    drawSprites();
  }

  if (gameState === "end") {
    stroke("red");

    fill("red");

    textSize(30);

    text("fim de jogo", 230, 250);
  }
}

function spawjanelas() {
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200, 10);
    var invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    door.x = Math.ground(random(120, 400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    //adicionando imagens
    door.addImage(doorImg);
    climber.addImage(climberImg);

    //velosidades

    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    //profundades do fantasma
    ghost.debth = door.debth;
    ghost.debth += 1;
    //TENPO DE VIDA PARA OS OBJETOS
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    //adicionar cada objeto ao seus grupos
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
