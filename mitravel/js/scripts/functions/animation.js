// Найдем и объявим в переменную все элементы, которые будут поддаваться анимации
const animItems = document.querySelectorAll('._anim-items');

// Проверю, существуют ли такие классы
if (animItems.length > 0) {
  
  window.addEventListener('scroll', animOnScroll);

  function animOnScroll() {
    // Пройдемся циклом по массиву и каждый объект объявить в переменную animItem
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      // Высота объекта
      const animItemHeight = animItem.offsetHeight;
      // Позиция объекта относительно верха страницы
      const animItemOffset = offset(animItem).top;
      // Коефицент, регулирующий момент старта анимации
      const animStart = 4;

      // Высчитаем высоту окна браузера. Из высоты окна браузера отнимаем высоту объекта, который анимируется, поделенный на коэфицент
      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      // Иногда анимированный объект выше высоты окна браузера, по этому запишем условие:
      // Если высота объекта выше высоты окна браузера, то
      if (animItemHeight > window.innerHeight) {
        // Из высоты окна браузера отнимаем высоту окна браузера, поделенный на коэфицент
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      // Добавляем активный класс
      // Если мы прокрутили больше чем позиция объекта минус точка старта, И прокрутили меньше чем позиция объекта плюс его высота
      if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
        // Мы добавляем к объекту класс active
        animItem.classList.add('_active');
      } else {
        // Если у объекта нет класса ._anim-no-hide
        if (!animItem.classList.contains('_anim-no-hide')) {
          // Удаляем у объекта класс active, если не выполняется условие
          animItem.classList.remove('_active');
        }
      }
    }
  }

  // Корректная и кроссбраузерная функция, позволяющая получать переменные с координатами относительно документа (top, left)
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }

  // Установим задержку функции
  setTimeout(() => {
    animOnScroll();
  }, 300);

}