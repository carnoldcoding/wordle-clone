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
        
        //Track Letter Counts
        let letterCount = {};
        for(let i = 0 ; i < word.length; i++){
            let letter = wordArr[i];
            if(letterCount[letter]){
                letterCount[letter] += 1;
            } else{
                letterCount[letter] = 1;
            }
        }

        // Track letter usage in the guess to avoid incorrect "close" marks
        let usedLetters = {};

        // Evaluate each letter in the guess
        for (let i = 0; i < word.length; i++) {
            let guessLetter = guessArr[i];
            let targetLetter = wordArr[i];
            
            // Correct position
            if (guessLetter === targetLetter) {
                guessDOM[i].dataset.eval = 'correct';
                correct += 1;
                // Reduce the letter count for correct positions
                letterCount[guessLetter]--;
                usedLetters[guessLetter] = (usedLetters[guessLetter] || 0) + 1;
            }
        }

        for (let i = 0; i < word.length; i++) {
            let guessLetter = guessArr[i];
            if (guessDOM[i].dataset.eval) continue; // Skip already marked letters
            
            if (wordArr.includes(guessLetter) && letterCount[guessLetter] > 0) {
                guessDOM[i].dataset.eval = 'close';
                letterCount[guessLetter]--; // Use up the letter
            } else {
                guessDOM[i].dataset.eval = 'incorrect';
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
    }else if (player.currentRow == 5 && correct != word.length){
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