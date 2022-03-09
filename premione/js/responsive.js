//Adaptive functions
$(window).resize(function (event) {
	adaptive_function();
});
function adaptive_header(w, h) {
	var headerMenu = $('.header-menu-box');
	var headerLang = $('.lang');

	// перекидываю блок с языками .lang
	if (w < 750.98) {
		if (!headerLang.hasClass('done')) {
			headerLang.addClass('done').appendTo(headerMenu);
		}
	} else {
		if (headerLang.hasClass('done')) {
			headerLang.removeClass('done').prependTo($('.header-top'));
		}
	}

	// перекидываю блок с меню .header-menu

	if (w < 750.98) {
		if (!$('.header-menu').hasClass('done')) {
			$('.header-menu').addClass('done').appendTo(headerMenu);
		}
	} else {
		$.each($('.header-menu'), function (index, val) {
			if ($(this).hasClass('header-menu--right')) {
				if ($(this).hasClass('done')) {
					$(this).removeClass('done').prependTo($('.header-bottom__column').eq(2));
				}
			} else {
				if ($(this).hasClass('done')) {
					$(this).removeClass('done').prependTo($('.header-bottom__column').eq(0));
				}
			}
		});
	}
	
	
}
function adaptive_function() {
	var w = $(window).outerWidth();
	var h = $(window).outerHeight();
	adaptive_header(w, h);
}
adaptive_function();