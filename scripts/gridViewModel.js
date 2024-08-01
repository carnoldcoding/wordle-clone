import { player, grid } from "./data.js";
import { isValid } from "./utils.js";
import { flipAnimation, gearAnimation, shakeAnimation, bounceAnimation} from "./animations.js";
import { colorKeys } from "./keyboard.js";
import { createGrid } from "./gridView.js";
import { getWord } from "./wordAPI.js";
import { mountKeyboard, createKeyboard } from "./keyboard.js";

const submitGuess = () =>{
    const word = grid.word;
    if(player.guess.length === word.length){
        const guessArr = player.guess.split('');
        const wordArr = word.split('');
        const guessDOM = Array.from(document.querySelectorAll(`.row-${player.currentRow} > div`));
        let correct = 0;
        
        //Track Letter Frequency
        let letterBank = {};

        for(let i = 0 ; i < word.length; i++){
            let letter = wordArr[i];
            letterBank[letter] = letterBank[letter] ? letterBank[letter] + 1 : 1;
        }

        // Run through once for correctness, prevents false "close" marks on UI
        for (let i = 0; i < word.length; i++) {
            let guessLetter = guessArr[i];
            let targetLetter = wordArr[i];
            
            if (guessLetter === targetLetter) {
                guessDOM[i].dataset.eval = 'correct';
                correct += 1;
                // Reduce the letter count for correct positions, letterBank serves also as remaining letter count
                letterBank[guessLetter]--;
            }
        }

        for (let i = 0; i < word.length; i++) {
            let guessLetter = guessArr[i];
            if (guessDOM[i].dataset.eval) continue; // Skip already marked letters
            
            //If the letter is in the word, and there is at least one more of that letter
            if (wordArr.includes(guessLetter) && letterBank[guessLetter] > 0) {
                guessDOM[i].dataset.eval = 'close';
                letterBank[guessLetter]--; // Spend the letter
            } else {
                guessDOM[i].dataset.eval = 'incorrect'; //If the letter is not in the word, or there is not at least one more of the letter
            }
        }
        colorKeys();

        //Animate
        flipAnimation(guessDOM);

        setTimeout(()=>{
            //Ending Conditions
            handleEnd(correct);

            //Iterate if not end
            player.nextRow();
        }, guessDOM.length * 200);
       
       
    } else {
        shakeAnimation(document.querySelector(`.row-${player.currentRow}`));
    }
}


const toggleModal = function(){
    const word = grid.word;

    const modal = document.querySelector('.modal-container');
    const title = modal.querySelector('header > h1');
    const subtitle = modal.querySelector('header > h3');
    if(player.won){
        title.textContent = "you won!";
        subtitle.textContent = `You won in ${player.currentRow + 1} guesses!`;
    }else{
        title.textContent = "you lose.";
        subtitle.textContent = `The word was ${word}`;
    }


    if(Array.from(modal.classList).includes('hidden')){
        modal.classList.remove('hidden');
    }else{
        modal.classList.add('hidden');
    }
}

const handleEnd = function(correct){
    const word = grid.word;

    if(correct === word.length){
        player.won = true;
        toggleModal();
        unmount();
    }else if (player.currentRow == grid.rows - 1 && correct != word.length){
        player.won = false;
        toggleModal();
        unmount();
    }
}

export const initGame = async () =>{
    //Game
    grid.word = await getWord(grid.cols);
    player.reset();

    //Create
    createGrid(grid.rows, grid.cols);
    createKeyboard();

    //Mount
    mount();
    mountKeyboard();
}

const placeLetter = function(letter){
    const word = grid.word;

    const currentCell = document.querySelector('section > div:not(.dirty)');
    const currentLetter = currentCell.querySelector('span');
    bounceAnimation(currentCell);
    if(currentCell && player.guess.length < word.length){
        player.guess += letter;
        player.currentCol = player.guess.length - 1;
        currentLetter.textContent = letter;
        currentCell.classList.add('dirty');
    }
}


const removeLetter = () =>{
    if(player.guess.length > 0){
        const currentCell = document.querySelector(`section[class="row-${player.currentRow}"] > .col-${player.currentCol}`);
        const currentLetter = currentCell.querySelector('span');
        currentLetter.textContent = "";
        currentCell.classList.remove('dirty');
        player.guess = player.guess.substring(0, player.guess.length - 1);
        player.currentCol = player.guess.length - 1;
    }
}




//Handle Input Logic
export const handleInput = (e) =>{
    let value = e.key.toLowerCase();
    
    if(isValid(value)){
        if(value !== "enter" && value !== "backspace"){
            placeLetter(value);
        }else if(value == "enter"){
            submitGuess();
        }else if(value == "backspace"){
            removeLetter();
        }
    }
}

//Mount & Unmount
export const mount = function(){
    window.addEventListener("keyup", handleInput);
    
}
const unmount = function(){
    window.removeEventListener('keyup', handleInput);
}

const toggleSettings = function(){
    const settingsDOM = document.querySelector('.settings-menu');
    if(Array.from(settingsDOM.classList).includes('closed')){
        settingsDOM.classList.remove('closed');
    }else{
        settingsDOM.classList.add('closed');
    }
}


//Mount Modal Button
document.querySelector('.modal > .button').addEventListener('click', ()=>{
    initGame();
    toggleModal();
});

//Attach Settings Event Listener
const settingsDOM = document.querySelector('.settings-menu');
const settingsButtonDOM = document.querySelector('.settings > ion-icon');
const newGameDOM = settingsDOM.querySelector('.button');
const wordSliderDOM = settingsDOM.querySelector('input[name="word-length"]');
const guessSliderDOM = settingsDOM.querySelector('input[name="guess-count"]');
settingsButtonDOM.addEventListener('click', ()=>{
    gearAnimation(settingsButtonDOM);
    toggleSettings();
})

newGameDOM.addEventListener('click', ()=>{
    toggleSettings();
    initGame();
});

wordSliderDOM.addEventListener("input",(e)=>{
    wordSliderDOM.nextElementSibling.textContent = e.target.value;
    grid.cols = e.target.value;
})

guessSliderDOM.addEventListener("input", (e)=>{
    guessSliderDOM.nextElementSibling.textContent = e.target.value;
    grid.rows = e.target.value;
})