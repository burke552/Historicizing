(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("a");
  var ctx = canvas.getContext("2d");

    var bgReady = false;
    var bgImage = new Image();
    bgImage.onload = function (){
      bgReady = true;};
      bgImage.src = "Assets/background.png";

    var heroReady = false;
    var heroImage = new Image();
    heroImage.onload = function (){
      heroReady = true;};
      heroImage.src = "Assets/Character.png";

    var heroBReady = false;
    var heroImageB = new Image();
    heroImageB.onload = function (){
      heroBReady = true;};
      heroImageB.src = "Assets/BCharacter.png";

    var enemyReady = false;
    var enemyImage = new Image();
    enemyImage.onload = function (){
      enemyReady = true;};
      enemyImage.src = "Assets/ECharacter.png";

    var enemyBReady = false;
    var enemyImageB = new Image();
    enemyImageB.onload = function (){
      enemyBReady = true;};
      enemyImageB.src = "Assets/BECharacter.png";

      var render = function(){
        if (bgReady){
          ctx.drawImage(bgImage, 0, 0);}
        if (!player.faceLeft){
          if (heroReady){
            ctx.drawImage(heroImage, player.x, player.y);}}
        else if (heroBReady){
              ctx.drawImage(heroImageB, player.x, player.y);}
        if (!enemy.faceLeft){
          if (enemyReady){
              ctx.drawImage(enemyImage, enemy.x, enemy.y);}}
        else if (enemyBReady){
              ctx.drawImage(enemyImageB, enemy.x, enemy.y);}
              };


    width = 640;
    height = 480;
    player = {

      width : 28,
      height : 30,
      x : 35,
      y : height - 30,
      faceLeft: false,
      speed: 7,
      velX: 0,
      velY: 0,
      jumping: false,
      doubleJump: false,
      defeat: false},

    enemy = {

      width : 44,
      height : 32,
      x : 355,
      y : height - 32,
      faceLeft: false,
      speed: 3.85},

    keys = [],
    friction = 0.78,
    gravity = 0.32;

canvas.width = width;
canvas.height = height;

function update(){
  // check keys
    if (keys[38]) {
        // up arrow
      if(!player.jumping){
       player.jumping = true;
       player.velY = -player.speed*1.14;}}

       if (player.jumping && !player.doubleJump){
        if (keys[32]) { // space
          player.doubleJump = true;
          player.velY = -player.speed*0.87;}}

    if (keys[39]) {
        // right arrow
        player.faceLeft = false;
        if (player.velX < player.speed) {
            player.velX++;}
    }
    if (keys[37]) {
        // left arrow
        player.faceLeft = true;
        if (player.velX > -player.speed) {
            player.velX--;}
    }

    player.velX *= friction;

    player.velY += gravity;

    player.x += player.velX;
    player.y += player.velY;

    if (enemy.faceLeft)
      enemy.x -= enemy.speed;
      else enemy.x += enemy.speed;

    if (player.x >= width-player.width) {
        player.x = width-player.width;
    } else if (player.x <= 0) {
        player.x = 0;
    }

    if (enemy.x >= width-enemy.width) {
        enemy.x = width-enemy.width;
        enemy.faceLeft = true;
    } else if (enemy.x <= 0) {
        enemy.x = 0;
        enemy.faceLeft = false;
    }

    if(player.y >= height-player.height){
        player.y = height - player.height;
        if (!keys[38]){
            player.jumping = false;
        player.doubleJump = false;}}
    else if (player.y <= 0) {
        player.y = 0;
    }

  requestAnimationFrame(update);

    render();

}

document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});

window.addEventListener("load",function(){
    update();

});
