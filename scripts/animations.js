export const bounceAnimation = function(element){
    element.style.transition = 'transform 0.1s ease';
    element.style.transform = 'scale(1.1)';
  
    setTimeout(() => {
      element.style.transform = 'scale(1)';
    }, 100);
  }

export const flipAnimation = function(element){
    const span = element.querySelector('span');
    element.style.transition = `transform .8s ease`;
    element.style.transformStyle = 'preserve-3d';
    element.style.perspective = '1000px';
    element.style.transform = 'rotateX(180deg)';

    span.style.transform = 'rotateX(180deg)';
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