(function ($) {
    "use strict";
    let nav = $('nav'),
        navHeight = nav.outerHeight(),
        navbarExpendMd = $('.navbar-expand-md'),
        preloader = $('#preloader'),
        mainNav = $('#mainNav');

    $('.navbar-toggler').on('click', function() {
        if( ! mainNav.hasClass('navbar-reduce')) {
            mainNav.addClass('navbar-reduce');
        }
    })

    $(window).on('load', function () {
        if (preloader.length) {
            preloader.delay(100).fadeOut('slow', function () {
                $(this).remove();
            });
        }
        if(window.scrollY > 50){
            navbarExpendMd.addClass('navbar-reduce');
            navbarExpendMd.removeClass('navbar-trans');
        }
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function(){
        $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
        return false;
    });

    $('.scrolltop-mf').on("click", function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

    $('.counter').counterUp({
        delay: 15,
        time: 2000
    });

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

    $('.js-scroll').on("click", function () {
        $('.navbar-collapse').collapse('hide');
    });

    $('body').scrollspy({
        target: '#mainNav',
        offset: navHeight
    });

    $(window).trigger('scroll');
    $(window).on('scroll', function () {
        let pixels = 50;
        let top = 1200;
        if ($(window).scrollTop() > pixels) {
            navbarExpendMd.addClass('navbar-reduce');
            navbarExpendMd.removeClass('navbar-trans');
        } else {
            navbarExpendMd.addClass('navbar-trans');
            navbarExpendMd.removeClass('navbar-reduce');
        }
        if ($(window).scrollTop() > top) {
            $('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
        } else {
            $('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
        }
    });

    if ($('.text-slider').length == 1) {
        let typed_strings = $('.text-slider-items').text();
        let typed = new Typed('.text-slider', {
            strings: typed_strings.split(','),
            typeSpeed: 80,
            loop: true,
            backDelay: 1100,
            backSpeed: 30
        });
    }

    const postTime =  $("#post-time");
    if(postTime.data("time") !== undefined){
        const frontDate = postTime.data("time").split("-");
        const date = new Date(parseInt(frontDate[0]),parseInt(frontDate[1])-1,parseInt(frontDate[2]),20 );
        setInterval(function(){
            $('.post-time').html(timeSince(date));
        },3000);
        $('.post-time').html(timeSince(date));
    }

    function timeSince(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = Math.floor(seconds / 31536000);
        if (interval >= 1) {
            return "Publicado en " + formatDate(date);
        }
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            return "Publicado en " + formatDate(date);
        }
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
            if(interval === 1)
                return "Publicado hace " + interval + " día";
            else
                return "Publicado hace " + interval + " días";
        }
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
            if(interval === 1)
                return "Publicado hace " + interval + " hora";
            else
                return "Publicado hace " + interval + " horas";
        }
        interval = Math.floor(seconds / 60);
        if (interval >= 1) {
            if(interval === 1)
                return "Publicado hace " + interval + " minuto";
            else
                return "Publicado hace " + interval + " minutos";
        }
        return "Publicado hace " + Math.floor(seconds) + " segundos";
    }

    function formatDate(date) {
        const monthNames = ["Ene.", "Feb.", "Mar.", "Abr.", "May.", "Jun.",
            "Jul.", "Ago.", "Sep.", "Oct.", "Nov.", "Dic."
        ];
        let day = '' + date.getDate(),
            year = date.getFullYear();

        if (day.length < 2)
            day = '0' + day;

        return [monthNames[date.getMonth()], day, year].join(' ');
    }

})(jQuery);
