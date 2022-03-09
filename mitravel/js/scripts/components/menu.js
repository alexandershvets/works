const menu = document.querySelector('.menu'),
  burger = document.querySelector('.burger'),
  close = document.querySelector('.menu__close');

burger.addEventListener('click', function() {
  menu.classList.add('menu--visible');
  disableScroll();
});

close.addEventListener('click', function() {
  menu.classList.remove('menu--visible');
  enableScroll();
});

// Отклюбчения "прыжка" сайта при открытии меню
const fixBlocks = document.querySelectorAll('._fix-block');
const body = document.body;

let disableScroll = function() {
  let paddingOffset = window.innerWidth - body.offsetWidth + 'px';
  let pagePosition = window.scrollY;
  fixBlocks.forEach(function(el) {
    el.style.paddingRight = paddingOffset;
  });
  body.style.paddingRight = paddingOffset;
  body.classList.add('_lock');
  body.dataset.position = pagePosition;
  body.style.top = -pagePosition + 'px';
};

let enableScroll = function() {
  let pagePosition = parseInt(body.dataset.position, 10);
  body.style.top = 'auto';
  body.classList.remove('_lock');
  fixBlocks.forEach(function(el) {
    el.style.paddingRight = '0px';
  });
  body.style.paddingRight = '0px';
  window.scroll({ top: pagePosition, left: 0 });
  body.removeAttribute('data-position');
};
