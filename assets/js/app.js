(function ($) {

	$('html').removeClass('no-js');

	function mobileNavPrimary() {

		$('.header--primary').on('click', function (e) {
			e.stopPropagation();
		});

		$('.nav-wrapper__toggle').on('click', function (e) {
			var $this = $(this),
				buttonText = $this.text();

			if (buttonText === "Menu") {
				openNavPrimary();
			} else {
				closeNavPrimary();
			}

			$('body').one('click', function () {
				closeNavPrimary();
			});

			function openNavPrimary() {
				$this
					.text('Close')
					.addClass('open');

				$('.nav-wrapper').addClass('open');
				$('.mobile-overlay').fadeIn(200);
			}

			function closeNavPrimary() {
				$this
					.text('Menu')
					.removeClass('open');

				$('.nav-wrapper').removeClass('open');
				$('.mobile-overlay').fadeOut(200);
			}

			e.stopPropagation();
		});
	}

	function accordion() {

		var on_resize = function (c, t) {
				$(window).on('resize', function () {
					clearTimeout(t);
					t = setTimeout(c, 500);
				});
				return c;
			};

		$('.accordion__content').hide();

		$('.default--open').addClass('open').next('.accordion__content').addClass('open').show();

		$('.accordion').off('click').on('click', '.accordion__toggle', function (e) {
			var $accordionToggle = $(this),
				$accordionContainer = $accordionToggle.parents('.accordion'),
				$accordionContent = $accordionToggle.next('.accordion__content');
			
			e.preventDefault();

			//don't run mobile-only accordion on desktop!
			if ($(window).width() > 640 && $accordionContainer.hasClass('accordion--mobile-only')) {
				return false;
			} else if ($accordionContainer.hasClass('accordion--horizontal')) {
				horizontalAccordion();
			} else {
				$accordionToggle.toggleClass('open');
				$accordionContent.toggleClass('open').slideToggle();
			}

			function horizontalAccordion() {

				$accordionToggle = $accordionToggle.parent('.wrapper--accordion__toggle');
				$accordionContent = $accordionToggle.next('.accordion__content');

				if ($(window).width() > 640) {
					var accordionTogglePosition = parseInt($accordionToggle.css('left')),
						parentWidth = $accordionContainer.outerWidth();

					accordionTogglePosition = 100 * accordionTogglePosition / parentWidth + '%';

					if ($accordionToggle.hasClass('open')) {
						return false;
					} else {
						$accordionToggle.animate({
							left: "0"
						}, 250).addClass('open');

						$accordionContent.show().animate({
							left: "33.33%"
						});
					}
					$('.accordion--horizontal .button--close').off('click').on('click', function () {
						$accordionToggle.animate({
							left: accordionTogglePosition
						}, 250).removeClass('open');

						$accordionContent.animate({
							left: "100%"
						}, function () {
							$accordionContent.hide();
						});

					});
				} else {
					$accordionToggle.toggleClass('open');
					$accordionContent.toggleClass('open').slideToggle();
				}
			}
		});

		// when resized, make toggle position return to default so it works on mobile
		on_resize(function () {
			$('.wrapper--accordion__toggle').attr('style', '');
		});
	}

	function carouselSimple() {
		if ($('.carousel--simple__slide').length > 1) {
			$('.carousel--simple__container').bxSlider({
				mode: 'fade',
				auto: true,
				speed: 500,
				pause: 10000,
				pager: false,
				controls: false
			});
		}
	}

	function carouselPrimary() {

		if ($('.carousel--primary__thumb').length > 1) {
			var thumbSlides = $('.carousel--primary__thumbs').bxSlider({
				minSlides: 2,
				maxSlides: 3,
				moveSlides: 1,
				slideWidth: 168,
				slideMargin: 2,
				pager: false,
				speed: 500,
				onSlideBefore: function () {
					$('.bx-clone').removeClass('active');
				},
				onSlideAfter: function ($slideElement) {
					$slideElement.not('.bx-clone').addClass('active').siblings().removeClass('active');
				},
				onSlideNext: function () {
					primarySlides.goToNextSlide();
				},
				onSlidePrev: function () {
					primarySlides.goToPrevSlide();	
				}
			});

			var primarySlides = $('.carousel--primary__slides').bxSlider({
				speed: 500,
				captions: true,
				pager: false,
				controls: false,
				touchEnabled: false
			});

			$('.carousel--primary__thumbs').on('click', '.carousel--primary__thumb a', function (e) {
				e.preventDefault();
				primarySlides.goToSlide($(this).data('slide-index'));
				thumbSlides.goToSlide($(this).data('slide-index'));
			});
		}
	}

	function carouselSecondary() {
		if ($('.carousel--secondary__slide').length > 1) {
			$('.carousel--secondary__slides').bxSlider({
				minSlides: 2,
				maxSlides: 6,
				slideWidth: 137,
				slideMargin: 20,
				pager: false,
				speed: 500,
			});
		}
	}

	function removeAlert() {
		$('.button--close').on('click', function () {
			var $this = $(this),
				$parentContainer = $this.parents('.banner--alert');
				
			$parentContainer.slideUp(200, function () {
				$parentContainer.remove();
			});

			//set cookie?
		});
	}

	function toggleCheckboxes() {
		var $checkboxes = $('.filter--checkbox input[type=checkbox]'),
			$toggleButton = $('.toggle--checkboxes');

		$toggleButton.on('click', function (e) {
			e.preventDefault();

			$checkboxes.each(function () {
				$(this).prop('checked', !this.checked);
			});
		});
	}

	function backToTop() {
		$('.button--back-to-top').on('click', function (e) {
			e.preventDefault();
			
			$('html, body').animate({
				scrollTop: 0
			}, 500);
		});
	}

	function placeholders() {
		if ($('html').hasClass("oldie")) {
			$('[placeholder]').not('[type=password]').focus(function () {
				var input = $(this);
				if (input.val() === input.attr('placeholder')) {
					input.val('');
					input.removeClass('placeholder');
				}
			}).blur(function () {
				var input = $(this);
				if (input.val() === '' || input.val() === input.attr('placeholder')) {
					input.addClass('placeholder');
					input.val(input.attr('placeholder'));
				}
			}).blur().parents('form').submit(function () {
				$(this).find('[placeholder]').each(function () {
					var input = $(this);
					if (input.val() === input.attr('placeholder')) {
						input.val('');
					}
				});
			});
		}
	}

	mobileNavPrimary();
	accordion();
	carouselSimple();
	carouselPrimary();
	carouselSecondary();
	removeAlert();
	toggleCheckboxes();
	backToTop();
	placeholders();

})(jQuery);