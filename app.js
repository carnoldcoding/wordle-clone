import { createGrid, handleInput } from "./scripts/grid.js";
import { createKeyboard, simulateKeyboard } from "./scripts/keyboard.js";
import { grid } from "./scripts/data.js";

//Create Grid
createGrid(grid.rows, grid.cols);

//Keyboard
createKeyboard();
simulateKeyboard();

//Listen to Grid
window.addEventListener("keyup", handleInput);
