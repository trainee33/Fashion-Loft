$(function() {
	//  MENU  ====================

	$('.menu-header__burger').on('click', function() {
		if ($('.menu-header__body').css('display') === 'none') {
			$(this).addClass('active');
			$('.menu-header__body').slideDown(400);
		} else {
			$(this).removeClass('active');
			$('.menu-header__body').slideUp(400);
		}
	});

	$(window).on('resize', function() {
		if ($(window).width() > 1200) {
			$('.menu-header__burger').removeClass('active');
			$('.menu-header__body').removeAttr('style');
		}
	});

	//================ mainslider-slick__slider
	if ('.mainslider-slick') {
		$('.mainslider-slick__slider').slick({
			infinite: true,
			arrows: true,
			slidesToShow: 1,
			slidesToScroll: 1
			//appendArrows: $('.mainslider-item__arrows')
		});
	}

	//=========== brands-slider

	$('.brands-items').slick({
		infinite: true,
		arrows: false,
		slidesToShow: 7,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 1,
					infinite: true
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true
				}
			},
			{
				breakpoint: 560,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true
				}
			}
		]
	});

	//=========== news-slider
	if ('.new-products') {
		$('.new-products__slider').slick({
			infinite: true,
			arrows: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			appendArrows: $('.new-products__arrows'),
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						infinite: true
					}
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						infinite: true
					}
				},
				{
					breakpoint: 560,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: true
					}
				}
			]
		});
	}

	//=========== trands-slider
	if ('.trand-products') {
		$('.trand-products__slider').slick({
			infinite: true,
			arrows: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			appendArrows: $('.trand-products__arrows'),
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						infinite: true
					}
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						infinite: true
					}
				},
				{
					breakpoint: 560,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: true
					}
				}
			]
		});
	}
	//===========category-slider============

	if ('.categogy-items') {
		function slickMobile() {
			$('.categogy-items').slick({
				infinite: true,
				arrows: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				responsive: [
					{
						breakpoint: 560,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							infinite: true
						}
					},
					{
						breakpoint: 4000,
						settings: 'unslick'
					},
					{
						breakpoint: 560,
						settings: 'slick'
					}
				]
			});
		}
	}

	//=========product-slider===============
	if ('.product-slider') {
		$('.product-slider').slick({
			infinite: true,
			arrows: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			draggable: false,
			asNavFor: '.vertical-slider',
			appendArrows: $('.product-slider__arrows')
		});
	}

	if ('.vertical-slider') {
		function slickDesk() {
			$('.vertical-slider').slick({
				infinite: true,
				arrows: false,
				vertical: true,
				slidesToShow: 4,
				slidesToScroll: 1,
				verticalSwiping: true,
				asNavFor: '.product-slider',
				focusOnSelect: true,
				responsive: [
					{
						breakpoint: 560,
						settings: 'unslick'
					}
				]
			});
		}
	}

	slickDesk();
	$(window).resize(function() {
		var $windowWidth = $(window).width();
		if ($windowWidth > 560) {
			slickDesk();
		}
	});
	slickMobile();
	$(window).resize(function() {
		var $windowWidth = $(window).width();
		if ($windowWidth < 560) {
			slickMobile();
		}
	});

	//=============validate-form==================

	$('#contact-form').validate({
		rules: {
			name: {
				required: true,
				minlength: 3
			},
			email: {
				required: true,
				email: true
			},
			phone: {
				required: true,
				minlength: 11
			}
		},
		messages: {
			name: {
				required: 'Поле обязательно для заполнения',
				minlength: 'Длина имени не менее 3 символов'
			},
			email: {
				required: 'Поле обязательно для заполнения',
				email: 'Не корректный e-mail'
			},
			phone: {
				required: 'Поле обязательно для заполнения',
				minlength: 'Не корректный номер'
			}
		}
	});

	//==============filter__price==================

	if (document.querySelector('.filter__price')) {
		priceSlider = document.querySelector('.filter__price_slider');
		noUiSlider.create(priceSlider, {
			start: [ 0, 60000 ],
			step: 1000,
			tooltips: [ wNumb({ decimals: 0 }), wNumb({ decimals: 0 }) ],
			connect: true,
			range: {
				min: 0,
				max: 60000
			}
		});
	}
});
