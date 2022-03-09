// //С начало всегда нужно проверить загрузилось ли дерево DOM:
// $(document).ready(function() {
// 	// Заведем переменную button и назначим ей элемент с id="button"
// 	var button = $('#button');
// 	// Заводим переменную modal, назначим ей элемент с id="modal"
// 	var modal = $('#modal');

// 	var close = $('#close')

// 	// Теперь отловим клик по кнопке button.
// 	button.on('click', function() {
// 		// Теперь по клику, можно вызвать модальное окно, но для этого зададим переменную
// 		//по котрой будем обращаться к модальному окну, потом вернемся сюда.
// 		// addClass - функция, которая добавляет класс
// 		modal.addClass('modal_active');
// 		// Написал функцию автоматического закрытия всплывающего окна
// 		setTimeout(function () {
// 			modal.removeClass('modal_active');
// 		}, 3000);
// 	});


// 	// Теперь отловим событие клика по кнопке close. Для этого заведем новую переменную.
// 	//и удалим класс modal_active
// 	close.on('click', function() {
// 		modal.removeClass('modal_active');
// 	});

// });