var slides = document.querySelector(".slider-items").children;
var nextSlide = document.querySelector(".right-slide");
var prevSlide = document.querySelector(".left-slide");
var totalSlides = slides.length;
var index = 0;

nextSlide.onclick = function () {
  showSlide("next");
};

prevSlide.onclick = function () {
  showSlide("prev");
};

function showSlide(direction) {
  // Remove the 'active' class from the current slide
  slides[index].classList.remove("active");

  if (direction === "next") {
    index = (index + 1) % totalSlides; // Move to the next slide, wrap around if at the end
  } else if (direction === "prev") {
    index = (index - 1 + totalSlides) % totalSlides; // Move to the previous slide, wrap around if at the start
  }

  // Add the 'active' class to the new slide
  slides[index].classList.add("active");
}
