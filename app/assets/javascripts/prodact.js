$(function(){
  $(document).click(function(e) {
    if($(e.target).closest('.purchase_1').length){
      $('.destroy').fadeIn();
      $('body').css('overflow','hidden');
    }else if(!$(e.target).closest('.destroy__item').length){
      $('.destroy').fadeOut();
      $('body').css('overflow','');
    }else if($(e.target).closest('.destroy__item__footer__cancel').length){
      $('.destroy').fadeOut();
      $('body').css('overflow','');
    }
  });
})

