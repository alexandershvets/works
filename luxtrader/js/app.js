$(document).ready(function () {
	var w = $(window).outerWidth();
	var h = $(window).outerHeight();
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");
	var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
	function isIE() {
		ua = navigator.userAgent;
		var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
		return is_ie;
	}
	if (isIE()) {
		$('body').addClass('ie');
	}
	if (isMobile.any()) {
		$('body').addClass('touch');
	}
// ========================================================================
// Переменная isMobile определяет что страница открыта на мобильном устройстве.

var isMobile = {
	Android: function () { return navigator.userAgent.match(/Android/i); },
	BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
	iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
	Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
	Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
	any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};
if (isMobile.any()) {}

if (location.hash) {
	var hsh = location.hash.replace('#', '');
	if ($('.popup-' + hsh).length > 0) {
		popupOpen(hsh);
	} else if ($('div.' + hsh).length > 0) {
		$('body,html').animate({ scrollTop: $('div.' + hsh).offset().top, }, 500, function () { });
	}
}

var act = "click";
if (isMobile.iOS()) {
	var act = "touchstart";
}

// ========================================================================
// WebP

function testWebP(callback) {
	var webP = new Image();

	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};

	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp');
	}
});

// ========================================================================
// IBG
// Добавление в разметку background-image инлайном. Блоку с картинкой задать класс ._ibg

function ibg() {
	if (isIE()) {
		var _ibg = document.querySelectorAll("._ibg");

		for (var i = 0; i < _ibg.length; i++) {
			if (_ibg[i].querySelector('img') && _ibg[i].querySelector('img').getAttribute('src') != null) {
				_ibg[i].style.backgroundImage = 'url(' + _ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}

ibg();

// ========================================================================

if (document.querySelector('.wrapper')) {
	document.querySelector('.wrapper').classList.add('_loaded');
}

// ========================================================================
// MENU

// JS
// let iconMenu = document.querySelector(".icon-menu");
// let body = document.querySelector("body");
// let menuBody = document.querySelector(".menu__body");
// if (iconMenu) {
// 	iconMenu.addEventListener("click", (e) => {
// 		iconMenu.classList.toggle("_active");
// 		body.classList.toggle("lock"); //запрет на скролл контента при открытом меню. В стилях добавить: body.lock {overflow: hidden}
// 		menuBody.classList.toggle("_active");
// 	});
// }

// JQ
$('.icon-menu').click(function (event) {
	$(this).toggleClass('_active');
	$('.menu__bodu').toggleClass('_active');
	if ($(this).hasClass('_active')) {
		$('body').data('scroll', $(window).scrollTop());
	}
	$('body').toggleClass('_lock');
	if (!$(this).hasClass('_active')) {
		$('body,html').scrollTop(parseInt($('body').data('scroll')));
	}
});


// ========================================================================
// скролл до нужной секции
// ._goto - добавить класс ссылке меню, в атрибут href вписать класс блока, до которогу нужно попасть.
// пример: <li><a href="#about" class="menu__link goto">About</a></li>

$('._goto').click(function () {
	var el = $(this).attr('href').replace('#', '');
	var offset = 0;
	$('body, html').animate({ scrollTop: $('.' + el).offset().top + offset }, 500, function () { });

	if ($('.menu__bodu').hasClass('_active')) {
		$('.menu__bodu, .icon-menu').removeClass('_active');
		$('body').removeClass('_lock');
	}

	return false;
});

// ========================================================================
// TABS

// .tabs - добавить блоку родителю.
// .tab__navitem - добавить навигационным лементам.
// .tab__item - добавить к табам.
// .active - добавить к любому табу или навигационному элементу. Сделает элемент активным по умолчанию.

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

// ========================================================================
//POPUP

// .pl - добавить кнопке-ссылке.
// Также нужно придумать href="#якорь", затем этот якорь прописать в файле popup.html в классе после .popup- после тире, вот так: popup-якорь

$('.pl').click(function (event) {
	var pl = $(this).attr('href').replace('#', '');
	var v = $(this).data('vid');
	popupOpen(pl, v);
	return false;
});

function popupOpen(pl, v) {
	$('.popup').removeClass('active').hide();
	if (!$('.header-menu').hasClass('active')) {
		$('body').data('scroll', $(window).scrollTop());
	}
	if (!isMobile.any()) {
		$('body').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() }).addClass('lock');
		$('.pdb').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() });
	} else {
		setTimeout(function () {
			$('body').addClass('lock');
		}, 300);
	}
	history.pushState('', '', '#' + pl);
	if (v != '' && v != null) {
		$('.popup-' + pl + ' .popup-video__value').html('<iframe src="https://www.youtube.com/embed/' + v + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>');
	}
	$('.popup-' + pl).fadeIn(300).delay(300).addClass('active');

	if ($('.popup-' + pl).find('.slick-slider').length > 0) {
		$('.popup-' + pl).find('.slick-slider').slick('setPosition');
	}
}

function openPopupById(popup_id) {
	$('#' + popup_id).fadeIn(300).delay(300).addClass('active');
}

function popupClose() {
	$('.popup').removeClass('active').fadeOut(300);
	if (!$('.header-menu').hasClass('active')) {
		if (!isMobile.any()) {
			setTimeout(function () {
				$('body').css({ paddingRight: 0 });
				$('.pdb').css({ paddingRight: 0 });
			}, 200);
			setTimeout(function () {
				$('body').removeClass('lock');
				$('body,html').scrollTop(parseInt($('body').data('scroll')));
			}, 200);
		} else {
			$('body').removeClass('lock');
			$('body,html').scrollTop(parseInt($('body').data('scroll')));
		}
	}
	$('.popup-video__value').html('');

	history.pushState('', '', window.location.href.split('#')[0]);
}

$('.popup-close,.popup__close').click(function (event) {
	popupClose();
	return false;
});

$('.popup').click(function (e) {
	if (!$(e.target).is(".popup>.popup-table>.cell *") || $(e.target).is(".popup-close") || $(e.target).is(".popup__close")) {
		popupClose();
		return false;
	}
});

