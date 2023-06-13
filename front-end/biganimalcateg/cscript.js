document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = slider.querySelectorAll('img');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
  
    let currentSlide = 0;
    const maxSlide = slides.length - 1;
  
    function showSlide() {
      slides.forEach(slide => {
        slide.style.opacity = 0;
        slide.style.zIndex = 0;
      });
  
      slides[currentSlide].style.opacity = 1;
      slides[currentSlide].style.zIndex = 1;
    }
  
    function updateButtons() {
      prevButton.disabled = currentSlide === 0;
      nextButton.disabled = currentSlide === maxSlide;
    }
  
    function prevSlide() {
      currentSlide--;
      showSlide();
      updateButtons();
    }
  
    function nextSlide() {
      currentSlide++;
      showSlide();
      updateButtons();
    }
  
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
  
    showSlide();
    updateButtons();
  });
  