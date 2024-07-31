import { player } from "./data.js";
import { isValid } from "./utils.js";
import { words } from "./data.js";
import { getRandomInt } from "./utils.js";
import { flipAnimation, shakeAnimation, bounceAnimation} from "./animations.js";


const getWord = function(){
    const newWord = words[getRandomInt(words.length)];
    console.log(newWord);
    return newWord
}

let word = getWord();

const submitGuess = () =>{    
    if(player.guess.length == 5 && words.includes(player.guess)){
        const guessArr = player.guess.split('');
        const wordArr = word.split('');
        const guessDOM = Array.from(document.querySelectorAll(`.row-${player.currentRow} > div`));
        let correct = 0;

        for(let i = 0; i < 5 ; i++){
            if(wordArr[i] === guessArr[i]){
                guessDOM[i].dataset.eval = 'correct';
                correct += 1;
            }else if(wordArr.includes(guessArr[i])){
                let wordLetterCount = 0;
                let guessLetterCount = 0;

                wordArr.forEach(letter =>{
                    if(letter == guessArr[i]){
                        wordLetterCount += 1;
                    }
                })

                guessArr.forEach(letter => {
                    if(letter == guessArr[i]){
                        guessLetterCount += 1;
                    }
                })

                if(wordLetterCount > guessLetterCount){
                    guessDOM[i].dataset.eval = 'close';
                }else{
                    guessDOM[i].dataset.eval = 'incorrect';
                }
            }else{
                guessDOM[i].dataset.eval = 'incorrect';
            }
        }

        

        //Animate
        flipAnimation(guessDOM);

        setTimeout(()=>{
            //Ending Conditions
            handleEnd(correct);

            //Iterate if not end
            player.nextRow();
        }, Array.from(guessDOM).length * 250)
       
    }else {
        shakeAnimation(document.querySelector(`.row-${player.currentRow}`));
    }
}


const toggleModal = function(){
    const modal = document.querySelector('.modal-container');
    const title = modal.querySelector('header > h1');
    const subtitle = modal.querySelector('header > h3');
    if(player.won){
        title.textContent = "you won!";
        subtitle.textContent = `You won in ${player.currentRow + 1} guesses!`;
    }else{
        title.textContent = "you lose.";
        subtitle.textContent = "Better luck next time.";
    }
    modal.classList.toggle('hidden');
}

const handleEnd = function(correct){
    if(correct == 5){
        player.won = true;
        toggleModal();
        unmount();
    }else if (player.currentRow == 5 && correct != 5){
        player.won = false;
        toggleModal();
        unmount();
    }
}

const replay = function(){
    player.reset();
    toggleModal();
    mount();
    clearGrid();
    word = getWord();
}

const clearGrid = function(){
    document.querySelectorAll("section > div").forEach(element =>{
        Array.from(element.classList).forEach(cls => {
            if (cls == "correct" || cls == "dirty" || cls == "close" || cls=="incorrect"){
                element.classList.remove(cls);
            }
        })
        const span = element.querySelector('span');
        span.textContent = "";
        element.style = "";
        span.style =  "";
    })
}

const placeLetter = function(letter){
    const currentCell = document.querySelector('section > div:not(.dirty)');
    const currentLetter = currentCell.querySelector('span');
    bounceAnimation(currentCell);
    if(currentCell && player.guess.length < 5){
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
    document.querySelector('.modal-wrapper > button').addEventListener('click', replay);
    window.addEventListener("keyup", handleInput);
    
}
const unmount = function(){
    window.removeEventListener('keyup', handleInput);
}