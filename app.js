const container = document.querySelector(".container");
const letters = document.querySelectorAll(".letter-box");
let space = 0;
let letterCount = 0;

window.addEventListener("keydown", (e) => {
    
    //Handle adding letters.
    if((e.key >= "a" && e.key <="z") || e.key == "Backspace"){
        if(e.key != "Backspace" && letterCount < 5){
            letters[space].textContent = `${e.key}`.toUpperCase();
            letters[space].classList.toggle("active");
            space += 1;
            letterCount += 1;
        }

        if(e.key == "Backspace" && letterCount > 0){
            space-=1;
            letterCount-=1;
            letters[space].textContent = '';
            letters[space].classList.toggle("active");
        }
    }
        
});