$(document).on('keydown', function (e) {
	if (e.which == 27) {
		popupClose();
	}
});

// ========================================================================
// SPOLLER

// .spoller - добавлять элементу споллер. Активация споллера.
// .closeall - добавлять элементу споллер. При клике на один споллер, будет закрываться другой.
// .active - добавлять элементу споллер. Сделает споллер открытым по умолчанию.

$.each($('.spoller.active'), function (index, val) {
	$(this).next().show();
});
$('body').on('click', '.spoller', function (event) {
	if ($(this).hasClass('mob') && !isMobile.any()) {
		return false;
	}
	if ($(this).hasClass('closeall') && !$(this).hasClass('active')) {
		$.each($(this).closest('.spollers').find('.spoller'), function (index, val) {
			$(this).removeClass('active');
			$(this).next().slideUp(300);
		});
	}
	$(this).toggleClass('active').next().slideToggle(300, function (index, val) {
		if ($(this).parent().find('.slick-slider').length > 0) {
			$(this).parent().find('.slick-slider').slick('setPosition');
		}
	});
	return false;
});

// ========================================================================
// ZOOM
// Библиотека - baguetteBox ( npm install baguettebox.js --save )

if ($('.gallery').length > 0) {
	baguetteBox.run('.gallery', {
		// Custom options
	});
}

// ========================================================================
// UP

$(window).scroll(function () {
	var w = $(window).width();
	if ($(window).scrollTop() > 50) {
		$('#up').fadeIn(300);
	} else {
		$('#up').fadeOut(300);
	}
});

$('#up').click(function (event) {
	$('body,html').animate({ scrollTop: 0 }, 300);
});

// ========================================================================
// Клик вне области

$(document).on('click touchstart', function (e) {
	if (!$(e.target).is(".select *")) {
		$('.select').removeClass('active');
	};
});

// ========================================================================
// FILTER

$('.filter__item').click(function (event) {
	var i = $(this).data('filter');

	if (i == 1) {
		$('.portfolio__column').show();
	} else {
		$('.portfolio__column').hide();
		$('.portfolio__column.f_' + i).show();
	}

	$('.filter__item').removeClass('active');
	$(this).addClass('active');

	return false;
});

// ========================================================================
// Скрипт для эффекта параллакс
// .mainblock__image — блок с фоновой картинкой

$(window).scroll(function (event) {
	var s = 0 - $(this).scrollTop() / 3;
	$('.mainblock__image').css('transform', 'translate3d(0, ' + s + 'px, 0)');
});

// ========================================================================

// function scrolloptions() {
// 	var scs = 100;
// 	var mss = 50;
// 	var bns = false;
// 	if (isMobile.any()) {
// 		scs = 10;
// 		mss = 1;
// 		bns = true;
// 	}
// 	var opt = {
// 		cursorcolor: "#fff",
// 		cursorwidth: "4px",
// 		background: "",
// 		autohidemode: true,
// 		cursoropacitymax: 0.4,
// 		bouncescroll: bns,
// 		cursorborderradius: "0px",
// 		scrollspeed: scs,
// 		mousescrollstep: mss,
// 		directionlockdeadzone: 0,
// 		cursorborder: "0px solid #fff",
// 	};
// 	return opt;
// }
// function scroll() {
// 	$('.scroll-body').niceScroll('.scroll-list', scrolloptions());
// }
// if (navigator.appVersion.indexOf("Mac") != -1) {
// } else {
// 	if ($('.scroll-body').length > 0) { scroll(); }
// }

/*
function scrollwhouse(){
		var scs=100;
		var mss=50;
		var bns=false;
	if(isMobile.any()){
		scs=10;
		mss=1;
		bns=true;
	}
	var opt={
		cursorcolor:"#afafaf",
		cursorwidth: "5px",
		background: "",
		autohidemode:false,
		railalign: 'left',
		cursoropacitymax: 1,
		bouncescroll:bns,
		cursorborderradius: "0px",
		scrollspeed:scs,
		mousescrollstep:mss,
		directionlockdeadzone:0,
		cursorborder: "0px solid #fff",
	};
	return opt;
}
$('.whouse-content-body').niceScroll('.whouse-content-scroll',scrollwhouse());
$('.whouse-content-body').scroll(function(event) {
		var s=$(this).scrollTop();
		var r=Math.abs($(this).outerHeight()-$('.whouse-content-scroll').outerHeight());
		var p=s/r*100;
	$('.whouse-content__shadow').css({opacity:1-1/100*p});
});
*/

// ========================================================================
// Плагин webui-popover (всплывающая подсказка при наведении)

if ($('.t,.tip').length > 0) {
	tip();
}
function tip() {
	$('.t,.tip').webuiPopover({
		placement: 'top',
		trigger: 'hover',
		backdrop: false,
		//selector: true,
		animation: 'fade',
		dismissible: true,
		padding: false,
		//hideEmpty: true
		onShow: function ($element) { },
		onHide: function ($element) { },
	}).on('show.webui.popover hide.webui.popover', function (e) {
		$(this).toggleClass('active');
	});
}

// ========================================================================
// // Библиотека - wow.js

// // new WOW().init();
// var wow = new WOW(
// 	{
// 		boxClass: 'wow',      // animated element css class (default is wow)
// 		animateClass: 'animated', // animation css class (default is animated)
// 		offset: 0,          // distance to the element when triggering the animation (default is 0)
// 		mobile: false,       // trigger animations on mobile devices (default is true)
// 		live: true,       // act on asynchronously loaded content (default is true)
// 		callback: function (box) {
// 			// the callback is fired every time an animation is started
// 			// the argument that is passed in is the DOM node being animated
// 		},
// 		scrollContainer: null,    // optional scroll container selector, otherwise use window,
// 		resetAnimation: true,     // reset animation on end (default is true)
// 	}
// );
// wow.init();

// ========================================================================
// Dynamic Adapt v.1
// HTML data-move="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-move="item,2,992"
// Andrikanych Yevhen 2020
var move_array = [];
var move_objects = document.querySelectorAll("[data-move]");

