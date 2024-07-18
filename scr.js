const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let dino = {
    x: 50,
    y: 150,
    width: 50,
    height: 50,
    dy: 0,
    jumpHeight: 15,
    gravity: 1,
    image: new Image(),
    rotate: .52
};

let obstacle = {
    x: canvas.width - 350,
    y: 150,
    width: 20,
    height: 50,
    dx: 6
};

let object2 = {
    x: canvas.width,
    y: 140,
    width: 10,
    height: 70,
    dx:6
}

let isJumping = false;
let score = 0;
let gameOver = false;

dino.image.src = './image.png'; // Укажите путь к изображению динозавра

document.addEventListener('keydown', (event) => {   
    if (event.code === 'Space' && !isJumping) {
        isJumping = true;
        dino.dy = -dino.jumpHeight;
    }
});

function drawDino() {
    // Рисуем изображение динозавра
    ctx.drawImage(dino.image, dino.x, dino.y, dino.width, dino.height);
}

function drawObstacle() {
    ctx.fillStyle = 'red';
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    ctx.fillStyle = 'blue'
    ctx.fillRect(object2.x, object2.y, object2.width, object2.height)
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dino.dy += dino.gravity;
    dino.y += dino.dy;

    if (dino.y > 150) {
        dino.y = 150;
        dino.dy = 0;
        isJumping = false;
    }

    obstacle.x -= obstacle.dx;
    object2.x -= object2.dx;

    if (obstacle.x + obstacle.width < 0) {
        obstacle.x = canvas.width;
        score++;
    }

    if (object2.x + object2.width < 0) {
        object2.x = canvas.width;
        score++;
    }

    if (
        dino.x < obstacle.x + obstacle.width &&
        dino.x + dino.width > obstacle.x &&
        dino.y < obstacle.y + obstacle.height &&
        dino.y + dino.height > obstacle.y 
        ||
        dino.x < object2.x + object2.width &&
        dino.x + dino.width > object2.x &&
        dino.y < object2.y + object2.height &&
        dino.y + dino.height > object2.y
    ) {
        gameOver = true;
        alert(`Game Over! Your score: ${score}`);
        document.location.reload();
    }

    drawDino();
    drawObstacle();
    drawScore();

    requestAnimationFrame(update);
}

// Ждем, пока изображение динозавра загрузится, чтобы начать игру
dino.image.onload = function() {
    update();
};
