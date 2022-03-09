$(document).ready(function () {

	// ========================================================================
	// Так как у IE11 не полная поддержка flex, этот скрипт позволяет принудительно задать секции минимальную высоту
	$(window).resize(function(event) {
	mainblock();
	});
	function mainblock(){
			var height = $(window).outerHeight();
		$('.mainblock').css('min-height', height);
	}
	mainblock();

	// ========================================================================
	// Скрипт для эффекта параллакс
	// .mainblock__image — блок с фоновой картинкой

	$(window).scroll(function (event) {
		var s = 0 - $(this).scrollTop() / 3;
		$('.mainblock__image').css('transform', 'translate3d(0, ' + s + 'px, 0)');
	});

	// ========================================================================

	/* Добавление в разметку background-image инлайном. Блоку с картинкой задать класс .ibg */
	// JS

	// function ibg() {
	// 	document.querySelectorAll(".ibg").forEach(el => {
	// 		if (el.querySelector('img')) {
	// 			el.style.backgroundImage = 'url(' + el.querySelector('img').getAttribute('src') + ')';
	// 		}
	// 	});
	// }
	// ibg();

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
	//MENU

	// JS
	
	// let iconMenu = document.querySelector(".icon-menu");
	// let body = document.querySelector("body");
	// let menuBody = document.querySelector(".menu__body");

	// iconMenu.addEventListener("click", function () {
	// 	iconMenu.classList.toggle("active");
	// 	body.classList.toggle("lock"); //запрет на скролл контента при открытом меню. В стилях добавить: body.lock {overflow: hidden}
	// 	menuBody.classList.toggle("active");
	// });

	// JQ

	// $('.menu-header__icon').click(function (event) {
	// 	$(this).toggleClass('active');
	// 	$('.menu-header__menu').toggleClass('active');
	// 	if ($(this).hasClass('active')) {
	// 		$('body').data('scroll', $(window).scrollTop());
	// 	}
	// 	$('body').toggleClass('lock');
	// 	if (!$(this).hasClass('active')) {
	// 		$('body,html').scrollTop(parseInt($('body').data('scroll')));
	// 	}
	// });

	// ========================================================================
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

	// ========================================================================
	// SPOILER

	$('.block__title').click(function (event) {
		if ($('.block').hasClass('one')) { // если нужно скрывать открытые спойлеры при открытии одного, нужно добавить класс .one родителю спойлеров
			$('.block__title').not($(this)).removeClass('active'); // у всех, кроме нажатого спойлера, убрать класс .active
			$('.block__text').not($(this).next()).slideUp(300); // у всех, кроме нажатого спойлера, скрыть текст
		}
		$(this).toggleClass('active').next().slideToggle(300);
	});

	// ========================================================================
	// UP

	$('#up').click(function (event) {
		$('body, html').animate({
			scrollTop: 0
		}, 300);
	});

	// ========================================================================
	//ZOOM
	// Библиотека - baguetteBox ( npm install baguettebox.js --save )

	if ($('.gallery').length > 0) {
		baguetteBox.run('.gallery', {
			// Custom options
		});
	}

	// ========================================================================
	// scroll по нажатию (автопрокрутка)
	// добавить класс goto кнопке/ссылке

	$('.goto').click(function () {
		var el = $(this).attr('href').replace('#', '');
		var offset = 0;
		$('body, html').animate({ scrollTop: $('.' + el).offset().top + offset }, 500, function () { });

		if ($('.header-menu').hasClass('active')) {
			$('.header-menu, .header-menu__icon').removeClass('active');
			$('body').removeClass('lock');
		}

		return false;
	});

	// ========================================================================
	// FILTER

	$('.filter__item').click(function(event) {
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

	//========================================================================
	// FORMS

	function forms() {

		// SELECT ================
		if ($('select').length > 0) {
			function selectscrolloptions() {
				var scs = 100;
				var mss = 50;
				if (isMobile.any()) {
					scs = 10;
					mss = 1;
				}
				var opt = {
					cursorcolor: "#2078e5",
					cursorwidth: "3px",
					background: "",
					autohidemode: false,
					bouncescroll: false,
					cursorborderradius: "0px",
					scrollspeed: scs,
					mousescrollstep: mss,
					directionlockdeadzone: 0,
					cursorborder: "0px solid #fff",
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
						sblock.find('.select').addClass('focus');
					}
					if ($(this).attr('data-req') == 'on') {
						$(this).addClass('req');
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
						$(this).parents('.select').addClass('focus');
					} else {
						$(this).parents('.select').find('.select-title__value').find('span[data-value="' + $(this).data('value') + '"]').remove();
						if ($(this).parents('.select').find('.select-title__value span').length == 0) {
							$(this).parents('.select').find('.select-title__value').html($(this).parents('.select').find('.select-title__value').data('label'));
							$(this).parents('.select').removeClass('focus');
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
					$(this).parents('.select-block').find('.select').addClass('focus');
				} else {
					$(this).parents('.select-block').find('.select').removeClass('focus');

					$(this).parents('.select-block').find('.select').removeClass('err');
					$(this).parents('.select-block').parent().removeClass('err');
					$(this).parents('.select-block').removeClass('err').find('.form__error').remove();
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

		// FIELDS ================
		$('input,textarea').focus(function () {
			if ($(this).val() == $(this).attr('data-value')) {
				$(this).addClass('focus');
				$(this).parent().addClass('focus');
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
				$(this).addClass('focus');
				$(this).parent().addClass('focus');
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
					$(this).removeClass('focus');
					$(this).parent().removeClass('focus');
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


		// MASKS ================
		//'+7(999) 999 9999'
		//'+38(999) 999 9999'
		//'+375(99)999-99-99'
		//'a{3,1000}' только буквы минимум 3
		//'9{3,1000}' только цифры минимум 3
		$.each($('input.phone'), function (index, val) {
			$(this).attr('type', 'tel');
			$(this).focus(function () {
				$(this).inputmask('+7(999) 999 9999', {
					clearIncomplete: true, clearMaskOnLostFocus: true,
					"onincomplete": function () { maskclear($(this)); }
				});
				$(this).addClass('focus');
				$(this).parent().addClass('focus');
				$(this).parent().removeClass('err');
				$(this).removeClass('err');
			});
		});
		$('input.phone').focusout(function (event) {
			maskclear($(this));
		});
		$.each($('input.num'), function (index, val) {
			$(this).focus(function () {
				$(this).inputmask('9{1,1000}', { clearIncomplete: true, placeholder: "", clearMaskOnLostFocus: true, "onincomplete": function () { maskclear($(this)); } });
				$(this).addClass('focus');
				$(this).parent().addClass('focus');
				$(this).parent().removeClass('err');
				$(this).removeClass('err');
			});
		});
		$('input.num').focusout(function (event) {
			maskclear($(this));
		});

		// CHECK ================
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

		// OPTION ================
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

		// RATING ================
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

		// QUANTITY ================
		$('.quantity__btn').click(function (event) {
			var n = parseInt($(this).parent().find('.quantity__input').val());
			if ($(this).hasClass('dwn')) {
				n = n - 1;
				if (n < 1) { n = 1; }
			} else {
				n = n + 1;
			}
			$(this).parent().find('.quantity__input').val(n);
			return false;
		});

		// RANGE ================
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

		// ADDFILES ================
		$('.form-addfile__input').change(function (e) {
			if ($(this).val() != '') {
				var ts = $(this);
				ts.parents('.form-addfile').find('ul.form-addfile-list').html('');
				$.each(e.target.files, function (index, val) {
					if (ts.parents('.form-addfile').find('ul.form-addfile-list>li:contains("' + e.target.files[index].name + '")').length == 0) {
						ts.parents('.form-addfile').find('ul.form-addfile-list').append('<li>' + e.target.files[index].name + '</li>');
					}
				});
			}
		});
	}
	forms();

	function digi(str) {
		var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
		return r;
	}

	// VALIDATE FORMS ================
	$('form button[type=submit]').click(function () {
		var er = 0;
		var form = $(this).parents('form');
		var ms = form.data('ms');
		$.each(form.find('.req'), function (index, val) {
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
				input.removeClass('err').parent().removeClass('err');
			} else {
				er++;
				input.addClass('err').parent().addClass('err');
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
			$(this).removeClass('focus').val($(this).data('value'));
			$(this).parent().removeClass('focus');
			if ($(this).hasClass('phone')) {
				maskclear($(this));
			}
		});
	}
	function addError(input) {
		input.addClass('err');
		input.parent().addClass('err');
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
			input.parents('.select-block').parent().addClass('err');
			input.parents('.select-block').find('.select').addClass('err');
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
		input.removeClass('err');
		input.parent().removeClass('err');
		input.parent().find('.form__error').remove();

		if (input.parents('.select-block').length > 0) {
			input.parents('.select-block').parent().removeClass('err');
			input.parents('.select-block').find('.select').removeClass('err').removeClass('active');
			//input.parents('.select-block').find('.select-options').hide();
		}
	}
	function removeFormErrors(form) {
		form.find('.err').removeClass('err');
		form.find('.form__error').remove();
	}
	function maskclear(n) {
		if (n.val() == "") {
			n.inputmask('remove');
			n.val(n.attr('data-value'));
			n.removeClass('focus');
			n.parent().removeClass('focus');
		}
	}
	function searchselectreset() {
		$.each($('.select[data-type="search"]'), function (index, val) {
			var block = $(this).parent();
			var select = $(this).parent().find('select');
			if ($(this).find('.select-options__value:visible').length == 1) {
				$(this).addClass('focus');
				$(this).parents('.select-block').find('select').val($('.select-options__value:visible').data('value'));
				$(this).find('.select-title__value').val($('.select-options__value:visible').html());
				$(this).find('.select-title__value').attr('data-value', $('.select-options__value:visible').html());
			} else if (select.val() == '') {
				$(this).removeClass('focus');
				block.find('input.select-title__value').val(select.find('option[selected="selected"]').html());
				block.find('input.select-title__value').attr('data-value', select.find('option[selected="selected"]').html());
			}
		});
	}

	// ========================================================================
	
});
