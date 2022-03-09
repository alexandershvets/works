//= '../../node_modules/jquery/dist/jquery.min.js'
/* //= '../../node_modules/slick-carousel/slick/slick.min.js' */
/* //= '../../node_modules/baguettebox.js/dist/baguetteBox.js' */

$(document).ready(function () {

	//= forms.js
	//= responsive.js
	//= map.js

	/* ============================ МЕНЮ ============================ */
	
	$('.header-menu__icon').click(function (event) {
		$(this).toggleClass('active');
		$('.header-menu-box').toggleClass('active');
		if ($(this).hasClass('active')) {
			$('body').data('scroll', $(window).scrollTop());
		}
		$('body').toggleClass('lock');
		if (!$(this).hasClass('active')) {
			$('body,html').scrollTop(parseInt($('body').data('scroll')));
		}
	});

	/* ============================ Scroll ============================ */

	$('.goto').click(function () {
		var el = $(this).attr('href').replace('#', '');
		var offset = 0;
		$('body, html').animate({ scrollTop: $('.' + el).offset().top + offset }, 500, function () { });

		if ($('.header-menu-box').hasClass('active')) {
			$('.header-menu-box, .header-menu__icon').removeClass('active');
			$('body').removeClass('lock');
		}

		return false;
	});

	/* ============================ .ibg ============================ */

	function ibg() {
		$.each($('.ibg'), function (index, val) {
			if ($(this).find('img').length > 0) {
				$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
			}
		});
	}
	ibg();



});