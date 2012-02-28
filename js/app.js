(function($){
  $(function(){

    // fancybox
    if($(window).width() >= 768){
      $('a.thumb[href$=.png], a.thumb[href$=.jpg], a.thumb[href$=.gif]').fancybox({
          'titleShow': false
        , 'transitionIn': 'elastic'
        , 'transitionOut': 'elastic'
      });
    }

    // scrolling
    var nav = $('#topbar') // nav element
      , navY = nav.offset().top // default position
      , navHeight = nav.height() * 2.5 // nav height for calculating offsets
      , navLinks = nav.find('a[href^="#"]') // on-page links in nav
      , pageHeight = $('body').height()
      , sections = $('article[role=main]').find('section').reverse() // reversed set of nav sections
      , scrollPos = $(window).scrollTop(); // where are we on the page?
        $(window).scroll(function(){
          scrollPos = $(this).scrollTop();
          // get the active nav item
          navLinks.removeClass('active');
          if(scrollPos == 0){
            $('a[href=#top]').addClass('active');
          }else{
            sections.each(function(){
              if(scrollPos + navHeight >= $(this).offset().top){
                navLinks.filter('a[href=#' + $(this).attr('id') + ']').addClass('active');
                return false;
              }
            });
          }
        });
        // scrollTo on nav click
        navLinks.click(function(e){
          e.preventDefault();
          var destination = $( $(this).attr('href') ).offset().top,
            distance;
          // have we taken the nav out of flow? offset by navHeight if so
          if(destination > navY){
            destination -= navHeight;
          }
          // distance to scroll as a percent of total height of page
          distance = Math.abs((scrollPos - destination) / pageHeight);
          // sqrt the distance to compress the difference a bit
          // otherwise, short distances will appear to scroll too fast, long ones too slowly
          // goal is to feel as 'proportional' as possible without actual linearity
          // this is based on a 1s scroll time for the whole page, adjust as needed
          $(window).scrollTo(destination, Math.sqrt(distance) * 1000, {easing: 'swing'});
        });

        //set active state on domready
        $(window).scroll()
          // update anything that could be affected by image heights
          .load(function(){
            navY = nav.offset().top;
            pageHeight = $('body').height();
          });

  });
})(jQuery);