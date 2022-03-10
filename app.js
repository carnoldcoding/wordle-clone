const container = document.querySelector(".container");
const letters = document.querySelectorAll(".letter");
let space = 0;

window.addEventListener("keydown", (e) => {
    if((e.key >= "a" && e.key <="z") || e.key == "Backspace"){
        if(e.key != "Backspace")
            letters[space].textContent = `${e.key}`.toUpperCase();

        if(space < 4 && e.key != "Backspace"){
            space += 1;
        }
        
        if(e.key == "Backspace"){
            letters[space].textContent = ``.toUpperCase();
            if(space>0){
                space -= 1;
            }
        }
    }
        
});