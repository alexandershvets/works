$(document).ready(function () {

	// Главное меню
	$('#burger').on('click', function() {
		$('.menu__nav').toggleClass('menu_active');
		$('.menu-button__line').toggleClass('menu-button__line_active');
	});
	$('.menu-list__link').click(function() {
		$('.menu__nav').removeClass('menu_active');
		$('.menu-button__line').removeClass('menu-button__line_active');
	});

	

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
			$('.modal__request').fadeIn();
			$("form").trigger("reset");
		})
		return false;
	})


	// Закрывающий крестик
	$('.close').on('click', function () {
		$('.modal').hide();
		$('.modal__request').hide();
	});



	// Скрипт выпадающего списка в форме
	$('.select_checked').on('click', function () {
		$('.select__dropdown-list').toggleClass('select__dropdown-list_open');
	});
	$('.select__dropdown-item').on('click', function () {
		var value = $(this).attr('data-value');
		$('#select-type').val(value);
		$('.select_checked').text(value);
		// $('.select__dropdown-list').toggleClass('select__dropdown-list_open');
	});
	// выключение элемента по клику на пустое место (вне этого элемента)
	$(document).mouseup(function (e){ // событие клика по веб-документу
		var div = $(".select_checked"); // тут указываем элемент
		if (!div.is(e.target) // если клик был не по нашему блоку
		    && div.has(e.target).length === 0) { // и не по его дочерним элементам
			$('.select__dropdown-list').removeClass('select__dropdown-list_open');
		}
	});


	
	// Скрипт прокрутки
	$('a[href^="#"]').click(function () {
		var _href = $(this).attr("href"); $('html, body').animate({
			scrollTop: $(_href).offset().top -180 + 'px'
		});
		return false;
	});

	// Маски
	$('[type="tel"]').mask('+7 (999) 999-99-99');



	// Скрипт плагина текста, который не влазит в блок
	$('.reviews-slider__text').liTextLength({
		length: 160,        //Видимое кол-во символов
		afterLength: '...', //Текст после видимого содержания   
		fullText: true,      //Добавить ссылку для отображения скрытого текста
		moreText: '<br><div class="reviews-slider__more">показать полностью</div>', //Текст ссылки до показа скрытого содержания
		lessText: '<br><div class="reviews-slider__close-text">скрыть</div>'   //Текст ссылки после показа скрытого содержания
	});




	// Скрипт плагина slick слайдер
	$('.before-slider').slick({
		draggable: false, // перетаскиевание слайдера пальцами и мышкой
		dots: true, // альтернативные кнопки переключения слайдера (dots/пагинация)
		dotsClass: 'slider-dots before__dots', // присваиваю новый класс пагинации, чтобы стилизовать ее
		prevArrow: $('.arrow-prev'), // прдключаю свои стрелки
		nextArrow: $('.arrow-next') // прдключаю свои стрелки
	});

	// Скрипт плагина slick слайдер
	$('.reviews-slider').slick({
		dots: true,
		dotsClass: 'slider-dots reviews__dots',
		arrows: false,
		responsive: [
			{
				breakpoint: 2400,
				settings: "unslick"
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	// слайдер Slick "Производство"
	$('.factory-slider').slick({
		dots: true,
		dotsClass: 'slider-dots reviews__dots',
		arrows: false,
	});



	// Скрипт плагина каринок до/после
	$(".before-after").twentytwenty({
		default_offset_pct: 0.6, // Сколько видимого изображения видно, когда страница загружает 
		orientation: 'horizontal', // Ориентация изображений «до» и «после» ('horizontal' or 'vertical')
		before_label: 'без скинали', // Установить пользовательскую метку перед меткой
		after_label: 'с скинали', // Установить пользовательскую метку после метки
		// no_overlay: true, // Не отображать оверлей с до и после
		// move_slider_on_hover: true, // Переместить ползунок при наведении курсора мыши? 
		// move_with_handle_only: true, // Разрешить пользователю проводить пальцем в любом месте изображения, чтобы контролировать движение ползунка.
		// click_to_move: false // Позволяет пользователю щелкнуть (или коснуться) в любом месте изображения, чтобы переместить ползунок в это место.
	});


	// Показывать карту только тогда, когда до нее докрутили
	var reviews = $('.reviews');
	var reviewsTop = reviews.offset().top; // отщитываем пиксели до .reviews
	$(window).bind('scroll', function(){ //rкогда мы прокручиваем сайт, нам нужно проверить
		var windowTop = $(this).scrollTop();
		if (windowTop > reviewsTop) {
			// $('#map').html(''); // или можно вставить скрипт из конструкторя ЯК в див в HTML
			// Скрипт Яндекс карты
			ymaps.ready(init);
			function init() {
				var myMap;
				myMap = new ymaps.Map("map", {
					center: [55.7652, 37.63836],
					zoom: 17,
					controls: []
				});
				myMap.behaviors.disable('scrollZoom');
				myMap.controls.add("zoomControl", {
					position: {
						top: 15,
						left: 15
					}
				});
				var myPlacemark = new ymaps.Placemark([55.7649, 37.63836], {}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/contacts/map-marker.png',
					iconImageSize: [46, 46],
					iconImageOffset: [-20, -47]
				});
				myMap.geoObjects.add(myPlacemark);
			}

			$(window).unbind('scroll');
		}
	});

});