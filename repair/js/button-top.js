// Скрипт кнопки вверх.
$(document).ready(function () {

	$(window).scroll(function () {

		if ($(this).scrollTop() >= 700) {
			$('#button-top').addClass('button-top_active');
		} else {
			$('#button-top').removeClass('button-top_active');
		};

	});

	$('#button-top').click(function () {

		$('body,html').animate({
			scrollTop: 0
		}, 800);

	});

});