// Чтобы wow.js работал, нужно его инициализировать
new WOW().init();

$(document).ready(function () {

	// Скрипт отправки формы по технологии AJAX (без перезагрузки страницы)
	$('form').submit(function (event) {
		event.preventDefault();
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function () {
			$(this).find("input").val("");
			$('.modal').fadeIn();
			$('.callback').fadeOut();
			$('.modal-price').fadeOut();
			$("form").trigger("reset");
		})
		return false;
	})

		// Заказать звонок
		$('.navbar__button').on("click", function () {
			$('.callback').show()
		});

		// Ванная
		$('#bathroom').on("click", function() {
			event.preventDefault(); // откроется окно там где сделан клик
			$('#bathroom-price').fadeIn();
		});
		// Комнаты
		$('#living').on("click", function () {
			event.preventDefault();
			$('#living-price').fadeIn();
		});
		// Офис
		$('#office').on("click", function () {
			event.preventDefault();
			// Слайдер в модальных окнах
			$('#office-price').fadeIn();
			$('.worcklist-slider-office').slick({
				slidesToShow: 1, // сколько слайдов показывать
				slidesToScroll: 1, // сколько слайдов прокручивать
				prevArrow: $('.arrows-worcklist__left'), // прдключаю свои стрелки
				nextArrow: $('.arrows-worcklist__right') // прдключаю свои стрелки
			});
		});
		// Новостройки
		$('#buildings').on("click", function () {
			event.preventDefault();
			// Слайдер в модальных окнах
			$('#buildings-price').fadeIn();
			$('.worcklist-slider-buildings').slick({
				slidesToShow: 1, // сколько слайдов показывать
				slidesToScroll: 1, // сколько слайдов прокручивать
				prevArrow: $('.arrows-worcklist__left'), // прдключаю свои стрелки
				nextArrow: $('.arrows-worcklist__right') // прдключаю свои стрелки
			});
		});
		// Ремонт кухонь
		$('#kitchen').on("click", function () {
			event.preventDefault();
			// Слайдер в модальных окнах
			$('#kitchen-price').fadeIn();
			$('.worcklist-slider-kitchen').slick({
				slidesToShow: 1, // сколько слайдов показывать
				slidesToScroll: 1, // сколько слайдов прокручивать
				prevArrow: $('.arrows-worcklist__left'), // прдключаю свои стрелки
				nextArrow: $('.arrows-worcklist__right') // прдключаю свои стрелки
			});
		})
		// Ремонт дач и котеджей
		$('#houses').on("click", function () {
			event.preventDefault();
			// Слайдер в модальных окнах
			$('#houses-price').fadeIn();
			$('.worcklist-slider-houses').slick({
				slidesToShow: 1, // сколько слайдов показывать
				slidesToScroll: 1, // сколько слайдов прокручивать
				prevArrow: $('.arrows-worcklist__left'), // прдключаю свои стрелки
				nextArrow: $('.arrows-worcklist__right') // прдключаю свои стрелки
			});
		});

		// Закрывающий крестик
		$('.modal-dialog__close').on('click', function () {
			$('.modal, .modal-price, .callback').hide()
		});

	// Скрипт валидации формы
	// Сначало форме надо присвоить идентификатор/ id="brif-form"
	// Затем включаем плагин validate
	// $('#offer-form').validate({
	// 	errorClass: 'invalid-second', // название класса ошибки
	// 	rules: { // указываем правила
	// 		username: { // для поля name="username"
	// 			required: true, // запонение обязательно
	// 			minlength: 2, // минимальное кол-во символов необх. для заполнения
	// 			maxlength: 15 // максимально допустимое кол-во символов
	// 		},
	// 		phone: { // для поля name="phone" 
	// 			required: true // запонение обязательно
	// 		}
	// 	},
	// 	messages: {
	// 		username: {
	// 			required: false,
	// 			minlength: jQuery.validator.format("Не меньше {0} символов!"),
	// 			maxlength: jQuery.validator.format("Не больше {0} символов!")
	// 		},
	// 		phone: {
	// 			required: false
	// 		}
	// 	}
	// });
	// $('#brif-form').validate({
	// 	errorClass: 'invalid', // название класса ошибки
	// 	errorElement: "div", // добавляемый элемент ошибки
	// 	rules: { // указываем правила
	// 		username: { // для поля name="username"
	// 			required: true, // запонение обязательно
	// 			minlength: 2, // минимальное кол-во символов необх. для заполнения
	// 			maxlength: 15 // максимально допустимое кол-во символов
	// 		},
	// 		email: {
	// 			required: true,
	// 			email: true // проверка, чтобы email вводился правильно
	// 		},
	// 		phone: { // для поля name="phone" 
	// 			required: true // запонение обязательно
	// 		}
	// 	},
	// 	messages: {
	// 		username: {
	// 			required: "Заполните поле",
	// 			minlength: jQuery.validator.format("Не меньше {0} символов!"),
	// 			maxlength: jQuery.validator.format("Не больше {0} символов!")
	// 		},
	// 		email: {
	// 			required: 'Заполните поле',
	// 			email: "Введите корректный email" // выведет сообщение, указывающее как вводить почту
	// 		},
	// 		phone: {
	// 			required: 'Заполните поле'
	// 		}
	// 	}
	// });

	// Инициализируем МскедИнпут
	// Для этого придумаем и добавим нужный клас в инпуты, затем вернемся сюда
	$('.phone').mask('+7 (999) 999-99-99')






	// Скрипт слайдера Slick пишу здесь, потому что он небольшой
	$('.slider').slick({
		slidesToShow: 3, // сколько слайдов показывать
		slidesToScroll: 1, // сколько слайдов прокручивать
		prevArrow: $('.arrows__left'), // прдключаю свои стрелки
		nextArrow: $('.arrows__right'), // прдключаю свои стрелки
		responsive: [ // делаю слайдер отзывчивым
			{ // первый объект
				breakpoint: 1200, // на экранах шириной меньше 1200px будут след-е настройки:
				settings: {
					slidesToShow: 2, // показывать 2 слайдера
					slidesToScroll: 1 // перелистывать 1 слайдер
				}
			},
			{
				breakpoint: 768, // на экранах шириной меньше 600px
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	// Слайдер снизу
	$('.slider-contract').slick({
		slidesToShow: 3, // сколько слайдов показывать
		slidesToScroll: 1, // сколько слайдов прокручивать
		// centerMode: true,
		// centerPadding: '150px',
		autoplay: true,
		autoplaySpeed: 2000,
		prevArrow: false, // прдключаю свои стрелки
		nextArrow: false, // прдключаю свои стрелки
		responsive: [ // делаю слайдер отзывчивым
			{ // первый объект
				breakpoint: 1200, // на экранах шириной меньше 1200px будут след-е настройки:
				settings: {
					slidesToShow: 2, // показывать 2 слайдера
					slidesToScroll: 1 // перелистывать 1 слайдер
				}
			},
			{
				breakpoint: 768, // на экранах шириной меньше 600px
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	
	


	// Вставляю Яндекс Карту на сайт. Яндекс песочница.
	ymaps.ready(function () {
		var myMap = new ymaps.Map('map', {
			center: [55.636036, 37.258103], // вставлять свои координаты
			zoom: 10 // можно менять размер увеличения
		}, {
			searchControlProvider: 'yandex#search'
		});

		//  добавил элементы управления картой
		myMap.controls // элементы управления
			.add('zoomControl', {
				left: 5,
				top: 5
			}) // Кнопка изменения масштаба.
			.add('typeSelector') // Список типов карты
			.add('mapTools', {
				left: 35,
				top: 5
			}); // Стандартный набор кнопок

		// Создаём макет содержимого.
		MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
				'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
			),

			myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
				hintContent: 'Ремонт квартир', // описание метки
				balloonContent: 'Это красивая метка' // подпись метки
			}, {
				// Опции.
				iconLayout: 'default#image', // Необходимо указать данный тип макета.
				iconImageHref: 'img/footer/map-marker.png', // Своё изображение иконки метки.
				iconImageSize: [46, 46], // Размеры метки.
				iconImageOffset: [-23, -46] // Смещение левого верхнего угла иконки относительно её "ножки" (точки привязки).
			});


		myMap.geoObjects
			.add(myPlacemark);

		myMap.behaviors.disable('scrollZoom'); // отключаю скролл мышкой
		//на мобильных устройствах... (проверяем по userAgent браузера)
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			//... отключаем перетаскивание карты
			myMap.behaviors.disable('drag');
		}
	});


});