if (move_objects.length > 0) {
	for (var _index10 = 0; _index10 < move_objects.length; _index10++) {
		var _el6 = move_objects[_index10];

		var data_move = _el6.getAttribute("data-move");

		if (data_move != "" || data_move != null) {
			_el6.setAttribute("data-move-index", _index10);

			move_array[_index10] = {
				parent: _el6.parentNode,
				index: index_in_parent(_el6)
			};
		}
	}
}

function dynamic_adapt() {
	var w = document.querySelector("body").offsetWidth;

	if (move_objects.length > 0) {
		for (var _index11 = 0; _index11 < move_objects.length; _index11++) {
			var _el7 = move_objects[_index11];

			var _data_move = _el7.getAttribute("data-move");

			if (_data_move != "" || _data_move != null) {
				var data_array = _data_move.split(",");

				var data_parent = document.querySelector("." + data_array[0]);
				var data_index = data_array[1];
				var data_bp = data_array[2];

				if (w < data_bp) {
					if (!_el7.classList.contains("js-move_done_" + data_bp)) {
						if (data_index > 0) {
							//insertAfter
							var actual_index = index_of_elements(data_parent)[data_index];
							data_parent.insertBefore(_el7, data_parent.childNodes[actual_index]);
						} else {
							data_parent.insertBefore(_el7, data_parent.firstChild);
						}

						_el7.classList.add("js-move_done_" + data_bp);
					}
				} else {
					if (_el7.classList.contains("js-move_done_" + data_bp)) {
						dynamic_adaptive_back(_el7);

						_el7.classList.remove("js-move_done_" + data_bp);
					}
				}
			}
		}
	}

	custom_adapt(w);
}

function dynamic_adaptive_back(el) {
	var index_original = el.getAttribute("data-move-index");
	var move_place = move_array[index_original];
	var parent_place = move_place["parent"];
	var index_place = move_place["index"];

	if (index_place > 0) {
		//insertAfter
		var actual_index = index_of_elements(parent_place)[index_place];
		parent_place.insertBefore(el, parent_place.childNodes[actual_index]);
	} else {
		parent_place.insertBefore(el, parent_place.firstChild);
	}
}

function index_in_parent(node) {
	var children = node.parentNode.childNodes;
	var num = 0;

	for (var _i2 = 0; _i2 < children.length; _i2++) {
		if (children[_i2] == node) return num;
		if (children[_i2].nodeType == 1) num++;
	}

	return -1;
}

function index_of_elements(parent) {
	var children = [];

	for (var _i3 = 0; _i3 < parent.childNodes.length; _i3++) {
		if (parent.childNodes[_i3].nodeType == 1 && parent.childNodes[_i3].getAttribute("data-move") == null) {
			children.push(_i3);
		}
	}

	return children;
}

window.addEventListener("resize", function (event) {
	dynamic_adapt();
});
dynamic_adapt();

function custom_adapt(w) { }
// ========================================================================
// SLIDERS простая заготовка

if ($('.main-slider__body').length > 0) {
	$('.main-slider__body').slick({
		//autoplay: true,
		//infinite: false,
		dots: true,
		arrows: false,
		accessibility: false,
		slidesToShow: 1,
		autoplaySpeed: 3000,
		//asNavFor:'',
		appendDots: $('.control-main-slider__dots'),
		appendArrows: $('.main-slider__control'),
		arrows: true,
		nextArrow: '<div class="control-main-slider__arrow control-main-slider__arrow--next"></div>',
		prevArrow: '<div class="control-main-slider__arrow control-main-slider__arrow--prev"></div>',
		responsive: [{
			breakpoint: 768,
			settings: {
				adaptiveHeight: true,
			}
		}]
	});
}

if ($('.slider-lots__body._slider').length > 0) {
	$('.slider-lots__body._slider').slick({
		//autoplay: true,
		//infinite: false,
		dots: false,
		arrows: true,
		accessibility: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplaySpeed: 3000,
		//asNavFor:'',
		// appendDots: $(''),
		appendArrows: $('.control-slider-lots'),
		nextArrow: '<div class="control-slider-lots__arrow control-slider-lots__arrow--prev"><span></span></div>',
		prevArrow: '<div class="control-slider-lots__arrow control-slider-lots__arrow--next"><span></span></div>',
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 2
			},
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1
			},
		}]
	});
}

if ($('.slider-quotes__body._slider').length > 0) {
	$('.slider-quotes__body._slider').slick({
		fade: true,
		autoplay: true,
		// infinite: false,
		dots: false,
		arrows: true,
		accessibility: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplaySpeed: 6000,
		appendArrows: $('.control-slider-quotes__link'),
		nextArrow: '.control-slider-quotes__circle',
		prevArrow: '',
		responsive: [{
			breakpoint: 570,
			settings: {
				adaptiveHeight: true,
			}
		}]
	});
}

// ========================================================================
// SLICK SLIDERS

