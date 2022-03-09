// // создадим переменную, и поместим в нее элемент button.

// // button - название переменной
// // document - означает что искать элемент будем в дереве DOM
// // querySelector - функция, позволяющая Найти Определенный Элемент
// //
// var button = document.querySelector('#button')
// // console.log(button); // проверил, нашолся ли элемент

// var modal = document.querySelector('#modal')

// var close = document.querySelector('#close')

// // Теперь нужно отслеживать события при клике на эту кнопку
// // addEventListener - функция, означает Добавить Отслеживающих Событий
// // click - событие клика
// button.addEventListener('click', function() {
// 	// Здесь должно выполняться какое-либо действие

// 	// console.log('Пользователь кликнул на кнопку'); // проверил, работает ли событие

// 	// Для того чтобы мы смогли быстро обращаться к модальному окну,
// 	//нужно задать новую переменную и вернуться сюда.

// 	//После того, как новая переменная задана, нужно обратиться к этой переменной
// 	//modal, в которой нах-ся наше модальное окно и говорим что
// 	//нужно найти список всех классов этого модального окна и добавить ему новый класс.
// 	// classList - функция, которая находит все классы нужного элемента
// 	// add - функция, которая добавляет класс.
// 	modal.classList.add('modal_active');

// 	// самостоятельно написал функцию автоматического закрытия модального окна.
// 	setTimeout(function () {
// 		modal.classList.remove('modal_active');
// 	}, 5000);
// });

// // Для того, чтобы при клике на крестик, закрывалось модальное окно, нужно:
// //создать новую переменную и поместить в нее элемент close.

// // Теперь повторяем те же действия:
// // Обращаемся к переменной close, говорим ей что хотим отслеживать событие click,
// //хотим, чтобы выполнялась функция, которая будет в списке классов находить и удалять
// //не нужный больше класс modal_active

// // remove - функция, которая удаляет класс.

// close.addEventListener('click', function() {
// 	modal.classList.remove('modal_active');
// });