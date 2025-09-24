const canvas = document.getElementById("Crystalplay");
const ctx = canvas.getContext("2d");

const startBtn = document.getElementById("startBtn");

const cellSize = 5;
const cols = canvas.width / cellSize;
const rows = canvas.width / cellSize;

let grid = Array.from({length:rows}, () => Array(cols).fill(0));

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.width);

    for (let x=0; x<rows; x++) {
        for (let y=0; y<cols; y++) {
            if (grid[x][y] == 1) {
                ctx.fillStyle = "cyan";
                ctx.fillRect(y*cellSize, x*cellSize, cellSize, cellSize);
            }
        }
    }
}

function setCell(x, y) {
    if (x>=0 && y>=0 && x<cols && y<rows) {
        grid[x][y] = 1;
        drawGrid();
    }
}

// Seed

const seed_x = Math.floor(Math.random() * cols);
const seed_y = Math.floor(Math.random() * rows);

setCell(seed_x, seed_y)

const seed1_x = Math.floor(Math.random() * cols);
const seed1_y = Math.floor(Math.random() * rows);

setCell(seed1_x, seed1_y)


function randomAtom() {
    const x = Math.floor(Math.random() * cols);
    const y = Math.floor(Math.random() * rows);

    return { x, y }; 
}


function moveAtom(atom) {
    const direction = [-1,0,1]
    atom.x += direction[Math.floor(Math.random()*direction.length)];
    atom.y += direction[Math.floor(Math.random()*direction.length)];

    if (atom.x < 0) atom.x = 0;
    if (atom.x >= cols) atom.x = cols - 1;
    if (atom.y < 0) atom.y = 0;
    if (atom.y >= rows) atom.y = rows - 1;

    return atom;
}

function isNextToCrystal(atom) {
    return (
        grid[atom.y][atom.x + 1] === 1 ||
        grid[atom.y][atom.x - 1] === 1 ||
        grid[atom.y + 1]?.[atom.x] === 1 ||
        grid[atom.y - 1]?.[atom.x] === 1
    );
}

function mainLoop() {
    const maxAtom = 5;

    for (let i = 1; i <= maxAtom; i++) {
        let atom = randomAtom();

        // Random walk until it sticks
        let steps = 0;
        while (!isNextToCrystal(atom) && steps < 1000) {
            atom = moveAtom(atom);
            steps++;
        }

        if (isNextToCrystal(atom)) {
            setCell(atom.x, atom.y);
        }
    }
}


startBtn.addEventListener("click", () => {
    startBtn.textContent = "started";
    startBtn.disabled = true;
    setInterval(mainLoop, 20)
})