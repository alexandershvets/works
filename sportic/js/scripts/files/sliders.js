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

//============================================================
// Mainslider

if (document.querySelector('.mainslider')) {
  let mainSlider = new Swiper('.mainslider__body', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 20,
    autoHeight: true,
    speed: 800,
    // loop: true,
    pagination: {
      el: '.mainslider__dotts',
      clickable: true,
    },
    on: {
      lazyImageReady: function () {
        ibg();
      },
    }
  });

  const mainSliderImages = document.querySelectorAll('.mainslider__image');
  const mainSliderDotts = document.querySelectorAll('.mainslider__dotts .swiper-pagination-bullet');

  for (let i = 0; i < mainSliderImages.length; i++) {
    const mainSliderImage = mainSliderImages[i].querySelector('img').getAttribute('src');

    mainSliderDotts[i].style.backgroundImage = 'url("' + mainSliderImage + '")';
  }
}

//============================================================
// Popular Products Slider

if (document.querySelector('.products-slider')) {
  let productSlider = new Swiper('.products-slider__item', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 0,
    autoHeight: true,
    speed: 800,
    // loop: true,
    navigation: {
      nextEl: '.products-slider__arrow_next',
      prevEl: '.products-slider__arrow_prev'
    },
    pagination: {
      el: '.products-slider__info',
      type: 'fraction',
      renderFraction: function (currentClass, totalClass) {
        return '<span class="' + currentClass + '"></span>' +
          '/' +
          '<span class="' + totalClass + '"></span>';
      },
    },
    on: {
      lazyImageReady: function () {
        ibg();
      },
    }
  });

}

//============================================================
// Brands Slider

if (document.querySelector('.brands-slider')) {
  let productSlider = new Swiper('.brands-slider__body', {
    observer: true,
    observeParents: true,
    slidesPerView: 5,
    // spaceBetween: 40,
    // autoHeight: true,
    preloadImages: true,
    speed: 800,
    loop: true,
    navigation: {
      nextEl: '.brands-slider__arrow_next',
      prevEl: '.brands-slider__arrow_prev'
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        autoHeight: true,
      },
      480: {
        slidesPerView: 2,
      },
      600: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1180: {
        slidesPerView: 5,
      },
    },
    on: {
      lazyImageReady: function () {
        ibg();
      },
    }
  });

}

//============================================================
// Product Slider

if (document.querySelector('.images-product')) {
  let imagesMainSlider = new Swiper('.images-product__mainslider', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    // spaceBetween: 40,
    // autoHeight: true,
    // preloadImages: false,
    speed: 800,
    // loop: true,
    // ----------------------------------------
    // Миниатюры (превью)
    thumbs: {
      // Свайпер с мениатюрами и его настройки
      swiper: {
        el: '.images-product__subslider',
        slidesPerView: 4,
      }
    },
  });

  let imagesSubSlider = new Swiper('.images-product__subslider', {
    observer: true,
    observeParents: true,
    slidesPerView: 4,
    // spaceBetween: 40,
    // autoHeight: true,
    // preloadImages: false,
    speed: 800,
    // loop: true,
  });
}