export const createKeyboard = () => {
    const container = document.querySelector('aside');
    const qwerty = [Array.from('qwertyuiop'),Array.from('asdfghjkl'),['ent', 'z','x','c', 'v', 'b', 'n', 'm', 'del']];
    let keyboardHTML = '';
    
    qwerty.forEach(row => {
        let rowHTML = '<div class="row">';
        row.forEach(letter => {
            if(letter != 'ent' && letter != 'del'){
                rowHTML += `<section data-key=${letter}>${letter}</section>`
            }else if(letter=='ent'){
                rowHTML += `<section data-key="enter">${letter}</section>`
            }else if(letter=='del'){
                rowHTML += `<section data-key="backspace">${letter}</section>`
            }
        });
        rowHTML += '</div>'
        keyboardHTML += rowHTML;
    })

    container.innerHTML = keyboardHTML;
}

export const simulateKeyboard = () =>{
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