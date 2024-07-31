const createKeyboard = () => {
    const container = document.querySelector('aside');
    const qwerty = [Array.from('qwertyuiop'),Array.from('asdfghjkl'),['ent', 'z','x','c', 'v', 'b', 'n', 'm', 'del']];
    let keyboardHTML = '';
    
    qwerty.forEach(row => {
        let rowHTML = '<div class="row">';
        row.forEach(letter => {
            if(letter != 'ent' && letter != 'del'){
                rowHTML += `<section data-key=${letter}>${letter}</section>`
            }else if(letter=='ent'){
                rowHTML += `<section class="enter" data-key="enter">enter</section>`
            }else if(letter=='del'){
                rowHTML += `<section class="backspace" data-key="backspace"><ion-icon name="backspace-outline"></ion-icon></section>`
            }
        });
        rowHTML += '</div>'
        keyboardHTML += rowHTML;
    })

    container.innerHTML = keyboardHTML;
}

export const colorKeys = () =>{
    const keys = document.querySelectorAll('aside > div > section');
    const inputLetters = document.querySelectorAll('article > section > .dirty');
    const keyColorMap = {};

    inputLetters.forEach(letter =>{
        keyColorMap[letter.textContent] = letter.dataset.eval; 
    })
    keys.forEach(key =>{
        if(keyColorMap.hasOwnProperty(key.textContent)){
            key.classList.add(keyColorMap[key.textContent]);
        }
    });
}

export const clearKeys = () =>{
    const keys = document.querySelectorAll('aside > div > section');
    keys.forEach(key => {
        Array.from(key.classList).forEach(cls => {
            if (cls == "correct" || cls == "close" || cls=="incorrect"){
                key.classList.remove(cls);
            }
        })
    })
}

export const mountKeyboard = () =>{
    createKeyboard();
    // Function to simulate a keypress
    function simulateKeyPress(key) {
        const event = new KeyboardEvent('keyup', { key });
        window.dispatchEvent(event);
    }
    const handleClick = (e) => {
        simulateKeyPress(e.target.dataset.key);
    }

    const rows = document.querySelectorAll(".row");
    rows.forEach(key=>{
        key.addEventListener('click', handleClick);
    })
}
