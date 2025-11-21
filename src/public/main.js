const canvas = document.getElementById("content");
const ctx = canvas.getContext("2d");

let playerTexture = new Image();
playerTexture.src = "../textures/player.png";
let lastTime = 0;

const player = { x: 100, y: 100, vx: 0, vy: 0, w: 95, h: 40 };

function update(dt) {

  player.vy += 1000 * dt;
  player.y += player.vy * dt;

  if (player.y + player.h > canvas.height - 50) {
    player.y = canvas.height - 50 - player.h;
    player.vy = 0;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

const g = ctx.createLinearGradient(0, canvas.height - 50, 0, canvas.height);
g.addColorStop(0, '#5a5a5a');
g.addColorStop(0.5, '#444');
g.addColorStop(1, '#222');
ctx.fillStyle = g;
  ctx.fillRect(0, canvas.height - 50, canvas.width, 50);


  const img = playerTexture;
  ctx.drawImage(img, player.x, player.y, player.w, player.h);
}

function jump() {
  if (player.y + player.h >= canvas.height - 50) {
    player.vy = -400;
  }
}


const keys = { ArrowLeft: false, ArrowRight: false };

const _originalUpdate = update;
update = function(dt) {
    const accel = 2000;    
    const maxSpeed = 300;  
    const friction = 5500; 

    if (keys.ArrowLeft) player.vx -= accel * dt;
    if (keys.ArrowRight) player.vx += accel * dt;

    if (!keys.ArrowLeft && !keys.ArrowRight) {
        if (player.vx > 0) player.vx = Math.max(0, player.vx - friction * dt);
        else if (player.vx < 0) player.vx = Math.min(0, player.vx + friction * dt);
    }

    player.vx = Math.max(-maxSpeed, Math.min(maxSpeed, player.vx));
    player.x += player.vx * dt;

    player.x = Math.max(0, Math.min(canvas.width - player.w, player.x));

    _originalUpdate(dt);
};

window.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') keys.ArrowLeft = true;
    else if (e.code === 'ArrowRight') keys.ArrowRight = true;
    else if (e.code === 'ArrowUp' || e.code === 'Space') {
        jump();
    }

    if (['ArrowLeft','ArrowRight','ArrowUp','Space'].includes(e.code)) e.preventDefault();
});

window.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowLeft') keys.ArrowLeft = false;
    else if (e.code === 'ArrowRight') keys.ArrowRight = false;
});

function loop(timestamp) {
  const dt = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  update(dt);
  draw();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
