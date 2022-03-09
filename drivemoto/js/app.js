$(function () {

  // =======================================
  let ua = window.navigator.userAgent;
  let isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  function isIE() {
    ua = navigator.userAgent;
    let is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    return is_ie;
  }
  if (isIE()) {
    $('body').addClass('ie');
  }
  if (isMobile.any()) {
    $('body').addClass('touch');
  }
  // =======================================
  // СКРИПТ ДИНАМИЧЕСКОГО АДАПТИВА

  // Dynamic Adapt v.1
  // HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
  // e.x. data-da="item,2,992"
  // Andrikanych Yevhen 2020
  // https://www.youtube.com/c/freelancerlifestyle

  // "use strict";

  (function () {
    let originalPositions = [];
    let daElements = document.querySelectorAll('[data-da]');
    let daElementsArray = [];
    let daMatchMedia = [];
    //Заполняем массивы
    if (daElements.length > 0) {
      let number = 0;
      for (let index = 0; index < daElements.length; index++) {
        const daElement = daElements[index];
        const daMove = daElement.getAttribute('data-da');
        if (daMove != '') {
          const daArray = daMove.split(',');
          const daPlace = daArray[1] ? daArray[1].trim() : 'last';
          const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
          const daDestination = document.querySelector('.' + daArray[0].trim())
          if (daArray.length > 0 && daDestination) {
            daElement.setAttribute('data-da-index', number);
            //Заполняем массив первоначальных позиций
            originalPositions[number] = {
              "parent": daElement.parentNode,
              "index": indexInParent(daElement)
            };
            //Заполняем массив элементов 
            daElementsArray[number] = {
              "element": daElement,
              "destination": document.querySelector('.' + daArray[0].trim()),
              "place": daPlace,
              "breakpoint": daBreakpoint
            }
            number++;
          }
        }
      }
      dynamicAdaptSort(daElementsArray);

      //Создаем события в точке брейкпоинта
      for (let index = 0; index < daElementsArray.length; index++) {
        const el = daElementsArray[index];
        const daBreakpoint = el.breakpoint;
        const daType = "max"; //Для MobileFirst поменять на min

        daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
        daMatchMedia[index].addListener(dynamicAdapt);
      }
    }
    //Основная функция
    function dynamicAdapt(e) {
      for (let index = 0; index < daElementsArray.length; index++) {
        const el = daElementsArray[index];
        const daElement = el.element;
        const daDestination = el.destination;
        const daPlace = el.place;
        const daBreakpoint = el.breakpoint;
        const daClassname = "_dynamic_adapt_" + daBreakpoint;

        if (daMatchMedia[index].matches) {
          //Перебрасываем элементы
          if (!daElement.classList.contains(daClassname)) {
            let actualIndex = indexOfElements(daDestination)[daPlace];
            if (daPlace === 'first') {
              actualIndex = indexOfElements(daDestination)[0];
            } else if (daPlace === 'last') {
              actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
            }
            daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
            daElement.classList.add(daClassname);
          }
        } else {
          //Возвращаем на место
          if (daElement.classList.contains(daClassname)) {
            dynamicAdaptBack(daElement);
            daElement.classList.remove(daClassname);
          }
        }
      }
      customAdapt();
    }

    //Вызов основной функции
    dynamicAdapt();

    //Функция возврата на место
    function dynamicAdaptBack(el) {
      const daIndex = el.getAttribute('data-da-index');
      const originalPlace = originalPositions[daIndex];
      const parentPlace = originalPlace['parent'];
      const indexPlace = originalPlace['index'];
      const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
      parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
    }
    //Функция получения индекса внутри родителя
    function indexInParent(el) {
      var children = Array.prototype.slice.call(el.parentNode.children);
      return children.indexOf(el);
    }
    //Функция получения массива индексов элементов внутри родителя 
    function indexOfElements(parent, back) {
      const children = parent.children;
      const childrenArray = [];
      for (let i = 0; i < children.length; i++) {
        const childrenElement = children[i];
        if (back) {
          childrenArray.push(i);
        } else {
          //Исключая перенесенный элемент
          if (childrenElement.getAttribute('data-da') == null) {
            childrenArray.push(i);
          }
        }
      }
      return childrenArray;
    }
    //Сортировка объекта
    function dynamicAdaptSort(arr) {
      arr.sort(function (a, b) {
        if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 } //Для MobileFirst поменять
      });
      arr.sort(function (a, b) {
        if (a.place > b.place) { return 1 } else { return -1 }
      });
    }
    //Дополнительные сценарии адаптации
    function customAdapt() {
      const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
  }());

  // =======================================
  // GOTO
  $('._goto').click(function () {
    var el = $(this).attr('href').replace('#', '');
    var offset = 0;
    $('body, html').animate({ scrollTop: $('.' + el).offset().top + offset }, 500, function () { });

    if ($('.menu-mobile__body').hasClass('_active')) {
      $('.menu-mobile__body, .icon-menu').removeClass('_active');
      $('body').removeClass('_lock');
    }

    return false;
  });

  // MENU
  $('.icon-menu').click(function (event) {
    $(this).toggleClass('_active');
    $('.menu-mobile__body').toggleClass('_active');
    if ($(this).hasClass('_active')) {
      $('body').data('scroll', $(window).scrollTop());
    }
    $('body').toggleClass('_lock');
    if (!$(this).hasClass('_active')) {
      $('body,html').scrollTop(parseInt($('body').data('scroll')));
    }
  });

  // IBG
  function ibg() {
    if (isIE()) {
      let ibg = document.querySelectorAll("._ibg");
      for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
          ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
      }
    }
  }
  ibg();

  // MAIN-SLIDER
  $('.slider-banner').slick({
    autoplay: true,
    infinite: true,
    dots: true,
    prevArrow: '<button class="slider-banner__arrow slider-banner__arrow-prev"><img src="images/dest/icons/arrow-left.svg" alt=""></button>',
    nextArrow: '<button class="slider-banner__arrow slider-banner__arrow-next"><img src="images/dest/icons/arrow-right.svg" alt=""></button>',
    responsive: [{
      breakpoint: 478,
      settings: {
        arrows: false
      }
    }]
  });

  // ПОКАЗАТЬ ЕЩЕ. Скролл до Характеристики
  $('.product-card__more-item-info').on('click', function() {
    $('.product-info__tab').removeClass('_active');
    $('.product-info__content').removeClass('_active');
    $('.specifications').addClass('_active');
    $($('.specifications').attr('href')).addClass('_active');
  });

  // TABS
  $('.tab').on('click', function (event) {
    event.preventDefault();
    $($(this).siblings()).removeClass('_active');
    $($(this).parent().siblings().find('div')).removeClass('_active');
    $(this).addClass('_active');

    $($(this).attr('href')).addClass('_active');

    // "Встряска" слайдера по клику на таб
    $('.slider-product').slick('setPosition');
  });

  // SLIDER-PRODUCT
  $('.slider-product').slick({
    // autoplay: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: '<button class="slider-product__arrow slider-product__arrow-prev"><img src="images/dest/icons/arrow-black-left.svg" alt=""></button>',
    nextArrow: '<button class="slider-product__arrow slider-product__arrow-next"><img src="images/dest/icons/arrow-black-right.svg" alt=""></button>',
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          arrows: false,
          dots: true
        }
      },
      {
        breakpoint: 1086,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 800,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 540,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 1
        }
      }
    ],
  });

  // FAVORITE
  $('.product-item__favorite').on('click', function(event) {
    $(this).toggleClass('_active');
  });

  // FILTER
  $('.filter-catalog__item').on('click', function(event) {
    event.preventDefault();

    $(this).toggleClass('_active');
  });

  // FORM-FILTER
  $('.filter-style').styler();

  // FILTER
  $('.item-dropdown__title, .item-buttons__parametrs').on('click', function() {
    $(this).toggleClass('_active');
    $(this).next().slideToggle(200);
  });

  // RANGE
  var minValue = document.querySelector('.min span');
  var maxValue = document.querySelector('.max span');

  $(".js-range-slider").ionRangeSlider({
    type: "double", // двойной ползунок
    onStart: function (data) {
      minValue.textContent = data.from;
      maxValue.textContent = data.to;
    },
    onChange: function (data) {
      minValue.textContent = data.from;
      maxValue.textContent = data.to;
    },
  });

  // BTN CATALOG FILTR
  $('.filter-catalog__btn--grid').on('click', function() {
    $(this).addClass('_active');
    $('.filter-catalog__btn--line').removeClass('_active');
    $('.list-catalog__column').removeClass('_active');
  });

  $('.filter-catalog__btn--line').on('click', function() {
    $(this).addClass('_active');
    $('.filter-catalog__btn--grid').removeClass('_active');
    $('.list-catalog__column').addClass('_active');
  });

  // RateYo ЗВЕЗДНЫЙ РЕЙТИНГ
  $(".rate-yo #rateYo").rateYo({
    // rating: 4, // текущий рейтинг
    starWidth: "23px", // ширина звезды
    spacing: "7px", // расстояние между звездочками
    fullStar: true, // только полная звезда
    normalFill: "#C4C4C4", // фоновый цвет
    ratedFill: "#1C62CD", // акцентный цвет
    readOnly: true // только видеть рейтинг, изменять нельзя
  });

  // FOOTER DROPDOWN
  $('.footer__top-title--dropdown').on('click', function() {
    $(this).toggleClass('_active');
    $(this).next().slideToggle(200);
  });

  // MOBILE FILTER DROPDOWN
  $('.aside-filter__btn').on('click', function() {
    $(this).toggleClass('_active');
    $(this).next().slideToggle(200);
  });
});