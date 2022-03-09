// Получаю в переменную массив обэектов с классом .popup-link
const popupLinks = document.querySelectorAll('.popup-link');
// Получаю в переменную объект body, нужный для блокировки скролла внутри него
// const body = document.querySelector('body'); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Получаю массив объектов с классом .lock-padding, нужные для того чтобы ...
const lockPadding = document.querySelectorAll('.lock-padding');

// Отключение двойных нажатий
let unlock = true;

// Задержка анимации, задержка должна быть одинаковой, как прописанна в свойстве transition
const timeout = 800;

// Проверяем существуют ли объекты с классом .popup-link
if (popupLinks.length > 0) {
  // Проходим циклом, и тукущий объект массива, объявляем в переменную popupLink
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    // Вешаем обработчик события по клику, на кнопку
    popupLink.addEventListener('click', function(e) {
      // Берем значение атрибута href, убираем из него символ хеша, получаем чистое имя
      const popupName = popupLink.getAttribute('href').replace('#', ''); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // Получаем объект попапа в переменную curentPopup, id которого равен popupName
      const curentPopup = document.getElementById(popupName);
      // Полученный объект направляем в функцию popupOpen, которая будет открывать попап
      popupOpen(curentPopup);
      // Отмена стандартного действия ссылки. Не дадим ей перезагружать страницу
      e.preventDefault();
    });
  }
}

// Функция закрытия попапа
// Получаю в переменную массив объектов с классом .close-popup, которые есть в попапах
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    // На текущий закрывающий элемент вешаем обработчик события по клику
    el.addEventListener('click', function(e) {
      // Передадим в функцию popupClose, объект, который является ближайшим родителем с классом .popup, нажатой ссылки
      popupClose(el.closest('.popup'));
      // Отмена стандартного действия ссылки. Не дадим ей перезагружать страницу
      e.preventDefault();
    });
  }
}

// Функция открытия попапа
// Передаем в функцию тукущий попап
function popupOpen(curentPopup) {
  // Проверяем есть ли такой объект и открыта ли переменная unlock
  if (curentPopup && unlock) {
    // Получаем объект с классом .popup который имеет класс .open, тоесть открытый попап
    const popupActive = document.querySelector('.popup.open');
    // Если он существует
    if (popupActive) {
      // Закрыть его
      popupClose(popupActive, false);
    } else {
      // Блокируем скролл у body
      bodyLock();
    }
    // Добавляем попапу класс .open
    curentPopup.classList.add('open');
    // Вешаем событие на текуший попап по клику
    curentPopup.addEventListener('click', function (e) {
      // Этим условием отсекаем все, кроме темной оьласти
      // Идет проверка, если у нажатого объекта нет в родителях объекта с классом .popup__content
      if (!e.target.closest('.popup__content')) {
        // Тогда попап закрываем, передавая наш ближайший объект с классом .popup
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

// Функция закрытия окна
function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

// 
function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

  for (let index = 0; index < lockPadding.length; index++) {
    const el = lockPadding[index];
    el.style.paddingRight = lockPaddingValue;
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function() {
    unlock = true;
  }, timeout);
}
