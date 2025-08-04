jQuery(document).ready(function () {
  jQuery('.single-slider').slick({
    dots: true,
  });

  jQuery('#backto-top').click(function () {
    jQuery('html, body').animate({ scrollTop: 0 }, 800);
    return false;
  });

  /* jQuery('.mobile-bottom-header.only-mob a.search').click(function (event) {
        event.preventDefault();
        jQuery("div#block-nws-searchform-2").toggle();
    }); */

  /* jQuery("#block-nws-primarymenu ul li:nth-child(2) a").click(function () {
        jQuery("#block-nws-searchform").toggle();
    }); */

  // Peer page
  jQuery('.view-filters.art-form .form-item-field-years-value').before(
    '<a href="/resources/peer-reviewed-research" class="clear-all art-year"><img src="/themes/custom/nws/assets/images/close.png" alt="">Clear all</a>'
  );

  jQuery('.view-filters.art-form fieldset#edit-field-category-value--wrapper').before(
    '<a href="/resources/peer-reviewed-research" class="clear-all art-cat"><img src="/themes/custom/nws/assets/images/close.png" alt="">Clear all</a>'
  );

  jQuery('.art-year').click(function () {
    event.preventDefault();
    jQuery('.view-filters.art-form .form-item-field-years-value select option:selected').prop('selected', false);
  });

  jQuery('.art-cat').click(function () {
    event.preventDefault();
    jQuery('.view-filters.art-form fieldset#edit-field-category-value--wrapper input:checkbox').removeAttr('checked');
  });

  // Primary
  jQuery('.view-id-primary fieldset#edit-field-category-value--wrapper').before(
    '<a href="/resources/peer-reviewed-research" class="clear-all art2-cat"><img src="/themes/custom/nws/assets/images/close.png" alt="">Clear all</a>'
  );
  jQuery('.view-id-primary fieldset#edit-field-years-value--wrapper').before(
    '<a href="/resources/peer-reviewed-research" class="clear-all art2-year"><img src="/themes/custom/nws/assets/images/close.png" alt="">Clear all</a>'
  );
  jQuery('.view-id-primary fieldset#edit-field-science-stand-value--wrapper').before(
    '<a href="/resources/peer-reviewed-research" class="clear-all art2-stand"><img src="/themes/custom/nws/assets/images/close.png" alt="">Clear all</a>'
  );

  jQuery('.art2-cat').click(function () {
    event.preventDefault();
    jQuery('.view-id-primary fieldset#edit-field-category-value--wrapper input:checkbox').removeAttr('checked');
  });
  jQuery('.art2-year').click(function () {
    event.preventDefault();
    jQuery('.view-id-primary fieldset#edit-field-years-value--wrapper input:checkbox').removeAttr('checked');
  });
  jQuery('.art2-stand').click(function () {
    event.preventDefault();
    jQuery('.view-id-primary fieldset#edit-field-science-stand-value--wrapper input:checkbox').removeAttr('checked');
  });

  // secondary
  jQuery('.view-id-upper_secondary fieldset#edit-field-subjects-value--wrapper').before(
    '<a href="/resources/peer-reviewed-research" class="clear-all art3-subjects"><img src="/themes/custom/nws/assets/images/close.png" alt="">Clear all</a>'
  );
  jQuery('.view-id-upper_secondary fieldset#edit-field-years-value--wrapper').before(
    '<a href="/resources/peer-reviewed-research" class="clear-all art3-year"><img src="/themes/custom/nws/assets/images/close.png" alt="">Clear all</a>'
  );
  jQuery('.view-id-upper_secondary fieldset#edit-field-course-value--wrapper').before(
    '<a href="/resources/peer-reviewed-research" class="clear-all art3-course"><img src="/themes/custom/nws/assets/images/close.png" alt="">Clear all</a>'
  );

  jQuery('.art3-subjects').click(function () {
    event.preventDefault();
    jQuery('.view-id-upper_secondary fieldset#edit-field-subjects-value--wrapper input:checkbox').removeAttr('checked');
  });
  jQuery('.art3-year').click(function () {
    event.preventDefault();
    jQuery('.view-id-upper_secondary fieldset#edit-field-years-value--wrapper input:checkbox').removeAttr('checked');
  });
  jQuery('.art3-course').click(function () {
    event.preventDefault();
    jQuery('.view-id-upper_secondary fieldset#edit-field-course-value--wrapper input:checkbox').removeAttr('checked');
  });

  jQuery('.slider-three').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    responsive: [
      {
        breakpoint: 785,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  jQuery('.gallery').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 785,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  jQuery('.menu-open').on('click', function () {
    jQuery('.bottom-header').toggleClass('show');
    jQuery(this).toggleClass('show');
  });

  jQuery('.accordion').on('click', function () {
    if (jQuery(this).hasClass('show')) {
      jQuery('.accordion').removeClass('show');
    } else {
      jQuery('.accordion').removeClass('show');
      jQuery(this).toggleClass('show');
    }
  });

  jQuery('.mobile-mega-menu-trigger').on('click', function () {
    if (jQuery(this).hasClass('show')) {
      jQuery(this).parent().removeClass('show');
      jQuery('.mobile-mega-menu-trigger').removeClass('show');
    } else {
      jQuery('.mobile-mega-menu-trigger').parent().removeClass('show');
      jQuery('.mobile-mega-menu-trigger').removeClass('show');
      jQuery(this).parent().addClass('show');
      jQuery(this).addClass('show');
    }
  });

  AOS.init({
    duration: 1900,
    offset: 10,
    once: true,
    mirror: false,
    anchorPlacement: 'top-bottom',
  });

  var urlParams = new URLSearchParams(window.location.search);
  if (urlParams.size != '0') {
    jQuery('html, body').animate(
      {
        scrollTop: jQuery('#results').offset().top,
      },
      500
    );
  }
});
