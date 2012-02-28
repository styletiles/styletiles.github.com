(function($){
  $(function(){

    // fancybox
    $('a.thumb[href$=.png], a.thumb[href$=.jpg], a.thumb[href$=.gif]').fancybox({
        'titleShow': false
      , 'transitionIn': 'elastic'
      , 'transitionOut': 'elastic'
    });

  });
})(jQuery);