$(function() {

	//плагин mmenu 
	$("#my-menu").mmenu({
		"extensions": [
			"pagedim-black", //затемнение контента при открытии меню. -white осветлить
			"position-right", //открывается справа. -top, -bottom
			"theme-dark", //темная тема меню
			// "shadow-page", //тени, работаю вместе
			// "shadow-panels" //тени, работаю вместе
			// "position-front", //позиционирование меню перед страницей (z-index). -back
			// "popup", //меню появится во всплывающем окне
			// "multiline" //если текст пункта меню длинный, то не будет обрезаться
			// "fx-listitems-drop" //эффект затухания пунктов меню
			// 'fx-listitems-slide' //пункты меню будут выезжать слайдом
		],
		// "autoHeight": true, //авто-определение высоты блока меню
		onClick: {
			close: true, //меню закроется при клике на пункт меню
			preventDefault: false, // false-в окне браузера появится #. true - в окне браузера не будет #
			setSelected: true //Должна ли нажатая ссылка отображаться как «выбранная».
		},
		pageScroll: {
			scroll: true
		},
		navbar: {
			add: true,
			title: '<img src="img/logo-1.svg" alt="Салон коасоты Смитлер">' // добавление лого в названии меню
		}
	});
	//чтобы работал бургер с mmenu
	var api = $('#my-menu').data("mmenu");
	api.bind('open:finish', function () { //определяем состояние: если opened - вып. функцию
		$('.hamburger').addClass('is-active'); //добавляем класс
	});
	api.bind('close:finish', function () { //определяем состояние: если closed - вып. функцию
		$('.hamburger').removeClass('is-active');
	});

	/* owl.carusel */
	//проверяем, инициализированна ли .owlCarousel, если да, то выполняем функцию
	//это нужно для того, чтобы высота считывалась после того, как карусель полностью загрузилась
	//объявлять эту функцию нужно обязательно перед каруселью
	$('.carousel-services').on('initialized.owl.carousel', function() {
		setTimeout(function() {
			carouselService()
		}, 100);
	});
	// скрипт карусели
	$('.carousel-services').owlCarousel({
		loop: true, //зацикленность слайдов. Слайдерыбудут переулючаться бесконечно покругу
		nav: true, // включить навигацию. Появятся кнопки переключения слайдов
		smartSpeed: 700, //скорость переключения 
		dots: false, //отключить точки навигации
		// items: 1, //колличество видимых слайдов на экране
		// touchDrag: false, //отключить сенсорное перетаскивание
		// stagePadding: 50, //обивка слева и справа, будут видны соседи (px)
		// autoplay: true, //включить автопереключение слайдов
		// autoplayTimeout: 1000, //скорость автопереключения слайдов
		// autoplayHoverPause: true, //отключение автопереключения слайдов
		// autoHeight: true, //высота каждого слайда автоматически подстраивается под размер содержимого
		navText: [
			'<i class="fa fa-angle-double-left"></i>', //свои кнопки
			'<i class="fa fa-angle-double-right"></i>' //свои кнопки
		],
		responsiveClass: true, //включить адаптив
		responsive: {
			0: { //брейкпоинт
				items: 1 //сколько слайдов показывать
			},
			800: {
				items: 2
			},
			1100: {
				items: 3
			}
		}
	});


	//Скрипт картинок в секции сервис (задаем им высоту через JS)
	function carouselService() { //название функции придумать самому
		$('.carousel-services-item').each(function() { //возьмем родительский элемент и пройдемся по нему циклом
			var ths = $(this); //определим переменную
			var thsh = ths.find('.carousel-services-content').outerHeight(); //опред. новую переменную (this height). Ищем внутри данного элмта .carousel-services-content и возьмем внешнюю его высоту
					ths.find('.carousel-services-image').css('min-height', thsh); //найдем элемент .carousel-services-image и применим к нему найденную высоту
		})
	}carouselService(); //вызовем данную функцию


	//Скрипт выделения последнего слова
	$('.carousel-services-composition .h3').each(function() {
		var ths = $(this);
		ths.html(ths.html().replace(/(\S+)\s*$/, '<span>$1</span>')); //назначим переменной переназначенный html, а именно мы, при помощи регул.выраж. последнее слово обернули в тег span
	});
	//Скрипт выделения первого слова
	$('section .h2').each(function() {
		var ths = $(this);
		ths.html(ths.html().replace(/^(\S+)/, '<span>$1</span>')); //назначим переменной переназначенный html, а именно мы, при помощи регул.выраж. последнее слово обернули в тег span
	});


	// плагин selectize (кастом селектов)
	$('select').selectize({

	});


	$('.reviews').owlCarousel({
		loop: true,
		items: 1,
		smartSpeed: 700,
		nav: false,
		dots: true,
		autoHeight: true
	});

	$('.partners').owlCarousel({
		loop: true,
		smartSpeed: 700,
		dots: false,
		nav: true,
		navText: [
			'<i class="fa fa-angle-left"></i>',
			'<i class="fa fa-angle-right"></i>'
		],
		responsiveClass: true,
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 2
			},
			992: {
				items: 3
			},
			1200: {
				items: 4
			}
		}
	});


	// Кнопка наверх
	$(window).scroll(function() {
		if ($(this).scrollTop() > $(this).height()) { //если скролл больше высоты экрана, то:
			$('.top').addClass('active') //добавляем класс .active
		} else { //иначе:
			$('.top').removeClass('active') //забираем класс .active
		}
	});
	$('.top').click(function() { //при клике на .top
		$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing'); //берем html и body, сначалу у них, на всякий случай останавливаем анимацию, если есть, и пишем анимацию (скролл вверх, медленно, )
	})
	

	//E-mail Ajax Send
	$("form.callback").submit(function () { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "/mail.php", //Change
			data: th.serialize()
		}).done(function () {
			$(th).find('.success').addClass('active').css("display", "flex").hide().fadeIn(); //в .callback ищем .success и добавляем ему класс .active. .active добавляем CSS dispalay: flex. Далее скрываем .callback и тут же появляем
			setTimeout(function () {
				$(th).find('.success').removeClass('active').fadeOut();
				th.trigger("reset"); //сброс введеных данных пользователем
			}, 3000); //спасибо за заявку исчезнет через: n sec
		});
		return false;
	});

	
	// Плагин equalheights
	//Resize Window ресайз(изменение размеров окна). Плагин equalheights будет выравнивать высоту блоков, после каждого ресайза, чтобы они всегда были одинакового размера
	function onResize() { //назначяем функцию
		$('.carousel-services-content').equalHeights() // Плагин equalheights (выравнивает блоки по высоте)
	}onResize();
	window.onresize = function() {
		onResize()
	};

});


$(window).on('load', function () { //при закгрузки страницы, выполним функцию:
	$('.preloader').delay(1000).fadeOut('slow'); // .preloader установим задержку в 1сек. и скроем этот элемент (медленно)
}); 
