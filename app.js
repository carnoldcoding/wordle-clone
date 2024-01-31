import { createGrid, handleInput } from "./scripts/grid.js";
import { grid } from "./scripts/data.js";

//Create Grid
createGrid(grid.rows, grid.cols);

//Listen to Grid
window.addEventListener("keyup", handleInput);
