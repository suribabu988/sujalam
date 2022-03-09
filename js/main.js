(function ($) {
	"use strict";
	var nav = $('nav');
	var navHeight = nav.outerHeight();
	$('.navbar-toggler').on('click', function () {
		if (!$('#mainNav').hasClass('navbar-reduce')) {
			$('#mainNav').addClass('navbar-reduce');
		}
	})
	AOS.init();
	// Preloader
	$(window).on('load', function () {
		if ($('#preloader').length) {
			$('#preloader').delay(100).fadeOut('slow', function () {
				$(this).remove();
			});
		}
	});

	//Read More Logic
	$('#more').on('click', function () {
		$(this).hide();
		$('.content').show();
		$('#less').show();
	});
	$('#less').on('click', function () {
		$(this).hide();
		$('#more').show();
		$(".content").hide();
	});
	$(".content").hide();
	$(".show_hide").on("click", function () {
		var txt = $(".content").is(':visible');
		$(this).next('.content').slideToggle(200);
	});

	$('#more_more').on('click', function () {
		$(this).hide();
		$('.content').show();
		$('#less_less').show();
	});
	$('#less_less').on('click', function () {
		$(this).hide();
		$('#more_more').show();
		$(".content").hide();
	});
	$(".content").hide();
	$(".show_hide").on("click", function () {
		var txt = $(".content").is(':visible');
		$(this).next('.content').slideToggle(200);
	});

	// Back to top button
	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('.back-to-top').fadeIn('slow');
		} else {
			$('.back-to-top').fadeOut('slow');
		}
	});
	$('.back-to-top').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
		return false;
	});

	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/*--/ Star Counter /--*/
	$('.counter').counterUp({
		delay: 15,
		time: 2000
	});

	/*--/ Star Scrolling nav /--*/
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 5)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});
	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	/*--/ End Scrolling nav /--*/

	/*--/ Navbar Menu Reduce /--*/
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50;
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-lg').addClass('navbar-reduce');
			$('.navbar-expand-lg').removeClass('navbar-trans');
			$('.navbar-expand-lg .container .navbar-brand .logow').css('width', '120px');
			$('.navbar-expand-lg .container .navbar-brand .logo-show').css('width', '120px');

		} 
		else {
			$('.navbar-expand-lg').addClass('navbar-trans');
			$('.navbar-expand-lg').removeClass('navbar-reduce');
			$('.navbar-expand-lg .container .navbar-brand .logow').css('width', '0');
			$('.navbar-expand-lg .container .navbar-brand .logo-show').css('width', '150px');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});


	$('.clients .owl-carousel').owlCarousel({
		loop: true,
		margin: 10,
		nav: false,
		dots: false,
		smartSpeed: 100,
		autoplay: true,
		autoplaySpeed: 100,
		responsive: {
			0: {
				items: 2
			},
			767: {
				items: 4
			},
			1000: {
				items: 5
			}
		}
	});

	/* ==============================================
	   CONTACT FORM
	=============================================== */


	$(function () {
		jQuery.validator.addMethod("mobile", function (phone_number, element) {
			phone_number = phone_number.replace(/\s+/g, "");
			return this.optional(element) || phone_number.length > 9 &&
				phone_number.match(/^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/);
		}, "<br />Please specify a valid mobile number");

		$("form[name='contact-form']").validate({

			rules: {
				fullname: "required",
				mobile: {
					required: true,

					mobile: true
				},
				email: {
					required: true,
					email: true
				},
				comments: {
					required: true,
					minlength: 2
				}
			},
			messages: {
				fullname: "Please enter your name",
				mobile: {
					required: "Please enter your mobile number",
				},
				comments: {
					required: "Please provide a your message",
					minlength: "Your message must be at least 2 characters long"
				},
				email: "Please enter a valid email address"
			},
			submitHandler: function (form) {
				form.submit();
			}
		});
	});

})(jQuery);