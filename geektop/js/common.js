$(function() {

	// Стилизация буквы "O" в логотипе
	$('.logo-litera').each(function() {
		// задал переменную this, чтобы было удобней работать
		var ths = $(this);
		// берем весь логотип и заменяем букву "О" на span с классом logo-litera
		ths.html(ths.html().replace('O', '<span>O</span>'));
	});

	//Поиск
	$('.search').click(function() {
		$('.search-field').stop().slideToggle(); //появится
		$('.search-field input[type=text]').focus(); // курсор будет сфокусирован в поле
	}); 
	
	//Скрипт закрытия на кнопку ESC
	$(document).keyup(function(e) {
		if (e.keyCode == 27) { //если код кнопки равен 27 (ESC),
			$('.search-field').slideUp(); //то закроется
		}
	}).click(function() { //при клике в пустом месте
		$('.search-field').slideUp(); //закроется
	});
	$('.search-wrap').click(function(e) {
		e.stopPropagation(); //отключаем закрытие по клику в блоке .search-wrap
	});

	//Мобильное меню
	//интегрируем после .top-line элемент div с классом mobile-menu и bootatrap4 классом, который скрывает элемент на больших экранах
	$('.top-line').after('<div class="mobile-menu d-lg-none"></div>');
	//клонируем меню .top-menu в новый созданный элемент .mobile-menu
	$('.top-menu').clone().appendTo('.mobile-menu');
	$('.mobile-menu-button').click(function() {
		$('.mobile-menu').stop().slideToggle();
	});

	//Скрипт, чтобы в секции-3 при наведении на айтем подсвечивался и подчеркивался текст
	$('.col-item').hover(function() {
		ths = $(this);
		lnk = ths.closest('.col-item').find('h4 a'); //ищем верхний элемент и в нем ищем структуру h4 a
		lnk.addClass('hover'); //присваиваем класс .hover
	}, function() { // после того как уведем мышку, делаем обратную функцию
		lnk.removeClass('hover'); //удаляем класс .hover
	});

	// Скрипт прогрессбара при скроле сайта (полоса сверху)
	$("body").prognroll({
		height: 3,
		color: "#ec1c1c",
		custom: false
	});

	// Скрипт активной вкладки главного меню
	$('.main-menu li').removeClass('active');
	var path = window.location.pathname;
	$('.main-menu li a').each(function () {
		var href = $(this).attr('href');
		if (path.slice(1).substring(0, href.length) === href) {
			$(this).parent('li').addClass('active');
		}
	});

	
});