// if ($('.slider').length > 0) { //идет проверка, есть ли такой слайдер, если есть то включаем
// 	$('.slider').slick({
// 		arrows: true,
// 		// nextArrow: '<button type="button" class="slick-next"></button>',
// 		// prevArrow: '<button type="button" class="slick-prev"></button>',
// 		dots: true,
// 		adaptiveHeight: true,
// 		slidesToShow: 3,
// 		slidesToScroll: 1,
// 		speed: 1000,
// 		easing: 'linear', // вид анимации (ease, ease-in, ease-in-out, linear, ...)
// 		infinite: true, // по умолчанию true
// 		// edgeFriction: 0.15, // на какое расстояние можно оттянуть последний слайдер, когда перелистывание закончилось
// 		initialSlide: 1, // какой слайд будет первым
// 		autoplay: false,
// 		autoplaySpeed: 1500, // по умолчанию 3000
// 		pauseOnFocus: true, // по умолчанию true. При фокусе на слайд автопроигрывание слайдов останавливается
// 		pauseOnHover: true, // по умолчанию true. При наведении на слайд автопроигрывание слайдов останавливается
// 		pauseOnDotsHover: true, // по умолчанию true. При наведении на дотс автопроигрывание слайдов останавливается
// 		draggable: false, // отключить переключение слайдов мышью
// 		swipe: true, // отключить переключение слайдов на мобильных устройствах
// 		touchThreshold: 10, // по умолчанию 5. Отвечает за момент срабатывания слайда при свайпе
// 		touchMove: true, // по умолчанию true. Включает все возможности тачскрина. Если выключить, то не сможешь тянуть слайд
// 		waitForAnimate: false, // по умолчанию true. Отвечает за переключение слайдов. Если выключить, то можно быстро переключать слайды, не дожидаясь завершения анимации
// 		centerMode: false, // по умолчанию false. Отвечает за центрирование главного слайда. Если true, то главный слайд встанет по центру. Добавляется класс .slick-center
// 		// centerPadding: '50px', // размер видимой части других слайдов по бокам центрального (видимого) слайда
// 		variableWidth: false, // по умолчанию false. Отвечает за то, какой шириной будет слайд. Если true, то слайд будет шириной равной ширине его содержимого, хорошо рботает совместно с centerMode: true
// 		rows: 1, // по умолчанию 1. Отвечает за кол-во рядовю Если 2, то будет 2 объекта содержимого в одном слайде
// 		slidesPerRow: 1, // по умолчанию 1. Кол-во слайдов в ряду
// 		vertical: false, // по умолчанию false. Отвечает за вертикальное отображание слайдов. Чтобы работало, нужно у класса .slick-track выключить display: flex. Вертикальный слайдер работает не так корректно с разным контентом как горизонтальный, по этому нужно для конкретного слайдера, слайдам .slide__item указать высоту
// 		verticalSwiping: false, // по умолчанию false. Отвечает за вертикальный свайпинг. Если у становлен параметр vertical: true, то нужно включить вертикальный свайпинг, иначе он будет горизонтальный
// 		// rtl: false, // переключение слайдера слева на право. НО! Нужно блоку слайдера задать параметр dir="rtl"
// 		lazyLoad: 'ondemand', // по умолчанию ondemand. Как будет подгружаться картинка. ondemand - в момент когда появится слайд, progressive - вместе с сайтом
// 		fade: false, // по умолчанию false. Отвечает за плавное появление слайда. Работает только с slidesToShow: 1
// 		// asNavFor: '.slider-big', // Отвечает за связывание нескольких слайдеров. Чтобы работало, нужно указать класс другого слайдера. У другого слайдера повторить аналогично с этим же параметром. НО! У связанных слайдеров должно быть равное количество слайдов.
// 		// focusOnSelect: true, // ИЛИ прописать ВТОРОМУ слайдеру, чтобы по клику на слайд, в первом слайдере переключались слайды
// 		// zIndex: 1000, // zi-index
// 		responsive: [{
// 			breakpoint: 768,
// 			settings: {
// 				slidesToShow: 2
// 			}
// 		},
// 		{
// 			breakpoint: 576,
// 			settings: {
// 				slidesToShow: 1
// 			}
// 		}
// 		],
// 		mobileFirst: false, // по умолчанию false. Если true, то параметр поменяет значение с max-width на min-width
// 		// appendArrows: $('.objects-controls'), // данный параметр переместит стрелки, в какой-то элемент на странице (например в див). Чтобы параметр работал, указать класс элемента в который нужно поместить стрелки. НО! Стрелки перенесутся без стилей.
// 		// appendDots: $('.objects-controls') // работает аналогично параметру appendArrows

// 	});
// }

/*  ============ Events ============ */

	// Событие ДО смены слайда ================
	// event - событие
	// slick - сам слайдер
	// currentSlide - получить текущий слайд, ДО того как произошла смена слайда
	// nextSlide - получить слудующий слайд, ДО того как произошла смена слайда
	// $('.slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
	// 	console.log(currentSlide);
	// });

	// Событие ПОСЛЕ смены слайда ================

	// event - событие
	// slick - сам слайдер
	// currentSlide - получить текущий слайд, ПОСЛЕ того как произошла смена слайда

	// $('.slider').on('afterChange', function (event, slick, currentSlide) {
	// 	console.log(currentSlide);
	// });


/*  ============ Methods ============ */

	// setPosition ================

/* Этот метод стоит вызывать, когда нужно "перезагрузить" слайдер.
Все дело в том, что слайдер высчитывает размеры слайдов и т.д. в зависимости от своего контейнера и оболочки, в которой он находится.
И если, к примеру, изначально скрыт (dispaly: none), а по нажатию по чему-либо он показывается,
то иногда могут возникнуть проблемы с подсчетом размеров. Слайдер будет выглядеть и работать некорректно.
И если такое случается, то стоит после предыдущего метода, который открывает этот блок,
после инициализации слайдера, вызвать этот метод setPosition.
Этот метод "встряхнет" слайдер, и он отобразится нормально.*/

	// $('slider').slick('setPosition');


	// goTo ================

/* Этот метод позволяет пролистать до определенного слайдера.
Пригодится там, где нужно управлять слайдером из каких-то других событий.
Например: при клике на ссылку, слайдер пролистается до указанного

$('.link').click(function (event) {
	$('.slider').slick('goTo', 3);
}); */
	// $('.slider').slick('goTo', 3);


	// slickPrev, slickNext ================

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


	// slickPlay ================

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


	// slickAdd ================

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


	// slickFilter, slickUnfilter ================

	// Позволяет фильтровать слайды

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


	// slickGetOption, slicSetOption ================

/* Позволяют получить или назначить значения той или иной опции слайдера.
Например: я хочу узнать сколько у меня выводится слайдеров */

	// var s = $('.slider').slick('slickGetOption', 'slidesToShow');
	// console.log(s);
/* Например: теперь я хочу переназначить это значение */
	// $('.slider').slick('slickSetOption', 'slidesToShow', 2);

/* unslick */
/* Отключает слайдер */
	// $('.slider').slick('unslick');
