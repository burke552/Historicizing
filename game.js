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

      var render = function(){
        if (bgReady){
          ctx.drawImage(bgImage, 0, 0);}
        if (heroReady){
            ctx.drawImage(heroImage, player.x, player.y);}
        };

      var renderB = function(){
        if (bgReady){
          ctx.drawImage(bgImage, 0, 0);}
        if (heroBReady){
          ctx.drawImage(heroImageB, player.x, player.y);}
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
      doubleJump: false},
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

    if (player.x >= width-player.width) {
        player.x = width-player.width;
    } else if (player.x <= 0) {
        player.x = 0;
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

    if (player.faceLeft)
       renderB();
    else render();

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
