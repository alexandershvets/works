// BildSlider

let sliders = document.querySelectorAll('._swiper');
if (sliders) {
  for (let index = 0; index < sliders.length; index++) {
    let slider = sliders[index];
    if (!slider.classList.contains('swiper-bild')) {
      let slider_items = slider.children;
      if (slider_items) {
        for (let index = 0; index < slider_items.length; index++) {
          let el = slider_items[index];
          el.classList.add('swiper-slide');
        }
      }
      let slider_content = slider.innerHTML;
      let slider_wrapper = document.createElement('div');
      slider_wrapper.classList.add('swiper-wrapper');
      slider_wrapper.innerHTML = slider_content;
      slider.innerHTML = '';
      slider.appendChild(slider_wrapper);
      slider.classList.add('swiper-bild');

      if (slider.classList.contains('_swiper_scroll')) {
        let sliderScroll = document.createElement('div');
        sliderScroll.classList.add('swiper-scrollbar');
        slider.appendChild(sliderScroll);
      }
    }
    if (slider.classList.contains('_gallery')) {
      //slider.data('lightGallery').destroy(true);
    }
  }
  sliders_bild_callback();
}

function sliders_bild_callback(params) { }

let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
  for (let index = 0; index < sliderScrollItems.length; index++) {
    const sliderScrollItem = sliderScrollItems[index];
    const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
    const sliderScroll = new Swiper(sliderScrollItem, {
      direction: 'vertical',
      slidesPerView: 'auto',
      freeMode: true,
      scrollbar: {
        el: sliderScrollBar,
        draggable: true,
        snapOnRelease: false
      },
      mousewheel: {
        releaseOnEdges: true,
      },
    });
    sliderScroll.scrollbar.updateSize();
  }
}

function sliders_bild_callback(params) { }


const mySwiper = new Swiper('.slider-avto', {
  effect: 'fade',
  // Дополнение к fade
  fadeEffect: {
    // Параллельная смена прозрачности
    crossFade: true
  },
  // autoplay: {
  //   delay: 3000,
  //   disableOnInteraction: false,
  // },
  // ----------------------------------------
  // Навигация
  // Буллеты, текущее положение, прогрессбар
  // Отображает на каком слайде или группе слайдов мы находимся (выводят страницы)
  pagination: {
    el: '.slider-avto__pagging',
    type: 'bullets',
    clickable: true,
  },

  // Управление клавиатурой
  keyboard: {
    // Включить\выключить
    enabled: true,
    // Включить\выключить только когда слайдер в пределах вьюпорта
    onlyInViewport: true,
    // Включить\выключить управление клавишами pageUp, pageDown
    pageUpDown: true,
  },

  observer: true,
  observeParents: true,
  slidesPerView: 1,
  // spaceBetween: 0,
  // autoHeight: true,
  // speed: 800,
  //touchRatio: 0,
  //simulateTouch: false,
  //loop: true,
  //preloadImages: false,
  //lazy: true,

  // Arrows
  navigation: {
    nextEl: '.slider-avto__next',
    prevEl: '.slider-avto__prev'
  },

  /* breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 0,
      autoHeight: true,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1268: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
 */
  on: {
    lazyImageReady: function () {
      ibg();
    },
  },
  // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
});