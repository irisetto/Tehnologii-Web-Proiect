// // Bunch of Variables

 const body          = document.querySelector('body'),
//       title         = document.querySelector('.title'),
//       icon          = document.querySelectorAll('.fas'),
      toggleWrapper = document.querySelector('.toggle__wrapper'),
      toggleButton  = document.querySelector('.toggle__button');

// // Event Listeners

 toggleWrapper.addEventListener('click', toggleMovement);

// // Functions

function toggleMovement() 
{
  toggleButton.classList.toggle('toogle--movement');
  body.classList.toggle('body--dark--mode');
 
//   title.classList.toggle('color--dark--mode');
//   icon.forEach( (el) => {
//         el.classList.toggle('color--dark--mode');
//   })
}

