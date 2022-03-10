//Query Selectors
const letters = document.querySelectorAll(".letter-box");
let space = 0;
let letterCount = 0;

//Game
let userInput = [];
let word = "heads".toUpperCase();
word = [...word];
console.log(word);

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
                console.log("This is not a word");
            }
            else{
                //Make array of userInput
                let userWord = []
                for(letter of letters){
                    userWord.push(letter.textContent);
                }

                //Find the green, yellow, and blacks
                let locations = []
                for(letter of userWord){
                    //Check if letter is in word
                    if(word.includes(letter)){
                        //Check if its an exact match
                        if(word.indexOf(letter)==userWord.indexOf(letter)){
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
                    console.log(letter);
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

                console.log(locations);
            }
        }
    }
        
});