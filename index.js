const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');




const resolution = 10;
canvas.width = 800;
canvas.height = 800;

const COLS = canvas.width / resolution;
const ROWS = canvas.height / resolution;
let tableArr = [];
let grid = new Array(COLS).fill(0)
.map(() => new Array(ROWS).fill(0));

let title = document.getElementById('title');
    title.textContent = "Conway's game of life";


function buildRandom(){
    let title = document.getElementById('title');
    title.textContent = "random";
    
    grid = new Array(COLS).fill(null)
    .map(() => new Array(ROWS).fill(0)
    .map(() => Math.floor(Math.random() * 2)));

    return grid;
}
//next 3 functions are assigning values to the grid array to create 
//the three required patterns
function buildBoat() {
    let title = document.getElementById('title');
    title.textContent = "boat pattern";
    grid[2][2]=1;
    grid[2][3]=1;
    grid[2][4]=1;
    
    return grid;

}

function buildBlock(){
    let title = document.getElementById('title');
    title.textContent = "block pattern";
    grid[2][2]=1;
    grid[2][3]=1;
    grid[3][2]=1;
    grid[3][3]=1;
    
    return grid;
}

function buildBeacon(){
    let title = document.getElementById('title');
    title.textContent = "beacon pattern";
    grid[2][2]=1;
    grid[2][3]=1;
    grid[3][2]=1;
    grid[3][3]=1;
    grid[4][4]=1;
    grid[4][5]=1;
    grid[5][4]=1;
    grid[5][5]=1;

    return grid;
}

//change this method if you want to see the different patterns -
//still working on button functionality
grid = buildRandom();

//can't get this button to turn the grid into a specific pattern usin
//one of the above patterns

//const boatbtn = document.querySelector("boat");
//boatbtn.addEventListener("click", function () {
    //grid = buildBoat();
    //draw(grid);
//}),


requestAnimationFrame(redraw);

function redraw() {
  grid = checkNeighbors(grid);
  draw(grid);
  requestAnimationFrame(redraw);
}

function checkNeighbors(grid) {
  const next = grid.map(arr => [...arr]);

  for (let colm = 0; colm < grid.length; colm++) {
    for (let row = 0; row < grid[colm].length; row++) {
      const cell = grid[colm][row];
      let numNeighbours = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (i === 0 && j === 0) {
            continue;
          }
          const x_cell = colm + i;
          const y_cell = row + j;

          if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
            const currentNeighbour = grid[colm + i][row + j];
            numNeighbours += currentNeighbour;
          }
        }
      }

      // rules
      if (cell === 1 && numNeighbours < 2) {
        next[colm][row] = 0;
      } else if (cell === 1 && numNeighbours > 3) {
        next[colm][row] = 0;
      } else if (cell === 0 && numNeighbours === 3) {
        next[colm][row] = 1;
      }
    }
  }
  return next;
}

function draw(grid) {
  for (let colm = 0; colm < grid.length; colm++) {
    for (let row = 0; row < grid[colm].length; row++) {
      const cell = grid[colm][row];

      ctx.beginPath();
      ctx.rect(colm * resolution, row * resolution, resolution, resolution);
     
      ctx.fillStyle = cell ? 'black' : 'white';
      ctx.fill();
      // ctx.stroke();
    }
  }
}
