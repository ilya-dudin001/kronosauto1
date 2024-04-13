$(function () {
  let screenWidth = screen.width;

  /*
   *  Fixed header & bottom menu
   */

  const navbar = $(".navbar");
  const topNavbarOffset = navbar.offset().top;

  $(window).scroll(function () {
    let fromTop = $(window).scrollTop();
    if (fromTop > topNavbarOffset) {
      navbar.addClass("fixed");
      if (screenWidth < 576) {
        $(".bottom-menu").fadeIn();
      }
    } else {
      navbar.removeClass("fixed");
      $(".bottom-menu").fadeOut();
    }
  });
  
   //fixed блок соцсети/договор только для десктопа
   if( $(document).width() > 991 ){
     $(window).scroll(function(){
         let navbar = $('.navbar').offset().top;
         if(navbar > 300) {
             $('.fixed__sidebar').addClass("fixed");
         } else {
             $('.fixed__sidebar').removeClass("fixed");
         }
         //let bottom = $(document).height() - $(document).scrollTop();
         
         let feedbackPos = $('.feedback').offset().top,
             scrollWindow = $(document).scrollTop(),
             windowHeight = $(window).height();
         
         if(scrollWindow > (feedbackPos - windowHeight)) {
             $('.fixed__sidebar').fadeOut(700);
         } else {
             $('.fixed__sidebar').fadeIn(700);
         }
     });
   }

  /*
   *  Menu dropdown
   */

  $(".menu__item").hover(
    function () {
      $(this).find(".menu-dropdown").slideDown();
    },
    function () {
      $(this).find(".menu-dropdown").slideUp();
    },
    200
  );

  /*
   *  Right menu
   */

  $(".burger").on("click", function () {
    $(".right-menu").addClass("open");
    $("body")
      .css("overflow", "hidden")
      .append('<div class="overlay" id="js-overlay"></div>');
  });

  $(".right-menu__close").on("click", function () {
    $(this).parents(".right-menu").removeClass("open");
    $("#js-overlay").remove();
    $("body").css("overflow", "visible");
  });

  $("body").on("click", "#js-overlay", function () {
    $(".right-menu").removeClass("open");
    $("#js-overlay").remove();
    $("body").css("overflow", "visible");
  });

  $(".right-menu__link--toggle").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("open").siblings(".right-menu__dropdown").slideToggle();
  });

  /*
   *  Carousels
   */

  $(".yt-carousel").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    dots: false,
    autoplay: false,
    autoplaySpeed: 5000,
    speed: 800,
    prevArrow:
      '<button class="prev" type="button"><svg><use href="/static/netcat_template/template/japanlife/assets/img/icons/sprite.svg#arr-left"></svg></button>',
    nextArrow:
      '<button class="next" type="button"><svg><use href="/static/netcat_template/template/japanlife/assets/img/icons/sprite.svg#arr-right"></svg></button>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          variableWidth: true,
        },
      },
    ],
  });

  $(".reviews-carousel").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    dots: false,
    autoplay: false,
    autoplaySpeed: 5000,
    speed: 800,
    prevArrow:
      '<button class="prev" type="button"><svg><use href="/static/netcat_template/template/japanlife/assets/img/icons/sprite.svg#arr-left"></svg></button>',
    nextArrow:
      '<button class="next" type="button"><svg><use href="/static/netcat_template/template/japanlife/assets/img/icons/sprite.svg#arr-right"></svg></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          variableWidth: true,
          centerMode: true,
        },
      },
    ],
  });

  $(".instock-carousel").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    dots: false,
    autoplay: false,
    autoplaySpeed: 5000,
    speed: 800,
    prevArrow:
      '<button class="prev" type="button"><svg><use href="/static/netcat_template/template/japanlife/assets/img/icons/sprite.svg#arr-left"></svg></button>',
    nextArrow:
      '<button class="next" type="button"><svg><use href="/static/netcat_template/template/japanlife/assets/img/icons/sprite.svg#arr-right"></svg></button>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          variableWidth: true,
        },
      },
    ],
  });

  $(".gallery__carousel").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    autoplay: false,
    autoplaySpeed: 4000,
    fade: false,
    asNavFor: ".gallery__thumbs",
    prevArrow:
      '<button class="prev" type="button"><svg><use href="/static/netcat_template/template/japanlife/assets/img/icons/sprite.svg#arr-left"></svg></button>',
    nextArrow:
      '<button class="next" type="button"><svg><use href="/static/netcat_template/template/japanlife/assets/img/icons/sprite.svg#arr-right"></svg></button>',
  });

  $(".gallery__thumbs").slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    asNavFor: ".gallery__carousel",
    dots: false,
    focusOnSelect: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  });

  $(".carousel").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    dots: false,
    autoplay: false,
    autoplaySpeed: 5000,
    speed: 800,
    prevArrow:
      '<button class="prev" type="button"><svg><use href="/static/netcat_template/template/japanlife/assets/img/icons/sprite.svg#arr-left"></svg></button>',
    nextArrow:
      '<button class="next" type="button"><svg><use href="/static/netcat_template/template/japanlife/assets/img/icons/sprite.svg#arr-right"></svg></button>',
    responsive: [
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  $(".office-carousel").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    dots: false,
    autoplay: false,
    autoplaySpeed: 5000,
    speed: 800,
    prevArrow:
      '<button class="prev" type="button"><svg><use href="/static/netcat_template/template/japanlife/assets/img/icons/sprite.svg#arr-left"></svg></button>',
    nextArrow:
      '<button class="next" type="button"><svg><use href="/static/netcat_template/template/japanlife/assets/img/icons/sprite.svg#arr-right"></svg></button>',
  });

  $(".gnr-carousel").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 800,
    arrows: false,
  });

  $(".sets-carousel").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    dots: false,
    autoplay: false,
    autoplaySpeed: 5000,
    speed: 800,
    prevArrow:
      '<button class="prev" type="button"><svg><use href="/static/netcat_template/template/japanlife/assets/img/icons/sprite.svg#arr-left"></svg></button>',
    nextArrow:
      '<button class="next" type="button"><svg><use href="/static/netcat_template/template/japanlife/assets/img/icons/sprite.svg#arr-right"></svg></button>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  });

  $(".mng-carousel").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    dots: false,
    autoplay: false,
    autoplaySpeed: 5000,
    speed: 800,
    prevArrow:
      '<button class="prev" type="button"><svg><use href="/static/netcat_template/template/japanlife/assets/img/icons/sprite.svg#arr-left"></svg></button>',
    nextArrow:
      '<button class="next" type="button"><svg><use href="/static/netcat_template/template/japanlife/assets/img/icons/sprite.svg#arr-right"></svg></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          variableWidth: true,
        },
      },
    ],
  });


  

  
  $("#media_carousel").slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    infinite: true,
    dots: false,
    autoplay: false,
    autoplaySpeed: 5000,
    speed: 800,
    variableWidth: true,
    asNavFor: '#media_carousel2',
    prevArrow:
      '<button class="prev" type="button"><svg><use href="/static/netcat_template/template/japanlife/assets/img/icons/sprite.svg#arr-left"></svg></button>',
    nextArrow:
      '<button class="next" type="button"><svg><use href="/static/netcat_template/template/japanlife/assets/img/icons/sprite.svg#arr-right"></svg></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          initialSlide: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
  
  
  $("#media_carousel2").slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    infinite: true,
    dots: false,
    arrows: false,
    asNavFor: '#media_carousel',
    autoplay: false,
    autoplaySpeed: 5000,
    speed: 800,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          initialSlide: 1,
          slidesToScroll: 1,
        },
      },

    ],
  });
  
  
  
  $(".poslednie-carousel").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    dots: false,
    autoplay: false,
    autoplaySpeed: 5000,
    speed: 800,
    prevArrow: $('.poslednie-prev'),
    nextArrow: $('.poslednie-next'),
    responsive: [
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
  
  
  
    $(".pohozhie-carousel").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    dots: false,
    autoplay: false,
    autoplaySpeed: 5000,
    speed: 800,
    prevArrow: $('.pohozhie-prev'),
    nextArrow: $('.pohozhie-next'),
    responsive: [
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
  
  
 
if($(window).width() < 576){ 
   $(".filter-carousel").slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    infinite: true,
    dots: false,
    autoplay: false,
    autoplaySpeed: 5000,
    speed: 800,
    arrows: false,
    variableWidth: true,
  }); 
}  
  

  /*
   *  Modal
   */

  $("body").on("click", ".js-modal-show", function (e) {
    e.preventDefault();
    var currentModal = $(this).attr("href");
	const autoInfo = $(this).data('auto');
	if(autoInfo) {
		$('#js-modal-calc input[name="f_Auto"]').val(autoInfo);
	} else {
		$('#js-modal-calc input[name="f_Auto"]').val('');
	}
    $(currentModal).fadeIn(500);
    $("body").css("overflow", "hidden");
  });

  $(".js-modal-close").on("click", function (e) {
    e.preventDefault();
    $(".js-modal").fadeOut(100);
    $("body").css("overflow", "visible");
  });

  $("body").on("click", ".js-modal", function (e) {
    if (e.target.classList.contains("js-modal")) {
      $(".js-modal").fadeOut(100);
      $("body").css("overflow", "visible");
    }
    e.stopPropagation();
  });

  /*
   *   Маска телефона
   */

  $(".phone").mask("+7 (999) 999-99-99");

  /*
   *   Faq
   */

  $(".faq__header").on("click", function () {
    $(this)
      .toggleClass("open")
      .siblings(".faq__text")
      .slideToggle()
      .parents(".faq__item")
      .siblings(".faq__item")
      .find(".faq__header")
      .removeClass("open")
      .siblings(".faq__text")
      .slideUp();
    $(this)
      .parents(".faq__col")
      .siblings(".faq__col")
      .find(".faq__header")
      .removeClass("open")
      .siblings(".faq__text")
      .slideUp();
  });

  /*
   *  Review
   */

  $(".review__more").on("click", function (e) {
    e.preventDefault();
    let self = $(this);
    let textReview = self.siblings(".review__text");
    if (textReview.hasClass("open")) {
      self.find("span").text("Показать весь");
      textReview.removeClass("open");
      $(this).closest('.review').find('.review__dotted').show();
      
      //переключение свёрнутого/развёрнутого отзыва
      $(this).closest('.review').toggleClass('short_view large_view');
      
    } else {
      self.find("span").text("Свернуть");
      textReview.addClass("open");
      $(this).closest('.review').find('.review__dotted').hide();
      
      //переключение свёрнутого/развёрнутого отзыва
      $(this).closest('.review').toggleClass('short_view large_view');
    }
  });

  $(".p-review__more").on("click", function (e) {
    e.preventDefault();
    let self = $(this);
    let textReview = self.siblings(".p-review__text");
    if (textReview.hasClass("open")) {
      self.find("span").text("Показать полностью");
      textReview.removeClass("open");
    } else {
      self.find("span").text("Свернуть");
      textReview.addClass("open");
    }
  });



  /*
   *  Tabs
   */

  $(".js-tab-link").on("click", function (e) {
    e.preventDefault();
    let link = $(this).attr("href");

    $(this).addClass("active").siblings(".js-tab-link").removeClass("active");
    $(link)
      .addClass("active")
      .fadeIn()
      .siblings(".js-tab")
      .hide()
      .removeClass("active");
  });



  /*
   * Back to Top
   */

  $(window).scroll(function () {
    if ($(this).scrollTop() > 600) {
      $(".scrollup").fadeIn();
    } else {
      $(".scrollup").fadeOut();
    }
  });

  $(".scrollup").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });

  /*
   * Mobile top menu
   */

  $(".top-menu__toggle").on("click", function () {
    if ($(this).hasClass("open")) {
      $(this).removeClass("open").siblings(".top-menu__list").slideUp();
      $("body").css("overflow", "visible");
      $(".top-menu__overlay").remove();
    } else {
      $(this).addClass("open").siblings(".top-menu__list").slideDown();
      $("body").css("overflow", "hidden");
      $(".top-menu").append('<div class="top-menu__overlay"></div>');
    }
  });

  /*
   * Auction list
   */

  $(".auction-list__toggle").on("click", function (e) {
    e.preventDefault();
    $(this).siblings(".auction-list__wrap").addClass("open");
    $(this).remove();
  });

  /*
   * Calculator
   */

  $(".calc__title").on("click", function () {
    if( !$(this).hasClass('calc_title_hide') ) $(this).toggleClass("open").siblings(".calc__wrap").slideToggle();
  });

  /*
   * Share
   */

  $(".share__toggle").on("click", function () {
    $(this).siblings(".share__list").slideToggle();
  });

  /*
   * Table
   */

  if (screenWidth < 576) {
    $(".delivery-price__table").freezeTable({
      scrollable: true,
    });
  }

  if (screenWidth < 1300) {
    $(".sets-table").freezeTable({});
  }

  /*
   *  Fixed menu generation
   */

  let heightHeader = $(".navbar").height();
  const gnrNav = $(".gnr-nav");

  if (gnrNav.length) {
    const topOffset = gnrNav.offset().top - heightHeader;

    $(window).scroll(function () {
      let fromTop = $(window).scrollTop();
      if (fromTop > topOffset) {
        gnrNav.addClass("fixed");
      } else {
        gnrNav.removeClass("fixed");
      }
    });
  }

  /*
   *  Sets accordion
   */

  $(".set__header").on("click", function () {
    $(this)
      .siblings(".set__table")
      .slideToggle()
      .parent(".set__section")
      .toggleClass("open");
  });

  /*
   *  Open service description
   */

  $(".service__toggle").on("click", function (e) {
    e.preventDefault();
    if ($(this).hasClass("open")) {
      $(this).removeClass("open").find("span").text("Показать полностью");
      $(this).siblings(".service__desc").removeClass("open");
    } else {
      $(this).addClass("open").find("span").text("Скрыть");
      $(this).siblings(".service__desc").addClass("open");
    }
  });

  /*
   *  Comparison
   */

  $(".comparison__del").on("click", function (e) {
    e.preventDefault();
    let target = $(this).attr("href");
    $(target).hide();
  });

  $(".comparison__title").on("click", function () {
    $(this)
      .siblings(".comparison__table")
      .slideToggle()
      .parent(".comparison__section")
      .toggleClass("open");
  });

  /*
   *  Rating
   */

  $(".raty").raty({ path: "/static/netcat_template/template/japanlife/assets/img/icons", scoreName: 'f_Rating' });

  /*
   *  Form file
   */

  $(".form-file input[type=file]").on("change", function (e) {
    let tgt = e.target;
    let files = tgt.files;
    let $self = $(this);
    let load = $self.parents(".form-file").find(".form-file__load");
    $(load).find("img").remove();

    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        let fr = new FileReader();
        fr.onload = function (e) {
          $("<img>").attr("src", e.target.result).appendTo($(load));
        };
        fr.readAsDataURL(files[i]);
      }
    }
  });

  /*
   *  Checking
   */

  $(".js-active").on("click", function (e) {
    e.preventDefault();
    let target = $(this).attr("data-target");
    $(this).addClass("active").siblings(".js-active").removeClass("active");
    $(target)
      .addClass("active")
      .siblings(".checking__item")
      .removeClass("active");
  });

  $(".js-toggle").on("click", function (e) {
    e.preventDefault();
    $(this)
      .toggleClass("open")
      .parents(".checking__item")
      .siblings(".checking__item")
      .find(".checking__text")
      .slideUp()
      .siblings(".checking__header")
      .find(".js-toggle")
      .removeClass("open");
    $(this).parents(".checking__item").find(".checking__text").slideToggle();
  });
});
