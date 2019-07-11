const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

var screen = {
    width: 30,
    height: 30,
    zoom: 24
};

canvas.width = screen.width;
canvas.height = screen.height;

canvas.style.width = (screen.width*screen.zoom) + 'px';
canvas.style.height = (screen.height*screen.zoom) + 'px';
canvas.style['image-rendering'] = 'pixelated';

const context = canvas.getContext('2d');

function clear() {
    context.fillStyle='black';
    context.fillRect(0, 0, screen.width, screen.height);
}

function pixel(x, y, color = 'red') {
    context.fillStyle=color;
    context.fillRect(x, y, 1, 1);
}

let mapNumbers = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

class Entity {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.color = 'gray';
    }

    render() {
        pixel(this.x, this.y, this.color);
    }

    update() {

    }
}

class Pacman extends Entity {
    constructor() {
        super();
        this.color = 'yellow';
    }

    update() {
        if (this.y >= mapNumbers.length || mapNumbers[this.y][this.x+1] !== 1) {
            this.x++;
        }
    }
}

class Ghost extends Entity {
    constructor() {
        super();
        this.color = 'red';
    }

    update() {
        if (this.y >= mapNumbers.length || mapNumbers[this.y][this.x+1] !== 1) {
            this.x++;
        }
    }
}

class Map extends Entity {
    render() {
        const rows = mapNumbers.length;
        const cols = mapNumbers[0].length;

        for (let row = 0; row<rows; row++) {
            for (let col = 0; col<cols; col++) {
                if (mapNumbers[row][col] !== 0) {
                    pixel(this.x + col, this.y + row, this.color);
                }
            }
        }
    }
}

let entities = [];

function add(e) {
    entities.push(e);
}

function remove(e) {
    const ind = entities.indexOf(e);
    if (ind>=0) {
        entities.splice(ind, 1);
    }
}

let map = new Map();
add(map);

let pacman = new Pacman();
add(pacman);
pacman.x =1;
pacman.y =2;

for (let i=0;i<20;i++){
    let x = Math.floor(Math.random()*screen.width);
    let y = Math.floor(Math.random()*screen.height);
    if (y < mapNumbers.length && mapNumbers[y][x] === 1) {
        continue;
    }

    let ghost = new Ghost();
    ghost.x = x;
    ghost.y = y;
    add(ghost);
}

function frame() {
    for (let i =0;i<entities.length;i++) {
        entities[i].update();
    }

    clear();
    for (let i =0;i<entities.length;i++) {
        entities[i].render();
    }
}

frame();
setInterval(frame, 1000);
