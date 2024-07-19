function preload() {
  // Load configuration from the JSON file
  config = loadJSON('config.json');
}

function setup() {
  // Load parameters from the configuration file
  createCanvas(config.canvasWidth, config.canvasHeight); // Set the canvas size
  resolution = config.resolution; // Size of each cell in pixels
  cols = config.dimensions.cols; // Number of columns in the grid
  rows = config.dimensions.rows; // Number of rows in the grid
  probabilityOfPropagation = config.probabilityOfPropagation; // Probability of the fire spreading to adjacent cells

  grid = make2DArray(cols, rows); // Make a 2D array representing the grid of cells
  

  // Initialize the grid and set cells on fire
  for (let i = 0; i < config.initialFire.length; i++) {
    let x = config.initialFire[i].x;
    let y = config.initialFire[i].y;
    grid[x][y] = 1; // Set the cell on fire
  }

  // Set a lower frame rate to slow down the animation
  frameRate(config.frameRate); 
}

function draw() {
  background(255); // Set the background color to white

  // Display the current state of the grid
  for (let i = 0; i < cols; i++) { // Iterates over the columns of the grid
    for (let j = 0; j < rows; j++) { // Iterates over the rows of the grid
      // For each cell in the grid, calculate the pixel coordinates where the cell should be drawn on the canvas
      let x = i * resolution;
      let y = j * resolution;

      if (grid[i][j] == 1) { // If the cell is on fire
        fill(255, 0, 0); // Red color for cells on fire
      } else if (grid[i][j] == 2) { // If the cell is burnt
        fill(150); // Gray color for burnt cells
      } else { // If the cell is unburnt
        fill(124,169,62); // Green color for unburnt cells
      }

      stroke(0); // Set the color used to draw lines and borders to black
      rect(x, y, resolution - 1, resolution - 1); // p5.js function that draws a rectangle on the canvas
    }
  }

  // Create a new 2D array to store the next state
  let next = make2DArray(cols, rows);

  // Create an array to collect the cells that will catch fire in this iteration
  let cellsToIgnite = [];

  // Compute the next state based on the current state (grid)
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] == 1) { // If the cell is on fire
        next[i][j] = 2; // Mark the cell as burnt
        collectFirePropagation(cellsToIgnite, i, j); // Collect the cells to propagate the fire
      } else { // If the cell is not on fire
        next[i][j] = grid[i][j]; // Copies the state of the current cell from the original grid (grid) to the corresponding cell in the next array to maintain the state of cells that are not on fire
      }
    }
  }

  // Ignite the collected cells
  for (let cell of cellsToIgnite) {
    next[cell.x][cell.y] = 1; // Set the neighboring cell on fire
  }

  // Update the grid with the next state
  grid = next;
}

function collectFirePropagation(cellsToIgnite, x, y) {
  // Propagate the fire to adjacent cells based on the probabilityOfPropagation
  for (let i = -1; i <= 1; i++) { // These values represent the relative positions of neighboring cells in the column direction
    for (let j = -1; j <= 1; j++) { // These values represent the relative positions of neighboring cells in the row direction
      let col = x + i; // Calculate the column index of the neighboring cell
      let row = y + j; // Calculate the row index of the neighboring cell

      // Check if the neighboring cell is within the grid boundaries
      if (col >= 0 && col < cols && row >= 0 && row < rows) {
        // Check if the neighboring cell is not already on fire and not burnt
        // Generate a random number between 0 and 1 and compare it to the probabilityOfPropagation
        // If the random number is smaller than the probabilityOfPropagation, collect the neighboring cell to ignite
        if (grid[col][row] == 0 && random() < probabilityOfPropagation) {
          cellsToIgnite.push({x: col, y: row}); // Collect the neighboring cell to ignite
        }
      }
    }
  }
}

function make2DArray(cols, rows) {
  let arr = new Array(cols); // Create a 1D array with a length equal to the number of columns
  for (let i = 0; i < arr.length; i++) { // Iterate over each element in the 1D array where each element represents a column
    arr[i] = new Array(rows).fill(0); // Create a new 1D array for each column with a length equal to the number of rows and initialize each element to 0 (unburnt cell)
  }
  return arr; // Return the resulting 2D array after initializing all columns and rows
}