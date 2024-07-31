import { player } from "./data.js";
import { isValid } from "./utils.js";
import { getWord } from "./wordAPI.js";

const word = await getWord();
console.log(word); //Debugging

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

const handleSubmit = (currentRow) =>{    
    const guessSplit = player.currentGuess.split('');
    const wordSplit = word.split('');
    const guessDOM = Array.from(currentRow.querySelectorAll('div'));
    const results = [];
    
    for (let i = 0; i < 5; i++) {
        if(guessSplit[i] === wordSplit[i]){
            guessDOM[i].classList.toggle('correct');
            results[i] = 2;
        }else if(wordSplit.includes(guessSplit[i])){
            guessDOM[i].classList.toggle('close');
            results[i] = 1;
        }
        else{
            guessDOM[i].classList.toggle('incorrect');
            results[i] = 0;
        }
    }
    //Move to the next row, reset the column, and reset the guess
    player.currentRow += 1;
    player.currentCol = 0;
    player.currentGuess = "";

    //Calculate the result based on the guess values
    const result = results.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);

    //Determine win condition based on result, and disable user inputs.
    if(result === 10){
        handleWin();
    }

    //Determine lose condition
    if(player.currentRow === 6 && result != 10){
        handleLoss();
    }
}

const handleWin = function(){
    player.won = true;
    alert("You won!");
}

const handleLoss = function(){
    player.lost = true;
    alert("You lost");
}

const bounceAnimation = function(element){
  element.style.transition = 'transform 0.1s ease';
  element.style.transform = 'scale(1.1)';

  setTimeout(() => {
    element.style.transform = 'scale(1)';
  }, 100);
}

//Handle Input Logic
export const handleInput = (e) =>{
    let value = e.key.toLowerCase();
    let currentRow = document.querySelector(`section[class="row-${player.currentRow}"]`);
    let currentCol = currentRow.querySelector(`div[class="col-${player.currentCol}"]`);

    if(isValid(value) && !(player.won || player.lost)){
        //If guess isn't complete, input the value
        if (player.currentCol < 5 && value != 'backspace' && value != 'enter') {
            player.currentGuess += value;
            currentCol.textContent = value;
            currentCol.classList.add('filled');
            bounceAnimation(currentCol);
            player.currentCol += 1;
        }else if(value === 'backspace' && player.currentCol > 0){
            //Delete last input, unless no more inputs to delete
            const cell = currentRow.querySelector(`div[class="col-${player.currentCol-1} filled"]`)
            cell.textContent='';
            cell.classList.remove('filled');
            player.currentGuess = player.currentGuess.slice(0, -1);
            player.currentCol -= 1;
            //Handle Submitting the guess
        }else if(value === 'enter'){
            //Lose condition
            if(player.currentRow != 6){
                //If the word is complete when submitted, validate it, and move to the next row
                if(player.currentCol === 5){
                    handleSubmit(currentRow);
                }
            }
            
        }
    }
}