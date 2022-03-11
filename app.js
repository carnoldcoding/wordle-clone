//Variables
let currentRow = 0;
let space = 0;
let letterCount = 0;

//Game Selectors
const words = document.querySelectorAll(".word-wrapper");
let letters = words[currentRow].querySelectorAll(".letter-box");

//Modal Selectors
const modal = document.querySelector(".modal-wrapper");
const modalButton = document.querySelector(".modal-button");
const modalHeader = document.querySelector(".modal-header");

//Randomize Input
let userInput = [];
let randInt = Math.floor(Math.random() * 2000);
let word = data[randInt].toUpperCase();
word = [...word];
console.log(word);

//Modal
modalButton.addEventListener("click", ()=>{
    modal.classList.toggle("visible");

    //Reset Game
    for(w of words){
        for(letter of w.childNodes){
            letter.className="letter-box";
            letter.textContent="";
            currentRow = 0;
            letters = words[currentRow].querySelectorAll(".letter-box");
        }
    }
});

//Text
window.addEventListener("keydown", (e) => {
    
    if((e.key >= "a" && e.key <="z") || e.key == "Backspace" || e.key == "Enter"){
        
        //Handle adding letters.
        if(e.key != "Backspace" && letterCount < 5 && e.key != "Enter"){
            letters[space].textContent = `${e.key}`.toUpperCase();
            letters[space].classList.toggle("active");
            space += 1;
            letterCount += 1;
            userInput.push(e.key);
        }

        //Handle deleting letters.
        else if(e.key == "Backspace" && letterCount > 0){
            space-=1;
            letterCount-=1;
            userInput.pop(e.key);
            letters[space].textContent = '';
            letters[space].classList.toggle("active");
        }

        //Handle submitting the word
        else if(e.key == "Enter"){
            if(letterCount < 5){
                alert("This is not a word");
            }
            else{
                //Make array of userInput
                let userWord = []
                for(letter of letters){
                    userWord.push(letter.textContent);
                }

                //Find the green, yellow, and blacks
                let locations = []
                for(let x = 0; x < 5; x++){
                    console.log(`
                    userWord: ${userWord}
                    word: ${word}
                    letter: ${userWord[x]}
                    position in word: ${word.indexOf(userInput[x].toUpperCase())}
                    position in UI: ${x}
                    `)
                    //Check if letter is in word
                    if(word.includes(userWord[x])){
                        //Check if its an exact match
                        if(word[x]==userWord[x]){
                            locations.push("g");
                        }else{
                            locations.push("y");
                        }
                    } else {
                        locations.push("b");
                    }
                }
                //Make changes to DOM
                locationIterator = 0;
                for(letter of letters){
                    if(locations[locationIterator] == "g"){
                        letter.classList.toggle("active");
                        letter.classList.toggle("green");
                    }
                    else if(locations[locationIterator] == "y"){
                        letter.classList.toggle("active");
                        letter.classList.toggle("yellow");
                    }
                    else{
                        letter.classList.toggle("active");
                        letter.classList.toggle("black");
                    }
                    locationIterator+=1;
                }

                //Win Condition
                if(!(locations.includes("y") || locations.includes("b"))){
                    modal.classList.toggle("visible");
                    modalHeader.textContent = "Congratulations!";
                }

                //Lose Condition
                if(currentRow==5 && (locations.includes("y") || locations.includes("b"))){
                    modal.classList.toggle("visible");
                    modalHeader.textContent = "You Lose.";
                }

                //Next Row
                currentRow+=1;
                letters = words[currentRow].querySelectorAll(".letter-box");
                letterCount = 0;
                space = 0;
            }
        }
    }
        
});