/* //= scroll.js */
/* //= map.js */
//FORMS
function forms() {

	// data-ms="придуманныйкласс" - добавлять дата атрибут тегу form. Для того чтобы после отправки формы появлялся попап, затем этот придуманный класс добавить попапу, в файле popup.html с классом .popup-message

	// SELECT ================================================
	if ($('select').length > 0) {
		function selectscrolloptions() {
			var scs = 100;
			var mss = 50;
			if (isMobile.any()) {
				scs = 10;
				mss = 1;
			}
			var opt = {
				cursorcolor: "#2078e5", // цвет скролла
				cursorwidth: "3px", // ширина скролла
				background: "",
				autohidemode: false,
				bouncescroll: false,
				cursorborderradius: "0px", // бордер-радиус скролла
				scrollspeed: scs,
				mousescrollstep: mss,
				directionlockdeadzone: 0,
				cursorborder: "0px solid #fff", // граница скролла
			};
			return opt;
		}

		function select() {
			$.each($('select'), function (index, val) {
				var ind = index;
				$(this).hide();
				if ($(this).parent('.select-block').length == 0) {
					$(this).wrap("<div class='select-block " + $(this).attr('class') + "-select-block'></div>");
				} else {
					$(this).parent('.select-block').find('.select').remove();
				}
				var milti = '';
				var check = '';
				var sblock = $(this).parent('.select-block');
				var soptions = "<div class='select-options'><div class='select-options-scroll'><div class='select-options-list'>";
				if ($(this).attr('multiple') == 'multiple') {
					milti = 'multiple';
					check = 'check';
				}
				$.each($(this).find('option'), function (index, val) {
					if ($(this).attr('value') != '') {
						soptions = soptions + "<div data-value='" + $(this).attr('value') + "' class='select-options__value_" + ind + " select-options__value value_" + $(this).val() + " " + $(this).attr('class') + " " + check + "'>" + $(this).html() + "</div>";
					} else if ($(this).parent().attr('data-label') == 'on') {
						if (sblock.find('.select__label').length == 0) {
							sblock.prepend('<div class="select__label">' + $(this).html() + '</div>');
						}
					}
				});
				soptions = soptions + "</div></div></div>";
				if ($(this).attr('data-type') == 'search') {
					sblock.append("<div data-type='search' class='select_" + ind + " select" + " " + $(this).attr('class') + "__select " + milti + "'>" +
						"<div class='select-title'>" +
						"<div class='select-title__arrow ion-ios-arrow-down'></div>" +
						"<input data-value='" + $(this).find('option[selected="selected"]').html() + "' class='select-title__value value_" + $(this).find('option[selected="selected"]').val() + "' />" +
						"</div>" +
						soptions +
						"</div>");
					$('.select_' + ind).find('input.select-title__value').jcOnPageFilter({
						parentSectionClass: 'select-options_' + ind,
						parentLookupClass: 'select-options__value_' + ind,
						childBlockClass: 'select-options__value_' + ind
					});
				} else {
					sblock.append("<div class='select_" + ind + " select" + " " + $(this).attr('class') + "__select " + milti + "'>" +
						"<div class='select-title'>" +
						"<div class='select-title__arrow ion-ios-arrow-down'></div>" +
						"<div class='select-title__value value_" + $(this).find('option[selected="selected"]').val() + "'>" + $(this).find('option[selected="selected"]').html() + "</div>" +
						"</div>" +
						soptions +
						"</div>");
				}
				if ($(this).find('option[selected="selected"]').val() != '') {
					sblock.find('.select').addClass('_focus');
				}
				if ($(this).attr('data-req') == 'on') {
					$(this).addClass('_req');
				}
				$(".select_" + ind + " .select-options-scroll").niceScroll('.select-options-list', selectscrolloptions());
			});
		}
		select();

		$('body').on('keyup', 'input.select-title__value', function () {
			$('.select').not($(this).parents('.select')).removeClass('active').find('.select-options').slideUp(50);
			$(this).parents('.select').addClass('active');
			$(this).parents('.select').find('.select-options').slideDown(50, function () {
				$(this).find(".select-options-scroll").getNiceScroll().resize();
			});
			$(this).parents('.select-block').find('select').val('');
		});
		$('body').on('click', '.select', function () {
			if (!$(this).hasClass('disabled')) {
				$('.select').not(this).removeClass('active').find('.select-options').slideUp(50);
				$(this).toggleClass('active');
				$(this).find('.select-options').slideToggle(50, function () {
					$(this).find(".select-options-scroll").getNiceScroll().resize();
				});

				//	var input=$(this).parent().find('select');
				//removeError(input);

				if ($(this).attr('data-type') == 'search') {
					if (!$(this).hasClass('active')) {
						searchselectreset();
					}
					$(this).find('.select-options__value').show();
				}
			}
		});
		$('body').on('click', '.select-options__value', function () {
			if ($(this).parents('.select').hasClass('multiple')) {
				if ($(this).hasClass('active')) {
					if ($(this).parents('.select').find('.select-title__value span').length > 0) {
						$(this).parents('.select').find('.select-title__value').append('<span data-value="' + $(this).data('value') + '">, ' + $(this).html() + '</span>');
					} else {
						$(this).parents('.select').find('.select-title__value').data('label', $(this).parents('.select').find('.select-title__value').html());
						$(this).parents('.select').find('.select-title__value').html('<span data-value="' + $(this).data('value') + '">' + $(this).html() + '</span>');
					}
					$(this).parents('.select-block').find('select').find('option').eq($(this).index() + 1).prop('selected', true);
					$(this).parents('.select').addClass('_focus');
				} else {
					$(this).parents('.select').find('.select-title__value').find('span[data-value="' + $(this).data('value') + '"]').remove();
					if ($(this).parents('.select').find('.select-title__value span').length == 0) {
						$(this).parents('.select').find('.select-title__value').html($(this).parents('.select').find('.select-title__value').data('label'));
						$(this).parents('.select').removeClass('_focus');
					}
					$(this).parents('.select-block').find('select').find('option').eq($(this).index() + 1).prop('selected', false);
				}
				return false;
			}

			if ($(this).parents('.select').attr('data-type') == 'search') {
				$(this).parents('.select').find('.select-title__value').val($(this).html());
				$(this).parents('.select').find('.select-title__value').attr('data-value', $(this).html());
			} else {
				$(this).parents('.select').find('.select-title__value').attr('class', 'select-title__value value_' + $(this).data('value'));
				$(this).parents('.select').find('.select-title__value').html($(this).html());

			}

			$(this).parents('.select-block').find('select').find('option').removeAttr("selected");
			if ($.trim($(this).data('value')) != '') {
				$(this).parents('.select-block').find('select').val($(this).data('value'));
				$(this).parents('.select-block').find('select').find('option[value="' + $(this).data('value') + '"]').attr('selected', 'selected');
			} else {
				$(this).parents('.select-block').find('select').val($(this).html());
				$(this).parents('.select-block').find('select').find('option[value="' + $(this).html() + '"]').attr('selected', 'selected');
			}


			if ($(this).parents('.select-block').find('select').val() != '') {
				$(this).parents('.select-block').find('.select').addClass('_focus');
			} else {
				$(this).parents('.select-block').find('.select').removeClass('_focus');

				$(this).parents('.select-block').find('.select').removeClass('_err');
				$(this).parents('.select-block').parent().removeClass('_err');
				$(this).parents('.select-block').removeClass('_err').find('.form__error').remove();
			}
			if (!$(this).parents('.select').data('tags') != "") {
				if ($(this).parents('.form-tags').find('.form-tags__item[data-value="' + $(this).data('value') + '"]').length == 0) {
					$(this).parents('.form-tags').find('.form-tags-items').append('<a data-value="' + $(this).data('value') + '" href="" class="form-tags__item">' + $(this).html() + '<span class="fa fa-times"></span></a>');
				}
			}
			$(this).parents('.select-block').find('select').change();

			if ($(this).parents('.select-block').find('select').data('update') == 'on') {
				select();
			}
		});
		$(document).on('click touchstart', function (e) {
			if (!$(e.target).is(".select *") && !$(e.target).is(".select")) {
				$('.select').removeClass('active');
				$('.select-options').slideUp(50, function () { });
				searchselectreset();
			};
		});
		$(document).on('keydown', function (e) {
			if (e.which == 27) {
				$('.select').removeClass('active');
				$('.select-options').slideUp(50, function () { });
				searchselectreset();
			}
		});
	}

	// FIELDS ================================================
	// ._req - добавлять input'ам. Сделает input обязательным к заполнению.
	// ._err - добавиться к input, который обязателен к заполнению, но не заполнен и была попытка отправки формы.
	// data-error="текст ошибки" - добавлять input'ам, если нужно выводить текст с ошибкой. Добавиться ниже инпута div с классом .form__error, который можно в последствии застилизовать.
	// .l - добавлять input'ам, если нужно на лету формировать label. Тоесть добавиться div с классом .form__label, в котором будет написано то что написано в атрибуте data-value="" .
	// .email - добавлять input'ам вместе с классом ._req, если нужно сделать проверку на заполнение email.

	$('input,textarea').focus(function () {
		if ($(this).val() == $(this).attr('data-value')) {
			$(this).addClass('_focus');
			$(this).parent().addClass('_focus');
			if ($(this).attr('data-type') == 'pass') {
				$(this).attr('type', 'password');
			};
			$(this).val('');
		};
		removeError($(this));
	});
	$('input[data-value], textarea[data-value]').each(function () {
		if (this.value == '' || this.value == $(this).attr('data-value')) {
			this.value = $(this).attr('data-value');
			if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
				$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
			}
		}
		if (this.value != $(this).attr('data-value') && this.value != '') {
			$(this).addClass('_focus');
			$(this).parent().addClass('_focus');
			if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
				$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
			}
		}

		$(this).click(function () {
			if (this.value == $(this).attr('data-value')) {
				if ($(this).attr('data-type') == 'pass') {
					$(this).attr('type', 'password');
				};
				this.value = '';
			};
		});
		$(this).blur(function () {
			if (this.value == '') {
				this.value = $(this).attr('data-value');
				$(this).removeClass('_focus');
				$(this).parent().removeClass('_focus');
				if ($(this).attr('data-type') == 'pass') {
					$(this).attr('type', 'text');
				};
			};
		});
	});
	$('.form-input__viewpass').click(function (event) {
		if ($(this).hasClass('active')) {
			$(this).parent().find('input').attr('type', 'password');
		} else {
			$(this).parent().find('input').attr('type', 'text');
		}
		$(this).toggleClass('active');
	});

	//$('textarea').autogrow({vertical: true, horizontal: false});


	// MASKS ================================================
	// .phone - добавить инпуту которому нужна маска телефон. Перед этим нужно подключить плагин '../../node_modules/inputmask/dist/jquery.inputmask.min.js
	
	//'+7(999) 999 9999'
	//'+38(999) 999 9999'
	//'+375(99)999-99-99'
	//'a{3,1000}' только буквы минимум 3
	//'9{3,1000}' только цифры минимум 3
	$.each($('input.phone'), function (index, val) {
		$(this).attr('type', 'tel');
		$(this).focus(function () {
			$(this).inputmask('+38(999) 999 9999', {
				clearIncomplete: true, clearMaskOnLostFocus: true,
				"onincomplete": function () { maskclear($(this)); }
			});
			$(this).addClass('_focus');
			$(this).parent().addClass('_focus');
			$(this).parent().removeClass('_err');
			$(this).removeClass('_err');
		});
	});
	$('input.phone').focusout(function (event) {
		maskclear($(this));
	});
	$.each($('input.num'), function (index, val) {
		$(this).focus(function () {
			$(this).inputmask('9{1,1000}', { clearIncomplete: true, placeholder: "", clearMaskOnLostFocus: true, "onincomplete": function () { maskclear($(this)); } });
			$(this).addClass('_focus');
			$(this).parent().addClass('_focus');
			$(this).parent().removeClass('_err');
			$(this).removeClass('_err');
		});
	});
	$('input.num').focusout(function (event) {
		maskclear($(this));
	});

	// CHECK ================================================
	// .check - добавлять родительскому блоку инпута checkbox
	// .active - добавлять родительскому блоку инпута checkbox. Сделает активным по умолчанию
	// .disable - добавлять родительскому блоку инпута checkbox. Сделает невозможным выбор чекбокаса.

	$.each($('.check'), function (index, val) {
		if ($(this).find('input').prop('checked') == true) {
			$(this).addClass('active');
		}
	});
	$('body').off('click', '.check', function (event) { });
	$('body').on('click', '.check', function (event) {
		if (!$(this).hasClass('disable')) {
			var target = $(event.target);
			if (!target.is("a")) {
				$(this).toggleClass('active');
				if ($(this).hasClass('active')) {
					$(this).find('input').prop('checked', true);
				} else {
					$(this).find('input').prop('checked', false);
				}
			}
		}
	});

	// OPTION ================================================
	// .action - доавлять родителю родителю инпута radio. Сделает активным по умолчанию.
	// .disable - добавлять родительскому блоку инпута radio. Сделает невозможным выбор radio.
	// .order - добавлять родительскому блоку инпута radio. Только при условии что есть класс .active. Зачем???

	$.each($('.option.active'), function (index, val) {
		$(this).find('input').prop('checked', true);
	});
	$('.option').click(function (event) {
		if (!$(this).hasClass('disable')) {
			if ($(this).hasClass('active') && $(this).hasClass('order')) {
				$(this).toggleClass('orderactive');
			}
			$(this).parents('.options').find('.option').removeClass('active');
			$(this).toggleClass('active');
			$(this).children('input').prop('checked', true);
		}
	});

	// RATING ================================================
	$('.rating.edit .star').hover(function () {
		var block = $(this).parents('.rating');
		block.find('.rating__activeline').css({ width: '0%' });
		var ind = $(this).index() + 1;
		var linew = ind / block.find('.star').length * 100;
		setrating(block, linew);
	}, function () {
		var block = $(this).parents('.rating');
		block.find('.star').removeClass('active');
		var ind = block.find('input').val();
		var linew = ind / block.find('.star').length * 100;
		setrating(block, linew);
	});
	$('.rating.edit .star').click(function (event) {
		var block = $(this).parents('.rating');
		var re = $(this).index() + 1;
		block.find('input').val(re);
		var linew = re / block.find('.star').length * 100;
		setrating(block, linew);
	});
	$.each($('.rating'), function (index, val) {
		var ind = $(this).find('input').val();
		var linew = ind / $(this).parent().find('.star').length * 100;
		setrating($(this), linew);
	});
	function setrating(th, val) {
		th.find('.rating__activeline').css({ width: val + '%' });
	}

	// QUANTITY
	// $('.quantity__btn').click(function (event) {
	// 	var n = parseInt($(this).parent().find('.quantity__input').val());
	// 	if ($(this).hasClass('dwn')) {
	// 		n = n - 1;
	// 		if (n < 1) { n = 1; }
	// 	} else {
	// 		n = n + 1;
	// 	}
	// 	$(this).parent().find('.quantity__input').val(n);
	// 	return false;
	// });

	// RANGE ================================================
	if ($("#range").length > 0) {
		$("#range").slider({
			range: true,
			min: 0,
			max: 5000,
			values: [0, 5000],
			slide: function (event, ui) {
				$('#rangefrom').val(ui.values[0]);
				$('#rangeto').val(ui.values[1]);
				$(this).find('.ui-slider-handle').eq(0).html('<span>' + ui.values[0] + '</span>');
				$(this).find('.ui-slider-handle').eq(1).html('<span>' + ui.values[1] + '</span>');
			},
			change: function (event, ui) {
				if (ui.values[0] != $("#range").slider("option", "min") || ui.values[1] != $("#range").slider("option", "max")) {
					$('#range').addClass('act');
				} else {
					$('#range').removeClass('act');
				}
			}
		});
		$('#rangefrom').val($("#range").slider("values", 0));
		$('#rangeto').val($("#range").slider("values", 1));

		$("#range").find('.ui-slider-handle').eq(0).html('<span>' + $("#range").slider("option", "min") + '</span>');
		$("#range").find('.ui-slider-handle').eq(1).html('<span>' + $("#range").slider("option", "max") + '</span>');

		$("#rangefrom").bind("change", function () {
			if ($(this).val() * 1 > $("#range").slider("option", "max") * 1) {
				$(this).val($("#range").slider("option", "max"));
			}
			if ($(this).val() * 1 < $("#range").slider("option", "min") * 1) {
				$(this).val($("#range").slider("option", "min"));
			}
			$("#range").slider("values", 0, $(this).val());
		});
		$("#rangeto").bind("change", function () {
			if ($(this).val() * 1 > $("#range").slider("option", "max") * 1) {
				$(this).val($("#range").slider("option", "max"));
			}
			if ($(this).val() * 1 < $("#range").slider("option", "min") * 1) {
				$(this).val($("#range").slider("option", "min"));
			}
			$("#range").slider("values", 1, $(this).val());
		});
		$("#range").find('.ui-slider-handle').eq(0).addClass('left');
		$("#range").find('.ui-slider-handle').eq(1).addClass('right');
	}

	//ADDFILES
	// $('.form-addfile__input').change(function (e) {
	// 	if ($(this).val() != '') {
	// 		var ts = $(this);
	// 		ts.parents('.form-addfile').find('ul.form-addfile-list').html('');
	// 		$.each(e.target.files, function (index, val) {
	// 			if (ts.parents('.form-addfile').find('ul.form-addfile-list>li:contains("' + e.target.files[index].name + '")').length == 0) {
	// 				ts.parents('.form-addfile').find('ul.form-addfile-list').append('<li>' + e.target.files[index].name + '</li>');
	// 			}
	// 		});
	// 	}
	// });

}
forms();

