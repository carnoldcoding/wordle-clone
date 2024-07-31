export const bounceAnimation = function(element){
    element.style.transition = 'transform 0.1s ease';
    element.style.transform = 'scale(1.1)';
  
    setTimeout(() => {
      element.style.transform = 'scale(1)';
    }, 100);
  }

export const flipAnimation = function(elementList){

  elementList.forEach((element, index) =>{
    setTimeout(()=>{
      
      const span = element.querySelector('span');
      element.style.transition = `all .8s ease`;
      element.style.transformStyle = 'preserve-3d';
      element.style.perspective = '1000px';
      element.style.transform = 'rotateX(180deg)';
  
      span.style.transform = 'rotateX(180deg)';

      if(element.dataset.eval == "correct"){
        element.classList.add('correct');
      }else if(element.dataset.eval == "close"){
        element.classList.add('close');
      }else if(element.dataset.eval == "incorrect"){
        element.classList.add('incorrect');
      }
    }, index * 100);
  })
}

export const shakeAnimation = function(element){
  element.style.transition = 'transform .1s ease';

  for (let i = 1; i <= 3; i++) {
    setTimeout(() => {
      element.style.transform = `translateX(5px)`;
    }, 100 * (i * 2 - 2)); // Move right

    setTimeout(() => {
      element.style.transform = `translateX(-5px)`;
    }, 100 * (i * 2 - 1)); // Move left

    setTimeout(() => {
      element.style.transform = `translateX(0)`;
    }, 100 * i * 2); // Reset to original position
  }
};