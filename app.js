//Create Grid
const container = document.querySelector('article');
let gridHTML = '';

const grid = {
    rows: 6,
    cols: 5
}

const player = {
    currentGuess: "",
    currentRow: 0,
    currentCol: 0
}

for(let i = 0; i < grid.rows; i++){
    gridHTML += `<section class="row-${i}">`;
    for(let j = 0; j < grid.cols; j++){
        gridHTML += `<div class="col-${j}"></div>`
    }
    gridHTML += `</section>`;
}

container.innerHTML = gridHTML;

//Make Grid Interactive

//Handle Input Logic
function handleInput(e){
    let value = e.key.toLowerCase();
    let currentRow = document.querySelector(`section[class="row-${player.currentRow}"]`);
    let currentCol = currentRow.querySelector(`div[class="col-${player.currentCol}"]`);

    if((value >= 'a' && value <= 'z') || value == 'backspace'){
        if (player.currentGuess.length < 5 && value != 'backspace') {
            player.currentGuess += value;
            currentCol.textContent = value;
            player.currentCol += 1;
        }else if(value === 'backspace' & player.currentCol > 0){
            currentRow.querySelector(`div[class="col-${player.currentCol-1}"]`).textContent='';
            player.currentGuess = player.currentGuess.slice(0, -1);
            player.currentCol -= 1;
        }
        console.log(`
        Row: ${player.currentRow}
        Col: ${player.currentCol}
        Guess: ${player.currentGuess}
    `);
    }
}

window.addEventListener("keyup", handleInput);
