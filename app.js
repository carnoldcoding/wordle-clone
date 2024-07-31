import { handleInput, mount } from "./scripts/gridViewModel.js";
import { createGrid } from "./scripts/gridView.js";
import { mountKeyboard } from "./scripts/keyboard.js";
import { grid } from "./scripts/data.js";

//Keyboard
mountKeyboard();

//Create Grid
createGrid(grid.rows, grid.cols);

mount();
