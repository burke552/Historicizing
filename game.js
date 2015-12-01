(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("a");
    ctx = canvas.getContext("2d");

    var images = new function(){
      this.background = new Image();
      this.background.src = "background.jpg";
    }

    width = 640;
    height = 480;
    player = {
      x : 35,
      y : height - 15,
      width : 14,
      height : 15,
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
        // up arrow or space
      if(!player.jumping){
       player.jumping = true;
       player.velY = -player.speed*1.33;}}

       if (player.jumping && !player.doubleJump){
        if (keys[32]) {
          player.doubleJump = true;
          player.velY = -player.speed*1.17;}}

    if (keys[39]) {
        // right arrow
        if (player.velX < player.speed) {
            player.velX++;}
    }
    if (keys[37]) {
        // left arrow
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
    ctx.clearRect(0,0,width,height);
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height)

  requestAnimationFrame(update);
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
