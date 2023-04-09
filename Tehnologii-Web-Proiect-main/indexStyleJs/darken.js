document.addEventListener("DOMContentLoaded", function() {
    const imageItems = document.querySelectorAll('.animal-category')
    imageItems.forEach(imageItem => {
      imageItem.addEventListener('mouseover', () => {
        imageItem.childNodes[1].classList.add('image-darken');
      })
    })
    imageItems.forEach(imageItem => {
      imageItem.addEventListener('mouseout', () => {
        imageItem.childNodes[1].classList.remove('image-darken');
      })
    })
  });