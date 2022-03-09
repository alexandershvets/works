$(document).ready(function () {
	
	//====================================================================================================
	/* Добавление в разметку background-image инлайном. Классом .ibg */
	// /* Чистый JS */
	// function ibg() {
	// 	document.querySelectorAll(".ibg").forEach(el => {
	// 		if (el.querySelector('img')) {
	// 			el.style.backgroundImage = 'url(' + el.querySelector('img').getAttribute('src') + ')';
	// 		}
	// 	});
	// }
	// ibg();
	/* Добавление в разметку background-image инлайном. Классом .ibg */
	function ibg() {
		$.each($('.ibg'), function (index, val) {
			if ($(this).find('img').length > 0) {
				$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
			}
		});
	}
	ibg();

	//====================================================================================================
	// //MENU
	// let iconMenu = document.querySelector(".menu-header__icon");
	// let body = document.querySelector("body");
	// let menuBody = document.querySelector(".menu-header__menu");

	// iconMenu.addEventListener("click", function () {
	// 	iconMenu.classList.toggle("active");
	// 	body.classList.toggle("lock"); //запрет на скролл контента при открытом меню. В стилях добавить: body.lock {overflow: hidden}
	// 	menuBody.classList.toggle("active");
	// });
	
	//на JQ
	$('.menu-header__icon').click(function (event) {
		$(this).toggleClass('active');
		$('.menu-header__menu').toggleClass('active');
		if ($(this).hasClass('active')) {
			$('body').data('scroll', $(window).scrollTop());
		}
		$('body').toggleClass('lock');
		if (!$(this).hasClass('active')) {
			$('body,html').scrollTop(parseInt($('body').data('scroll')));
		}
	});

	//====================================================================================================
	// TABS
	$('body').on('click', '.tab__navitem', function (event) {
		var eq = $(this).index();

		if ($(this).hasClass('parent')) {
			var eq = $(this).parent().index();
		}
		if (!$(this).hasClass('active')) {
			$(this).closest('.tabs').find('.tab__navitem').removeClass('active');
			$(this).addClass('active');
			$(this).closest('.tabs').find('.tab__item').removeClass('active').eq(eq).addClass('active');
			if ($(this).closest('.tabs').find('.slick-slider').length > 0) {
				$(this).closest('.tabs').find('.slick-slider').slick('setPosition');
			}
		}
	});

	//====================================================================================================
	// SPOILER
	// $('.block__title').click(function (event) {
	// 	if ($('.block').hasClass('one')) { // если нужно скрывать открытые спойлеры при открытии одного, нужно добавить класс .one родителю спойлеров
	// 		$('.block__title').not($(this)).removeClass('active'); // у всех, кроме нажатого спойлера, убрать класс .active
	// 		$('.block__text').not($(this).next()).slideUp(300); // у всех, кроме нажатого спойлера, скрыть текст
	// 	}
	// 	$(this).toggleClass('active').next().slideToggle(300);
	// });
	
	//====================================================================================================
	//UP
	$('#up').click(function (event) {
		$('body, html').animate({
			scrollTop: 0
		}, 300);
	});

	//====================================================================================================

	//SLIDERS
	if ($('.slider').length > 0) { //идет проверка, есть ли такой слайдер, если есть то включаем
		$('.slider').slick({
			arrows: true,
			// nextArrow: '<button type="button" class="slick-next"></button>',
			// prevArrow: '<button type="button" class="slick-prev"></button>',
			dots: true,
			adaptiveHeight: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			speed: 1000,
			easing: 'linear', // вид анимации (ease, ease-in, ease-in-out, linear, ...)
			infinite: true, // по умолчанию true
			// edgeFriction: 0.15, // на какое расстояние можно оттянуть последний слайдер, когда перелистывание закончилось
			initialSlide: 1, // какой слайд будет первым
			autoplay: false,
			autoplaySpeed: 1500, // по умолчанию 3000
			pauseOnFocus: true, // по умолчанию true. При фокусе на слайд автопроигрывание слайдов останавливается
			pauseOnHover: true, // по умолчанию true. При наведении на слайд автопроигрывание слайдов останавливается
			pauseOnDotsHover: true, // по умолчанию true. При наведении на дотс автопроигрывание слайдов останавливается
			draggable: false, // отключить переключение слайдов мышью
			swipe: true, // отключить переключение слайдов на мобильных устройствах
			touchThreshold: 10, // по умолчанию 5. Отвечает за момент срабатывания слайда при свайпе
			touchMove: true, // по умолчанию true. Включает все возможности тачскрина. Если выключить, то не сможешь тянуть слайд
			waitForAnimate: false, // по умолчанию true. Отвечает за переключение слайдов. Если выключить, то можно быстро переключать слайды, не дожидаясь завершения анимации
			centerMode: false, // по умолчанию false. Отвечает за центрирование главного слайда. Если true, то главный слайд встанет по центру. Добавляется класс .slick-center
			// centerPadding: '50px', // размер видимой части других слайдов по бокам центрального (видимого) слайда
			variableWidth: false, // по умолчанию false. Отвечает за то, какой шириной будет слайд. Если true, то слайд будет шириной равной ширине его содержимого, хорошо рботает совместно с centerMode: true
			rows: 1, // по умолчанию 1. Отвечает за кол-во рядовю Если 2, то будет 2 объекта содержимого в одном слайде
			slidesPerRow: 1, // по умолчанию 1. Кол-во слайдов в ряду
			vertical: false, // по умолчанию false. Отвечает за вертикальное отображание слайдов. Чтобы работало, нужно у класса .slick-track выключить display: flex. Вертикальный слайдер работает не так корректно с разным контентом как горизонтальный, по этому нужно для конкретного слайдера, слайдам .slide__item указать высоту
			verticalSwiping: false, // по умолчанию false. Отвечает за вертикальный свайпинг. Если у становлен параметр vertical: true, то нужно включить вертикальный свайпинг, иначе он будет горизонтальный
			// rtl: false, // переключение слайдера слева на право. НО! Нужно блоку слайдера задать параметр dir="rtl"
			lazyLoad: 'ondemand', // по умолчанию ondemand. Как будет подгружаться картинка. ondemand - в момент когда появится слайд, progressive - вместе с сайтом
			fade: false, // по умолчанию false. Отвечает за плавное появление слайда. Работает только с slidesToShow: 1
			// asNavFor: '.slider-big', // Отвечает за связывание нескольких слайдеров. Чтобы работало, нужно указать класс другого слайдера. У другого слайдера повторить аналогично с этим же параметром. НО! У связанных слайдеров должно быть равное количество слайдов.
			// focusOnSelect: true, // ИЛИ прописать ВТОРОМУ слайдеру, чтобы по клику на слайд, в первом слайдере переключались слайды
			// zIndex: 1000, // zi-index
			responsive: [{
				breakpoint: 768,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1
				}
			}
			],
			mobileFirst: false, // по умолчанию false. Если true, то параметр поменяет значение с max-width на min-width
			// appendArrows: $('.objects-controls'), // данный параметр переместит стрелки, в какой-то элемент на странице (например в див). Чтобы параметр работал, указать класс элемента в который нужно поместить стрелки. НО! Стрелки перенесутся без стилей.
			// appendDots: $('.objects-controls') // работает аналогично параметру appendArrows

		});
	}

	/* Events ================================== */
	/* Событие ДО смены слайда */
	// event - событие
	// slick - сам слайдер
	// currentSlide - получить текущий слайд, ДО того как произошла смена слайда
	// nextSlide - получить слудующий слайд, ДО того как произошла смена слайда
	// $('.slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
	// 	console.log(currentSlide);
	// });

	/* Событие ПОСЛЕ смены слайда */
	// event - событие
	// slick - сам слайдер
	// currentSlide - получить текущий слайд, ПОСЛЕ того как произошла смена слайда
	// $('.slider').on('afterChange', function (event, slick, currentSlide) {
	// 	console.log(currentSlide);
	// });

	/* Methods ================================= */
	/* setPosition */
	/* Этот метод стоит вызывать, когда нужно "перезагрузить" слайдер.
	Все дело в том, что слайдер высчитывает размеры слайдов и т.д. в зависимости от своего контейнера и оболочки, в которой он находится.
	И если, к примеру, изначально скрыт (dispaly: none), а по нажатию по чему-либо он показывается,
	то иногда могут возникнуть проблемы с подсчетом размеров. Слайдер будет выглядеть и работать некорректно. 
	И если такое случается, то стоит после предыдущего метода, который открывает этот блок,
	после инициализации слайдера, вызвать этот метод setPosition.
	Этот метод "встряхнет" слайдер, и он отобразится нормально.*/
	// $('slider').slick('setPosition');

	/* goTo */
	/* Этот метод позволяет пролистать до определенного слайдера.
	Пригодится там, где нужно управлять слайдером из каких-то других событий.
	Например: при клике на ссылку, слайдер пролистается до указанного
	$('.link').click(function (event) {
		$('.slider').slick('goTo', 3);
	}); */
	// $('.slider').slick('goTo', 3);

	/* slickPrev, slickNext */
	/* Пригодится там, где нужно управлять слайдером из каких-то других событий.
	Например: при клике на ссылку, слайдер пролистается до указанного,
	$('.link_l').click(function (event) {
		$('.slider').slick('slickPrev');
	});
	$('.link_r').click(function (event) {
		$('.slider').slick('slickNext');
	}); */
	// $('.slider').slick('slickPrev');
	// $('.slider').slick('slickNext');

	/* slickPlay */
	/* Пригодится там, где нужно управлять слайдером из каких-то других событий.
	Например:
	$('.link_play').click(function (event) {
		$('.slider').slick('slickPlay');
	});
	$('.link_pause').click(function (event) {
		$('.slider').slick('slickPause');
	}); */
	// $('.slider').slick('slickPlay');
	// $('.slider').slick('slickPause');

	/* slickAdd */
	/* Пригодится там, где нужно управлять слайдером из каких-то других событий.
	Например, при клике на какой-то объект любо при загрузке, при помощи ajax запроса на сервер,
	я могу на лету добавить слайды в мой слайдер */
	// $('.link_add').click(function (event) {
	// 	$('.slider').slick('slickAdd', '<div class="newslide">123</div>');
	// 	return false;
	// });
	// $('.link_remove').click(function (event) {
	// 	$('.slider').slick('slickRemove', 0);
	// 	return false;
	// });

	/* slickFilter, slickUnfilter */
	/* Позволяет фильтровать слайды */
	// var filtered = false;
	// $('.link_filter').on('click', function() {
	// 	if (filtered === false) {
	// 		$('.slider').slick('slickFilter', '.filter');
	// 		$(this).text('Убрать фильтр');
	// 		filtered = true;
	// 	} else {
	// 		$('.slider').slick('slickUnfilter');
	// 		$(this).text('Фильтровать');
	// 		filtered = false;
	// 	}
	// });

	/* slickGetOption, slicSetOption */
	/* Позволяют получить или назначить значения той или иной опции слайдера.
	Например: я хочу узнать сколько у меня выводится слайдеров */
	// var s = $('.slider').slick('slickGetOption', 'slidesToShow');
	// console.log(s);
	/* Например: теперь я хочу переназначить это значение */
	// $('.slider').slick('slickSetOption', 'slidesToShow', 2);

	/* unslick */
	/* Отключает слайдер */
	// $('.slider').slick('unslick');

	//====================================================================================================
	
	//GOOGLE MAPS
	
	var section = $('.investor');
	var reviewsTop = section.offset().top; // отщитываем пиксели до .investor
	$(window).bind('scroll', function () { //когда мы прокручиваем сайт, нам нужно проверить
		var windowTop = $(this).scrollTop();
		if (windowTop > reviewsTop) {

			// Скрипт Googl Maps
			function map(n) {
				google.maps.Map.prototype.setCenterWithOffset = function (latlng, offsetX, offsetY) {
					var map = this;
					var ov = new google.maps.OverlayView();
					ov.onAdd = function () {
						var proj = this.getProjection();
						var aPoint = proj.fromLatLngToContainerPixel(latlng);
						aPoint.x = aPoint.x + offsetX;
						aPoint.y = aPoint.y + offsetY;
						map.panTo(proj.fromContainerPixelToLatLng(aPoint));
						//map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
					}
					ov.draw = function () { };
					ov.setMap(this);
				};
				var markers = new Array();
				var infowindow = new google.maps.InfoWindow({
					//pixelOffset: new google.maps.Size(-230,250)
				});
				var locations = [
					[new google.maps.LatLng(53.819055, 27.8813694)],
					[new google.maps.LatLng(53.700055, 27.5513694)],
					[new google.maps.LatLng(53.809055, 27.5813694)],
					[new google.maps.LatLng(53.859055, 27.5013694)],
				]
				var options = {
					zoom: 10,
					panControl: false,
					mapTypeControl: false,
					center: locations[0][0],
					styles: [
						{
							"featureType": "administrative",
							"elementType": "labels.text.fill",
							"stylers": [
								{
									"color": "#444444"
								}
							]
						},
						{
							"featureType": "landscape",
							"elementType": "all",
							"stylers": [
								{
									"color": "#f2f2f2"
								}
							]
						},
						{
							"featureType": "poi",
							"elementType": "all",
							"stylers": [
								{
									"visibility": "off"
								}
							]
						},
						{
							"featureType": "road",
							"elementType": "all",
							"stylers": [
								{
									"saturation": -100
								},
								{
									"lightness": 45
								}
							]
						},
						{
							"featureType": "road.highway",
							"elementType": "all",
							"stylers": [
								{
									"visibility": "simplified"
								}
							]
						},
						{
							"featureType": "road.arterial",
							"elementType": "labels.icon",
							"stylers": [
								{
									"visibility": "off"
								}
							]
						},
						{
							"featureType": "transit",
							"elementType": "all",
							"stylers": [
								{
									"visibility": "off"
								}
							]
						},
						{
							"featureType": "water",
							"elementType": "all",
							"stylers": [
								{
									"color": "#46bcec"
								},
								{
									"visibility": "on"
								}
							]
						}
					],
					// styles: [{ "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#e0efef" }] }, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "hue": "#1900ff" }, { "color": "#c0e8e8" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "lightness": 100 }, { "visibility": "simplified" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "visibility": "on" }, { "lightness": 700 }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#7dcdcd" }] }],
					scrollwheel: false,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				var map = new google.maps.Map(document.getElementById('map'), options);
				var icon = {
					url: 'images/dest/icons/map.svg',
					scaledSize: new google.maps.Size(24, 29),
					anchor: new google.maps.Point(12, 15)
				}
				for (var i = 0; i < locations.length; i++) {
					var marker = new google.maps.Marker({
						icon: icon,
						position: locations[i][0],
						map: map,
					});
					google.maps.event.addListener(marker, 'click', (function (marker, i) {
						return function () {
							for (var m = 0; m < markers.length; m++) {
								markers[m].setIcon(icon);
							}
							var cnt = i + 1;
							infowindow.setContent($('.contacts-map-item_' + cnt).html());
							infowindow.open(map, marker);
							marker.setIcon(icon);
							map.setCenterWithOffset(marker.getPosition(), 0, 0);
							setTimeout(function () {
								baloonstyle();
							}, 10);
						}
					})(marker, i));
					markers.push(marker);
				}

				if (n) {
					var nc = n - 1;
					setTimeout(function () {
						google.maps.event.trigger(markers[nc], 'click');
					}, 500);
				}
			}
			function baloonstyle() {
				$('.gm-style-iw').parent().addClass('baloon');
				$('.gm-style-iw').prev().addClass('baloon-style');
				$('.gm-style-iw').next().addClass('baloon-close');
				$('.gm-style-iw').addClass('baloon-content');
			}
			if ($("#map").length > 0) {
				map(1);
			}

		}
	});

	//====================================================================================================

});