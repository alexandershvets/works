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
$('.wrapper').addClass('loaded');

var act = "click";
if (isMobile.iOS()) {
	var act = "touchstart";
}

// ========================================================================
// Скрипт добавления бекграунда шапке, при скролле

$(window).scroll(function () {
	if ($(window).scrollTop() > 100) {
		$('.header').addClass('bg');
	}
	else {
		$('.header').removeClass('bg');
	}
});

// ========================================================================
// Скрипт для блока сочиальных сетей

$('.soc__link').click(function(event) {
	$('.soc__block').toggleClass('active');
});

// ========================================================================
// Скрипт для выбора языка

$('.lang').click(function(event) {
	$(this).toggleClass('active');
});

// ========================================================================
// IBG
// Добавление в разметку background-image инлайном. Блоку с картинкой задать класс .ibg

// JQ
function ibg() {
	$.each($('.ibg'), function (index, val) {
		if ($(this).find('img').length > 0) {
			$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
		}
	});
}
ibg();

// ========================================================================
// MENU

$('.menu-mobile__burger').click(function (event) {
	$('.menu-mobile__icon').toggleClass('active');
	$('.menu-mobile').toggleClass('active');
	// if ($(this).hasClass('active')) {
	// 	$('body').data('scroll', $(window).scrollTop());
	// }
	$('body').toggleClass('lock');
	// if (!$(this).hasClass('active')) {
	// 	$('body,html').scrollTop(parseInt($('body').data('scroll')));
	// }
});

// ========================================================================
// скролл до нужной секции
// .goto - добавить класс ссылке меню, в атрибут href вписать класс блока, до которогу нужно попасть. 
// пример: <li><a href="about" class="menu__link goto">About</a></li>

$('.goto').click(function () {
	var el = $(this).attr('href').replace('#', '');
	var offset = 0;
	$('body,html').animate({ scrollTop: $('.' + el).offset().top + offset }, 500, function () { });

	if ($('.menu-mobile').hasClass('active')) {
		$('.menu-mobile, .menu-mobile__icon').removeClass('active');
		$('body').removeClass('lock');
	}
	
	return false;
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
// scroll по нажатию (автопрокрутка)
// добавить класс goto кнопке/ссылке

$('.goto').click(function () {
	var el = $(this).attr('href').replace('#', '');
	var offset = 0;
	$('body, html').animate({ scrollTop: $('.' + el).offset().top + offset }, 300, function () { });

	if ($('.header-menu').hasClass('active')) {
		$('.header-menu, .header-menu__icon').removeClass('active');
		$('body').removeClass('lock');
	}

	return false;
});

// ========================================================================
// Плагин webui-popover (всплывающая подсказка при наведении)

if ($('.t,.tip').length > 0) {
	tip();
}
function tip() {
	$('.t,.tip').webuiPopover({
		placement: 'bottom',
		trigger: 'hover',
		backdrop: false,
		//selector: true,
		animation: 'fade',
		dismissible: true,
		padding: false,
		//hideEmpty: true,
		onShow: function ($element) { },
		onHide: function ($element) { },
	}).on('show.webui.popover hide.webui.popover', function (e) {
		$(this).toggleClass('active');
	});
}
// ========================================================================