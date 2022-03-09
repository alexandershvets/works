$(function () {
	
	/* Выпадающее мобильное меню */
	$('.menu-button').on('click', function() {
		$('.menu-button__line').toggleClass('menu-button__line_active');
		$('.navbar').toggleClass('navbar_active');
	});

	$('.navbar__link').click(function() {
		$('.menu-button__line').toggleClass('menu-button__line_active');
		$('.navbar').toggleClass('navbar_active');
	});

	/* скрипт, благодаря которому svg-картинка из img станет inline svg */
	$('img.img-svg').each(function () {
		var $img = $(this);
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');
		$.get(imgURL, function (data) {
			var $svg = $(data).find('svg');
			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			}
			$svg = $svg.removeAttr('xmlns:a');
			if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
			}
			$img.replaceWith($svg);
		}, 'xml');
	});


	/* Яндекс карта */
	ymaps.ready(function () {
		var myMap = new ymaps.Map('map', {
			center: [55.80378080, 37.93814399], // координаты центра карты (относительно страницы)
			zoom: 16,
			// balloon: balloonclose,
			behaviors: ['default', 'scrollZoom'], //отключения скролла колесиком мыши
			controls: [
				'zoomControl', // зум-контрол
				// 'trafficControl', // пробки
				// 'searchControl', // поиск
				// 'typeSelector', // слои
				// 'geolocationControl', // геолокация
				// 'fullscreenControl' // фуллскрин
			]
		}, {
			searchControlProvider: 'yandex#search'
		}),

			myPlacemark = new ymaps.Placemark([55.80363692, 37.92878751], { // координаты метки
				hintContent: 'Granit',
				balloonContent: 'Granit - доставка нерудных материалов'
			}, {
				// Опции.
				// Необходимо указать данный тип макета.
				iconLayout: 'default#image',
				// Своё изображение иконки метки.
				iconImageHref: '../img/contacts/marker.png',
				// Размеры метки.
				iconImageSize: [30, 42],
				// Смещение левого верхнего угла иконки относительно
				// её "ножки" (точки привязки).
				iconImageOffset: [-5, -38]
			});

		myMap.behaviors.disable('scrollZoom'); //отключение скролла колесиком мыши

		myMap.geoObjects
			.add(myPlacemark);
	});


});

