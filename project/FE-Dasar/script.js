var slides = document.querySelector(".slider-items").children;
var nextSlide = document.querySelector(".right-slide");
var prevSlide = document.querySelector(".left-slide");
var totalSlides = slides.length;
var index = 0;

nextSlide.onclick = function () {
  next("next");
  console.log(`next ${slides.length}`);
};
prevSlide.onclick = function () {
  next("prev");
  console.log(`prev ${slides.length}`);
};

function next(direction) {
  if (direction == "next") {
    index++;
    if (index == totalSlides) {
      index = 0;
    }
    console.log(index);
  } else {
    if (index == 0) {
      index = totalSlides - 1;
    } else {
      index--;
    }
    console.log(index);
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
    console.log(`remove slides`)
  }
  slides[index].classList.add("active");
}
