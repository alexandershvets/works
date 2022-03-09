// Adaptive functions (можо закинуть в файл responsive.js)
// Функция применяется в случаях, когда нужно, при определенном брекпоинте, один блок, перекинуть в другой

$(window).resize(function (event) {
	adaptive_function();
});

function adaptive_header(w, h) {
	var headerMenu = $('.menu-mobile');
	var headerContacts = $('.info__body');

	var mainTitle = $('.main-block__box-subtitle-main');
	var mainSubtitle = $('.main__subtitle');
	
	if (w < 767) {
		if (!headerContacts.hasClass('done')) {
			headerContacts.addClass('done').appendTo(headerMenu);
		}
	} else {
		if (headerContacts.hasClass('done')) {
			headerContacts.removeClass('done').appendTo('.info__body--box');
		}
	}

	if (w < 767.98) {
		if (!mainSubtitle.hasClass('done')) {
			mainSubtitle.addClass('done').appendTo(mainTitle);
		}
	} else {
		if (mainSubtitle.hasClass('done')) {
			mainSubtitle.removeClass('done').appendTo('.subtitle-main__box-subtitle-main');
		}
	}

}

function adaptive_function() {
	var w = $(window).outerWidth();
	var h = $(window).outerHeight();
	adaptive_header(w, h);
}
adaptive_function();