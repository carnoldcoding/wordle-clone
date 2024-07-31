export const createGrid = (rows, cols) => {
    const container = document.querySelector('article');
    let gridHTML = '';

    for(let i = 0; i < rows; i++){
        gridHTML += `<section class="row-${i}">`;
        for(let j = 0; j < cols; j++){
            gridHTML += `<div class="col-${j}"><span></span></div>`
        }
        gridHTML += `</section>`;
    }

    container.innerHTML = gridHTML;
}