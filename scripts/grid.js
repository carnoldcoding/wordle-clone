import { player } from "./data.js";
import { isAlphabetical } from "./utils.js";

export const createGrid = (rows, cols) => {
    const container = document.querySelector('article');
    let gridHTML = '';

    for(let i = 0; i < rows; i++){
        gridHTML += `<section class="row-${i}">`;
        for(let j = 0; j < cols; j++){
            gridHTML += `<div class="col-${j}"></div>`
        }
        gridHTML += `</section>`;
    }

    container.innerHTML = gridHTML;
}

//Handle Input Logic
export const handleInput = (e) =>{
    let value = e.key.toLowerCase();
    let currentRow = document.querySelector(`section[class="row-${player.currentRow}"]`);
    let currentCol = currentRow.querySelector(`div[class="col-${player.currentCol}"]`);

    if(isAlphabetical(value)){
        if (player.currentCol < 5 && value != 'backspace' && value != 'enter') {
            player.currentGuess += value;
            currentCol.textContent = value;
            player.currentCol += 1;
        }else if(value === 'backspace' && player.currentCol > 0){
            currentRow.querySelector(`div[class="col-${player.currentCol-1}"]`).textContent='';
            player.currentGuess = player.currentGuess.slice(0, -1);
            player.currentCol -= 1;
        }else if(value === 'enter' && player.currentRow != 6 ){
            if(player.currentCol === 5){
                player.currentRow += 1;
                player.currentCol = 0;
                player.currentGuess = "";
            }
        }
        console.log(`
        Row: ${player.currentRow}
        Col: ${player.currentCol}
        Guess: ${player.currentGuess}
    `);
    }
}