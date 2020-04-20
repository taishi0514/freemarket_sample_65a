$(function() {
    $('.tab li').on('click' ,function() {
        var num = $('.tab li').index(this);
        $('.tab_content').removeClass('active');
        $('.tab_content').eq(num).addClass('active');
        $('.tab li').removeClass('active');
        $(this).addClass('active');
    });
});