function digi(str) {
	var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	return r;
}

// VALIDATE FORMS ================================================
$('form button[type=submit]').click(function () {
	var er = 0;
	var form = $(this).parents('form');
	var ms = form.data('ms');
	$.each(form.find('._req'), function (index, val) {
		er += formValidate($(this));
	});
	if (er == 0) {
		removeFormError(form);
		/*
			var messagehtml='';
		if(form.hasClass('editprofile')){
			var messagehtml='';
		}
		formLoad();
		*/

		//ОПТРАВКА ФОРМЫ
		/*
		function showResponse(html){
			if(!form.hasClass('nomessage')){
				showMessage(messagehtml);
			}
			if(!form.hasClass('noclear')){
				clearForm(form);
			}
		}
		var options={
			success:showResponse
		};
			form.ajaxForm(options);
		

		setTimeout(function(){
			if(!form.hasClass('nomessage')){
				//showMessage(messagehtml);
				showMessageByClass(ms);
			}
			if(!form.hasClass('noclear')){
				clearForm(form);
			}
		},0);

		return false;
		*/

		if (ms != null && ms != '') {
			showMessageByClass(ms);
			return false;
		}
	} else {
		return false;
	}
});

function formValidate(input) {
	var er = 0;
	var form = input.parents('form');
	if (input.attr('name') == 'email' || input.hasClass('email')) {
		if (input.val() != input.attr('data-value')) {
			var em = input.val().replace(" ", "");
			input.val(em);
		}
		if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(input.val())) || input.val() == input.attr('data-value')) {
			er++;
			addError(input);
		} else {
			removeError(input);
		}
	} else {
		if (input.val() == '' || input.val() == input.attr('data-value')) {
			er++;
			addError(input);
		} else {
			removeError(input);
		}
	}
	if (input.attr('type') == 'checkbox') {
		if (input.prop('checked') == true) {
			input.removeClass('_err').parent().removeClass('_err');
		} else {
			er++;
			input.addClass('_err').parent().addClass('_err');
		}
	}
	if (input.hasClass('name')) {
		if (!(/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val()))) {
			er++;
			addError(input);
		}
	}
	if (input.hasClass('pass-2')) {
		if (form.find('.pass-1').val() != form.find('.pass-2').val()) {
			addError(input);
		} else {
			removeError(input);
		}
	}
	return er;
}
function formLoad() {
	$('.popup').hide();
	$('.popup-message-body').hide();
	$('.popup-message .popup-body').append('<div class="popup-loading"><div class="popup-loading__title">Идет загрузка...</div><div class="popup-loading__icon"></div></div>');
	$('.popup-message').addClass('active').fadeIn(300);
}
function showMessageByClass(ms) {
	$('.popup').hide();
	popupOpen('message.' + ms, '');
}
function showMessage(html) {
	$('.popup-loading').remove();
	$('.popup-message-body').show().html(html);
}
function clearForm(form) {
	$.each(form.find('.input'), function (index, val) {
		$(this).removeClass('_focus').val($(this).data('value'));
		$(this).parent().removeClass('_focus');
		if ($(this).hasClass('phone')) {
			maskclear($(this));
		}
	});
}
function addError(input) {
	input.addClass('_err');
	input.parent().addClass('_err');
	input.parent().find('.form__error').remove();
	if (input.hasClass('email')) {
		var error = '';
		if (input.val() == '' || input.val() == input.attr('data-value')) {
			error = input.data('error');
		} else {
			error = input.data('error');
		}
		if (error != null) {
			input.parent().append('<div class="form__error">' + error + '</div>');
		}
	} else {
		if (input.data('error') != null && input.parent().find('.form__error').length == 0) {
			input.parent().append('<div class="form__error">' + input.data('error') + '</div>');
		}
	}
	if (input.parents('.select-block').length > 0) {
		input.parents('.select-block').parent().addClass('_err');
		input.parents('.select-block').find('.select').addClass('_err');
	}
}
function addErrorByName(form, input__name, error_text) {
	var input = form.find('[name="' + input__name + '"]');
	input.attr('data-error', error_text);
	addError(input);
}
function addFormError(form, error_text) {
	form.find('.form__generalerror').show().html(error_text);
}
function removeFormError(form) {
	form.find('.form__generalerror').hide().html('');
}
function removeError(input) {
	input.removeClass('_err');
	input.parent().removeClass('_err');
	input.parent().find('.form__error').remove();

	if (input.parents('.select-block').length > 0) {
		input.parents('.select-block').parent().removeClass('_err');
		input.parents('.select-block').find('.select').removeClass('_err').removeClass('active');
		//input.parents('.select-block').find('.select-options').hide();
	}
}
function removeFormErrors(form) {
	form.find('._err').removeClass('_err');
	form.find('.form__error').remove();
}
function maskclear(n) {
	if (n.val() == "") {
		n.inputmask('remove');
		n.val(n.attr('data-value'));
		n.removeClass('_focus');
		n.parent().removeClass('_focus');
	}
}
function searchselectreset() {
	$.each($('.select[data-type="search"]'), function (index, val) {
		var block = $(this).parent();
		var select = $(this).parent().find('select');
		if ($(this).find('.select-options__value:visible').length == 1) {
			$(this).addClass('_focus');
			$(this).parents('.select-block').find('select').val($('.select-options__value:visible').data('value'));
			$(this).find('.select-title__value').val($('.select-options__value:visible').html());
			$(this).find('.select-title__value').attr('data-value', $('.select-options__value:visible').html());
		} else if (select.val() == '') {
			$(this).removeClass('_focus');
			block.find('input.select-title__value').val(select.find('option[selected="selected"]').html());
			block.find('input.select-title__value').attr('data-value', select.find('option[selected="selected"]').html());
		}
	});
}
// ========================================================================

let user_icon = document.querySelector('.user-header__icon');
let user_menu = document.querySelector('.user-header__menu');

user_icon.addEventListener('click', function (e) {
	user_menu.classList.toggle('_active');
});

document.addEventListener('click', function(e) {
	if (!e.target.closest('.user-header')) {
		user_menu.classList.remove('_active');
	}
});

// ========================================================================
});