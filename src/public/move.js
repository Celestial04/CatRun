
const keys = { ArrowLeft: false, ArrowRight: false };

// rappeler l'update original puis le remplacer pour ajouter le mouvement horizontal
const _originalUpdate = update;
update = function(dt) {
    const accel = 2000;    // accélération px/s² quand une flèche est enfoncée
    const maxSpeed = 300;  // vitesse max px/s
    const friction = 5500; // décélération quand aucune touche

    if (keys.ArrowLeft) player.vx -= accel * dt;
    if (keys.ArrowRight) player.vx += accel * dt;

    if (!keys.ArrowLeft && !keys.ArrowRight) {
        if (player.vx > 0) player.vx = Math.max(0, player.vx - friction * dt);
        else if (player.vx < 0) player.vx = Math.min(0, player.vx + friction * dt);
    }

    // clamp vitesse et appliquer position
    player.vx = Math.max(-maxSpeed, Math.min(maxSpeed, player.vx));
    player.x += player.vx * dt;

    // empêcher de sortir du canvas
    player.x = Math.max(0, Math.min(canvas.width - player.w, player.x));

    // appeler l'update précédent pour la gravité / saut
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
