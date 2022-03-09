const swiperHero = document.querySelector('.main-slider .swiper-container'),
  swiperBecome = document.querySelector('.slider-become .swiper-container'),
  swiperVideos = document.querySelector('.slider-videos .swiper-container');

// Slider 1
const swiper1 = new Swiper(swiperHero, {
  keyboard: {
    enabled: true,
  },
  speed: 1000,
  slidesPerView: 1,
  fadeEffect: {
    crossFade: true
  },
  effect: 'fade',
  navigation: {
    nextEl: '.main-slider__btn--left',
    prevEl: '.main-slider__btn--right',
  },
});

// Отключение видео
swiper1.on('transitionEnd', function() {
  let videos = document.querySelectorAll('.main-slider video');
  videos.forEach(function(el) {
    el.pause();
    el.currentTime = 0;
  });
  playButtonsMain.forEach(function(el) {
    el.style.display = 'block';
  });
});

// ========================================================================
// Slider 2
const swiper2 = new Swiper(swiperBecome, {
  keyboard: {
    enabled: true,
  },
  speed: 1000,
  slidesPerView: 4,
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 4,
    }
  }
});

// ========================================================================
// Slider 3
const swiper3 = new Swiper(swiperVideos, {
  centeredSlides: true,
  spaceBetween: 105,
  loop: true,
  keyboard: {
    enabled: true,
  },
  speed: 1000,
  slidesPerView: 'auto'
});

// Отключение видео
swiper3.on('transitionEnd', function () {
  let videos = document.querySelectorAll('.slider-videos video');
  videos.forEach(function (el) {
    el.pause();
    el.currentTime = 0;
  });
  playButtonsFeaturedVideo.forEach(function (el) {
    el.style.display = 'block';
    el.closest('.slider-videos__item').querySelector('.slider-videos__title').style.display = 'block';
  });
});
