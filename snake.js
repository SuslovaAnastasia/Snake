let scoreDisplayElem = document.querySelector('.scoreboard');
let hiscoreDisplayElem = document.querySelector('.hi');
let playButton = document.querySelector('.pause');
let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
let paused = false;
let grid = 16;
let count = 0;

function restart(gameLoop) {
    let isStarted = document.querySelector('.started');
    if (isStarted) {
        return false;
    }
    canvas.classList.add("started");
    requestAnimationFrame(gameLoop);

}

function resetSnake() {
    scoreDisplayElem.innerHTML = ' 0';
    let snake = {
        x: 160,
        y: 160,
        dx: grid,
        dy: 0,
        cells: [],
        maxCells: 2,
        score: 0,
    };
    return snake;
}
let snake = resetSnake();
let score = 0;
let hiscore = 0;
let apple = {
    x: Math.floor((Math.random() * 17 + 1)) * grid,
    y: Math.floor((Math.random() * 15 + 3)) * grid,
};

const getRandomInt = (mn, mx) => Math.floor(Math.random() * (mx - mn)) + mn;

function gameLoop() {

    requestAnimationFrame(gameLoop);
    if (++count < 4) return;
    if (paused) throwError();
    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0) {
        snake = resetSnake();
        pause();
    }
    else if (snake.x >= canvas.width) {
        snake = resetSnake();
        pause();
    }


    if (snake.y < 0) {
        snake = resetSnake();
        pause();

    }
    else if (snake.y >= canvas.width) {
        snake = resetSnake();
        pause();
    }

    snake.cells.unshift({ x: snake.x, y: snake.y });

    if (snake.cells.length > snake.maxCells) snake.cells.pop();

    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    context.fillStyle = 'green';
    snake.cells.forEach(function (cell, index) {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1)
        if (cell.x === apple.x && cell.y == apple.y) {
            snake.maxCells++;
            scoreDisplayElem.innerHTML = ++score;
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
            if (score > hiscore) {
                hiscore = score;
                hiscoreDisplayElem.innerHTML = '' + hiscore;
            }
        }
        if (cell.x === 0 || cell.y === 0 || cell.x >= canvas.width || cell.y >= canvas.height) {
            scoreDisplayElem.innerHTML = ' 0';
            score = 0;
            snake = resetSnake();
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
            pause();
        }
        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y || snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.width) {
                scoreDisplayElem.innerHTML = ' 0';
                score = 0;
                snake = resetSnake();
                apple.x = getRandomInt(0, 25) * grid;
                apple.y = getRandomInt(0, 25) * grid;
            }
        }
    });
}

document.addEventListener('keydown', function (e) {
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
    else if (e.which == 32) {
        paused = !paused;
        document.querySelector('.pause').innerHTML = paused ? 'Play' : 'Pause';
    }

});


function pause() {
    paused = !paused;
    document.querySelector('.pause').innerHTML = paused ? 'Play' : 'Pause';
    playButton.classList.remove("hide");

}


